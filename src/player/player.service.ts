import { CollectionReference } from "@google-cloud/firestore";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
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
    }
  }

  async findAll() {
    return await this.playerCollection.listDocuments();
  }

  async findOne(username: string) {
    return await this.playerCollection.doc(username).get();
  }

  async update(username: string, updatePlayerDto: UpdatePlayerDto) {
    return await this.playerCollection.doc(username).update(JSON.parse(JSON.stringify(updatePlayerDto)));
  }

  async remove(username: string) {
    return await this.playerCollection.doc(username).delete();
  }
}
