import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { CreateTechDto } from "src/game/dto/create-tech.dto";
import { TechTypeEnum } from "src/game/enum/tech-type.enum";
import { CreatePlayerDto } from "./dto/create-player.dto";
import { UpdatePlayerDto } from "./dto/update-player.dto";
import { PlayerService } from "./player.service";

describe("PlayerService", () => {
  let playerService: PlayerService;
  let playerMock;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PlayerService],
    }).compile();

    playerService = moduleRef.get<PlayerService>(PlayerService);
    playerMock = await playerService.create({ username: "user" } as CreatePlayerDto);
  });

  describe("create", () => {
    it("should return a player", async () => {
      expect(await playerService.create({ username: "user" } as CreatePlayerDto)).toStrictEqual(playerMock);
    });
  });

  describe("findAll", () => {
    it("should return a list of player", async () => {
      expect(await playerService.findAll());
    });
  });

  describe("findOne", () => {
    it("should return a player", async () => {
      expect(await playerService.findOne("user")).toStrictEqual(playerMock);
    });
  });

  describe("getResources", () => {
    it("should return a list of resources", async () => {
      expect(await playerService.getResources("user")).toStrictEqual(playerMock.resources);
    });
  });

  describe("getTroops", () => {
    it("should return a list of troops", async () => {
      expect(await playerService.getResources("user")).toStrictEqual(playerMock.troops);
    });
  });

  describe("getTechs", () => {
    it("should return a list of tehcs", async () => {
      expect(await playerService.getResources("user")).toStrictEqual(playerMock.techs);
    });
  });

  describe("update", () => {
    it("should return the updated player", async () => {
      expect(
        await playerService.update(JSON.stringify({ user: { username: "user" } }), {
          username: "user",
        } as UpdatePlayerDto),
      );
    });
  });

  describe("update techs", () => {
    it("should return the updated player", async () => {
      let techDto = new CreateTechDto();
      techDto.username = "user";
      techDto.type = TechTypeEnum.SPACEANDTIME;
      techDto.level = 0;
      expect(await playerService.updateTechs(JSON.stringify({ user: { username: "user" } }), techDto));
    });
  });

  describe("safe remove", () => {
    it("should return the safely deleted player", async () => {
      playerMock.deleted = true;
      expect(await playerService.safeRemove("user"));
    });
  });

  afterEach(async () => {
    await playerService.remove("user");
  });
});
