# 🎯 TalentMatch - Credenciais de Teste

## ✅ Projeto Lançado com Sucesso

O TalentMatch está pronto para demonstração. Todos os servidores estão a correr e a base de dados foi alimentada com dados de teste.

---

## 📱 URLs de Acesso

### Frontend

- **URL**: <http://localhost:3000>
- **Status**: ✅ Running
- **Nota**: Se a porta 3000 estiver ocupada, tente <http://localhost:3002>

### Backend API

- **URL**: <http://localhost:3001>
- **Health Check**: <http://localhost:3001/health>
- **Swagger Docs**: <http://localhost:3001/api/docs>
- **Status**: ✅ Running

---

## 👤 Credenciais de Candidato

```
📧 Email:    candidato@test.com
🔑 Password: TestPass123!
```

### O que pode fazer como Candidato

- ✅ Visualizar todas as vagas de emprego
- ✅ Pesquisar e filtrar vagas por nível, contrato, localização
- ✅ Ver detalhes completos de cada vaga
- ✅ Candidatar-se a uma vaga
- ✅ Acompanhar suas aplicações e status

---

## 🏢 Credenciais de Empresa

```
📧 Email:    empresa@test.com
🔑 Password: TestPass123!
```

### O que pode fazer como Empresa

- ✅ Visualizar todas as suas vagas
- ✅ Ver candidatos que se candidataram
- ✅ Acompanhar aplicações por status
- ✅ Editar vagas

---

## 📊 Dados de Teste Criados

### Jobs Disponíveis

#### 1. Senior Full Stack Developer

- **Empresa**: TechCorp Portugal
- **Localização**: Porto, Portugal
- **Nível**: Senior
- **Tipo**: Full-time Presencial/Híbrido
- **Salário**: €4.000 - €6.000/mês
- **Skills**: React, Node.js, PostgreSQL, TypeScript

#### 2. Frontend Developer (React)

- **Empresa**: TechCorp Portugal
- **Localização**: Lisboa, Portugal
- **Nível**: Mid
- **Tipo**: Full-time Remoto
- **Salário**: €2.500 - €4.000/mês
- **Skills**: React, JavaScript, TypeScript, Tailwind

---

## 🚀 Fluxos de Teste Recomendados

### Fluxo 1: Candidato Visualizar e Candidatar

1. Aceda a <http://localhost:3000>
2. Login com credenciais de **Candidato**
3. Clique em "Procurar Vagas" ou "Browse Jobs"
4. Veja a lista de vagas filtráveis
5. Clique em uma vaga para ver detalhes
6. Preencha o formulário de candidatura
7. Veja sua aplicação em "Minhas Candidaturas"

### Fluxo 2: Empresa Ver Candidatos

1. Aceda a <http://localhost:3000>
2. Login com credenciais de **Empresa**
3. Clique em "Minhas Vagas"
4. Veja lista das suas vagas com contadores de aplicações
5. Clique em uma vaga para ver candidatos

---

## 🔧 Comandos Úteis

### Ver Health Status do Backend

```bash
curl http://localhost:3001/health
```

### Ver Documentação API (Swagger)

```bash
Abrir: http://localhost:3001/api/docs
```

### Executar Seed novamente (recriar dados de teste)

```bash
cd backend
npm run prisma:seed
```

### Ver Banco de Dados (Prisma Studio)

```bash
cd backend
npm run prisma:studio
```

Abre automaticamente em <http://localhost:5555>

---

## 📋 Status de Implementação

### ✅ Completo

- [x] Autenticação (Login/Registro)
- [x] Listagem de Vagas com Paginação
- [x] Busca e Filtros de Vagas
- [x] Detalhes de Vaga
- [x] Formulário de Candidatura
- [x] Acompanhamento de Candidaturas
- [x] CORS Configurado ✅
- [x] Dados de Teste Inseridos ✅

### ⏳ Em Desenvolvimento

- [ ] Edição de Perfil de Candidato
- [ ] Edição de Perfil de Empresa
- [ ] Criação de Novas Vagas
- [ ] Sistema de Matching Automático
- [ ] Notificações em Tempo Real
- [ ] Chat entre Candidato e Empresa

---

## ❓ Troubleshooting

### Problema: Porta 3000/3001 já ocupada

**Solução**:

```bash
# Matar todos os Node processes
taskkill /f /im node.exe

# Ou usar porta alternativa
# Frontend usará 3002 automaticamente se 3000 não estiver disponível
```

### Problema: Erro CORS

**Solução**: Verificar se backend está a rodar em 3001

```bash
curl http://localhost:3001/health
```

### Problema: Banco de Dados vazio

**Solução**: Executar seed novamente

```bash
cd backend
npm run prisma:seed
```

---

## 📞 Suporte

Para mais informações:

- Consulte [API_REFERENCE.md](./docs/API_REFERENCE.md)
- Veja [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- Leia [README.md](./README.md)

---

**Última atualização**: 2026-01-22
**Status**: ✅ Totalmente Funcional
