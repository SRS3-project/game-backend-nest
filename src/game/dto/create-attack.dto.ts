import { IsNotEmpty, MinLength, ValidateNested } from "class-validator";
import { CreateArmyDto } from "./create-army.dto";

export class CreateAttackDto {
  @IsNotEmpty()
  fromUsername: string;

  @IsNotEmpty()
  enemyUsername: string;

  @MinLength(1)
  @IsNotEmpty()
  @ValidateNested()
  army: Array<CreateArmyDto>;
}
