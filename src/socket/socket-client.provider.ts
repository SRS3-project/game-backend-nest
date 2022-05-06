import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Socket, io } from "socket.io-client";

export class SocketClientProvider {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  private socket: Socket;

  private connect() {
    this.socket = io(this.configService.get("RTM_URL"));
    return this.socket;
  }

  getSocket() {
    if (!this.socket) return this.connect();
    return this.socket;
  }
}
