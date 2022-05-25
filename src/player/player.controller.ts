import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Res,
} from "@nestjs/common";
import { PlayerService } from "./player.service";
import { CreatePlayerDto } from "./dto/create-player.dto";
import { UpdatePlayerDto } from "./dto/update-player.dto";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Response } from "express";

@ApiTags("player")
@Controller("player")
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.playerService.findAll();
  }

  @Get(":username")
  @UseGuards(JwtAuthGuard)
  findOne(@Param("username") username: string) {
    return this.playerService.findOne(username);
  }

  @Get("/resources/:username")
  @UseGuards(JwtAuthGuard)
  getResources(@Res() res: Response, @Param("username") username: string) {
    return this.playerService.getResources(res, username);
  }

  @Get("/troops/:username")
  @UseGuards(JwtAuthGuard)
  getTroops(@Res() res: Response, @Param("username") username: string) {
    return this.playerService.getTroops(res, username);
  }

  @Patch(":username")
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param("username") username: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.update(username, updatePlayerDto);
  }

  @Delete(":username")
  @UseGuards(JwtAuthGuard)
  remove(@Param("username") username: string) {
    return this.playerService.remove(username);
  }
}
