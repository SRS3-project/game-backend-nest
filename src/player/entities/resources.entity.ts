import { ResourceType } from "src/game/enum/resource-type.enum";
import { GenericResource } from "./generic-resource.entity";

export class Resource extends GenericResource {
  constructor() {
    super();
  }

  type: ResourceType;
}
