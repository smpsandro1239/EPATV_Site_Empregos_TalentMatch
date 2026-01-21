# 📋 Tarefas de Desenvolvimento - TalentMatch

## 🎯 Status Geral

- **Estrutura**: ✅ Completa
- **Configuração**: ✅ Pronta
- **Documentação**: ✅ Criada
- **Código Base**: ✅ Scaffold pronto
- **Próxima Fase**: 🔄 Implementação da Fase 1

---

## 📌 Fase 1: Fundações (Auth + Perfis)

### Sprint 1: Autenticação

#### Backend
- [ ] Implementar `AuthService.register()`
  - Validar email único
  - Hash password com Argon2
  - Gerar JWT + Refresh Token
  - Enviar email de verificação

- [ ] Implementar `AuthService.login()`
  - Validar credenciais
  - Gerar tokens
  - Registar last_login

- [ ] Implementar `AuthService.refreshToken()`
  - Validar refresh token
  - Rotação de token
  - Expiração

- [ ] Implementar `AuthService.resetPassword()`
  - Gerar reset token
  - Enviar email
  - Validar e atualizar password

- [ ] Criar `JwtStrategy` (Passport)

- [ ] Criar `JwtAuthGuard` para rotas protegidas

- [ ] Criar `RolesGuard` para RBAC

- [ ] Testes unitários AuthService

- [ ] Testes E2E endpoints Auth

#### Frontend
- [ ] Criar página `/auth/login`
  - Form com email/password
  - Validação com Zod
  - Chamada API
  - Redirecionamento após login

- [ ] Criar página `/auth/register`
  - Form completo
  - Seleção de role (candidate/company)
  - Validações
  - Integração com backend

- [ ] Criar `AuthContext` (Zustand)
  - Estado autenticado
  - Tokens armazenados
  - Logout

- [ ] Criar middleware de proteção de rotas
  - Redirecionar não autenticados
  - Redirecionar por role

**ETA:** 2 semanas

### Sprint 2: Perfis de Candidato

#### Backend
- [ ] Implementar `CandidatesService.createProfile()`
  - Validar dados
  - Gerar ID único

- [ ] Implementar `CandidatesService.updateProfile()`
  - Editar dados
  - Upload de CV

- [ ] Implementar `CandidatesService.addExperience()`
  - CRUD de experiências

- [ ] Implementar `CandidatesService.addEducation()`
  - CRUD de educação

- [ ] Implementar `CandidatesService.addSkill()`
  - Associar skill a candidato
  - Nivel de senioridade

- [ ] DTOs com validações Zod

- [ ] Testes unitários

#### Frontend
- [ ] Página `/candidate/profile`
  - Formulário de perfil
  - Campos: nome, headline, localização, about, CV

- [ ] Página `/candidate/experience`
  - Listar experiências
  - Adicionar/editar experiência
  - Remover

- [ ] Página `/candidate/education`
  - Listar educação
  - Adicionar/editar
  - Remover

- [ ] Página `/candidate/skills`
  - Adicionar skills
  - Nível (Junior/Mid/Senior)
  - Remover

- [ ] Upload de CV
  - Componente de upload
  - Validação de ficheiro
  - Armazenamento

**ETA:** 2 semanas

### Sprint 3: Perfis de Empresa

#### Backend
- [ ] Implementar `CompaniesService.createProfile()`
  - Validar dados
  - Logo upload

- [ ] Implementar `CompaniesService.updateProfile()`

- [ ] DTOs

- [ ] Testes

#### Frontend
- [ ] Página `/company/profile`
  - Formulário empresa
  - Upload logo
  - Edição

**ETA:** 1 semana

### Sprint 4: Testes & Polimento

- [ ] Testes E2E completo (Auth + Perfis)
- [ ] Verificação de segurança
- [ ] Performance checks
- [ ] Deploy em staging

**ETA:** 1 semana

---

## 📌 Fase 2: Vagas + Candidaturas

### Sprint 1: Gestão de Vagas

#### Backend
- [ ] `JobsService.createJob()`
- [ ] `JobsService.updateJob()`
- [ ] `JobsService.publishJob()`
- [ ] `JobsService.pauseJob()`
- [ ] `JobsService.closeJob()`
- [ ] Filtros avançados
- [ ] Integração Meilisearch

#### Frontend
- [ ] Página "Criar Vaga"
- [ ] Página "Editar Vaga"
- [ ] Página "Minhas Vagas"
- [ ] Estados visuais

**ETA:** 2 semanas

### Sprint 2: Candidaturas

#### Backend
- [ ] `ApplicationsService.apply()`
- [ ] `ApplicationsService.updateStatus()`
- [ ] Validações (não duplicar)
- [ ] Histórico

#### Frontend
- [ ] Página "Candidatar-se"
- [ ] Página "Minhas Candidaturas"
- [ ] Página "Candidatos da Vaga"

**ETA:** 2 semanas

### Sprint 3: Mensagens

#### Backend
- [ ] `MessagesService.sendMessage()`
- [ ] Thread por candidatura
- [ ] Notificações

#### Frontend
- [ ] Chat dentro da candidatura

**ETA:** 1 semana

---

## 📌 Fase 3: Matching Inteligente

### Sprint 1: Scoring Determinístico

- [ ] Implementar algoritmo
- [ ] Calcular scores
- [ ] Ranking candidatos
- [ ] Ranking vagas

**ETA:** 1 semana

### Sprint 2: Embeddings & IA

- [ ] Integração OpenAI
- [ ] Geração embeddings
- [ ] Armazenamento pgvector
- [ ] Matching semântico

**ETA:** 2 semanas

### Sprint 3: IA Assistiva

- [ ] Melhorar descrição vaga
- [ ] Melhorar CV
- [ ] Gerar mensagem candidatura

**ETA:** 1 semana

---

## 📌 Fase 4: Notificações + Analytics

### Sprint 1: Notificações

- [ ] Sistema notificações internas
- [ ] Email automático
- [ ] Filas Redis (BullMQ)
- [ ] Templates

**ETA:** 2 semanas

### Sprint 2: Analytics

- [ ] Dashboard empresa
- [ ] Dashboard candidato
- [ ] Dashboard admin
- [ ] Métricas globais

**ETA:** 2 semanas

---

## 🔧 Tarefas Transversais

- [ ] CI/CD GitHub Actions
- [ ] Testing framework (Jest)
- [ ] Code quality (ESLint, Prettier)
- [ ] Documentation
- [ ] Security audit
- [ ] Performance optimization
- [ ] Logging & monitoring
- [ ] Error tracking (Sentry)

---

## 📊 Métricas de Sucesso

- [ ] 100% cobertura testes críticos
- [ ] Performance < 200ms (p95)
- [ ] Zero segurança crítica
- [ ] 95% uptime
- [ ] NPS > 40

---

## 🎯 Dependências

```
Auth → Users → Candidates/Companies
     ↓
   Jobs → Applications
     ↓
  Messages → Matching → Embeddings → AI
     ↓
Notifications ← Analytics ← Admin
```

---

**Atualizado:** 20 de Janeiro de 2025
**Próxima Review:** 27 de Janeiro de 2025
