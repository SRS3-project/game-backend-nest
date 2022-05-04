import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from "@nestjs/common";
import { GameService } from "./game.service";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import { CreateAttackDto } from "./dto/create-attack.dto";

@ApiTags("game")
@Controller("game")
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.gameService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(+id, updateGameDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.gameService.remove(+id);
  }

  @Post("/attack")
  doAttack(@Res() res: Response, @Body() createAttackDto: CreateAttackDto) {
    return this.gameService.createAttack(res, createAttackDto);
  }
}
