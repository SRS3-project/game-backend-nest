import { CollectionReference } from "@google-cloud/firestore";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { CreateTechDto } from "src/game/dto/create-tech.dto";
import { productionQuantity } from "src/game/resources/resources-production";
import { CreatePlayerDto } from "./dto/create-player.dto";
import { UpdatePlayerDto } from "./dto/update-player.dto";
import { Player } from "./entities/player.entity";

@Injectable()
export class PlayerService {
  constructor(
    @Inject(Player.collectionName)
    private playerCollection: CollectionReference<Player>,
    private configService: ConfigService,
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    const player = await this.playerCollection.doc(createPlayerDto.username).get();
    if (!player.exists) {
      createPlayerDto.x = Math.floor(Math.random() * this.configService.get("MAP_WIDTH"));
      createPlayerDto.y = Math.floor(Math.random() * this.configService.get("MAP_HEIGHT"));
      createPlayerDto.createdAt = new Date().getTime();
      createPlayerDto.updatedAt = new Date().getTime();

      await this.playerCollection
        .doc(createPlayerDto.username)
        .set(JSON.parse(JSON.stringify(createPlayerDto)));
      return createPlayerDto;
    } else {
      return player.data();
    }
  }

  async findAll() {
    const snapshot = await this.playerCollection.orderBy("xp", "desc").get();
    return snapshot.docs.map((doc) => doc.data());
  }

  async findOne(username: string) {
    await this.generateResources(username);
    return (await this.playerCollection.doc(username).get()).data();
  }

  async getResources(res: Response, username: string) {
    await this.generateResources(username);
    const player = (await this.playerCollection.doc(username).get()).data();
    return player != undefined ? player.resources : res.sendStatus(HttpStatus.NOT_FOUND);
  }

  async getTroops(res, username: string) {
    await this.generateResources(username);
    const player = (await this.playerCollection.doc(username).get()).data();
    return player != undefined ? player.troops : res.sendStatus(HttpStatus.NOT_FOUND);
  }

  async getTechs(res, username: string) {
    await this.generateResources(username);
    const player = (await this.playerCollection.doc(username).get()).data();
    return player != undefined ? player.techs : res.sendStatus(HttpStatus.NOT_FOUND);
  }

  async update(username: string, updatePlayerDto: UpdatePlayerDto) {
    return await this.playerCollection.doc(username).update(JSON.parse(JSON.stringify(updatePlayerDto)));
  }

  async updateTechs(req, res, techDto: CreateTechDto) {
    const player = await this.playerCollection.doc(req.user.username).get();
    if (!player.exists) return res.status(HttpStatus.NOT_FOUND).send("User not found");

    let updatePlayer: UpdatePlayerDto = new UpdatePlayerDto(player.data());
    let techs = updatePlayer.techs;
    techs.find((t) => t.type == techDto.type).level = techDto.level;

    await this.update(req.user.username, updatePlayer);
    return (await this.playerCollection.doc(req.user.username).get()).data();
  }

  async remove(username: string) {
    return await this.playerCollection.doc(username).delete();
  }

  /**
   *
   * @param username username to update
   *
   * Minerals hrs production = 30 * level * 1.1 ^ (level)
   * Wood hrs production = 20 * level * 1.1 ^ (level)
   * Gold hrs production = 15 * level * 1.1 ^ (level)
   * Food hrs production = 10 * level * 1.1 ^ (level)
   */
  async generateResources(username: string) {
    const player = (await this.playerCollection.doc(username).get()).data();
    const constant = 1.1;
    const now = new Date().getTime();
    const hrs = Math.floor((now - player.updatedAt) / 1000 / 60 / 60);
    const maxResource = 10000 * player.level;

    if (hrs === 0) return;

    let updatePlayer: UpdatePlayerDto = new UpdatePlayerDto(player);
    productionQuantity.forEach((prod) => {
      let resource =
        updatePlayer.resources.find((res) => res.type == prod.type).amount +
        Math.floor(hrs * prod.qta * player.level * Math.pow(constant, player.level));

      updatePlayer.resources.find((res) => res.type == prod.type).amount =
        resource > maxResource ? maxResource : resource;
    });
    updatePlayer.updatedAt = now;
    await this.update(updatePlayer.username, updatePlayer);
  }
}
