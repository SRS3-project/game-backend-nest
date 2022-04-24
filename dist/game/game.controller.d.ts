import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { AttackDto } from './dto/attack.dto';
import { Response } from 'express';
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    create(createGameDto: CreateGameDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateGameDto: UpdateGameDto): string;
    remove(id: string): string;
    doAttack(res: Response, attackDto: AttackDto): void;
}
