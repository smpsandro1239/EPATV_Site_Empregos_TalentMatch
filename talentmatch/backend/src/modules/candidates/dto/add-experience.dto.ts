import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddExperienceDto {
  @IsString()
  @IsNotEmpty()
  companyName!: string;

  @IsString()
  @IsNotEmpty()
  role!: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  description?: string;

  candidateId?: string;
}
