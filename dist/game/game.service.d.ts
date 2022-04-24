import { CollectionReference } from '@google-cloud/firestore';
import { Response } from 'express';
import { Player } from 'src/player/entities/player.entity';
import { AttackDto } from './dto/attack.dto';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
export declare class GameService {
    private playerCollection;
    constructor(playerCollection: CollectionReference<Player>);
    create(createGameDto: CreateGameDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateGameDto: UpdateGameDto): string;
    remove(id: number): string;
    doAttack(res: Response, attackDto: AttackDto): Promise<Response<any, Record<string, any>>>;
}
