import { Army } from "./army.entity";
import { Attack } from "./attack.entity";
import { Resource } from "./resources.entity";

export class Player {
  static collectionName = "player";

  username: string;
  xp: number;
  level: number;
  resources: Array<Resource>;
  troops: Array<Army>;
  x: number;
  y: number;
  attack: Array<Attack>;
  createdAt: number;
  updatedAt: number;
}
