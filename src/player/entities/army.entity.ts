import { TroopType } from "src/game/enum/troop-type.enum";
import { GenericResource } from "./generic-resource.entity";

export class Army extends GenericResource {
  constructor() {
    super();
  }

  type: TroopType;
}
