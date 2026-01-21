import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCandidateDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(2)
  location!: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsString()
  @IsOptional()
  cvUrl?: string;

  @IsString()
  @IsOptional()
  headline?: string;
}
