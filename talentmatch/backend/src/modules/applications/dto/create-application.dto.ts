import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  jobId!: string;

  @IsString()
  @IsOptional()
  cvUrl?: string;

  @IsString()
  @IsOptional()
  coverLetter?: string;
}
