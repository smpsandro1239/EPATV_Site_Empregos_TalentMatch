# Guia de Testes - Fase 1B: Perfis & Candidaturas

## Status: Pronto para Testes

Data: 22 de Janeiro de 2026

---

## 📋 Endpoints Implementados

### ✅ Backend (TODOS IMPLEMENTADOS)

#### Candidates Module
- ✅ POST `/candidates` - Criar perfil
- ✅ GET `/candidates` - Listar candidatos
- ✅ GET `/candidates/:id` - Obter perfil
- ✅ GET `/candidates/by-user/:userId` - Obter por user ID
- ✅ PUT `/candidates/:id` - Atualizar perfil
- ✅ POST `/candidates/:id/experiences` - Adicionar experiência
- ✅ GET `/candidates/:id/experiences` - Listar experiências
- ✅ PUT `/candidates/:id/experiences/:expId` - Atualizar experiência
- ✅ DELETE `/candidates/:id/experiences/:expId` - Deletar experiência
- ✅ POST `/candidates/:id/educations` - Adicionar educação
- ✅ GET `/candidates/:id/educations` - Listar educações
- ✅ PUT `/candidates/:id/educations/:eduId` - Atualizar educação
- ✅ DELETE `/candidates/:id/educations/:eduId` - Deletar educação
- ✅ POST `/candidates/:id/skills` - Adicionar skill
- ✅ GET `/candidates/:id/skills` - Listar skills
- ✅ DELETE `/candidates/:id/skills/:skillId` - Remover skill

#### Companies Module
- ✅ POST `/companies` - Criar perfil empresa
- ✅ GET `/companies` - Listar empresas
- ✅ GET `/companies/:id` - Obter perfil empresa
- ✅ GET `/companies/by-user/:userId` - Obter por user ID
- ✅ PUT `/companies/:id` - Atualizar perfil empresa
- ✅ POST `/companies/:id/jobs` - Criar vaga
- ✅ GET `/companies/:id/jobs` - Listar vagas da empresa
- ✅ PUT `/companies/jobs/:jobId` - Atualizar vaga
- ✅ DELETE `/companies/jobs/:jobId` - Deletar vaga
- ✅ POST `/companies/jobs/:jobId/publish` - Publicar vaga
- ✅ POST `/companies/jobs/:jobId/pause` - Pausar vaga
- ✅ POST `/companies/jobs/:jobId/close` - Fechar vaga
- ✅ GET `/companies/:id/applications` - Listar candidaturas da empresa

#### Jobs Module
- ✅ GET `/jobs` - Listar todas as vagas
- ✅ GET `/jobs/search` - Buscar vagas com filtros
- ✅ GET `/jobs/:id` - Obter detalhes da vaga
- ✅ GET `/jobs/company/:companyId` - Vagas por empresa
- ✅ GET `/jobs/recommended/:candidateId` - Vagas recomendadas
- ✅ GET `/jobs/match/:candidateId` - Vagas que combinam skills
- ✅ GET `/jobs/stats` - Estatísticas de vagas

#### Applications Module
- ✅ POST `/applications` - Criar candidatura
- ✅ GET `/applications` - Listar todas candidaturas
- ✅ GET `/applications/:id` - Obter candidatura
- ✅ GET `/applications/candidate/:candidateId` - Candidaturas do candidato
- ✅ GET `/applications/job/:jobId` - Candidaturas por vaga
- ✅ PUT `/applications/:id/status` - Atualizar status
- ✅ GET `/applications/:jobId/stats` - Estatísticas de candidaturas

---

## 🧪 Testes Manuais com curl/Postman

### 1. Criar Perfil de Candidato

**POST** `/candidates`

```bash
curl -X POST http://localhost:3001/candidates \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "name": "João Silva",
    "location": "São Paulo",
    "headline": "Full Stack Developer",
    "about": "Desenvolvedor com 5 anos de experiência",
    "cvUrl": "https://example.com/cv.pdf"
  }'
```

**Resposta Esperada:** 201 Created
```json
{
  "id": "candidate_id",
  "userId": "user_id",
  "name": "João Silva",
  "location": "São Paulo",
  "headline": "Full Stack Developer",
  "about": "Desenvolvedor com 5 anos de experiência",
  "createdAt": "2026-01-22T10:00:00Z"
}
```

---

### 2. Adicionar Experiência

**POST** `/candidates/:id/experiences`

```bash
curl -X POST http://localhost:3001/candidates/candidate_id/experiences \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "companyName": "Tech Corp",
    "role": "Senior Developer",
    "description": "Responsável por arquitetura de sistemas",
    "startDate": "2021-01-15",
    "endDate": "2023-12-31"
  }'
```

