import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export enum Seniority {
  JUNIOR = 'JUNIOR',
  MIDDLE = 'MIDDLE',
  SENIOR = 'SENIOR',
  LEAD = 'LEAD',
}

export enum ContractType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  TEMPORARY = 'TEMPORARY',
  INTERNSHIP = 'INTERNSHIP',
}

export enum RemoteType {
  ON_SITE = 'ON_SITE',
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
}

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  responsibilities!: string;

  @IsString()
  @IsNotEmpty()
  requirementsMust!: string;

  @IsString()
  @IsOptional()
  requirementsNice?: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsEnum(RemoteType)
  remoteType!: RemoteType;

  @IsEnum(ContractType)
  contractType!: ContractType;

  @IsEnum(Seniority)
  level!: Seniority;

  @IsNumber()
  @IsOptional()
  salaryMin?: number;

  @IsNumber()
  @IsOptional()
  salaryMax?: number;
}
