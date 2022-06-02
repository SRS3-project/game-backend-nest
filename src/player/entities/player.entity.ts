import { Army } from "./army.entity";
import { Attack } from "./attack.entity";
import { Resource } from "./resources.entity";
import { Tech } from "./tech.entity";

export class Player {
  static collectionName = "player";

  username: string;
  xp: number;
  level: number;
  resources: Array<Resource>;
  troops: Array<Army>;
  techs: Array<Tech>;
  x: number;
  y: number;
  attack: Array<Attack>;
  createdAt: number;
  updatedAt: number;
  deleted: boolean;
}