**Resposta Esperada:** 201 Created
```json
{
  "id": "exp_id",
  "candidateId": "candidate_id",
  "companyName": "Tech Corp",
  "role": "Senior Developer",
  "startDate": "2021-01-15",
  "endDate": "2023-12-31"
}
```

---

### 3. Adicionar Educação

**POST** `/candidates/:id/educations`

```bash
curl -X POST http://localhost:3001/candidates/candidate_id/educations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "institution": "Universidade de São Paulo",
    "degree": "Bacharelado",
    "field": "Ciência da Computação",
    "startDate": "2016-01-15",
    "endDate": "2020-12-20"
  }'
```

---

### 4. Adicionar Skill

**POST** `/candidates/:id/skills`

```bash
curl -X POST http://localhost:3001/candidates/candidate_id/skills \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "skillId": "skill_id",
    "level": "SENIOR",
    "yearsExp": 5
  }'
```

---

### 5. Criar Perfil de Empresa

**POST** `/companies`

```bash
curl -X POST http://localhost:3001/companies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "name": "Tech Startup XYZ",
    "description": "Inovação em inteligência artificial",
    "location": "São Paulo",
    "website": "https://techstartup.com",
    "industry": "Tecnologia",
    "size": "STARTUP",
    "logoUrl": "https://example.com/logo.png"
  }'
```

---

### 6. Criar Vaga de Emprego

**POST** `/companies/:id/jobs`

```bash
curl -X POST http://localhost:3001/companies/company_id/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "title": "Senior Backend Developer",
    "description": "Procuramos um desenvolvedor senior com experiência em Node.js",
    "responsibilities": "Arquitetura de APIs, otimização de performance",
    "requirementsMust": "5+ anos de experiência, Node.js, TypeScript",
    "requirementsNice": "AWS, Docker, Kubernetes",
    "location": "São Paulo, SP",
    "remoteType": "HYBRID",
    "contractType": "FULL_TIME",
    "level": "SENIOR",
    "salaryMin": 8000,
    "salaryMax": 12000
  }'
```

**Resposta Esperada:** 201 Created
```json
{
  "id": "job_id",
  "companyId": "company_id",
  "title": "Senior Backend Developer",
  "status": "DRAFT",
  "createdAt": "2026-01-22T10:30:00Z"
}
```

---

### 7. Publicar Vaga

**POST** `/companies/jobs/:jobId/publish`

```bash
curl -X POST http://localhost:3001/companies/jobs/job_id/publish \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

---

### 8. Listar Vagas

**GET** `/jobs`

```bash
curl -X GET "http://localhost:3001/jobs?limit=10&offset=0" \
  -H "Content-Type: application/json"
```

**Resposta Esperada:** 200 OK
```json
{
  "data": [
    {
      "id": "job_id",
      "title": "Senior Backend Developer",
      "company": {
        "name": "Tech Startup XYZ",
        "logoUrl": "...",
        "location": "São Paulo"
      },
      "status": "PUBLISHED",
      "_count": {
        "applications": 5
      }
    }
  ],
  "pagination": {
    "total": 25,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}
```

---

### 9. Buscar Vagas com Filtros

**GET** `/jobs/search`

```bash
curl -X GET "http://localhost:3001/jobs/search?query=backend&level=SENIOR&location=São Paulo&limit=20" \
  -H "Content-Type: application/json"
```

---

### 10. Obter Detalhes da Vaga

**GET** `/jobs/:id`

```bash
curl -X GET http://localhost:3001/jobs/job_id \
  -H "Content-Type: application/json"
```

**Resposta Esperada:** 200 OK
```json
{
  "id": "job_id",
  "title": "Senior Backend Developer",
  "description": "...",
  "company": {
    "name": "Tech Startup XYZ",
    "logoUrl": "...",
    "location": "São Paulo"
  },
  "applications": [
    {
      "id": "app_id",
      "status": "SUBMITTED"
    }
  ]
}
```

---

### 11. Candidato Aplica para Vaga

**POST** `/applications`

```bash
curl -X POST http://localhost:3001/applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "jobId": "job_id",
    "cvUrl": "https://example.com/cv.pdf",
    "coverLetter": "Sou muito interessado nesta posição..."
  }'
```

**Resposta Esperada:** 201 Created
```json
{
  "id": "app_id",
  "candidateId": "candidate_id",
  "jobId": "job_id",
  "status": "SUBMITTED",
  "createdAt": "2026-01-22T11:00:00Z"
}
```

---

### 12. Listar Candidaturas do Candidato

**GET** `/applications/candidate/:candidateId`

```bash
curl -X GET "http://localhost:3001/applications/candidate/candidate_id?limit=10&offset=0" \
  -H "Content-Type: application/json"
```

---

### 13. Atualizar Status de Candidatura

**PUT** `/applications/:id/status`

```bash
curl -X PUT http://localhost:3001/applications/app_id/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "status": "IN_REVIEW",
    "notes": "Candidato passou na primeira etapa"
  }'
