import { CollectionReference, Timestamp } from "@google-cloud/firestore";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Response } from "express";
import { UpdatePlayerDto } from "src/player/dto/update-player.dto";
import { Player } from "src/player/entities/player.entity";
import { PlayerService } from "src/player/player.service";
import { CreateAttackDto } from "./dto/create-attack.dto";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";

@Injectable()
export class GameService {
  constructor(
    @Inject(Player.collectionName)
    private playerCollection: CollectionReference<Player>,
    private readonly playerService: PlayerService,
  ) {}

  create(createGameDto: CreateGameDto) {
    return "This action adds a new game";
  }

  findAll() {
    return `This action returns all game`;
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }

  async createAttack(res: Response, createAttackDto: CreateAttackDto) {
    // Check if fromPlayer exists in our firebase
    const fromPlayer = await this.playerCollection.doc(createAttackDto.fromUsername).get();
    if (!fromPlayer.exists) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    const player = fromPlayer.data();

    // Check if enemyPlayer exists in our firebase
    const enemyPlayer = await this.playerCollection.doc(createAttackDto.enemyUsername).get();
    if (!enemyPlayer.exists) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    const enemy = enemyPlayer.data();

    // Game Logic applied
    if (
      createAttackDto.army.warriors < player.warriors ||
      createAttackDto.army.generals < player.generals ||
      createAttackDto.army.archers < player.archers
    )
      return res.status(HttpStatus.BAD_REQUEST);

    player.warriors = player.warriors - createAttackDto.army.warriors;
    player.generals = player.generals - createAttackDto.army.generals;
    player.archers = player.archers - createAttackDto.army.archers;

    let updatePlayer: UpdatePlayerDto = new UpdatePlayerDto(player);

    this.playerService.update(updatePlayer.username, updatePlayer);

    // TODO: reply attack on enemy side
  }
}
