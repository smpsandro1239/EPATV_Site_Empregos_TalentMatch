# TalentMatch - Recruitment Platform

Uma plataforma de recrutamento moderna com matching inteligente entre candidatos e vagas.

## 🚀 Começar

### Pré-requisitos

- Node.js 18+
- PostgreSQL 16
- Redis 7
- Docker & Docker Compose

### Setup Rápido

#### 1. Instalar dependências

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

#### 2. Iniciar serviços com Docker

```bash
cd ..
docker-compose up -d
```

Verificar status:

```bash
docker-compose ps
```

#### 3. Setup do banco de dados

```bash
cd backend

# Criar migração
npm run prisma:migrate

# Gerar Prisma Client
npm run prisma:generate
```

#### 4. Iniciar o backend

```bash
npm run start:dev
```

Backend estará em: `http://localhost:3000`
Docs Swagger: `http://localhost:3000/docs`

#### 5. Iniciar o frontend

```bash
cd ../frontend
npm run dev
```

Frontend estará em: `http://localhost:3001`

## 📁 Estrutura do Projeto

```text
/talentmatch
├── backend/                # NestJS Backend
│   ├── src/
│   │   ├── config/        # Global configuration
│   │   ├── common/        # Shared utilities (guards, pipes, etc)
│   │   ├── modules/       # Feature modules
│   │   ├── database/      # Prisma
│   │   └── infra/         # External services (mail, storage)
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/              # Next.js Frontend
│   ├── src/
│   │   ├── app/          # Pages & routes
│   │   ├── components/   # UI components
│   │   ├── services/     # API services
│   │   ├── hooks/        # React hooks
│   │   └── types/        # TypeScript types
│   ├── package.json
│   └── tsconfig.json
│
└── docker-compose.yml     # Services (PostgreSQL, Redis, Meilisearch)
```

## 🔑 Configuração de Ambiente

### Backend (.env)

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/talentmatch"
JWT_SECRET="your-secret-key"
REDIS_HOST="localhost"
OPENAI_API_KEY="sk-..."
```

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## 📚 Documentação

- [Backend API Docs](/backend/docs/API.md)
- [Database Schema](/backend/prisma/schema.prisma)
- [Architecture](/docs/ARCHITECTURE.md)
- [Deployment Guide](/docs/DEPLOYMENT.md)

## 🛠️ Stack Técnico

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, React Hook Form
- **Backend**: NestJS, TypeScript, Prisma, PostgreSQL
- **Search**: Meilisearch
- **Cache**: Redis
- **Auth**: JWT + Refresh Tokens
- **IA**: OpenAI Embeddings
- **Infra**: Docker, Docker Compose

## 📊 Fases do Desenvolvimento

### ✅ Fase 1: Fundações (Auth + Perfis)

- Autenticação
- Perfis de candidato e empresa
- Roles e permissões

### 🔄 Fase 2: Vagas + Candidaturas

- CRUD de vagas
- Sistema de candidaturas
- Listagens e filtros

### 🔮 Fase 3: Matching Inteligente

- Algoritmo de scoring
- Embeddings semânticos
- Recomendações

### 📈 Fase 4: Notificações + Analytics

- Sistema de notificações
- Dashboards
- Painel admin

### 🚀 Fase 5: Premium + Monetização

- Features premium
- Sistema de pagamento
- Multi-tenant

## 📊 Status do Projeto

**Desenvolvedor:** Sandro Pereira
- **LinkedIn:** [https://linkedin.com/in/sandro-pereira-a5ab0236](https://linkedin.com/in/sandro-pereira-a5ab0236)
- **Email:** smpsandro1239@gmail.com

O projeto TalentMatch está em desenvolvimento ativo, com foco na criação de uma plataforma de recrutamento inteligente.

## 🤝 Contribuindo

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📝 Licença

Proprietary - Todos os direitos reservados

## 📧 Suporte

Para suporte, entre em contato com: <support@talentmatch.com>
