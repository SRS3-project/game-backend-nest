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

@ApiTags("player")
@Controller("player")
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Req() req, @Res({ passthrough: true }) res, @Body() createPlayerDto: CreatePlayerDto) {
    return req.user.username == createPlayerDto.username
      ? this.playerService.create(createPlayerDto)
      : res.sendStatus(HttpStatus.FORBIDDEN);
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
  getResources(@Res({ passthrough: true }) res: Response, @Param("username") username: string) {
    return this.playerService.getResources(res, username);
  }

  @Get("/troops/:username")
  @UseGuards(JwtAuthGuard)
  getTroops(@Res({ passthrough: true }) res: Response, @Param("username") username: string) {
    return this.playerService.getTroops(res, username);
  }

  @Get("/techs/:username")
  @UseGuards(JwtAuthGuard)
  getTechs(@Res({ passthrough: true }) res: Response, @Param("username") username: string) {
    return this.playerService.getTechs(res, username);
  }

  @Patch(":username")
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Param("username") username: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return req.user.username == username
      ? this.playerService.update(username, updatePlayerDto)
      : res.sendStatus(HttpStatus.FORBIDDEN);
  }

  @Delete(":username")
  @UseGuards(JwtAuthGuard)
  remove(@Req() req, @Res({ passthrough: true }) res, @Param("username") username: string) {
    return req.user.username == username
      ? this.playerService.remove(username)
      : res.sendStatus(HttpStatus.FORBIDDEN);
  }
}
