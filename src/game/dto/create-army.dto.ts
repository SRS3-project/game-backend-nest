import { IsEnum, IsNotEmpty, Min } from "class-validator";
import { TroopType } from "../enum/troop-type.enum";

export class CreateArmyDto {
  @IsEnum(TroopType)
  @IsNotEmpty()
  type: TroopType;

  @Min(0)
  @IsNotEmpty()
  amount: number;
}
