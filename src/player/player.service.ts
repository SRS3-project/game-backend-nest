import { CollectionReference } from "@google-cloud/firestore";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
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
      const playerData = player.data();
      if (playerData.deleted) return { status: HttpStatus.FORBIDDEN };
      return playerData;
    }
  }

  async findAll() {
    const snapshot = await this.playerCollection.orderBy("xp", "desc").get();
    return snapshot.docs.map((doc) => doc.data()).filter((val) => val.deleted != true);
  }

  async findOne(username: string) {
    const player = await this.playerCollection.doc(username).get();
    if (!player.exists) return { status: HttpStatus.NOT_FOUND };

    const playerData = player.data();
    await this.generateResources(username);
    return playerData.deleted ? { status: HttpStatus.FORBIDDEN } : playerData;
  }

  async getResources(username: string) {
    const player = await this.playerCollection.doc(username).get();
    if (!player.exists) return { status: HttpStatus.NOT_FOUND };

    const playerData = player.data();
    await this.generateResources(username);
    return playerData.deleted ? { status: HttpStatus.FORBIDDEN } : playerData.resources;
  }

  async getTroops(username: string) {
    const player = await this.playerCollection.doc(username).get();
    if (!player.exists) return { status: HttpStatus.NOT_FOUND };

    const playerData = player.data();
    await this.generateResources(username);
    return playerData.deleted ? { status: HttpStatus.FORBIDDEN } : playerData.troops;
  }

  async getTechs(username: string) {
    const player = await this.playerCollection.doc(username).get();
    if (!player.exists) return { status: HttpStatus.NOT_FOUND };

    const playerData = player.data();
    await this.generateResources(username);
    return playerData.deleted ? { status: HttpStatus.FORBIDDEN } : playerData.techs;
  }

  async update(username: string, updatePlayerDto: UpdatePlayerDto) {
    const player = await this.playerCollection.doc(username).get();
    if (!player.exists) return { status: HttpStatus.NOT_FOUND };

    const playerData = player.data();

    return playerData.deleted
      ? { status: HttpStatus.FORBIDDEN }
      : await this.playerCollection.doc(username).update(JSON.parse(JSON.stringify(updatePlayerDto)));
  }

  async updateTechs(req, techDto: CreateTechDto) {
    const player = await this.playerCollection.doc(techDto.username).get();
    if (!player.exists) return { status: HttpStatus.NOT_FOUND };

    const playerData = player.data();
    if (playerData.deleted) return { status: HttpStatus.FORBIDDEN };

    let updatePlayer: UpdatePlayerDto = new UpdatePlayerDto(playerData);
    let techs = updatePlayer.techs;
    techs.find((t) => t.type == techDto.type).level = techDto.level;

    await this.update(techDto.username, updatePlayer);
    return (await this.playerCollection.doc(techDto.username).get()).data();
  }

  async safeRemove(username: string) {
    const player = await this.playerCollection.doc(username).get();
    if (!player.exists) return { status: HttpStatus.NOT_FOUND };

    const playerData = player.data();
    let updatePlayer = new UpdatePlayerDto(playerData);
    updatePlayer.deleted = true;
    return await this.update(username, updatePlayer);
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
    const player = await this.playerCollection.doc(username).get();
    if (!player.exists) return { status: HttpStatus.NOT_FOUND };

    const playerData = player.data();
    if (playerData.deleted) return { status: HttpStatus.FORBIDDEN };

    const constant = 1.1;
    const now = new Date().getTime();
    const hrs = Math.floor((now - playerData.updatedAt) / 1000 / 60 / 60);
    const maxResource = 10000 * playerData.level;

    if (hrs === 0) return;

    let updatePlayer: UpdatePlayerDto = new UpdatePlayerDto(playerData);
    productionQuantity.forEach((prod) => {
      let resource =
        updatePlayer.resources.find((res) => res.type == prod.type).amount +
        Math.floor(hrs * prod.qta * playerData.level * Math.pow(constant, playerData.level));

      updatePlayer.resources.find((res) => res.type == prod.type).amount =
        resource > maxResource ? maxResource : resource;
    });
    updatePlayer.updatedAt = now;
    await this.update(updatePlayer.username, updatePlayer);
  }
}
