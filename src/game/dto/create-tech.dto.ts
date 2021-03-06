import { IsEnum, IsInt, IsNotEmpty, Min } from "class-validator";
import { TechTypeEnum } from "../enum/tech-type.enum";

export class CreateTechDto {
  @IsNotEmpty()
  username?: string;

  @IsEnum(TechTypeEnum)
  @IsNotEmpty()
  type: TechTypeEnum;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  level: number;
}
