import * as request from "supertest";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { PlayerController } from "./player.controller";
import { PlayerService } from "./player.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";
import { AppModule } from "src/app.module";

describe("PlayerController", () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let playerServiceMock = {
    create: jest.fn().mockResolvedValue("created"),
    findAll: jest.fn().mockResolvedValue("list of users"),
    findOne: jest.fn().mockResolvedValue("user"),
    update: jest.fn().mockResolvedValue("updated"),
    updateTechs: jest.fn().mockResolvedValue("tech updated"),
    safeRemove: jest.fn().mockResolvedValue("deleted"),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [PlayerController],
      providers: [PlayerService, JwtStrategy],
    })
      .overrideProvider(PlayerService)
      .useValue(playerServiceMock)
      .compile();

    jwtService = moduleRef.get<JwtService>(JwtService);

    app = moduleRef.createNestApplication();
    app.enableCors();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("create", () => {
    it("/POST create OK", () => {
      const payload = { username: "bananator", sub: 1 };
      const token = jwtService.sign(payload);

      return request(app.getHttpServer())
        .post("/player")
        .set("Authorization", `Bearer ${token}`)
        .send({
          username: "test-user",
        })
        .expect(HttpStatus.CREATED);
    });
    it("/POST create Bad Request", () => {
      const payload = { username: "bananator", sub: 1 };
      const token = jwtService.sign(payload);

      return request(app.getHttpServer())
        .post("/player")
        .set("Authorization", `Bearer ${token}`)
        .send({})
        .expect(HttpStatus.BAD_REQUEST);
    });
    it("/POST create Unauthorized", () => {
      return request(app.getHttpServer())
        .post("/player")
        .set("Authorization", `Bearer ${null}`)
        .send({
          username: "test-user",
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe("findAll", () => {
    it("/GET findAll OK", () => {
      const payload = { username: "bananator", sub: 1 };
      const token = jwtService.sign(payload);

      return request(app.getHttpServer())
        .get("/player")
        .set("Authorization", `Bearer ${token}`)
        .expect(HttpStatus.OK);
    });
    it("/GET findAll Unauthorized", () => {
      return request(app.getHttpServer())
        .get("/player")
        .set("Authorization", `Bearer ${null}`)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe("findOne", () => {
    it("/GET findOne OK", () => {
      const payload = { username: "bananator", sub: 1 };
      const token = jwtService.sign(payload);

      return request(app.getHttpServer())
        .get("/player")
        .set("Authorization", `Bearer ${token}`)
        .query({ username: "bananator" })
        .expect(HttpStatus.OK);
    });
    it("/GET findOne Unauthorized", () => {
      return request(app.getHttpServer())
        .get("/player")
        .set("Authorization", `Bearer ${null}`)
        .query({ username: "bananator" })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe("getResources", () => {
    it("/GET getResources OK", () => {
      const payload = { username: "bananator", sub: 1 };
      const token = jwtService.sign(payload);

      return request(app.getHttpServer())
        .get("/player/resources")
        .set("Authorization", `Bearer ${token}`)
        .query({ username: "bananator" })
        .expect(HttpStatus.OK);
    });
    it("/GET getResources Unauthorized", () => {
      return request(app.getHttpServer())
        .get("/player/resources")
        .set("Authorization", `Bearer ${null}`)
        .query({ username: "bananator" })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe("getTroops", () => {
    it("/GET getTroops OK", () => {
      const payload = { username: "bananator", sub: 1 };
      const token = jwtService.sign(payload);

      return request(app.getHttpServer())
        .get("/player/troops")
        .set("Authorization", `Bearer ${token}`)
        .query({ username: "bananator" })
        .expect(HttpStatus.OK);
    });
    it("/GET getTroops Unauthorized", () => {
      return request(app.getHttpServer())
        .get("/player/troops")
        .set("Authorization", `Bearer ${null}`)
        .query({ username: "bananator" })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe("getTechs", () => {
    it("/GET getTechs OK", () => {
      const payload = { username: "bananator", sub: 1 };
      const token = jwtService.sign(payload);

      return request(app.getHttpServer())
        .get("/player/techs")
        .set("Authorization", `Bearer ${token}`)
        .query({ username: "bananator" })
        .expect(HttpStatus.OK);
    });
    it("/GET getTechs Unauthorized", () => {
      return request(app.getHttpServer())
        .get("/player/techs")
        .set("Authorization", `Bearer ${null}`)
        .query({ username: "bananator" })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe("update", () => {
    it("/PATCH update OK", () => {
      const payload = { username: "bananator", sub: 1 };
      const token = jwtService.sign(payload);

      return request(app.getHttpServer())
        .patch("/player/update")
        .set("Authorization", `Bearer ${token}`)
        .send({
          username: "bananator",
        })
        .expect(HttpStatus.OK);
    });
    it("/PATCH update Bad Request", () => {
      const payload = { username: "bananator", sub: 1 };
      const token = jwtService.sign(payload);

      return request(app.getHttpServer())
        .patch("/player/update")
        .set("Authorization", `Bearer ${token}`)
        .send({})
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe("update techs", () => {
    it("/PATCH update techs OK", () => {
      const payload = { username: "bananator", sub: 1 };
      const token = jwtService.sign(payload);

      return request(app.getHttpServer())
        .patch("/player/techs")
        .set("Authorization", `Bearer ${token}`)
        .send({
          username: "bananator",
          type: "STORAGE",
          level: 1,
        })
        .expect(HttpStatus.OK);
    });
    it("/PATCH update techs Bad Request", () => {
      const payload = { username: "bananator", sub: 1 };
      const token = jwtService.sign(payload);

      return request(app.getHttpServer())
        .patch("/player/techs")
        .set("Authorization", `Bearer ${token}`)
        .send({})
        .expect(HttpStatus.BAD_REQUEST);
    });
    it("/PATCH update techs Bad Request", () => {
      const payload = { username: "bananator", sub: 1 };
      const token = jwtService.sign(payload);

      return request(app.getHttpServer())
        .patch("/player/techs")
        .set("Authorization", `Bearer ${token}`)
        .send({
          username: "bananator",
          type: "NOT DEFINED",
          level: 1,
        })
        .expect(HttpStatus.BAD_REQUEST);
    });
    it("/PATCH update techs Bad Request", () => {
      const payload = { username: "bananator", sub: 1 };
      const token = jwtService.sign(payload);

      return request(app.getHttpServer())
        .patch("/player/techs")
        .set("Authorization", `Bearer ${token}`)
        .send({
          username: "bananator",
          type: "STORAGE",
          level: -1,
        })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe("delete user", () => {
    it("/DELETE delete OK", () => {
      const payload = { username: "bananator", sub: 1 };
      const token = jwtService.sign(payload);

      return request(app.getHttpServer())
        .delete("/player")
        .set("Authorization", `Bearer ${token}`)
        .query({ username: "bananator" })
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
