import { PrismaService } from '@database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export interface MatchResult {
  id: string;
  name?: string;
  matchScore: number;
  matchReason: string;
  location?: string;
  headline?: string;
  title?: string;
  company?: any;
}

@Injectable()
export class MatchingService {
  constructor(private prisma: PrismaService) {}

  /**
   * Calcula um score de matching entre um candidato e uma vaga (0-100)
   * Baseia-se em:
   * - Correspondência de skills (40%)
   * - Localização (20%)
   * - Nível de experiência (20%)
   * - Salário esperado vs. ofertado (20%)
   */
  private calculateMatchScore(
    candidateSkills: string[],
    jobRequiredSkills: string[],
    candidateLocation: string,
    jobLocation: string,
    candidateLevel: string | null,
    jobLevel: string,
    candidateSalaryMax: number | null,
    jobSalaryMax: number | null,
    remoteType: string,
  ): { score: number; reason: string } {
    let score = 0;
    const reasons: string[] = [];

    // 1. Matching de Skills (40%)
    const skillsMatch = this.calculateSkillsMatch(candidateSkills, jobRequiredSkills);
    score += skillsMatch * 40;
    if (skillsMatch === 1) {
      reasons.push('✅ All skills match');
    } else if (skillsMatch > 0.7) {
      reasons.push('✅ Most skills match');
    } else if (skillsMatch > 0.5) {
      reasons.push('⚠️ Some skills match');
    } else {
      reasons.push('❌ Few skills match');
    }

    // 2. Localização (20%)
    const locationMatch = this.calculateLocationMatch(candidateLocation, jobLocation, remoteType);
    score += locationMatch * 20;
    if (locationMatch === 1) {
      reasons.push('✅ Location match');
    } else if (locationMatch > 0.5) {
      reasons.push('✅ Remote/Flexible');
    }

    // 3. Nível de Experiência (20%)
    const levelMatch = this.calculateLevelMatch(candidateLevel, jobLevel);
    score += levelMatch * 20;
    if (levelMatch === 1) {
      reasons.push('✅ Level match');
    } else if (levelMatch > 0.5) {
      reasons.push('✅ Close level');
    }

    // 4. Salário (20%)
    const salaryMatch = this.calculateSalaryMatch(candidateSalaryMax, jobSalaryMax);
    score += salaryMatch * 20;
    if (salaryMatch === 1) {
      reasons.push('✅ Salary OK');
    } else if (salaryMatch > 0.5) {
      reasons.push('⚠️ Salary low');
    }

    return {
      score: Math.round(score),
      reason: reasons.join(' | '),
    };
  }

  /**
   * Calcula correspondência de skills (0-1)
   */
  private calculateSkillsMatch(candidateSkills: string[], jobRequiredSkills: string[]): number {
    if (jobRequiredSkills.length === 0) return 1;
    if (candidateSkills.length === 0) return 0;

    const matchedSkills = candidateSkills.filter((skill) =>
      jobRequiredSkills.some((reqSkill) => this.skillsAreSimilar(skill, reqSkill)),
    );

    return matchedSkills.length / jobRequiredSkills.length;
  }

  /**
   * Compara skills de forma fuzzy (simples)
   */
  private skillsAreSimilar(skill1: string, skill2: string): boolean {
    const s1 = skill1.toLowerCase().trim();
    const s2 = skill2.toLowerCase().trim();

    // Exact match
    if (s1 === s2) return true;

    // Partial match
    if (s1.includes(s2) || s2.includes(s1)) return true;

    // Common aliases
    const aliases: Record<string, string[]> = {
      javascript: ['js', 'node', 'nodejs'],
      typescript: ['ts'],
      react: ['reactjs'],
      angular: ['ng'],
      'c#': ['csharp'],
      python: ['py'],
    };

    const skill1Base = Object.keys(aliases).find((key) =>
      [key, ...aliases[key]].includes(s1),
    );
    const skill2Base = Object.keys(aliases).find((key) =>
      [key, ...aliases[key]].includes(s2),
    );

    return skill1Base === skill2Base && skill1Base !== undefined;
  }

