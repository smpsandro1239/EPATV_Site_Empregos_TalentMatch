# Changelog - TalentMatch

Todas as mudanças significativas neste projecto estão documentadas neste ficheiro.

## [1.0.0] - 2026-01-21

### ✨ Adicionado

#### Backend
- Módulo de Autenticação JWT com Passport
  - Registro de utilizadores com validação de email e senha
  - Login com geração de tokens de acesso e refresh
  - Renovação de tokens com refresh token
  - Validação de utilizador autenticado
  - Guardas (JwtAuthGuard, RolesGuard)

- Módulo de Base de Dados
  - Integração Prisma com PostgreSQL
  - Schema com 9 entidades (User, Candidate, Company, Job, Application, Message, Skill, Experience, Education)
  - Migrações automáticas

- 11 Módulos Principais
  - Users (utilizadores)
  - Candidates (perfil de candidatos)
  - Companies (perfil de empresas)
  - Jobs (ofertas de trabalho)
  - Applications (candidaturas)
  - Messages (mensagens)
  - Matching (compatibilidade)
  - Embeddings (vetores de IA)
  - AI (inteligência artificial)
  - Skills (competências)

#### Frontend
- Páginas de Autenticação
  - Página de login (/auth/login)
  - Página de registo com seleção de role (/auth/register)
  - Validação de formulários em tempo real

- Dashboards
  - Dashboard de Candidato (/candidate/dashboard)
  - Dashboard de Empresa (/company/dashboard)
  - Redireccionamento automático por role

- Autenticação
  - AuthProvider com Context API
  - useAuth hook personalizado
  - Gestão de tokens em localStorage
  - Proteção de rotas

- Componentes
  - Header com navegação condicional
  - Logout button
  - Loading spinners
  - Form validators

- Serviços
  - API client abstrato
  - Métodos para autenticação
  - Error handling

- Estilos
  - Tailwind CSS configurado
  - Tema responsivo
  - Dark mode ready

### 🔧 Configuração
- Docker Compose para development
- Variáveis de ambiente configuradas
- TypeScript strict mode
- ESLint e Prettier ready

### 📚 Documentação
- README.md com instruções de setup
- QUICKSTART.md
- API.md com endpoints
- API_ENDPOINTS.md com exemplos curl
- ARCHITECTURE.md
- DEVELOPMENT_GUIDE.md
- TESTING_GUIDE.md
- DEPLOYMENT.md
- ROADMAP.md

---

## [0.1.0] - 2026-01-20

### ✨ Adicionado

#### Inicial Setup
- Repositório criado
- Estrutura de projeto definida
- NestJS backend scaffolded
- Next.js 13 frontend scaffolded
- Prisma ORM configurado
- Base de dados PostgreSQL preparada
- Git initialized com .gitignore

---

## Convenções de Versionamento

Este projeto segue [Semantic Versioning](https://semver.org/lang/pt_BR/):

- MAJOR version quando mudanças incompatíveis de API
- MINOR version quando nova funcionalidade compatível
- PATCH version quando correção de bug

---

## Próximas Versões Planeadas

### [1.1.0] - Candidate Profile (Fase 1B)
- [ ] CRUD completo de perfil de candidato
- [ ] Adicionar experiências de trabalho
- [ ] Adicionar educação
- [ ] Adicionar competências
- [ ] Upload de CV em PDF

### [1.2.0] - Company Profile (Fase 1C)
- [ ] CRUD completo de perfil de empresa
- [ ] Publicação de ofertas de trabalho
- [ ] Gestão de vagas
- [ ] Analytics básico

### [2.0.0] - Job Matching (Fase 2)
- [ ] Algoritmo de matching
- [ ] Recomendações de trabalho
- [ ] Recomendações de candidatos
- [ ] Scoring de compatibilidade

### [2.5.0] - AI Integration (Fase 3)
- [ ] Análise de CV com IA
- [ ] Matching inteligente
- [ ] Sugestões automáticas
- [ ] Chatbot de suporte

### [3.0.0] - Messaging & Real-time (Fase 4)
- [ ] Sistema de mensagens
- [ ] Notificações em tempo real
- [ ] WebSockets
- [ ] Email notifications

### [4.0.0] - Admin & Advanced (Fase 5)
- [ ] Admin dashboard
- [ ] User management
- [ ] Reports e analytics avançado
- [ ] Payment integration
- [ ] 2FA

---

## Histórico de Deploy

| Versão | Data | Ambiente | Status |
|--------|------|----------|--------|
| 1.0.0 | 21-01-2026 | Local | ✅ Completo |

---

## Contribuintes

- Sandro Mendes - Desenvolvedor Principal

---

## Licença

MIT License - veja LICENSE.md para detalhes

---

Última atualização: 21 de Janeiro de 2026
