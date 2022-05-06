import { Inject } from "@nestjs/common";
import { ClientProxy, ReadPacket, WritePacket } from "@nestjs/microservices";
import { SocketClientProvider } from "./socket-client.provider";

export class SocketClientProxyService extends ClientProxy {
  @Inject(SocketClientProvider)
  private client: SocketClientProvider;

  async connect(): Promise<any> {
    this.client.getSocket();
    console.log("SocketClientProxyService::connect: Connected");
  }

  close() {
    this.client.getSocket().disconnect();
    console.log("SocketClientProxyService::connect: Disconnected");
  }

  /**
   * This method will be call when use SocketClientProxyService.send
   * can be use to implement request-response
   * @param packet
   * @param callback
   * @returns
   */
  protected publish(packet: ReadPacket<any>, callback: (packet: WritePacket<any>) => void): () => void {
    callback({ response: packet.data });
    return;
  }

  /**
   * This method is used when you use SocketClientProxyService.emit
   * @param packet
   * @returns
   */
  protected dispatchEvent<T = any>(packet: ReadPacket<any>): Promise<T> {
    this.client.getSocket().emit(packet.pattern, packet.data);
    return;
  }
}
