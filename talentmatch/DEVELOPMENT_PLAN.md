# 📈 PLANO DE DESENVOLVIMENTO - JANEIRO 22, 2026

## 🎯 Prioridades de Desenvolvimento

### FASE ATUAL: Implementação dos Módulos Core

#### Status Resumido

- ✅ Autenticação Backend: COMPLETO
- ✅ Autenticação Frontend: COMPLETO
- ✅ Estrutura Database (Prisma): COMPLETO
- ⚠️ Serviços Backend (Candidates, Companies, Jobs): ESQUELETO (DTOs + métodos básicos criados)
- ❌ Controllers Backend: PARCIAL (faltam endpoints)
- ❌ Frontend Pages: PLACEHOLDER (faltam implementações)

---

## 📋 TAREFAS CRÍTICAS POR ORDEM DE PRIORIDADE

### BLOCO 1: Backend - Endpoints Faltantes (HOJE)

#### 1.1 Candidates Module

- [ ] Criar `candidates.controller.ts` com endpoints:
  - `POST /candidates` - createProfile
  - `GET /candidates/:id` - getProfile
  - `PUT /candidates/:id` - updateProfile
  - `POST /candidates/:id/experience` - addExperience
  - `DELETE /candidates/:id/experience/:expId` - deleteExperience
  - `POST /candidates/:id/education` - addEducation
  - `DELETE /candidates/:id/education/:eduId` - deleteEducation
  - `POST /candidates/:id/skills` - addSkill
  - `DELETE /candidates/:id/skills/:skillId` - removeSkill

#### 1.2 Companies Module

- [ ] Criar `companies.controller.ts` com endpoints:
  - `POST /companies` - createProfile
  - `GET /companies/:id` - getProfile
  - `PUT /companies/:id` - updateProfile
  - `POST /companies/:id/jobs` - createJob
  - `GET /companies/:id/jobs` - getCompanyJobs
  - `GET /jobs/:id` - getJobDetail
  - `PUT /jobs/:id` - updateJob
  - `DELETE /jobs/:id` - deleteJob

#### 1.3 Applications Module

- [ ] Criar `applications.service.ts` (métodos: create, findAll, updateStatus)
- [ ] Criar `applications.controller.ts` com endpoints:
  - `POST /applications` - apply
  - `GET /applications/:candidateId` - getCandidateApplications
  - `PUT /applications/:id/status` - updateStatus

#### 1.4 Jobs Module

- [ ] Criar `jobs.service.ts` (métodos: searchJobs, filterBySkills, getAll)
- [ ] Criar `jobs.controller.ts` com endpoints:
  - `GET /jobs` - list with filters
  - `GET /jobs/:id` - detail

### BLOCO 2: Frontend - Páginas Críticas (DEPOIS)

#### 2.1 Candidate Pages

- [ ] `/candidate/profile` - Profile form (implementado, precisa API)
- [ ] `/candidate/dashboard` - Dashboard (esqueleto, precisa conteúdo)
- [ ] `/candidate/applications` - Minhas candidaturas

#### 2.2 Company Pages

- [ ] `/company/profile` - Company profile (implementado, precisa API)
- [ ] `/company/dashboard` - Dashboard empresa
- [ ] `/company/jobs/new` - Create job
- [ ] `/company/jobs` - My jobs

#### 2.3 Public Pages

- [ ] `/jobs` - Job listings com search/filter
- [ ] `/jobs/[id]` - Job detail

#### 2.4 Componentes Compartilhados

- [ ] `JobCard` - Card para exibir job
- [ ] `JobList` - Lista de jobs com paginação
- [ ] `Header/Navigation` - Menu principal
- [ ] Formulários (JobForm, CandidateForm, CompanyForm)

### BLOCO 3: Integrações (FINAL)

- [ ] API calls from frontend to new endpoints
- [ ] Error handling e loading states
- [ ] Validações frontend/backend
- [ ] Testes unitários core
- [ ] Testing E2E das funcionalidades principais

---

## 🚀 PRÓXIMOS PASSOS IMEDIATOS

1. **Implementar Candidates Controller** (2-3 horas)
2. **Implementar Companies Controller** (2-3 horas)
3. **Implementar Applications Module** (2-3 horas)
4. **Implementar Jobs Controller** (1-2 horas)
5. **Testar endpoints com Postman/Thunder Client** (1 hora)

---

## 📊 Estimativa de Esforço

| Tarefa              | Estimado        | Status           |
| ------------------- | --------------- | ---------------- |
| Backend Controllers | 8-10 horas      | ❌ Não iniciado  |
| Frontend Páginas    | 6-8 horas       | ❌ Não iniciado  |
| Integração API      | 4-6 horas       | ❌ Não iniciado  |
| Testes              | 2-4 horas       | ❌ Não iniciado  |
| **TOTAL**           | **20-28 horas** | **EM PROGRESSO** |

---

## 🔄 Próxima Atualização

Será feita após completar BLOCO 1 (Backend Controllers)

---

_Plano criado em: 22 de Janeiro de 2026_
