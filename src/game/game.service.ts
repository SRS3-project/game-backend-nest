import { CollectionReference } from "@google-cloud/firestore";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UpdatePlayerDto } from "src/player/dto/update-player.dto";
import { Player } from "src/player/entities/player.entity";
import { PlayerService } from "src/player/player.service";
import { CreateArmyDto } from "./dto/create-army.dto";
import { CreateAttackDto } from "./dto/create-attack.dto";
import { TroopType } from "./enum/troop-type.enum";
import { units } from "./resources/units";
import { ConfigService } from "@nestjs/config";
import { SocketClientProxyService } from "src/socket/socket-client.proxy.service";

@Injectable()
export class GameService {
  constructor(
    @Inject(Player.collectionName)
    private playerCollection: CollectionReference<Player>,
    // private readonly socketClientProxyService: SocketClientProxyService,
    private readonly playerService: PlayerService, // private readonly configService: ConfigService,
  ) {}

  async createAttack(res, createAttackDto: CreateAttackDto) {
    // Check if fromPlayer exists in our firebase
    const fromPlayer = await this.playerCollection.doc(createAttackDto.fromUsername).get();
    if (!fromPlayer.exists) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    const player = fromPlayer.data();

    // Check if enemyPlayer exists in our firebase
    const enemyPlayer = await this.playerCollection.doc(createAttackDto.enemyUsername).get();
    if (!enemyPlayer.exists) {
      return res.status(HttpStatus.NOT_FOUND).send("Enemy player not exists");
    }
    const enemy = enemyPlayer.data();

    // Game Logic applied
    createAttackDto.army.forEach((troop) => {
      let playerTroop = player.troops.find((el) => el.type == troop.type.toUpperCase()).amount;
      if (playerTroop < troop.amount)
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ error: "The number of " + troop.type + "exceed you capabilities." });
      player.troops.find((el) => el.type == troop.type.toUpperCase()).amount = playerTroop - troop.amount;
    });

    let updatePlayer: UpdatePlayerDto = new UpdatePlayerDto(player);

    this.playerService.update(updatePlayer.username, updatePlayer);

    const attack = {
      from: createAttackDto.fromUsername,
      army: createAttackDto.army,
      timestampComplete:
        new Date().getTime() +
        Math.floor(Math.pow(Math.abs(player.x + enemy.x) - Math.abs(player.y + enemy.y), 2)),
    };

    // TODO: Update enemy player
    let updateEnemy: UpdatePlayerDto = new UpdatePlayerDto(enemy);
    enemy.attack.push(attack);

    this.playerService.update(updateEnemy.username, updateEnemy);

    // socket emit
    // const payload = {
    //   brokerAuthKey: this.configService.get("BROKER_AUTH_KEY"),
    //   type: "attack",
    //   username: createAttackDto.fromUsername,
    //   attack: attack,
    // };
    // this.socketClientProxyService.emit("data", JSON.stringify(payload));

    return res.send({
      timestmap: new Date().getTime(),
      username: createAttackDto.fromUsername,
      attack: attack,
    });
  }

  async buildTroop(req, res, createArmyDto: CreateArmyDto) {
    const playerRef = await this.playerCollection.doc(req.user.username).get();
    if (!playerRef.exists) {
      return res.status(HttpStatus.NOT_FOUND).send({ error: "Player not found" });
    }

    const player = playerRef.data();
    let updatePlayer: UpdatePlayerDto = new UpdatePlayerDto(player);

    // Check resources
    Object.entries(units[createArmyDto.type.toLowerCase()]["cost"]).forEach((resource, id) => {
      let cost = resource.toString().split(",");
      let playerResource = player.resources.find((pr) => cost[0].toUpperCase() == pr.type);
      let totalCost = Number(cost[1]) * createArmyDto.amount;

      if (playerResource.amount < totalCost) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          error: "Not enough " + cost[0] + " to build " + createArmyDto.amount + " " + createArmyDto.type,
        });
      }
      updatePlayer.resources.find((pr) => pr.type == cost[0].toUpperCase()).amount -= totalCost;
    });
    updatePlayer.troops.find((pt) => pt.type == createArmyDto.type.toUpperCase()).amount +=
      createArmyDto.amount;
    this.playerService.update(updatePlayer.username, updatePlayer);

    // socket emit
    // const payload = {
    //   brokerAuthKey: this.configService.get("BROKER_AUTH_KEY"),
    //   type: "build",
    //   username: req.username,
    //   build: createArmyDto,
    // };
    // this.socketClientProxyService.emit("data", JSON.stringify(payload));

    return res.send(updatePlayer);
  }
}
