import { IsNotEmpty, Min } from "class-validator";

export class ArmyDto {
  @Min(0)
  @IsNotEmpty()
  warriors: number;

  @Min(0)
  @IsNotEmpty()
  generals: number;

  @Min(0)
  @IsNotEmpty()
  archers: number;
}
