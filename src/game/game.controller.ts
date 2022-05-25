import { Controller, Post, Body, Response, UseGuards, Req, Res } from "@nestjs/common";
import { GameService } from "./game.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateAttackDto } from "./dto/create-attack.dto";
import { CreateArmyDto } from "./dto/create-army.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Request } from "express";

@ApiTags("game")
@Controller("game")
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post("/attack")
  @UseGuards(JwtAuthGuard)
  doAttack(@Res() res: Response, @Body() createAttackDto: CreateAttackDto) {
    return this.gameService.createAttack(res, createAttackDto);
  }

  @Post("/build")
  @UseGuards(JwtAuthGuard)
  buildTroop(@Req() req: Request, @Res() res: Response, @Body() createArmyDto: CreateArmyDto) {
    return this.gameService.buildTroop(req, res, createArmyDto);
  }
}
