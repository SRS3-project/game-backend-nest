import { Controller, Post, Body, Request, Response, UseGuards } from "@nestjs/common";
import { GameService } from "./game.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateAttackDto } from "./dto/create-attack.dto";
import { CreateArmyDto } from "./dto/create-army.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@ApiTags("game")
@Controller("game")
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post("/attack")
  @UseGuards(JwtAuthGuard)
  doAttack(@Response() res, @Body() createAttackDto: CreateAttackDto) {
    return this.gameService.createAttack(res, createAttackDto);
  }

  @Post("/build")
  @UseGuards(JwtAuthGuard)
  buildTroop(@Request() req, @Response() res, @Body() createArmyDto: CreateArmyDto) {
    return this.gameService.buildTroop(req, res, createArmyDto);
  }
}
