# TalentMatch - Plataforma de Recrutamento Inteligente

[![Status de Desenvolvimento](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://github.com/smpsandro1239/EPATV_Site_Empregos_TalentMatch)
[![Licença](https://img.shields.io/badge/licença-MIT-green)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-blue)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)

**TalentMatch** é uma plataforma de recrutamento moderna e inovadora que utiliza tecnologia de matching inteligente para conectar os melhores candidatos com as oportunidades de emprego mais adequadas.

## 📋 Índice

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Pré-requisitos](#pré-requisitos)
- [Instalação Rápida](#instalação-rápida)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Documentação](#documentação)
- [Contribuir](#contribuir)
- [Licença](#licença)

## 🎯 Características

### ✅ Fase 1 - Autenticação (Completa)
- ✔️ Sistema de registo e login seguro
- ✔️ Autenticação com JWT
- ✔️ Suporte para dois tipos de utilizadores: Candidato e Empresa
- ✔️ Dashboards personalizados por tipo de utilizador
- ✔️ Password hashing com Argon2
- ✔️ Token refresh automático

### 🚀 Próximas Fases
- 📊 Gestão de Perfis de Candidatos e Empresas
- 💼 Sistema de Publicação e Candidatura a Vagas
- 🤖 Matching Inteligente com IA
- 💬 Chat em Tempo Real
- 📧 Notificações por E-mail
- 👨‍💼 Painel de Administração

## 🛠️ Stack Tecnológico

### Backend
- **Framework**: NestJS 13+
- **Linguagem**: TypeScript 5.0+
- **Base de Dados**: PostgreSQL 16
- **ORM**: Prisma
- **Cache**: Redis 7
- **Autenticação**: Passport.js + JWT
- **Hashing de Passwords**: Argon2
- **Documentação API**: Swagger/OpenAPI
- **Testes**: Jest

### Frontend
- **Framework**: Next.js 13 (App Router)
- **Linguagem**: TypeScript 5.0+
- **UI Library**: React 18
- **Estilos**: Tailwind CSS 3+
- **Gestão de Estado**: Context API
- **Cliente HTTP**: Fetch API
- **Gestor de Pacotes**: npm

### DevOps & Infra
- **Containerização**: Docker
- **Orquestração**: Docker Compose
- **Controlo de Versão**: Git
- **CI/CD**: GitHub Actions (em preparação)
- **Deployment**: Pronto para Heroku/AWS

### Ferramentas de Desenvolvimento
- **Linting**: ESLint
- **Formatação**: Prettier
- **Debugging**: VS Code DevTools
- **Teste de APIs**: Postman, curl

## 📋 Pré-requisitos

Antes de começar, certifique-se de que tem instalado:

- **Node.js** 18 ou superior ([Download](https://nodejs.org/))
- **npm** 9+ (incluído com Node.js)
- **PostgreSQL** 16 ([Download](https://www.postgresql.org/))
- **Redis** 7 ([Download](https://redis.io/))
- **Docker** e **Docker Compose** ([Download](https://www.docker.com/))

### Verificar Instalações

```bash
# Verificar Node.js
node --version    # Deve ser v18 ou superior

# Verificar npm
npm --version     # Deve ser 9 ou superior

# Verificar Docker
docker --version
docker-compose --version
```

## ⚡ Instalação Rápida

### 1. Clonar o Repositório

```bash
git clone https://github.com/smpsandro1239/EPATV_Site_Empregos_TalentMatch.git
cd EPATV_Site_Empregos_TalentMatch/talentmatch
```

### 2. Instalar Dependências

```bash
# Backend
cd backend
npm install

# Frontend (em outro terminal)
cd ../frontend
npm install
```

### 3. Iniciar Serviços com Docker

```bash
# Voltar à raiz do projeto
cd ..

# Iniciar PostgreSQL, Redis e Meilisearch
docker-compose up -d

# Verificar status dos serviços
docker-compose ps
```

### 4. Configurar Base de Dados

```bash
# Aceder à pasta do backend
cd backend

# Gerar Prisma Client
npm run prisma:generate

# Executar migrations
npm run prisma:migrate

# (Opcional) Preencher com dados de teste
npm run prisma:seed
```

### 5. Iniciar o Backend

```bash
cd backend
npm run start:dev
```

✅ Backend disponível em: `http://localhost:3001`
📚 Documentação Swagger: `http://localhost:3001/docs`

### 6. Iniciar o Frontend (em novo terminal)

```bash
cd frontend
npm run dev
```

✅ Frontend disponível em: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
talentmatch/
├── backend/                      # API NestJS
│   ├── src/
│   │   ├── app.controller.ts    # Controlador principal
│   │   ├── app.module.ts        # Módulo principal
│   │   ├── main.ts              # Ponto de entrada
│   │   ├── common/              # Guards, decoradores, filtros
│   │   ├── config/              # Variáveis de ambiente
│   │   ├── database/            # Configuração de BD
│   │   ├── infra/               # Serviços de infra
│   │   └── modules/             # Módulos de funcionalidades
│   ├── prisma/
│   │   ├── schema.prisma        # Schema da BD
│   │   └── migrations/          # Histórico de alterações
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                     # App Next.js
│   ├── src/
│   │   ├── app/                 # Rotas e layouts
│   │   ├── components/          # Componentes React
│   │   ├── features/            # Lógica de features
│   │   ├── hooks/               # Custom hooks
│   │   ├── lib/                 # Utilitários
│   │   ├── providers/           # Context providers
│   │   ├── services/            # Serviços HTTP
│   │   ├── types/               # Tipos TypeScript
│   │   └── utils/               # Funções auxiliares
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                         # Documentação
│   ├── API_REFERENCE.md         # Referência da API
│   ├── ARCHITECTURE.md          # Arquitetura do sistema
│   ├── DEVELOPMENT_GUIDE.md     # Guia de desenvolvimento
│   └── feature_*.md             # Documentação de features
│
├── docker-compose.yml           # Configuração Docker
├── package.json                 # Scripts root
└── README_PT.md                 # Este ficheiro

```

## 🗂️ Módulos do Backend

- **Auth** - Autenticação e autorização
- **Users** - Gestão de utilizadores
- **Companies** - Gestão de empresas
- **Candidates** - Gestão de candidatos
- **Jobs** - Gestão de vagas
- **Applications** - Gestão de candidaturas
- **Matching** - Sistema de matching inteligente
- **Search** - Busca e filtros

## 📖 Documentação

Para documentação mais detalhada, consulte:

- **[API Reference](./docs/API_REFERENCE.md)** - Endpoints e modelos da API
- **[Arquitetura](./docs/ARCHITECTURE.md)** - Visão geral da arquitetura
- **[Guia de Desenvolvimento](./docs/DEVELOPMENT_GUIDE.md)** - Como desenvolver novas features
- **[Tech Stack](./TECH_STACK.md)** - Detalhes técnicos das tecnologias utilizadas
- **[Quick Start](./QUICKSTART.md)** - Guia de início rápido
- **[Contribuir](./CONTRIBUTING.md)** - Diretrizes para contribuições

## 🔐 Segurança

- ✅ JWT com expiração configurável
- ✅ CORS configurado para segurança
- ✅ Password hashing com Argon2 (não reversível)
- ✅ Proteção contra SQL Injection (uso de Prisma ORM)
- ✅ Proteção contra XSS (sanitização de inputs)
- ✅ Variáveis de ambiente para informações sensíveis
- ✅ Validação de inputs em todos os endpoints

## 🧪 Testes

### Executar Testes

```bash
# Backend
cd backend
npm run test              # Executar testes
npm run test:watch      # Modo watch
npm run test:cov        # Com cobertura

# Frontend
cd frontend
npm run test            # Executar testes
npm run test:watch     # Modo watch
```

## 🔧 Variáveis de Ambiente

### Backend (.env)

```env
# Base de Dados
DATABASE_URL=postgresql://user:password@localhost:5432/talentmatch

# JWT
JWT_SECRET=sua_chave_secreta_muito_segura_aqui
JWT_EXPIRATION=3600

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Servidor
PORT=3001
NODE_ENV=development
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 📊 Endpoints Principais da API

### Autenticação
```
POST   /api/auth/register    # Criar conta
POST   /api/auth/login       # Fazer login
POST   /api/auth/refresh     # Renovar token
GET    /api/auth/me          # Dados do utilizador (autenticado)
```

### Utilizadores
```
GET    /api/users/:id        # Obter utilizador
PUT    /api/users/:id        # Atualizar utilizador
DELETE /api/users/:id        # Eliminar utilizador
```

Para uma lista completa de endpoints, consulte a documentação Swagger em `http://localhost:3001/docs`.

## 🚀 Deploy

### Heroku

```bash
# Login no Heroku
heroku login

# Criar app
heroku create nome-da-sua-app

# Fazer deploy
git push heroku main

# Ver logs
heroku logs --tail
```

### Docker

```bash
# Build
docker-compose build

# Deploy
docker-compose up -d
```

## 🤝 Contribuir

Adoramos contribuições! Por favor, leia o [Guia de Contribuição](./CONTRIBUTING.md) para detalhes sobre o nosso código de conduta e processo de submissão de pull requests.

### Passos para Contribuir

1. **Fork** o repositório
2. Criar uma **branch** para a sua feature (`git checkout -b feature/MinhaFeature`)
3. **Commit** as suas alterações (`git commit -am 'Adiciona MinhaFeature'`)
4. **Push** para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um **Pull Request**

### Diretrizes de Código

- Use TypeScript com tipos explícitos
- Siga a convenção de nomes PT-PT
- Adicione testes para novas funcionalidades
- Mantenha a cobertura de testes acima de 80%
- Use commits semânticos (feat:, fix:, docs:, etc.)
- Escreva documentação clara

## 📋 Roadmap

### Semana 1 ✅ - Autenticação
- ✅ Registo e Login
- ✅ Dashboards por tipo de utilizador

### Semana 2 🚀 - Perfis e Vagas
- 🔄 Perfil de Candidato
- 🔄 Perfil de Empresa
- 🔄 Publicação de Vagas

### Semana 3 ⏳ - Candidaturas
- ⏳ Sistema de Candidaturas
- ⏳ Rastreamento de Status
- ⏳ Workflow de Revisão

### Semana 4 ⏳ - IA e Messaging
- ⏳ Embeddings com OpenAI
- ⏳ Recomendações Inteligentes
- ⏳ Chat em Tempo Real

### Semana 5 ⏳ - Polimento e Deploy
- ⏳ Painel de Administração
- ⏳ Notificações por E-mail
- ⏳ Testes Completos
- ⏳ Deploy em Produção

## 🐛 Reportar Bugs

Encontrou um problema? Abra uma [issue](https://github.com/smpsandro1239/EPATV_Site_Empregos_TalentMatch/issues) com:

- Título claro e descritivo
- Descrição detalhada do problema
- Passos para reproduzir
- Comportamento observado vs. esperado
- Screenshots ou vídeos (se aplicável)

## 💡 Sugestões de Melhorias

Tem uma ideia brilhante? Abra uma [issue](https://github.com/smpsandro1239/EPATV_Site_Empregos_TalentMatch/issues) com:

- Título claro
- Descrição detalhada da sugestão
- Exemplos de como seria útil
- Referências a projetos similares (se houver)

## 📞 Suporte

- 📧 E-mail: [adicionar email de contacto]
- 💬 Discussões: [GitHub Discussions](https://github.com/smpsandro1239/EPATV_Site_Empregos_TalentMatch/discussions)
- 🐦 Twitter: [@smpsandro1239](https://twitter.com/smpsandro1239)

## 📜 Licença

Este projeto está licenciado sob a Licença MIT - consulte o ficheiro [LICENSE](./LICENSE) para detalhes.

---

## 👨‍💻 Autor

Desenvolvido com ❤️ por **Sandro Pereira**

- GitHub: [@smpsandro1239](https://github.com/smpsandro1239)
- LinkedIn: [Sandro Pereira](https://linkedin.com/in/sandro-pereira-a5ab0236)
- Email: smpsandro1239@gmail.com

---

## 🙏 Agradecimentos

- Comunidade Node.js e TypeScript
- Equipa do NestJS
- Comunidade de código aberto

---

## 📈 Status do Projeto

| Componente | Status | % Completo |
|-----------|--------|-----------|
| Autenticação | ✅ Completo | 100% |
| Perfis | ✅ Completo | 90% |
| Vagas | ✅ Completo | 85% |
| Candidaturas | 🔄 Em Progresso | 60% |
| Matching IA | 🔄 Em Progresso | 40% |
| Chat | ⏳ Planeado | 0% |
| Admin Panel | 🔄 Em Progresso | 20% |

---

**Última atualização**: 21 de Janeiro de 2026

Se gostou do projeto, deixe uma ⭐️ no repositório!
