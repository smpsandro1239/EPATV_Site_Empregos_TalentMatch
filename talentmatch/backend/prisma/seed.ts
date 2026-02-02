import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed com dados de teste...\n');

  // Hash para senha: TestPass123!
  const hashedPassword = await argon2.hash('TestPass123!');

  // 1. Criar Candidato de Teste
  const candidato = await prisma.user.upsert({
    where: { email: 'candidato@test.com' },
    update: {},
    create: {
      email: 'candidato@test.com',
      passwordHash: hashedPassword,
      role: 'CANDIDATE',
    },
  });

  console.log('✅ Candidato criado:', candidato.email);

  // 2. Criar Empresa de Teste
  const empresa = await prisma.user.upsert({
    where: { email: 'empresa@test.com' },
    update: {},
    create: {
      email: 'empresa@test.com',
      passwordHash: hashedPassword,
      role: 'COMPANY',
    },
  });

  console.log('✅ Empresa criada:', empresa.email);

  // 3. Criar Perfil de Candidato
  const candidatoProfile = await prisma.candidateProfile.upsert({
    where: { userId: candidato.id },
    update: {},
    create: {
      userId: candidato.id,
      name: 'João Silva',
      location: 'Lisboa, Portugal',
      about:
        'Desenvolvedor Full Stack com 5 anos de experiência em JavaScript/TypeScript e React.',
      headline: 'Full Stack Developer | React | Node.js | PostgreSQL',
    },
  });

  console.log('✅ Perfil de candidato criado');

  // 4. Criar Perfil de Empresa
  const companyProfile = await prisma.company.upsert({
    where: { userId: empresa.id },
    update: {},
    create: {
      userId: empresa.id,
      name: 'TechCorp Portugal',
      description:
        'Empresa de desenvolvimento de software com foco em soluções inovadoras.',
      location: 'Porto, Portugal',
      website: 'https://techcorp.pt',
      industry: 'Technology',
      size: '11-50',
    },
  });

  console.log('✅ Perfil de empresa criado');

  // 5. Criar Jobs de Teste
  const job1 = await prisma.job.upsert({
    where: { id: '523e4567-e89b-12d3-a456-426614174004' },
    update: {},
    create: {
      id: '523e4567-e89b-12d3-a456-426614174004',
      companyId: companyProfile.id,
      title: 'Senior Full Stack Developer',
      description:
        'Procuramos um desenvolvedor Full Stack experiente para se juntar à nossa equipa de inovação.',
      responsibilities:
        '- Desenvolver features usando React e Node.js\n- Arquitetar soluções escaláveis\n- Colaborar com equipa de design\n- Code review e mentoring de juniors',
      requirementsMust:
        '- 5+ anos de experiência com JavaScript/TypeScript\n- Experiência com React e Node.js\n- PostgreSQL ou similar\n- Git e metodologias ágeis',
      requirementsNice:
        '- Experiência com Docker\n- Conhecimento de AWS\n- Experiência com testes automatizados',
      location: 'Porto, Portugal',
      level: 'SENIOR',
      contractType: 'FULL_TIME',
      remoteType: 'HYBRID',
      salaryMin: 4000,
      salaryMax: 6000,
      status: 'PUBLISHED',
    },
  });

  console.log('✅ Job 1 criado:', job1.title);

  const job2 = await prisma.job.upsert({
    where: { id: '623e4567-e89b-12d3-a456-426614174005' },
    update: {},
    create: {
      id: '623e4567-e89b-12d3-a456-426614174005',
      companyId: companyProfile.id,
      title: 'Frontend Developer (React)',
      description:
        'Procuramos um Frontend Developer com experiência em React para desenvolvimento de aplicações web modernas.',
      responsibilities:
        '- Desenvolvimento de componentes React reutilizáveis\n- Implementação de designs responsivos\n- Otimização de performance',
      requirementsMust:
        '- 3+ anos com React\n- JavaScript/TypeScript\n- HTML, CSS e Tailwind',
      requirementsNice:
        '- Next.js\n- Testing Library\n- Storybook\n- Design System experience',
      location: 'Lisboa, Portugal',
      level: 'MID',
      contractType: 'FULL_TIME',
      remoteType: 'FULLY_REMOTE',
      salaryMin: 2500,
      salaryMax: 4000,
      status: 'PUBLISHED',
    },
  });

  // 6. Criar Skills de Teste
  const skills = [
    { name: 'JavaScript', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'React', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Git', category: 'Version Control' },
  ];

  for (const skillData of skills) {
    await prisma.skill.upsert({
      where: { name: skillData.name },
      update: {},
      create: skillData,
    });
  }

  console.log('✅ Skills criadas:', skills.length);

  console.log('\n✅ Seed completado com sucesso!\n');
  console.log('📋 Credenciais de Teste:');
  console.log('─────────────────────────────────────────');
  console.log('CANDIDATO:');
  console.log('  Email:    candidato@test.com');
  console.log('  Password: TestPass123!');
  console.log('─────────────────────────────────────────');
  console.log('EMPRESA:');
  console.log('  Email:    empresa@test.com');
  console.log('  Password: TestPass123!');
  console.log('─────────────────────────────────────────\n');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Erro durante seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
