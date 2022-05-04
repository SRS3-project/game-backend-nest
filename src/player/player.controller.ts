import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('player')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @UsePipes(new ValidationPipe({transform: true}))
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @Get()
  findAll() {
    return this.playerService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.playerService.findOne(username);
  }

  @Patch(':username')
  @UsePipes(new ValidationPipe({transform: true}))
  update(@Param('username') username: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.update(username, updatePlayerDto);
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.playerService.remove(username);
  }
}
