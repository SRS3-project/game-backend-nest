import { CollectionReference } from "@google-cloud/firestore";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UpdatePlayerDto } from "src/player/dto/update-player.dto";
import { Player } from "src/player/entities/player.entity";
import { PlayerService } from "src/player/player.service";
import { CreateArmyDto } from "./dto/create-army.dto";
import { CreateAttackDto } from "./dto/create-attack.dto";
import { units } from "./resources/units";

@Injectable()
export class GameService {
  constructor(
    @Inject(Player.collectionName)
    private playerCollection: CollectionReference<Player>,
    // private readonly socketClientProxyService: SocketClientProxyService,
    private readonly playerService: PlayerService,
  ) {}

  async createAttack(createAttackDto: CreateAttackDto) {
    // Check if fromPlayer exists in our firebase
    const fromPlayer = await this.playerCollection.doc(createAttackDto.fromUsername).get();
    if (!fromPlayer.exists) return { status: HttpStatus.NOT_FOUND };

    const player = fromPlayer.data();
    if (player.deleted) return { status: HttpStatus.FORBIDDEN };

    // Check if enemyPlayer exists in our firebase, first update resources
    await this.playerService.generateResources(createAttackDto.enemyUsername);
    const enemyPlayer = await this.playerCollection.doc(createAttackDto.enemyUsername).get();
    if (!enemyPlayer.exists) return { status: HttpStatus.NOT_FOUND };

    const enemy = enemyPlayer.data();
    if (enemy.deleted) return { status: HttpStatus.FORBIDDEN };

    // Game Logic applied
    createAttackDto.army.forEach((troop) => {
      let playerTroop = player.troops?.find((el) => el.type == troop.type.toUpperCase()).amount;
      if (playerTroop < troop.amount)
        return {
          status: HttpStatus.BAD_REQUEST,
          error: "The number of " + troop.type + " exceed you capabilities.",
        };
      //player.troops.find((el) => el.type == troop.type.toUpperCase()).amount = playerTroop - troop.amount;
    });

    let updatePlayer: UpdatePlayerDto = new UpdatePlayerDto(player);
    updatePlayer.xp += 50;

    const maxResource = 10000 * player.level;
    enemy.resources?.forEach((res) => {
      let newAmount = (updatePlayer.resources.find((r) => r.type === res.type).amount += res.amount);
      updatePlayer.resources.find((r) => r.type === res.type).amount =
        newAmount > maxResource ? maxResource : newAmount;
      res.amount = 0;
    });

    const attackTo = {
      to: createAttackDto.enemyUsername,
      from: createAttackDto.fromUsername,
      army: createAttackDto.army,
      timestampComplete:
        new Date().getTime() +
        Math.floor(Math.pow(Math.abs(player.x + enemy.x) - Math.abs(player.y + enemy.y), 2)),
    };
    updatePlayer.attack.push(attackTo);
    updatePlayer.level = Math.floor(updatePlayer.xp / 100);
    this.playerService.update(updatePlayer.username, updatePlayer);

    const attackFrom = {
      to: createAttackDto.enemyUsername,
      from: createAttackDto.fromUsername,
      army: createAttackDto.army,
      timestampComplete:
        new Date().getTime() +
        Math.floor(Math.pow(Math.abs(player.x + enemy.x) - Math.abs(player.y + enemy.y), 2)),
    };

    let updateEnemy: UpdatePlayerDto = new UpdatePlayerDto(enemy);
    enemy.attack?.push(attackFrom);

    this.playerService.update(updateEnemy.username, updateEnemy);

    // socket emit to RTM
    // const payload = {
    //   brokerAuthKey: this.configService.get("BROKER_AUTH_KEY"),
    //   type: "attack",
    //   username: createAttackDto.fromUsername,
    //   attack: attack,
    // };
    // this.socketClientProxyService.emit("data", JSON.stringify(payload));

    return updatePlayer;
  }

  async buildTroop(username, createArmyDto: CreateArmyDto) {
    const player = await this.playerCollection.doc(username).get();
    if (!player.exists) return { status: HttpStatus.NOT_FOUND };

    const playerData = player.data();
    if (playerData.deleted) return { status: HttpStatus.FORBIDDEN };

    let updatePlayer: UpdatePlayerDto = new UpdatePlayerDto(playerData);

    let error = false;
    // Check resources
    Object.entries(units[createArmyDto.type.toLowerCase()]["cost"]).forEach((resource, id) => {
      let cost = resource.toString().split(",");
      let playerResource = playerData.resources?.find((pr) => cost[0].toUpperCase() == pr.type);
      let totalCost = Number(cost[1]) * createArmyDto.amount;
      if (playerResource?.amount < totalCost) error = true;
      updatePlayer.resources.find((pr) => pr.type == cost[0].toUpperCase()).amount -= totalCost;
    });

    if (error)
      return {
        status: HttpStatus.BAD_REQUEST,
        error: "Not enough resources to build " + createArmyDto.amount + " " + createArmyDto.type,
      };

    // Level update
    updatePlayer.xp += 10 * createArmyDto.amount;
    updatePlayer.level = Math.floor(updatePlayer.xp / 100);

    updatePlayer.troops.find((pt) => pt.type == createArmyDto.type.toUpperCase()).amount +=
      createArmyDto.amount;
    this.playerService.update(updatePlayer.username, updatePlayer);

    // socket emit to RTM
    // const payload = {
    //   brokerAuthKey: this.configService.get("BROKER_AUTH_KEY"),
    //   type: "build",
    //   username: req.username,
    //   build: createArmyDto,
    // };
    // this.socketClientProxyService.emit("data", JSON.stringify(payload));

    return (await this.playerCollection.doc(username).get()).data();
  }
}
