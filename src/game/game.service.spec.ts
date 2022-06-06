import { Payload } from "@nestjs/microservices";
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { CreatePlayerDto } from "src/player/dto/create-player.dto";
import { PlayerService } from "src/player/player.service";
import { TroopType } from "./enum/troop-type.enum";
import { GameService } from "./game.service";

describe("GameService", () => {
  let gameService: GameService;
  let playerService: PlayerService;
  let fromPlayer;
  let enemyPlayer;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [GameService, PlayerService],
    }).compile();

    gameService = moduleRef.get<GameService>(GameService);
    playerService = moduleRef.get<PlayerService>(PlayerService);
    fromPlayer = await playerService.create({ username: "user1" } as CreatePlayerDto);
    enemyPlayer = await playerService.create({ username: "user2" } as CreatePlayerDto);
  });

  afterEach(async () => {
    await playerService.remove("user1");
    await playerService.remove("user2");
  });

  describe("attack", () => {
    it("attack one player", async () => {
      let payload = {
        fromUsername: fromPlayer.username,
        enemyUsername: enemyPlayer.username,
        army: [{ type: TroopType.ARCHER, amount: 0 }],
      };
      expect(await gameService.createAttack(payload));
    });
  });

  describe("build troop", () => {
    it("build troop", async () => {
      let payload = {
        type: TroopType.ARCHER,
        amount: 1,
      };
      expect(await gameService.buildTroop("user1", payload));
    });
  });
});
