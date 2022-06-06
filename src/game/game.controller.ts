import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from "@nestjs/common";
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
  @UsePipes(new ValidationPipe({ transform: true }))
  doAttack(@Req() req, @Body() createAttackDto: CreateAttackDto) {
    if (createAttackDto.fromUsername === createAttackDto.enemyUsername)
      return { status: HttpStatus.BAD_REQUEST };
    return req.user.username == createAttackDto.fromUsername
      ? this.gameService.createAttack(createAttackDto)
      : { status: HttpStatus.FORBIDDEN };
  }

  @Post("/build")
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  buildTroop(@Req() req, @Body() createArmyDto: CreateArmyDto) {
    return this.gameService.buildTroop(req, createArmyDto);
  }
}
