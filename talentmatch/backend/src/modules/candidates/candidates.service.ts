import { PrismaService } from '@database/prisma/prisma.service';
import { EmbeddingsService } from '@modules/embeddings/embeddings.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

export interface CreateCandidateProfileDto {
  userId: string;
  name: string;
  location: string;
  about?: string;
  cvUrl?: string;
  headline?: string;
}

export interface UpdateCandidateProfileDto {
  name?: string;
  about?: string;
  location?: string;
  cvUrl?: string;
  headline?: string;
}

export interface AddExperienceDto {
  candidateId: string;
  companyName: string;
  role: string;
  startDate: string | Date;
  endDate?: string | Date;
  description?: string;
}

export interface AddEducationDto {
  candidateId: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string | Date;
  endDate?: string | Date;
}

export interface AddSkillDto {
  candidateId: string;
  skillId: string;
  level: string;
  yearsExp?: number;
}

@Injectable()
export class CandidatesService {
  constructor(
    private _prisma: PrismaService,
    private _embeddingsService: EmbeddingsService,
  ) {}

  private async updateCandidateEmbedding(candidateId: string) {
    try {
        const profile = await this.getProfile(candidateId);
        const skills = profile.skills.map(s => s.skill.name).join(', ');
        const experiences = profile.experiences.map(e => `${e.role} at ${e.companyName}`).join('; ');
        const text = `${profile.headline || ''}. ${profile.about || ''}. Skills: ${skills}. Experience: ${experiences}`;

        await this._embeddingsService.saveEmbedding('candidate', candidateId, text);
    } catch (error) {
        console.error('Falha ao atualizar embedding do candidato:', error);
    }
  }

  // Profil Candidato
  async createProfile(dto: CreateCandidateProfileDto) {
    // Check if candidate profile already exists
    const existingProfile = await this._prisma.candidateProfile.findUnique({
      where: { userId: dto.userId },
    });

    if (existingProfile) {
      throw new BadRequestException('Candidate profile already exists');
    }

    return this._prisma.candidateProfile.create({
      data: {
        userId: dto.userId,
        name: dto.name,
        location: dto.location || 'Not specified',
        about: dto.about,
        cvUrl: dto.cvUrl,
        headline: dto.headline,
      },
      include: {
        user: true,
      },
    });
  }

  async getProfile(candidateId: string) {
    const profile = await this._prisma.candidateProfile.findUnique({
      where: { id: candidateId },
      include: {
        user: {
          select: {
            email: true,
          },
        },
        experiences: true,
        educations: true,
        skills: {
          include: {
            skill: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Candidate profile not found');
    }

    return profile;
  }

  async getProfileByUserId(userId: string) {
    const profile = await this._prisma.candidateProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            email: true,
          },
        },
        experiences: true,
        educations: true,
        skills: {
          include: {
            skill: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Candidate profile not found for this user');
    }

    return profile;
  }

  async updateProfile(candidateId: string, dto: UpdateCandidateProfileDto) {
    const profile = await this._prisma.candidateProfile.update({
      where: { id: candidateId },
      data: dto,
    });

    await this.updateCandidateEmbedding(candidateId);
    return profile;
  }

  // Experiência
  async addExperience(dto: AddExperienceDto) {
    return this._prisma.candidateExperience.create({
      data: {
        candidateId: dto.candidateId,
        companyName: dto.companyName,
        role: dto.role,
        startDate: dto.startDate,
        endDate: dto.endDate,
        description: dto.description,
      },
    });
  }

  async getExperiences(candidateId: string) {
    return this._prisma.candidateExperience.findMany({
      where: { candidateId },
      orderBy: { startDate: 'desc' },
    });
  }

  async updateExperience(experienceId: string, dto: Partial<AddExperienceDto>) {
    return this._prisma.candidateExperience.update({
      where: { id: experienceId },
      data: {
        companyName: dto.companyName,
        role: dto.role,
        startDate: dto.startDate,
        endDate: dto.endDate,
        description: dto.description,
      },
    });
  }

  async deleteExperience(experienceId: string) {
    return this._prisma.candidateExperience.delete({
      where: { id: experienceId },
    });
  }

  // Educação
  async addEducation(dto: AddEducationDto) {
    return this._prisma.candidateEducation.create({
      data: {
        candidateId: dto.candidateId,
        institution: dto.institution,
        degree: dto.degree,
        field: dto.field,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
      },
    });
  }

  async getEducations(candidateId: string) {
    return this._prisma.candidateEducation.findMany({
      where: { candidateId },
      orderBy: { startDate: 'desc' },
    });
  }

  async updateEducation(educationId: string, dto: Partial<AddEducationDto>) {
    return this._prisma.candidateEducation.update({
      where: { id: educationId },
      data: {
        institution: dto.institution,
        degree: dto.degree,
        field: dto.field,
        startDate: dto.startDate,
        endDate: dto.endDate,
      },
    });
  }

  async deleteEducation(educationId: string) {
    return this._prisma.candidateEducation.delete({
      where: { id: educationId },
    });
  }

  // Skills
  async addSkill(dto: AddSkillDto) {
    return this._prisma.candidateSkill.create({
      data: {
        candidateId: dto.candidateId,
        skillId: dto.skillId,
        level: dto.level as any,
        yearsExp: dto.yearsExp,
      },
      include: {
        skill: true,
      },
    });
  }

  async getCandidateSkills(candidateId: string) {
    return this._prisma.candidateSkill.findMany({
      where: { candidateId },
      include: {
        skill: true,
      },
    });
  }

  async removeSkill(candidateId: string, skillId: string) {
    return this._prisma.candidateSkill.delete({
      where: {
        candidateId_skillId: {
          candidateId,
          skillId,
        },
      },
    });
  }

  // Listagem
  async listCandidates(limit: number = 10, offset: number = 0) {
    try {
      const result = await this._prisma.candidateProfile.findMany({
        skip: offset,
        take: limit,
      });
      return result;
    } catch (error: any) {
      console.error('[Candidates.listCandidates] Error:', error.message);
      return [];
    }
  }
}
