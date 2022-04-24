import { CollectionReference, Timestamp } from '@google-cloud/firestore';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Player } from 'src/player/entities/player.entity';
import { AttackDto } from './dto/attack.dto';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {

  constructor(
    @Inject(Player.collectionName)
    private playerCollection: CollectionReference<Player>,
  ) {}

  create(createGameDto: CreateGameDto) {
    return 'This action adds a new game';
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

  async doAttack(res: Response, attackDto: AttackDto) {
    if (!attackDto.to || ! attackDto.warriors || !attackDto.generals ||
        isNaN(attackDto.warriors) || isNaN(attackDto.generals)) {
          return res.status(HttpStatus.BAD_REQUEST).send()
    }

    const playerRef = await this.playerCollection.doc(attackDto.from).get()
    if (!playerRef.exists) {
      return res.status(HttpStatus.NOT_FOUND).send()
    }
    const player = playerRef.data();

    const enemyPlayerRef = await this.playerCollection.doc(attackDto.to).get()
    if (!enemyPlayerRef.exists) {
      return res.status(HttpStatus.NOT_FOUND).send()
    }
    const enemy = enemyPlayerRef.data();

    if (player.warriors < attackDto.warriors || player.generals < attackDto.generals) {
      return res.status(HttpStatus.BAD_REQUEST).send()
    }

    /* OTHER STUFF */

    return res.status(HttpStatus.OK).send({
      timestamp: Timestamp.now(),
      username: attackDto.from,
      attack: {
        timestampComplete: Timestamp.now()
      }
    });

  }
}
