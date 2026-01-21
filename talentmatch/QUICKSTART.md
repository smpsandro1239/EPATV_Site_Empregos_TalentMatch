# 🚀 Quick Start Guide - TalentMatch

## ⚡ Setup em 5 minutos

### Passo 1: Entrar no projeto
```bash
cd talentmatch
```

### Passo 2: Iniciar serviços (Docker)
```bash
# Inicia PostgreSQL, Redis e Meilisearch
docker-compose up -d

# Verificar status
docker-compose ps
```

### Passo 3: Setup do Backend
```bash
cd backend

# Instalar dependências
npm install

# Gerar Prisma Client
npm run prisma:generate

# Criar/migrar base de dados
npm run prisma:migrate

# Iniciar em modo desenvolvimento
npm run start:dev
```

✅ Backend rodando em: `http://localhost:3000`
📚 Swagger docs: `http://localhost:3000/docs`

### Passo 4: Setup do Frontend (em outro terminal)
```bash
cd frontend

# Instalar dependências
npm install

# Iniciar em modo desenvolvimento
npm run dev
```

✅ Frontend rodando em: `http://localhost:3001`

## 🧪 Testar

### Health Check Backend
```bash
curl http://localhost:3000/health
```

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "2025-01-20T10:00:00Z"
}
```

### Verificar Base de Dados
```bash
cd backend
npm run prisma:studio
```

Abre interface visual em: `http://localhost:5555`

## 📋 Variáveis de Ambiente

### Backend (.env)
Criar arquivo `backend/.env`:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/talentmatch"
JWT_SECRET="dev-secret-key-change-in-prod"
REDIS_HOST="localhost"
REDIS_PORT=6379
MEILI_HOST="http://localhost:7700"
MEILI_MASTER_KEY="masterKey"
OPENAI_API_KEY="sk-test-key"
NODE_ENV="development"
PORT=3000
```

### Frontend (.env.local)
Já criado automaticamente em `frontend/.env.local`

## 🐛 Troubleshooting

### Porta 5432 já em uso (PostgreSQL)
```bash
# Mudar porta no docker-compose.yml
# Ou parar container que usa a porta
docker stop <container-id>
```

### Erro de migração Prisma
```bash
cd backend
npm run prisma:migrate -- --name init --create-only
```

### Frontend não consegue conectar ao backend
Verificar se `NEXT_PUBLIC_API_URL` em `.env.local` está correto:
```
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## 📁 Estrutura Criada

```
talentmatch/
├── backend/                    # NestJS + Prisma
│   ├── src/
│   │   ├── modules/           # Auth, Users, Candidates, Companies, Jobs, etc.
│   │   ├── database/prisma/   # ORM
│   │   ├── common/            # Guards, Pipes, Decorators
│   │   ├── infra/             # Mail, Storage
│   │   └── main.ts            # Entry point
│   ├── prisma/schema.prisma   # Database schema (todas as tabelas)
│   ├── package.json
│   └── .env
│
├── frontend/                   # Next.js 15
│   ├── src/
│   │   ├── app/               # Pages (auth, candidate, company, jobs, admin)
│   │   ├── components/        # UI Components
│   │   ├── services/          # API clients
│   │   ├── hooks/             # React Hooks
│   │   └── types/             # TypeScript types
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.local
│
├── docs/                       # Documentação
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── ROADMAP.md
│
├── docker-compose.yml          # PostgreSQL, Redis, Meilisearch
└── README.md
```

## 🎯 Próximos Passos

1. **Implementar Auth (Fase 1)**
   - Register endpoint
   - Login endpoint
   - JWT generation

2. **Perfis de Candidato e Empresa**
   - CRUD endpoints
   - Validações

3. **Vagas (Fase 2)**
   - CRUD de vagas
   - Publicação

4. **Matching Inteligente (Fase 3)**
   - Algoritmo de scoring
   - Embeddings

## 📚 Referências

- [NestJS Docs](https://docs.nestjs.com)
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com)

## 💡 Tips

- Use `docker-compose logs -f postgres` para ver logs do PostgreSQL
- Use `npm run prisma:studio` para explorar data visualmente
- Use `npm run lint` para verificar código
- Use `npm run type-check` para verificar tipos TypeScript

---

**Criado em:** 20 de Janeiro de 2025
**Status:** Pronto para desenvolvimento 🚀
