# Segurança - TalentMatch

Este documento descreve as práticas de segurança implementadas no TalentMatch.

## Autenticação e Autorização

### JWT (JSON Web Tokens)
- ✅ Tokens com expiração de 15 minutos
- ✅ Refresh tokens com expiração de 7 dias
- ✅ Assinatura com secret robusto
- ✅ Verificação em cada pedido autenticado

### Hashing de Passwords
- ✅ Argon2 para hash de senhas
- ✅ Sem armazenamento de senhas em plaintext
- ✅ Salting automático

### CORS (Cross-Origin Resource Sharing)
- ✅ Configurado para frontend localhost:3000
- ✅ Credenciais incluídas quando necessário
- ✅ Preflight requests habilitados

## Proteção de Dados

### Transmissão
- ✅ HTTPS/TLS em produção (preparado)
- ✅ Secure cookies (HttpOnly, Secure, SameSite)
- ✅ Tokens em Bearer schema

### Armazenamento
- ✅ Base de dados criptografada (PostgreSQL + Prisma)
- ✅ Variáveis de ambiente não commitadas
- ✅ .gitignore configurado

### Sanitização
- ✅ Validação de entrada em formulários
- ✅ Sanitização de dados do utilizador
- ✅ Prevenção de XSS via Content Security Policy

## Injeção SQL

- ✅ Prisma ORM com prepared statements
- ✅ Proteção automática contra SQL injection
- ✅ Validação de tipos com TypeScript

## Validação de Input

### Frontend
- ✅ Validação em tempo real
- ✅ Sanitização de inputs
- ✅ Máscaras de input (phone, email)
- ✅ Limites de caracteres

### Backend
- ✅ DTOs com validação
- ✅ Validators do NestJS
- ✅ Type checking com TypeScript
- ✅ Mensagens de erro seguras

## Rate Limiting

- ⚠️ Preparado (não implementado ainda)
- Planeado: 100 requests/hora por IP
- Endpoint específico: 10 login attempts/hora

## Autenticação de Dois Fatores (2FA)

- ⚠️ Planeado para versão 4.0
- Suportará:
  - TOTP (Time-based OTP)
  - SMS OTP
  - Email OTP

## Auditoria e Logging

- ✅ Logging de erros
- ✅ Logging de autenticação
- ⚠️ Auditoria completa planeada
- ⚠️ Rastreamento de atividades do utilizador

## Conformidade

### GDPR
- ✅ Consentimento de privacidade
- ⚠️ Direito ao esquecimento (direito de exclusão)
- ⚠️ Portabilidade de dados
- ⚠️ Política de privacidade

### LGPD (Lei Geral de Proteção de Dados - Brasil)
- ✅ Estrutura preparada
- ⚠️ Implementação completa

## Variáveis de Ambiente

**NUNCA commit:**
```env
DATABASE_URL
JWT_SECRET
JWT_REFRESH_SECRET
API_KEYS
CREDENTIALS
```

**Use .env.example:**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here
```

## Dependências

### Auditoria Regular
```bash
npm audit
npm audit fix  # Corrigir vulnerabilidades automáticas
```

### Dependências Críticas
- `@nestjs/jwt`: Autenticação
- `passport`: Estratégias de auth
- `argon2`: Hash de senhas
- `cors`: CORS middleware
- `dotenv`: Variáveis de ambiente

## Deployment em Produção

- [ ] HTTPS/TLS obrigatório
- [ ] Variáveis de ambiente em sistema de secrets
- [ ] Database backups automáticos
- [ ] Logs centralizados
- [ ] Monitoramento de segurança
- [ ] WAF (Web Application Firewall)
- [ ] DDoS protection
- [ ] Certificados SSL válidos

## Segurança em Desenvolvimento

### Local Development
- ✅ .env não commitado
- ✅ node_modules no .gitignore
- ✅ Secrets locais não partilhados

### Pull Requests
- ✅ Code review obrigatório
- ✅ Verificação de secrets
- ✅ Testes de segurança (ESLint, TypeScript)

## Reportar Vulnerabilidades

Se descobrir uma vulnerabilidade de segurança:

1. **NÃO abra uma issue pública**
2. Email: security@talentmatch.pt
3. Descreva a vulnerabilidade em detalhe
4. Permitir tempo para correção antes de divulgação

## Ferramentas de Segurança Utilizadas

- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) - Auditoria de dependências
- [OWASP ZAP](https://www.zaproxy.org/) - Teste de penetração
- [Snyk](https://snyk.io/) - Monitoramento de vulnerabilidades
- [ESLint](https://eslint.org/) - Code quality

## Checklist de Segurança Pré-Deployment

- [ ] Todas as dependências auditadas
- [ ] Variáveis de ambiente configuradas
- [ ] HTTPS ativado
- [ ] CORS restringido
- [ ] Headers de segurança configurados
- [ ] Rate limiting ativado
- [ ] Logging configurado
- [ ] Backups testados
- [ ] Disaster recovery planeado
- [ ] Documentação de segurança atualizada

---

Para mais informações sobre segurança web, visite [OWASP](https://owasp.org/)
