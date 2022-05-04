import { IsNotEmpty, MinLength, ValidateNested } from "class-validator";
import { ArmyDto } from "./army.dto";

export class CreateAttackDto {
  @IsNotEmpty()
  fromUsername: string;

  @IsNotEmpty()
  enemyUsername: string;

  @IsNotEmpty()
  @ValidateNested()
  army: ArmyDto;
}
