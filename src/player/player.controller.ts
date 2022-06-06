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
  Req,
  HttpStatus,
} from "@nestjs/common";
import { PlayerService } from "./player.service";
import { CreatePlayerDto } from "./dto/create-player.dto";
import { UpdatePlayerDto } from "./dto/update-player.dto";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Response } from "express";
import { CreateTechDto } from "src/game/dto/create-tech.dto";

@ApiTags("player")
@Controller("player")
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Req() req, @Body() createPlayerDto: CreatePlayerDto) {
    return req.user.username == createPlayerDto.username
      ? this.playerService.create(createPlayerDto)
      : { status: HttpStatus.FORBIDDEN };
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
  getResources(@Param("username") username: string) {
    return this.playerService.getResources(username);
  }

  @Get("/troops/:username")
  @UseGuards(JwtAuthGuard)
  getTroops(@Param("username") username: string) {
    return this.playerService.getTroops(username);
  }

  @Get("/techs/:username")
  @UseGuards(JwtAuthGuard)
  getTechs(@Param("username") username: string) {
    return this.playerService.getTechs(username);
  }

  @Patch("/update")
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Req() req, @Body() updatePlayerDto: UpdatePlayerDto) {
    return req.user.username === updatePlayerDto.username
      ? this.playerService.update(updatePlayerDto.username, updatePlayerDto)
      : { status: HttpStatus.FORBIDDEN };
  }

  @Patch("/techs")
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  updateTechs(@Req() req, @Body() techDto: CreateTechDto) {
    return req.user.username === techDto.username
      ? this.playerService.updateTechs(req, techDto)
      : { status: HttpStatus.FORBIDDEN };
  }

  @Delete(":username")
  @UseGuards(JwtAuthGuard)
  remove(@Req() req, @Param("username") username: string) {
    return req.user.username == username
      ? this.playerService.safeRemove(username)
      : { status: HttpStatus.FORBIDDEN };
  }
}
