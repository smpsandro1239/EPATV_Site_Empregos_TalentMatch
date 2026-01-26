# API Endpoints - TalentMatch

## Autenticação

### Registo

```bash
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "João Silva",
  "role": "CANDIDATE" | "COMPANY"
}

Response: 201 Created
{
  "id": "user-id",
  "email": "user@example.com",
  "name": "João Silva",
  "role": "CANDIDATE",
  "access_token": "jwt-token",
  "refresh_token": "refresh-jwt-token"
}
```

### Login

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "access_token": "jwt-token",
  "refresh_token": "refresh-jwt-token",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "role": "CANDIDATE"
  }
}
```

### Utilizador Atual

```bash
GET /auth/me
Authorization: Bearer jwt-token

Response: 200 OK
{
  "id": "user-id",
  "email": "user@example.com",
  "name": "João Silva",
  "role": "CANDIDATE",
  "createdAt": "2026-01-21T10:30:00Z"
}
```

### Renovar Token

```bash
POST /auth/refresh
Content-Type: application/json

{
  "refresh_token": "refresh-jwt-token"
}

Response: 200 OK
{
  "access_token": "new-jwt-token",
  "refresh_token": "new-refresh-token"
}
```

## Candidatos

### Obter Perfil

```bash
GET /candidates/profile
Authorization: Bearer jwt-token

Response: 200 OK
{
  "id": "candidate-id",
  "userId": "user-id",
  "headline": "Software Developer",
  "bio": "Desenvolvedor experiente",
  "location": "Lisboa",
  "phone": "+351 912 345 678",
  "experiences": [],
  "education": [],
  "skills": []
}
```

### Atualizar Perfil

```bash
PUT /candidates/:id
Authorization: Bearer jwt-token
Content-Type: application/json

{
  "headline": "Senior Developer",
  "bio": "10 anos de experiência",
  "location": "Porto"
}

Response: 200 OK
```

### Adicionar Experiência

```bash
POST /candidates/:id/experiences
Authorization: Bearer jwt-token
Content-Type: application/json

{
  "company": "Tech Company",
  "position": "Senior Developer",
  "description": "Liderava equipa de 5 pessoas",
  "startDate": "2022-01-01",
  "isCurrent": true
}

Response: 201 Created
```

## Empresas

### Obter Perfil

```bash
GET /companies/profile
Authorization: Bearer jwt-token

Response: 200 OK
{
  "id": "company-id",
  "userId": "user-id",
  "name": "Tech Company",
  "description": "Empresa de tecnologia",
  "location": "Lisboa",
  "website": "https://techcompany.com",
  "logo": "url-to-logo"
}
```

## Trabalhos

### Listar Trabalhos

```bash
GET /jobs?status=OPEN&level=SENIOR&location=Lisboa

Response: 200 OK
{
  "data": [
    {
      "id": "job-id",
      "title": "Senior Developer",
      "company": "Tech Company",
      "salary": 2500,
      "location": "Lisboa",
      "workType": "HYBRID"
    }
  ],
  "total": 1,
  "page": 1
}
```

### Publicar Trabalho

```bash
POST /jobs
Authorization: Bearer jwt-token
Content-Type: application/json

{
  "title": "Junior Developer",
  "description": "Procuramos junior developer",
  "salary": 1200,
  "location": "Remote",
  "workType": "REMOTE",
  "level": "JUNIOR"
}

Response: 201 Created
```

## Candidaturas

### Candidatar a Trabalho

```bash
POST /applications
Authorization: Bearer jwt-token
Content-Type: application/json

{
  "jobId": "job-id"
}

Response: 201 Created
{
  "id": "application-id",
  "jobId": "job-id",
  "candidateId": "candidate-id",
  "status": "PENDING",
  "appliedAt": "2026-01-21T10:30:00Z"
}
```

### Minhas Candidaturas

```bash
GET /applications/my
Authorization: Bearer jwt-token

Response: 200 OK
{
  "data": [
    {
      "id": "application-id",
      "job": { "title": "Developer", "company": "Company" },
      "status": "PENDING",
      "appliedAt": "2026-01-21T10:30:00Z"
    }
  ]
}
```

## Matching

### Obter Compatibilidades

```bash
GET /matching/candidates/:candidateId/matches
Authorization: Bearer jwt-token

Response: 200 OK
{
  "matches": [
    {
      "jobId": "job-id",
      "score": 0.85,
      "reasons": ["Todas as skills", "Localização coincide"]
    }
  ]
}
```

## Mensagens

### Enviar Mensagem

```bash
POST /messages
Authorization: Bearer jwt-token
Content-Type: application/json

{
  "recipientId": "recipient-id",
  "content": "Olá, gostaria de saber mais sobre a posição"
}

Response: 201 Created
```

### Obter Conversas

```bash
GET /messages/conversations
Authorization: Bearer jwt-token

Response: 200 OK
{
  "conversations": [
    {
      "id": "conversation-id",
      "participant": { "id": "user-id", "name": "User Name" },
      "lastMessage": "Última mensagem",
      "unreadCount": 2
    }
  ]
}
```
