# 🧪 QUICK TEST GUIDE - Validar CORS Fix

## 1️⃣ Testar Register (CORS Fix Principal)

### Passo 1: Abrir navegador

```
http://localhost:3000/auth/register
```

### Passo 2: Preencher formulário

- **Email**: <teste@example.com>
- **Senha**: TestPass123!
- **Confirmar**: TestPass123!
- **Tipo**: CANDIDATE (ou COMPANY)

### Passo 3: Submeter

- Clicar "Criar Conta"

### Resultado Esperado ✅

- ✅ Sem erro de CORS
- ✅ Sem erro `net::ERR_FAILED`
- ✅ Redirecionamento para `/candidate/dashboard` (ou `/company/dashboard`)
- ✅ Email visível no header
- ✅ Tokens em localStorage

---

## 2️⃣ Testar Login

### Passo 1: Ir para login

```
http://localhost:3000/auth/login
```

### Passo 2: Inserir credenciais

- **Email**: <teste@example.com>
- **Senha**: TestPass123!

### Passo 3: Submit

- Clicar "Entrar"

### Resultado Esperado ✅

- ✅ Login bem-sucedido
- ✅ Redirecionamento automático ao dashboard
- ✅ Cabeçalho mostra email

---

## 3️⃣ Testar Jobs Listing

### Passo 1: Ir para jobs

```
http://localhost:3000/jobs
```

### Passo 2: Verificar listagem

- [ ] Jobs aparecem em cards
- [ ] Filters funcionam (level, contract type, location)
- [ ] Search funciona
- [ ] Paginação funciona

### Resultado Esperado ✅

- Cards de jobs carregam sem erro CORS
- Filtros funcionam

---

## 4️⃣ Testar Job Detail

### Passo 1: Clique em um job

- De `/jobs` clique em qualquer job card

### Passo 2: Validar detalhes

- [ ] Job title, company, description carregam
- [ ] Botão "Apply" visível
- [ ] Cover letter form funciona

### Resultado Esperado ✅

- Página de detalhe carrega sem CORS errors
- Aplicar funciona

---

## 5️⃣ Testar Applications (Candidate)

### Passo 1: Autenticar como candidato

- Fazer login em `/auth/login`

### Passo 2: Ir para aplicações

```
http://localhost:3000/candidate/applications
```

### Resultado Esperado ✅

- Lista de aplicações carrega
- Stats aparecem (total, under review, accepted, rejected)
- Sem erros CORS

---

## 🔍 Debug Console (DevTools)

### Se aparecer erro, abrir F12 e verificar

```javascript
// Ver CORS headers na Network tab
// Procurar por request a http://localhost:3001
// Headers esperados na resposta:
// Access-Control-Allow-Origin: http://localhost:3000
// Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
// Access-Control-Allow-Headers: Content-Type, Authorization

// Ver tokens
localStorage.getItem("access_token");
localStorage.getItem("refresh_token");

// Ver user data
localStorage.getItem("user");
```

---

## ✅ Checklist de Sucesso

- [ ] Register funciona (CORS fixed)
- [ ] Login funciona (CORS fixed)
- [ ] Jobs listing funciona (CORS fixed)
- [ ] Job detail funciona (CORS fixed)
- [ ] Job apply funciona (CORS fixed)
- [ ] Applications listing funciona (CORS fixed)
- [ ] Filtros funcionam
- [ ] Paginação funciona
- [ ] Tokens salvos no localStorage
- [ ] Sem erros CORS na console

---

## 🔴 Se ainda tiver CORS error

### 1. Verificar Backend Status

```bash
curl -i http://localhost:3001/health
# Esperado: 200 OK com {"status":"ok"}
```

### 2. Verificar CORS Headers

```bash
curl -i -X OPTIONS http://localhost:3001/auth/register \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type"
# Esperado: 200 OK com Access-Control-Allow-Origin: http://localhost:3000
```

### 3. Verificar .env Backend

```bash
cat backend/.env | grep CORS
# Esperado: CORS_ORIGIN="http://localhost:3000"
```

### 4. Reiniciar Backend

```bash
# Terminal 1: Kill node
taskkill /f /im node.exe

# Terminal 2: Reiniciar
cd talentmatch/backend && npm run start:dev
```

---

## 📊 Comandos Úteis

```bash
# Ver portas em uso
netstat -ano | findstr :3000 :3001

# Kill processo em porta específica (Windows)
netstat -ano | findstr :3001
taskkill /pid <PID> /f

# Verificar se backend está pronto
curl http://localhost:3001/health

# Ver logs do backend (se rodar em foreground)
cd talentmatch/backend && npm run start:dev

# Limpar cache frontend
rm -rf talentmatch/frontend/.next
rm -rf talentmatch/frontend/node_modules/.next
```

---

**Last Updated**: 22 Janeiro 2026 - 12:54 UTC
**CORS Status**: ✅ FIXED
