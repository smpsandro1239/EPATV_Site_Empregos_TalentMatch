# Troubleshooting - TalentMatch

## Problemas Comuns e Soluções

### Erro: Port já está em uso

**Problema:**

```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solução:**

```bash
# Encontrar processo usando a porta
netstat -ano | findstr :3001  # Windows
lsof -i :3001                 # macOS/Linux

# Matar o processo
taskkill /PID <PID> /F        # Windows
kill -9 <PID>                 # macOS/Linux

# Ou usar portas diferentes
PORT=3002 npm run start:dev
```

### Erro: Database connection failed

**Problema:**

```
P1000: Can't reach database server at `localhost:5432`
```

**Solução:**

1. Verificar se PostgreSQL está running
2. Verificar DATABASE_URL em .env
3. Verificar credenciais de database
4. Reiniciar PostgreSQL service

```bash
# PostgreSQL deve estar em localhost:5432
# Por padrão via Laragon
```

### Erro: JWT token inválido

**Problema:**

```
UnauthorizedException: Unauthorized
```

**Solução:**

1. Verificar se token não expirou
2. Limpar localStorage e fazer login novamente
3. Verificar JWT_SECRET no backend
4. Verificar header Authorization

```bash
# Limpar tokens
localStorage.clear()
# Fazer login novamente
```

### Erro: CORS policy

**Problema:**

```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solução:**

1. Verificar CORS_ORIGIN no .env backend
2. Verificar se frontend está na URL permitida
3. Confirmar que backend tem enableCors()

```env
# Backend .env
CORS_ORIGIN=http://localhost:3000
```

### Frontend não carrega

**Problema:**

```
Cannot GET /
```

**Solução:**

```bash
# Verificar se frontend está running
npm run dev

# Limpar cache
rm -rf .next
npm run build

# Tentar em http://localhost:3000
```

### Backend não responde

**Problema:**

```
Failed to fetch API
```

**Solução:**

```bash
# Verificar se backend está running
npm run start:dev

# Testar endpoint
curl http://localhost:3001/

# Verificar logs no terminal
```

### Erro: Node modules não encontrado

**Problema:**

```
Cannot find module 'nestjs/common'
```

**Solução:**

```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install

# Limpar cache npm
npm cache clean --force
npm install
```

### Erro: TypeScript compilation

**Problema:**

```
error TS2403: Property 'X' has no initializer
```

**Solução:**

1. Adicionar inicializador
2. Usar non-null assertion (!)
3. Ativar strictPropertyInitialization = false (não recomendado)

```typescript
// Antes
name: string;

// Depois
name: string = '';
// ou
name!: string;
```

### Erro: Prisma migration

**Problema:**

```
Migration failed. Rolling back...
```

**Solução:**

```bash
# Reset database
npx prisma migrate reset

# Ou criar nova migration
npx prisma migrate dev --name fix_issue

# Gerar cliente Prisma
npx prisma generate
```

### Erro: Next.js build

**Problema:**

```
Build failed
```

**Solução:**

```bash
# Limpar build cache
rm -rf .next
npm run build

# Verificar erros de tipo
npm run type-check

# Verificar ESLint
npm run lint
```

### Erro: Authentication loop

**Problema:**
Utilizador fica em loop login -> dashboard -> login

**Solução:**

1. Verificar AuthProvider está wrapping app
2. Verificar localStorage.setItem está funcionando
3. Verificar token validation no backend
4. Verificar response de /auth/me

```typescript
// Verificar em browser console
localStorage.getItem("access_token");
```

### Erro: Email duplicado no registo

**Problema:**

```
409 Conflict: Email already exists
```

**Solução:**

1. Usar email diferente
2. Ou resetar database: `npx prisma migrate reset`
3. Verificar constraints na database

### Performance lenta

**Solução:**

```bash
# Frontend
npm run build
npm run analyze  # Analisar bundle size

# Backend
npm run test
# Verificar queries de database
```

### Git conflicts

**Solução:**

```bash
# Resolver conflicts
git status  # Ver ficheiros com conflict
# Editar ficheiros e resolver
git add .
git commit -m "resolve: merge conflicts"
```

### Cannot read property 'X' of undefined

**Solução:**

1. Adicionar optional chaining: `obj?.property`
2. Adicionar null checks: `if (obj) { ... }`
3. Usar non-null assertion se confiante: `obj!.property`

```typescript
// Antes
user.email; // Error se user é null

// Depois
user?.email; // undefined se user é null
user?.email ?? "default"; // Com valor default
```

## Logs e Debugging

### Ver logs do backend

```bash
# Já visível no terminal onde está running
# Ou com debug level
DEBUG=* npm run start:dev
```

### Ver logs do frontend

```bash
# DevTools F12 > Console
console.log()  // Para debug rápido
console.error()  // Para erros
```

### Testar API com curl

```bash
# GET
curl http://localhost:3001/auth/me -H "Authorization: Bearer TOKEN"

# POST
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

## Performance Tips

1. **Frontend:**
   - Use React DevTools para identificar re-renders
   - Use useMemo/useCallback se necessário
   - Lazy load components com dynamic imports

2. **Backend:**
   - Adicionar database indexes
   - Usar pagination em queries
   - Implementar caching com Redis

3. **Geral:**
   - Monitorar bundle size
   - Usar CDN para assets estáticos
   - Ativar gzip compression

---

Para mais ajuda, abra uma [issue no GitHub](https://github.com/smpsandro1239/EPATV_Site_Empregos_TalentMatch/issues)
