# FAQ - Perguntas Frequentes

## Desenvolvimento

### Como faço setup local?

```bash
cd talentmatch
npm install  # nos directories backend e frontend
npm run start:dev  # backend
npm run dev  # frontend
```

### Como executo os testes?

```bash
npm run test  # Jest
npm run test:watch  # watch mode
npm run test:coverage  # cobertura
```

### Como faço deploy?

```bash
./deploy.sh  # Script automático
# ou
docker-compose -f docker-compose.prod.yml up
```

## Autenticação

### Como faço login?

1. Ir para `/auth/login`
2. Inserir email e senha
3. Serás redirecionado para o dashboard

### Esqueci minha senha?

- Função de reset ainda não implementada
- Em desenvolvimento para v2.0

### Qual é a duração do token?

- Access token: 15 minutos
- Refresh token: 7 dias

## Funcionalidades

### Quando será implementado matching de IA?

- Fase 3 (v2.0)
- Estimada: Fevereiro 2026

### Posso usar a aplicação sem email?

- Não, email é obrigatório
- Será adicionada autenticação por OAuth (Google, GitHub) em v2.0

### Como adiciono meu CV?

- Feature em desenvolvimento
- Será adicionada na Fase 1B

## Técnico

### Qual é a database usada?

- PostgreSQL 12+
- Acedido via Prisma ORM

### A aplicação é segura?

- ✅ Senhas hasheadas com Argon2
- ✅ JWT com expiração
- ✅ CORS configurado
- ✅ SQL injection prevention
- Mais informações em [SECURITY.md](./docs/SECURITY.md)

### Onde correm os servidores?

- Backend: localhost:3001
- Frontend: localhost:3000
- Produção: TBD

### Como contribuo para o projeto?

- Ver [CONTRIBUTING.md](./CONTRIBUTING.md)
- Fork, criar branch, fazer PR

## Troubleshooting

### Erro: Port em uso

```bash
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Erro: Database connection

- Verificar se PostgreSQL está running
- Verificar DATABASE_URL em .env

### Erro: Token inválido

- Limpar localStorage
- Fazer login novamente

Ver [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) para mais.

## Roadmap

### v1.0 (Atual)

- ✅ Autenticação JWT
- ✅ Dashboards por role
- Em desenvolvimento: Profiles

### v1.1 (Próxima)

- Candidate/Company profiles
- Job listing

### v2.0

- Matching com IA
- Real-time messaging

---

Não encontrou resposta? Abra uma [issue](https://github.com/smpsandro1239/EPATV_Site_Empregos_TalentMatch/issues)
