import { Army } from "./army.entity";

export class Attack {
  from: string;
  army: Array<Army>;
  timestampComplete: number;
}
