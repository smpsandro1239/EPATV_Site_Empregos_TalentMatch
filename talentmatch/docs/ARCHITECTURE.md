# 🧱 Arquitetura do TalentMatch

## Visão Geral

TalentMatch é um monolito modular distribuído em frontend e backend, pronto para evolução para microserviços.

## Camadas da Arquitetura

```text
┌─────────────────────────────────────────────────┐
│            Frontend (Next.js)                    │
│   - Pages, Components, Services, Hooks           │
└──────────────┬──────────────────────────────────┘
               │
               │ HTTPS/REST
               │
┌──────────────▼──────────────────────────────────┐
│          API Gateway (NestJS)                    │
│   - Controllers, Guards, Interceptors            │
└──────────────┬──────────────────────────────────┘
               │
      ┌────────┴────────┐
      │                 │
   ┌──▼──┐        ┌────▼────┐
   │Cache│        │  Search  │
   │Redis│        │Meilisearch
   └─────┘        └──────────┘
      │
┌──────▼──────────────────────────────────────────┐
│    Service Layer (NestJS Modules)               │
│  - Auth, Users, Candidates, Companies           │
│  - Jobs, Applications, Messages                 │
│  - Matching, Embeddings, AI                     │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│      Data Layer (Prisma ORM)                    │
│      PostgreSQL + pgvector                      │
│  - Relational Data                              │
│  - Vector Embeddings                            │
└─────────────────────────────────────────────────┘
```

## Módulos Backend

### 1. **Auth Module**

- Registo, Login, Refresh Token
- Reset Password, Email Verification
- JWT + Refresh Token rotation

### 2. **Users Module**

- Gestão de utilizadores
- Atualização de credenciais
- Roles e permissões

### 3. **Candidates Module**

- Perfil do candidato
- Experiência, Educação
- Skills
- Upload de CV

### 4. **Companies Module**

- Perfil da empresa
- Gestão de membros
- Dados da organização

### 5. **Jobs Module**

- CRUD de vagas
- Estados (draft, published, paused, closed)
- Skills associadas
- Publicação

### 6. **Applications Module**

- Candidaturas
- Estados
- Histórico de alterações

### 7. **Messages Module**

- Comunicação entre empresa e candidato
- Thread por candidatura
- Notificações

### 8. **Matching Module**

- Scoring determinístico
- Ranking de candidatos
- Ranking de vagas
- Explicação do score

### 9. **Embeddings Module**

- Geração de embeddings
- Armazenamento pgvector
- Matching semântico

### 10. **AI Module**

- Melhorar descrições de vagas
- Melhorar CVs
- Gerar mensagens

## Base de Dados

### Tabelas Principais

- **User** - Utilizadores (candidato, empresa, admin)
- **CandidateProfile** - Perfil de candidato
- **Company** - Perfil de empresa
- **Job** - Vagas
- **Application** - Candidaturas
- **Skill** - Skills
- **MatchScore** - Scores de compatibilidade
- **Embedding** - Embeddings para matching semântico

### Índices para Performance

- `users.email`
- `jobs.status`, `jobs.company_id`
- `applications.job_id`, `applications.candidate_id`
- `matchscores.score` (para ranking rápido)

## Fluxos Principais

### Fluxo 1: Candidato vê vagas

```text
Frontend → GET /jobs (com filtros)
         → Backend consulta DB + Meilisearch
         → Retorna vagas paginadas
```

### Fluxo 2: Empresa cria vaga

```text
Frontend → POST /jobs
         → Backend valida, grava em DB
         → Indexa em Meilisearch
         → Enfileira geração de embeddings
         → Retorna resposta
```

### Fluxo 3: Matching automático

```text
Candidato atualiza perfil
         → Backend dispara recálculo
         → Calcula score determinístico
         → Gera embeddings
         → Calcula similaridade semântica
         → Grava em MatchScore
         → Frontend acessa /matching/candidate/:id
```

## Performance

### Estratégia de Cache

- **Redis** para:
  - Resultados de matching (24h)
  - Rate limiting
  - Sessões (futuro)
  - Filas de background

### Índices de Base de Dados

- Email (acesso rápido em login)
- Status de vaga (filtro popular)
- Company_id (listagens por empresa)
- Score (ranking)

### Paginação

- Todas as listagens com limit/offset
- Padrão: 20 itens por página

## Segurança

- **JWT** com expiração curta (15 min)
- **Refresh Token** rotativo (7 dias)
- **Hash Argon2** para passwords
- **Rate limiting** em endpoints sensíveis
- **Validação** de input em todas as rotas
- **CORS** configurado
- **Helmet** para headers de segurança

## Observabilidade

- Logs estruturados (Pino)
- Métricas (Prometheus)
- Dashboards (Grafana)
- Error tracking (Sentry)

## Escalabilidade Futura

### Horizontal Scaling

- Separação de serviços por domínio
- Load balancer (Nginx)
- Instâncias de backend horizontalmente escaláveis

### Vertical Scaling

- Database sharding
- Cache distribuído (Redis Cluster)
- Search distribuído (Meilisearch)

### Microserviços (Fase 2)

- Auth Service (isolado)
- Jobs Service
- Matching Service
- Notifications Service
- Each with own DB.
