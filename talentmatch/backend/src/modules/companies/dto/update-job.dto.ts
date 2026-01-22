import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ContractType, RemoteType, Seniority } from './create-job.dto';

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  responsibilities?: string;

  @IsString()
  @IsOptional()
  requirementsMust?: string;

  @IsString()
  @IsOptional()
  requirementsNice?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsEnum(RemoteType)
  @IsOptional()
  remoteType?: RemoteType;

  @IsEnum(ContractType)
  @IsOptional()
  contractType?: ContractType;

  @IsEnum(Seniority)
  @IsOptional()
  level?: Seniority;

  @IsNumber()
  @IsOptional()
  salaryMin?: number;

  @IsNumber()
  @IsOptional()
  salaryMax?: number;

  @IsString()
  @IsOptional()
  status?: string;
}