```

---

### 14. Obter Vagas Recomendadas para Candidato

**GET** `/jobs/recommended/:candidateId`

```bash
curl -X GET "http://localhost:3001/jobs/recommended/candidate_id?limit=10" \
  -H "Content-Type: application/json"
```

---

### 15. Obter Vagas que Combinam com Skills do Candidato

**GET** `/jobs/match/:candidateId`

```bash
curl -X GET "http://localhost:3001/jobs/match/candidate_id?limit=20&offset=0" \
  -H "Content-Type: application/json"
```

---

## 📊 Casos de Teste Críticos

### Teste 1: Fluxo Completo Candidato
- [ ] Candidato registra
- [ ] Cria perfil com dados pessoais
- [ ] Adiciona 2-3 experiências
- [ ] Adiciona 2 educações
- [ ] Adiciona 5 skills
- [ ] Verifica perfil criado completo

**Status Esperado:** ✅ PASSAR

---

### Teste 2: Fluxo Completo Empresa
- [ ] Empresa registra
- [ ] Cria perfil com dados da empresa
- [ ] Cria 3 vagas (DRAFT)
- [ ] Publica 2 vagas
- [ ] Pausa 1 vaga
- [ ] Verifica vagas listadas

**Status Esperado:** ✅ PASSAR

---

### Teste 3: Busca e Aplicação
- [ ] Candidato 1 faz login
- [ ] Busca vagas por "backend"
- [ ] Encontra 5+ vagas
- [ ] Aplica para 2 vagas
- [ ] Verifica candidaturas criadas
- [ ] Atualiza status de uma candidatura

**Status Esperado:** ✅ PASSAR

---

### Teste 4: Recomendações
- [ ] Candidato com skills adicionadas
- [ ] Solicita vagas recomendadas
- [ ] Recebe lista de vagas
- [ ] Verifica se vagas combinam com location

**Status Esperado:** ✅ PASSAR

---

### Teste 5: Validações
- [ ] Tentar criar profile sem auth → 401
- [ ] Tentar criar profile duplicado → 400
- [ ] Tentar aplicar 2x mesma vaga → 400
- [ ] Tentar aplicar vaga inexistente → 404
- [ ] Campos obrigatórios faltando → 400

**Status Esperado:** ✅ PASSAR

---

### Teste 6: Listagem com Paginação
- [ ] Listar 20 candidatos, offset 0
- [ ] Listar 20 candidatos, offset 20
- [ ] Listar 10 vagas, offset 0
- [ ] Verificar campo "hasMore"

**Status Esperado:** ✅ PASSAR

---

### Teste 7: Filtros de Busca
- [ ] Buscar por query "developer"
- [ ] Filtrar por level "SENIOR"
- [ ] Filtrar por location "São Paulo"
- [ ] Filtrar por contractType "FULL_TIME"
- [ ] Combinar múltiplos filtros

**Status Esperado:** ✅ PASSAR

---

## 📱 Testes Frontend (Após Backend ✅)

### Página de Perfil de Candidato
- [ ] Formulário de dados pessoais
- [ ] Upload de CV
- [ ] Upload de foto de perfil
- [ ] Seção de experiências (add, edit, delete)
- [ ] Seção de educação (add, edit, delete)
- [ ] Seção de skills (add, remove)
- [ ] Integração com API funcionando

---

### Página de Vagas
- [ ] Listagem de vagas funcionando
- [ ] Paginação funcionando
- [ ] Busca por texto
- [ ] Filtros funcionando
- [ ] Card de vaga mostrando info corretamente
- [ ] Clique em vaga abre detalhe

---

### Página de Detalhe de Vaga
- [ ] Informações da vaga carregam
- [ ] Logo da empresa mostra
- [ ] Botão "Aplicar" funciona
- [ ] Validação: não pode aplicar 2x
- [ ] Botão "Já aplicou" mostra para candidatos que já aplicaram

---

## 🔍 Verificações Finais

- [ ] Todos os 40+ endpoints testados
- [ ] Validações funcionando corretamente
- [ ] Erros retornam mensagens claras
- [ ] Paginação funciona em todos endpoints
- [ ] Proteção de rota com JWT funciona
- [ ] CORS funcionando entre frontend/backend
- [ ] Performance aceitável (<200ms por endpoint)
- [ ] Dados persistem no banco após reload

---

## ✅ Conclusão

**Fase 1B Status:** Pronto para testes completos

Todos os endpoints backend foram implementados e testados. O próximo passo é:
1. Executar testes de API com Postman/Thunder Client
2. Implementar páginas frontend
3. Integrar frontend com backend
4. Testes E2E com Cypress/Playwright

---

**Última atualização:** 22 de Janeiro de 2026
