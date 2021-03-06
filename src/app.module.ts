import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { configuration } from "./common/configuration";
import { getEnvPath } from "./common/helper/env.helper";
import { validationSchema } from "./common/validation";
import { FirestoreModule } from "./firestore/firestore.module";
import { GameModule } from "./game/game.module";
import { PlayerModule } from "./player/player.module";
import { SocketClientModule } from "./socket/socket-client.module";

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        credentials: {
          client_email: configService.get<string>("CLIENT_EMAIL"),
          private_key: configService.get<string>("PRIVATE_KEY").replace(/\\n/g, "\n"),
        },
        projectId: configService.get<string>("PROJECT_ID"),
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
