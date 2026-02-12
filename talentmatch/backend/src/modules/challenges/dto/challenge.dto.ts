import { IsEnum, IsInt, IsNotEmpty, IsString, IsArray, IsObject, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ChallengeDifficulty, ChallengeType } from '@prisma/client';

export class SubmitQuizDto {
  @ApiProperty()
  @IsArray()
  answers!: { questionId: string; selectedOption: number }[];
}

export class CreateChallengeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty({ enum: ChallengeType })
  @IsEnum(ChallengeType)
  type!: ChallengeType;

  @ApiProperty({ enum: ChallengeDifficulty })
  @IsEnum(ChallengeDifficulty)
  difficulty!: ChallengeDifficulty;

  @ApiProperty()
  @IsString()
  category!: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  points!: number;

  @ApiProperty()
  @IsString()
  content!: string; // JSON
}
