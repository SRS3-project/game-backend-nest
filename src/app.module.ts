import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { FirestoreModule } from "./firestore/firestore.module";
import { GameModule } from "./game/game.module";
import { PlayerModule } from "./player/player.module";
import { SocketClientModule } from "./socket/socket-client.module";

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
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
