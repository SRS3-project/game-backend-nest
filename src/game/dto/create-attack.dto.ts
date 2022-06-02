import { IsNotEmpty, ValidateNested } from "class-validator";
import { CreateArmyDto } from "./create-army.dto";

export class CreateAttackDto {
  @IsNotEmpty()
  fromUsername: string;

  @IsNotEmpty()
  enemyUsername: string;

  @IsNotEmpty()
  @ValidateNested()
  army: Array<CreateArmyDto>;
}
