import { Controller, Post, Body, Res, Request, Response } from "@nestjs/common";
import { GameService } from "./game.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateAttackDto } from "./dto/create-attack.dto";
import { CreateArmyDto } from "./dto/create-army.dto";

@ApiTags("game")
@Controller("game")
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post("/attack")
  doAttack(@Response() res, @Body() createAttackDto: CreateAttackDto) {
    return this.gameService.createAttack(res, createAttackDto);
  }

  @Post("/build")
  buildTroop(@Request() req, @Response() res, @Body() createArmyDto: CreateArmyDto) {
    return this.gameService.buildTroop(req, res, createArmyDto);
  }
}
