import { Attack } from "./attack.entity";

export class Player {
  static collectionName = "player";

  username: string;
  xp: number;
  level: number;
  wood: number;
  stone: number;
  food: number;
  gold: number;
  warriors: number;
  generals: number;
  archers: number;
  x: number;
  y: number;
  attack: Array<Attack>;
  createdAt: number;
  updatedAt: number;
}
