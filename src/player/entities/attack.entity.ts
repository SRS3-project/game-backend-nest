import { Army } from "./army.entity";

export class Attack {
  to: string;
  from: string;
  army: Array<Army>;
  timestampComplete: number;
}
