import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  IN_REVIEW = 'IN_REVIEW',
  INTERVIEW = 'INTERVIEW',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export class UpdateApplicationStatusDto {
  @IsEnum(ApplicationStatus)
  status!: ApplicationStatus;

  @IsString()
  @IsOptional()
  notes?: string;
}
