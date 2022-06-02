import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional } from "class-validator";
import { CreateArmyDto } from "src/game/dto/create-army.dto";
import { CreateResourceDto } from "src/game/dto/create-resource.dto";
import { CreateTechDto } from "src/game/dto/create-tech.dto";
import { ResourceType } from "src/game/enum/resource-type.enum";
import { TechTypeEnum } from "src/game/enum/tech-type.enum";
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
      { type: ResourceType.MINERALS, amount: 0 },
      { type: ResourceType.WOOD, amount: 0 },
    ],
  );
  @IsOptional()
  @IsArray()
  @ArrayMinSize(14)
  troops: Array<CreateArmyDto> = new Array<CreateArmyDto>(
    ...[
      { type: TroopType.ARCHER, amount: 0 },
      { type: TroopType.CARAVAN, amount: 0 },
      { type: TroopType.CROSSBOWMAN, amount: 0 },
      { type: TroopType.DRAGON, amount: 0 },
      { type: TroopType.GROUNDTROLL, amount: 0 },
      { type: TroopType.INFANTRYMAN, amount: 0 },
      { type: TroopType.JACKAL, amount: 0 },
      { type: TroopType.KNIGHT, amount: 0 },
      { type: TroopType.NEUROMANCER, amount: 0 },
      { type: TroopType.SETTLERS, amount: 0 },
      { type: TroopType.SPY, amount: 0 },
      { type: TroopType.TITAN, amount: 0 },
      { type: TroopType.WANDERERS, amount: 0 },
      { type: TroopType.WAREAGLE, amount: 0 },
    ],
  );
  @IsOptional()
  @IsArray()
  @ArrayMinSize(16)
  techs: Array<CreateTechDto> = new Array<CreateTechDto>(
    ...[
      { type: TechTypeEnum.ARCANOMANCY, level: 0 },
      { type: TechTypeEnum.ARMORS, level: 0 },
      { type: TechTypeEnum.AXES, level: 0 },
      { type: TechTypeEnum.CRUCIBLE, level: 0 },
      { type: TechTypeEnum.EAGLES, level: 0 },
      { type: TechTypeEnum.ESPIONAGE, level: 0 },
      { type: TechTypeEnum.EXPLORATION, level: 0 },
      { type: TechTypeEnum.LOGISTIC, level: 0 },
      { type: TechTypeEnum.MOUNTS, level: 0 },
      { type: TechTypeEnum.PICKS, level: 0 },
      { type: TechTypeEnum.SPACEANDTIME, level: 0 },
      { type: TechTypeEnum.STORAGE, level: 0 },
      { type: TechTypeEnum.STRATEGY, level: 0 },
      { type: TechTypeEnum.TARTARUS, level: 0 },
      { type: TechTypeEnum.WAGONS, level: 0 },
      { type: TechTypeEnum.WEAPONS, level: 0 },
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
  @IsOptional()
  deleted: boolean = false;
}
