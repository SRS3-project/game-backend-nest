import { PartialType } from "@nestjs/swagger";
import { Player } from "../entities/player.entity";
import { CreatePlayerDto } from "./create-player.dto";

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  constructor(partialPlayer?: Partial<Player>) {
    super();
    Object.assign(this, partialPlayer);
  }
}
