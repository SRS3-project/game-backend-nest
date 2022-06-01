import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { getEnvPath } from "./common/helper/env.helper";
import { FirestoreModule } from "./firestore/firestore.module";
import { GameModule } from "./game/game.module";
import { PlayerModule } from "./player/player.module";
import { SocketClientModule } from "./socket/socket-client.module";

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: [envFilePath],
      isGlobal: true,
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        keyFilename: configService.get<string>("GOOGLE_APPLICATION_CREDENTIALS"),
      }),
      inject: [ConfigService],
    }),
    PlayerModule,
    GameModule,
    SocketClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
