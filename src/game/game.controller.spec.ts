import * as request from "supertest";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";
import { TroopType } from "./enum/troop-type.enum";

describe("GameController", () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let gameServiceMock = {
    createAttack: jest.fn().mockReturnValue(""),
    buildTroop: jest.fn().mockReturnValue(""),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [GameController],
      providers: [GameService, JwtStrategy],
    })
      .overrideProvider(GameService)
      .useValue(gameServiceMock)
      .compile();

    jwtService = moduleRef.get<JwtService>(JwtService);

    app = moduleRef.createNestApplication();
    app.enableCors();
    await app.init();
  });

  describe("create attack", () => {
    it("/POST create attack Bad Request", async () => {
      const payload = { username: "user", sub: 1 };
      const token = jwtService.sign(payload);

      return request(app.getHttpServer())
        .post("/game/attack")
        .set("Authorization", `Bearer ${token}`)
        .send({
          fromUsername: "user",
          toUsername: "test-user",
        })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe("build troops", () => {
    it("/POST create attack Bad Request", async () => {
      const payload = { username: "user", sub: 1 };
      const token = jwtService.sign(payload);

      return request(app.getHttpServer())
        .post("/game/build")
        .set("Authorization", `Bearer ${token}`)
        .send({})
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
