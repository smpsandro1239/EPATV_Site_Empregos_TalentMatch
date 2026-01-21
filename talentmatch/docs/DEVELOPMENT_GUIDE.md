# Guia de Desenvolvimento - TalentMatch

## Ambiente Local

### Requisitos
- Node.js 16+ 
- npm 8+
- PostgreSQL 12+
- Git

### Setup Inicial

```bash
# Clonar repositório
git clone https://github.com/smpsandro1239/EPATV_Site_Empregos_TalentMatch.git
cd EPATV_Site_Empregos_TalentMatch/talentmatch

# Instalar dependências do backend
cd backend
npm install

# Instalar dependências do frontend
cd ../frontend
npm install

# Configurar variáveis de ambiente
# Backend
cp .env.example .env
# Frontend
cp .env.local.example .env.local
```

### Executar em Desenvolvimento

**Terminal 1 - Backend:**
```bash
cd talentmatch/backend
npm run start:dev
# Acede em http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd talentmatch/frontend
npm run dev
# Acede em http://localhost:3000
```

### Variáveis de Ambiente

**Backend (.env):**
```env
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/talentmatch
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
CORS_ORIGIN=http://localhost:3000
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=TalentMatch
```

## Estrutura do Projeto

```
talentmatch/
├── backend/              # NestJS API
│   ├── src/
│   │   ├── modules/      # Módulos funcionais
│   │   ├── common/       # Decoradores, exceções, guardas
│   │   ├── database/     # Prisma ORM
│   │   └── main.ts       # Entry point
│   ├── prisma/           # Migrações e schema
│   └── package.json
│
├── frontend/             # Next.js 13 App Router
│   ├── src/
│   │   ├── app/          # Pages e layouts
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── services/     # API client
│   │   ├── providers/    # Context providers
│   │   ├── hooks/        # Custom hooks
│   │   ├── utils/        # Utilitários
│   │   ├── lib/          # Configurações
│   │   └── types/        # Tipos TypeScript
│   └── package.json
│
└── docs/                 # Documentação
```

## Convenções de Código

### Naming
- PascalCase: Classes, Componentes, Types/Interfaces
- camelCase: Variáveis, funções, propriedades
- UPPER_SNAKE_CASE: Constantes

### Commits
Formato: `<tipo>: <descrição em português>`

Tipos:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `refactor`: Refatoração sem mudança de comportamento
- `docs`: Documentação
- `test`: Testes
- `style`: Formatação
- `chore`: Tarefas de manutenção

Exemplo:
```
feat: adicionar autenticação JWT ao backend
refactor: melhorar validação de formulários
fix: corrigir erro de token expirado
```

### TypeScript
- Sempre use tipos explícitos
- Evite `any`
- Use interfaces para objetos públicos
- Use types para aliases

### React/Next.js
- Use functional components
- Use hooks ao invés de HOC
- Separe lógica em custom hooks
- Nomes de componentes em PascalCase

## Desenvolvimento de Funcionalidades

### 1. Criar Novo Módulo Backend

```bash
# Generate novo módulo NestJS
cd backend
npx @nestjs/schematics@latest resource usuarios
```

### 2. Criar Migração Prisma

```bash
cd backend
npx prisma migrate dev --name add_new_field
```

### 3. Criar Nova Página Frontend

```bash
# Criar em src/app/nova-secao/page.tsx
```

### 4. Testing

```bash
# Backend
npm run test
npm run test:watch

# Frontend
npm run test
npm run test:e2e
```

## Debugging

### Backend
```bash
# Com debugger do Node
node --inspect-brk dist/main.js

# Com VS Code: Adicionar em .vscode/launch.json
```

### Frontend
- F12 para abrir DevTools
- React DevTools extension
- Redux DevTools (se usar Redux no futuro)

## Performance

### Frontend
- Code splitting automático (Next.js)
- Image optimization (next/image)
- Bundle analysis: `npm run analyze`

### Backend
- Caching com Redis (preparado)
- Database indexing (verificar schema.prisma)
- Query optimization

## Segurança

### Implemented
- ✅ JWT authentication
- ✅ Password hashing (Argon2)
- ✅ CORS
- ✅ SQL injection prevention (Prisma ORM)
- ✅ XSS prevention (sanitization)

### To Implement
- [ ] Rate limiting
- [ ] HTTPS/TLS
- [ ] 2FA
- [ ] Email verification
- [ ] Password reset flow

## CI/CD

- GitHub Actions (preparado)
- Docker deployment (docker-compose.yml)
- Automated testing

## Recursos Úteis

- [NestJS Docs](https://docs.nestjs.com)
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

## Suporte

Para dúvidas ou problemas, abra uma issue no repositório GitHub.

---

Última atualização: 21 de Janeiro de 2026
