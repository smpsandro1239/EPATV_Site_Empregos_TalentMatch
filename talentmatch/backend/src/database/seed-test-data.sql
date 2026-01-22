-- Script para criar usuários de teste no TalentMatch
-- Executar após migrations do Prisma

-- Candidato de Teste
INSERT INTO "User" (id, email, password, name, role, "createdAt", "updatedAt")
VALUES (
  '123e4567-e89b-12d3-a456-426614174000',
  'candidato@test.com',
  '$argon2id$v=19$m=19456,t=2,p=1$PtR2mEKKDvDVpVzqvpVZ3w$5bKAqjg5Rq1F3Lx9Zr2K8Y5N6P9Q2X3B4C5D6E7F8',  -- password: TestPass123!
  'Candidato Teste',
  'CANDIDATE',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Empresa de Teste
INSERT INTO "User" (id, email, password, name, role, "createdAt", "updatedAt")
VALUES (
  '223e4567-e89b-12d3-a456-426614174001',
  'empresa@test.com',
  '$argon2id$v=19$m=19456,t=2,p=1$PtR2mEKKDvDVpVzqvpVZ3w$5bKAqjg5Rq1F3Lx9Zr2K8Y5N6P9Q2X3B4C5D6E7F8',  -- password: TestPass123!
  'Empresa Teste',
  'COMPANY',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Perfil de Candidato
INSERT INTO "CandidateProfile" (id, "userId", name, location, about, headline, "createdAt", "updatedAt")
VALUES (
  '323e4567-e89b-12d3-a456-426614174002',
  '123e4567-e89b-12d3-a456-426614174000',
  'João Silva',
  'Lisboa, Portugal',
  'Desenvolvedor Full Stack com 5 anos de experiência em JavaScript/TypeScript e React.',
  'Full Stack Developer | React | Node.js | PostgreSQL',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Perfil de Empresa
INSERT INTO "Company" (id, "userId", name, description, location, website, industry, size, "createdAt", "updatedAt")
VALUES (
  '423e4567-e89b-12d3-a456-426614174003',
  '223e4567-e89b-12d3-a456-426614174001',
  'TechCorp Portugal',
  'Empresa de desenvolvimento de software com foco em soluções inovadoras.',
  'Porto, Portugal',
  'https://techcorp.pt',
  'Technology',
  '11-50',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Job de Teste
INSERT INTO "Job" (id, "companyId", title, description, responsibilities, "requirementsMust", "requirementsNice", location, level, "contractType", "remoteType", "salaryMin", "salaryMax", status, "createdAt", "updatedAt")
VALUES (
  '523e4567-e89b-12d3-a456-426614174004',
  '423e4567-e89b-12d3-a456-426614174003',
  'Senior Full Stack Developer',
  'Procuramos um desenvolvedor Full Stack experiente para se juntar à nossa equipa de inovação.',
  '- Desenvolver features usando React e Node.js\n- Arquitetar soluções escaláveis\n- Colaborar com equipa de design\n- Code review e mentoring de juniors',
  '- 5+ anos de experiência com JavaScript/TypeScript\n- Experiência com React e Node.js\n- PostgreSQL ou similar\n- Git e metodologias ágeis\n- Excelente comunicação em português',
  '- Experiência com Docker\n- Conhecimento de AWS\n- Experiência com testes automatizados\n- Contribuições open-source',
  'Porto, Portugal',
  'SENIOR',
  'PERMANENT',
  'HYBRID',
  4000,
  6000,
  'ACTIVE',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Job 2 de Teste
INSERT INTO "Job" (id, "companyId", title, description, responsibilities, "requirementsMust", "requirementsNice", location, level, "contractType", "remoteType", "salaryMin", "salaryMax", status, "createdAt", "updatedAt")
VALUES (
  '623e4567-e89b-12d3-a456-426614174005',
  '423e4567-e89b-12d3-a456-426614174003',
  'Frontend Developer (React)',
  'Procuramos um Frontend Developer com experiência em React para desenvolvimento de aplicações web modernas.',
  '- Desenvolvimento de componentes React reutilizáveis\n- Implementação de designs responsivos\n- Otimização de performance\n- Testes unitários e integração',
  '- 3+ anos com React\n- JavaScript/TypeScript\n- HTML, CSS e Tailwind\n- Git version control',
  '- Next.js\n- Testing Library\n- Storybook\n- Design System experience',
  'Lisboa, Portugal',
  'MIDDLE',
  'PERMANENT',
  'REMOTE',
  2500,
  4000,
  'ACTIVE',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

COMMIT;