  /**
   * Calcula matching de localização (0-1)
   */
  private calculateLocationMatch(
    candidateLocation: string,
    jobLocation: string,
    remoteType: string,
  ): number {
    // Se é remoto, aceita qualquer localização
    if (remoteType === 'FULLY_REMOTE') return 1;

    // Se é híbrido, aumenta a probabilidade
    if (remoteType === 'HYBRID') return 0.75;

    // Compara localidades
    const candCity = candidateLocation.split(',')[0].toLowerCase().trim();
    const jobCity = jobLocation.split(',')[0].toLowerCase().trim();

    if (candCity === jobCity) return 1;
    if (candCity.includes(jobCity) || jobCity.includes(candCity)) return 0.8;

    return 0.2;
  }

  /**
   * Calcula matching de nível (0-1)
   */
  private calculateLevelMatch(candidateLevel: string | null, jobLevel: string): number {
    if (!candidateLevel) return 0.5;

    const levels: Record<string, number> = {
      JUNIOR: 1,
      MID: 2,
      SENIOR: 3,
    };
    const candLevel = levels[candidateLevel] || 2;
    const jobLevelValue = levels[jobLevel] || 2;

    if (candLevel >= jobLevelValue) return 1;

    const difference = jobLevelValue - candLevel;
    return Math.max(0, 1 - difference * 0.3);
  }

  /**
   * Calcula matching de salário (0-1)
   */
  private calculateSalaryMatch(candidateSalaryMax: number | null, jobSalaryMax: number | null): number {
    if (!candidateSalaryMax || !jobSalaryMax) return 0.8;

    if (jobSalaryMax >= candidateSalaryMax * 0.9) return 1;

    const ratio = jobSalaryMax / candidateSalaryMax;
    return Math.max(0, ratio);
  }

  /**
   * Obtém candidatos com matching score para uma vaga
   */
  async getCandidatesForJob(jobId: string, limit: number = 50, offset: number = 0) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: { company: true },
    });

    if (!job) throw new Error('Job not found');

    const applications = await this.prisma.application.findMany({
      where: { jobId },
      include: {
        candidate: {
          include: {
            skills: { include: { skill: true } },
          },
        },
      },
      take: limit,
      skip: offset,
    });

    const candidatesWithScore = applications.map((app) => {
      const candidateSkills = app.candidate.skills.map((cs) => cs.skill.name);
      const jobSkills = job.requirementsMust.split('\n').map((s) => s.trim());

      const matchResult = this.calculateMatchScore(
        candidateSkills,
        jobSkills,
        app.candidate.location,
        job.location,
        app.candidate.skills[0]?.level || null,
        job.level,
        app.candidate.salaryMax,
        job.salaryMax,
        job.remoteType,
      );

      return {
        id: app.candidate.id,
        name: app.candidate.name,
        headline: app.candidate.headline,
        location: app.candidate.location,
        matchScore: matchResult.score,
        matchReason: matchResult.reason,
        applicationId: app.id,
        applicationStatus: app.status,
      };
    });

    return candidatesWithScore.sort((a, b) => b.matchScore - a.matchScore);
  }

  /**
   * Obtém vagas com matching score para um candidato
   */
  async getJobsForCandidate(candidateId: string, limit: number = 50, offset: number = 0) {
    const candidate = await this.prisma.candidateProfile.findUnique({
      where: { id: candidateId },
      include: {
        skills: { include: { skill: true } },
      },
    });

    if (!candidate) throw new Error('Candidate not found');

    const jobs = await this.prisma.job.findMany({
      where: { status: 'PUBLISHED' },
      include: { company: true },
      take: limit,
      skip: offset,
    });

    const jobsWithScore = jobs.map((job) => {
      const candidateSkills = candidate.skills.map((cs) => cs.skill.name);
      const jobSkills = job.requirementsMust.split('\n').map((s) => s.trim());

      const matchResult = this.calculateMatchScore(
        candidateSkills,
        jobSkills,
        candidate.location,
        job.location,
        candidate.skills[0]?.level || null,
        job.level,
        candidate.salaryMax,
        job.salaryMax,
        job.remoteType,
      );

      return {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        level: job.level,
        salaryMax: job.salaryMax,
        matchScore: matchResult.score,
        matchReason: matchResult.reason,
      };
    });

    return jobsWithScore.sort((a, b) => b.matchScore - a.matchScore);
  }
}
