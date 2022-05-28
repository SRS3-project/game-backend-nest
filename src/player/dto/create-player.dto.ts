import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional } from "class-validator";
import { CreateArmyDto } from "src/game/dto/create-army.dto";
import { CreateResourceDto } from "src/game/dto/create-resource.dto";
import { ResourceType } from "src/game/enum/resource-type.enum";
import { TroopType } from "src/game/enum/troop-type.enum";
import { Attack } from "../entities/attack.entity";

export class CreatePlayerDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  xp: number = 100;
  @IsNotEmpty()
  level: number = 1;
  @IsOptional()
  @IsArray()
  @ArrayMinSize(4)
  resources: Array<CreateResourceDto> = new Array<CreateResourceDto>(
    ...[
      { type: ResourceType.FOOD, amount: 0 },
      { type: ResourceType.GOLD, amount: 0 },
      { type: ResourceType.STONE, amount: 0 },
      { type: ResourceType.WOOD, amount: 0 },
    ],
  );
  @IsOptional()
  @IsArray()
  @ArrayMinSize(3)
  troops: Array<CreateArmyDto> = new Array<CreateArmyDto>(
    ...[
      { type: TroopType.ARCHERS, amount: 0 },
      { type: TroopType.GENERALS, amount: 0 },
      { type: TroopType.WARRIORS, amount: 0 },
    ],
  );
  @IsOptional()
  x: number;
  @IsOptional()
  y: number;
  @IsArray()
  @IsOptional()
  attack: Array<Attack> = new Array<Attack>();
  @IsOptional()
  createdAt: number;
  @IsOptional()
  updatedAt: number;
}
