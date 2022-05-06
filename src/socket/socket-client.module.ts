import { Global, Module } from "@nestjs/common";
import { SocketClientProvider } from "./socket-client.provider";
import { SocketClientProxyService } from "./socket-client.proxy.service";

@Global()
@Module({
  providers: [SocketClientProvider, SocketClientProxyService],
  exports: [SocketClientProvider, SocketClientProxyService],
})
export class SocketClientModule {}
