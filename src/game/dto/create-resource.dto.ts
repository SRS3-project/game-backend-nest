import { IsEnum, IsNotEmpty, Min, IsInt } from "class-validator";
import { ResourceType } from "../enum/resource-type.enum";

export class CreateResourceDto {
  @IsEnum(ResourceType)
  @IsNotEmpty()
  type: ResourceType;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  amount: number;
}
