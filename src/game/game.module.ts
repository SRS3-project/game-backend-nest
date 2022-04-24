import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { PlayerModule } from 'src/player/player.module';
import { Game } from './entities/game.entity';

@Module({
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule {}
