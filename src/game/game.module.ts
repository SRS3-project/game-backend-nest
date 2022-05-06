import { Module } from "@nestjs/common";
import { GameService } from "./game.service";
import { GameController } from "./game.controller";
import { PlayerModule } from "src/player/player.module";
import { PlayerService } from "src/player/player.service";

@Module({
  imports: [PlayerModule],
  controllers: [GameController],
  providers: [GameService, PlayerService],
})
export class GameModule {}
