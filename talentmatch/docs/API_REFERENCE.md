# Guia de API - TalentMatch

## Autenticação

### Headers Requeridos
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

### Status Codes
- `200 OK` - Sucesso
- `201 Created` - Recurso criado
- `400 Bad Request` - Dados inválidos
- `401 Unauthorized` - Não autenticado
- `403 Forbidden` - Não autorizado
- `404 Not Found` - Recurso não encontrado
- `409 Conflict` - Conflito (ex: email duplicado)
- `500 Internal Server Error` - Erro do servidor

## Response Format

### Sucesso
```json
{
  "statusCode": 200,
  "message": "Sucesso",
  "data": { }
}
```

### Erro
```json
{
  "statusCode": 400,
  "message": "Erro ao validar dados",
  "error": "validation_error",
  "details": [
    {
      "field": "email",
      "message": "Email inválido"
    }
  ]
}
```

## Rate Limiting

- Limite: 100 requests por hora por IP
- Header: `X-RateLimit-Limit`
- Header: `X-RateLimit-Remaining`
- Header: `X-RateLimit-Reset`

## Pagination

### Query Parameters
```
?page=1&limit=10&sort=createdAt&order=desc
```

### Response
```json
{
  "data": [ ... ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

## Filtering

### Exemplos
```
GET /jobs?level=SENIOR&location=Lisboa&workType=REMOTE
GET /candidates?experience=5&skills=JavaScript,TypeScript
GET /companies?industry=Technology&size=MEDIUM
```

## Search

### Global Search
```
GET /search?q=developer&type=job,candidate,company
```

### Field-specific Search
```
GET /jobs/search?title=developer&description=backend
```

## Error Handling

### Retry Strategy
- 4xx: Não retente (erro do cliente)
- 5xx: Retente com backoff exponencial
- Máximo 3 tentativas

### Exemplo com JS
```javascript
async function apiCall(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      if (response.status < 500) throw new Error('Client error');

      const delay = Math.pow(2, i) * 1000;
      await new Promise(r => setTimeout(r, delay));
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
}
```

## Versionamento

- API versão: v1
- Compatibilidade retroativa mantida
- Deprecações anunciadas com 30 dias de antecedência

## Documentação Completa

Ver [API_ENDPOINTS.md](./API_ENDPOINTS.md) para lista completa de endpoints.
