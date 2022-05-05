import { IsNotEmpty, IsOptional } from "class-validator";

export class CreatePlayerDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  xp: number = 100;
  @IsNotEmpty()
  level: number = 1;
  @IsNotEmpty()
  wood: number = 0;
  @IsNotEmpty()
  stone: number = 0;
  @IsNotEmpty()
  food: number = 0;
  @IsNotEmpty()
  gold: number = 0;
  @IsNotEmpty()
  warriors: number = 0;
  @IsNotEmpty()
  generals: number = 0;
  @IsNotEmpty()
  archers: number = 0;
  @IsOptional()
  x: number;
  @IsOptional()
  y: number;
  @IsOptional()
  createdAt: number;
  @IsOptional()
  updatedAt: number;
}
