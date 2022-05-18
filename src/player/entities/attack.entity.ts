import { Army } from "./army.entity";

export class Attack {
  to: string;
  army: Array<Army>;
  timestampComplete: number;
}
