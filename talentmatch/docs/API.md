# Backend API Documentation

Documentação completa da API do TalentMatch.

## Base URL

Development: `http://localhost:3000`
Production: `https://api.talentmatch.com`

## Autenticação

Usar JWT no header:
```
Authorization: Bearer <token>
```

## Endpoints

### Auth

#### POST /auth/register
Criar nova conta

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "role": "CANDIDATE" | "COMPANY"
}
```

**Response:**
```json
{
  "id": "user-123",
  "email": "user@example.com",
  "role": "CANDIDATE",
  "access_token": "eyJ...",
  "refresh_token": "eyJ..."
}
```

#### POST /auth/login
Fazer login

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ..."
}
```

#### POST /auth/refresh
Renovar access token

**Response:**
```json
{
  "access_token": "eyJ..."
}
```

### Candidates

#### GET /candidates/me
Ver perfil do candidato

**Response:**
```json
{
  "id": "candidate-123",
  "name": "João Silva",
  "headline": "Full Stack Developer",
  "location": "Lisboa",
  "skills": [
    { "name": "JavaScript", "level": "SENIOR" },
    { "name": "React", "level": "SENIOR" }
  ]
}
```

#### PUT /candidates/me
Atualizar perfil

### Companies

#### GET /companies/me
Ver perfil da empresa

#### PUT /companies/me
Atualizar perfil

### Jobs

#### GET /jobs
Listar vagas

**Query params:**
- `page`: Número da página
- `limit`: Items por página
- `location`: Localização
- `remoteType`: FULLY_REMOTE, HYBRID, ON_SITE
- `level`: JUNIOR, MID, SENIOR

**Response:**
```json
{
  "data": [
    {
      "id": "job-123",
      "title": "Senior React Developer",
      "company": "Tech Corp",
      "location": "Lisboa",
      "level": "SENIOR"
    }
  ],
  "total": 150,
  "page": 1
}
```

#### POST /jobs
Criar vaga (apenas empresas)

#### PUT /jobs/:id
Editar vaga

#### POST /jobs/:id/publish
Publicar vaga

### Applications

#### POST /applications
Candidatar-se a vaga

**Request:**
```json
{
  "jobId": "job-123",
  "message": "I'm interested in this position"
}
```

#### GET /applications/me
Ver minhas candidaturas

#### PUT /applications/:id/status
Atualizar estado da candidatura

### Matching

#### GET /matching/job/:jobId
Candidatos recomendados para vaga

**Response:**
```json
{
  "candidates": [
    {
      "id": "candidate-123",
      "name": "João Silva",
      "score": 92,
      "explanation": {
        "skills": 0.95,
        "location": 1.0,
        "seniority": 0.88
      }
    }
  ]
}
```

#### GET /matching/candidate/:candidateId
Vagas recomendadas para candidato

## Códigos de Erro

- **200**: OK
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **409**: Conflict (ex: duplicated email)
- **500**: Internal Server Error

## Rate Limiting

- 100 requests por minuto por IP
- 1000 requests por hora por utilizador autenticado

## Paginação

Todos os endpoints com múltiplos itens retornam:

```json
{
  "data": [],
  "total": 0,
  "page": 1,
  "pageSize": 20,
  "totalPages": 0
}
```

## Versionamento

API v1 atual. No futuro: `/api/v2`

## Changelog

### v1.0.0 (2025-01-20)
- Endpoints iniciais
- Auth
- Candidates, Companies, Jobs
- Applications, Matching
