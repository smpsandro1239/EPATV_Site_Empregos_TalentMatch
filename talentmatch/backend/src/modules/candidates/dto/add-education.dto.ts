import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddEducationDto {
  @IsString()
  @IsNotEmpty()
  institution!: string;

  @IsString()
  @IsNotEmpty()
  degree!: string;

  @IsString()
  @IsOptional()
  field?: string;

  @IsDateString()
  @IsNotEmpty()
  startDate!: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  candidateId?: string;
}
