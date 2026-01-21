import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export enum SkillLevel {
  JUNIOR = 'JUNIOR',
  MID = 'MID',
  SENIOR = 'SENIOR',
}

export class AddSkillDto {
  @IsString()
  @IsNotEmpty()
  skillId!: string;

  @IsEnum(SkillLevel)
  level!: SkillLevel;

  @IsNumber()
  @IsOptional()
  yearsExp?: number;
}
