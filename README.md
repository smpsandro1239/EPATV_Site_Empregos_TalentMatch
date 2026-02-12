# 🚀 TalentMatch - Plataforma de Recrutamento Inteligente (AI-Powered)

TalentMatch é uma solução SaaS enterprise de recrutamento que utiliza Inteligência Artificial (OpenAI) para realizar o matching perfeito entre candidatos e empresas. Com uma arquitetura multi-tenant, permite que empresas personalizem a sua identidade visual, gerenciem equipas e realizem entrevistas por vídeo, tudo numa única plataforma.

---

## 🌐 Visualização Online
A plataforma está disponível para demonstração em:
👉 **[https://epatv-site-empregos-talent-match.vercel.app/](https://epatv-site-empregos-talent-match.vercel.app/)**

---

## 🔑 Credenciais de Teste
Para explorar a plataforma, pode utilizar as seguintes contas pré-configuradas:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Candidato** | `candidato@test.com` | `TestPass123!` |
| **Empresa** | `empresa@test.com` | `TestPass123!` |
| **Admin** | `admin@talentmatch.com` | `admin123` | *(Se configurado)* |

---

## 🎯 Objetivos do Projeto
- **Eficiência**: Reduzir o tempo de triagem através de algoritmos de matching híbridos.
- **Personalização**: Oferecer uma experiência única para cada empresa (Tenant Branding).
- **Engajamento**: Proporcionar comunicação em tempo real via chat e vídeo.
- **Escalabilidade**: Arquitetura modular preparada para milhares de utilizadores.

---

## ✨ Funcionalidades Principais

### ✅ Implementadas
- **Users Module**: Gestão completa de perfil e segurança.
- **Autenticação RBAC**: Gestão de papéis (Candidato, Empresa, Admin) com JWT e Argon2.
- **Matching Híbrido**: Algoritmo que combina critérios determinísticos (skills, salário, local) com semântica por IA (Embeddings).
- **Gestão de Vagas**: CRUD completo, estados (Rascunho, Publicada, Pausada, Fechada).
- **Candidaturas Inteligentes**: Fluxo de submissão com análise de compatibilidade instantânea.
- **Multi-tenant Branding**: Configuração de cores e subdomínios por empresa. Centralizado via CSS Variables.
- **Monetização**: Planos de subscrição integrados com Stripe (Free, Pro, Enterprise).
- **Notificações & Chat**: Sistema em tempo real (Socket.io) e e-mails (Resend).
- **Multi-idioma**: Suporte total para PT-PT, EN, ES e FR (Custom Provider).
- **Video-Entrevistas (UI)**: Interface WebRTC integrada no chat para entrevistas remotas em tempo real.
- **TanStack Query**: Infraestrutura de data-fetching robusta e cache implementada.

### 🟡 Em Desenvolvimento / Planeado
- **AI Mock Interviews**: Simulador de entrevistas para candidatos treinarem com IA.
- **Gamification**: Desafios técnicos e leaderboard de recrutadores.
- **App Mobile**: Versão nativa desenvolvida em React Native.
- **SEO & i18n Middleware**: Migração para next-intl para otimização de motores de busca.

---

## 🛠️ Stack Tecnológica

### Backend (NestJS)
- **Linguagem**: TypeScript
- **ORM**: Prisma (PostgreSQL)
- **Cache/Queues**: Redis
- **Search**: Meilisearch
- **IA**: OpenAI (Embeddings + GPT-4)
- **Comunicação**: Socket.io / WebRTC

### Frontend (Next.js 14)
- **Arquitetura**: App Router
- **Estilização**: Tailwind CSS + shadcn/ui
- **Estado**: Zustand + TanStack Query
- **Animações**: Framer Motion
- **Gráficos**: Recharts

---

## 📂 Estrutura do Projeto

```text
talentmatch/
├── backend/                # API NestJS
│   ├── prisma/             # Schema e Migrações
│   └── src/
│       ├── common/         # Decorators, Guards, Middlewares
│       ├── database/       # Provider do Prisma
│       └── modules/        # Módulos de negócio (Auth, Jobs, etc.)
├── frontend/               # App Next.js
│   ├── messages/           # Ficheiros de Tradução (i18n)
│   └── src/
│       ├── app/            # Páginas e Rotas
│       ├── components/     # UI Reutilizável
│       ├── hooks/          # Lógica de Estado
│       └── services/       # Clientes API (Axios/Fetch)
└── docker-compose.yml      # Infraestrutura Local (DB, Redis, Search)
```

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- Docker & Docker Compose
- Chaves API: OpenAI, Stripe, Resend.

### 1. Infraestrutura Local
```bash
docker compose up -d
```

### 2. Backend Setup
```bash
cd backend
npm install --legacy-peer-deps
npx prisma migrate dev
npm run start:dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install --legacy-peer-deps
npm run build
npm start
```

---

## 📊 Relatório de Auditoria (Resumo)

### Problemas Identificados
1. **Performance de Busca**: Cálculo de similaridade vetorial feito em JS (recomendado migrar para pgvector).
2. **SEO**: Necessidade de migrar i18n para middleware para melhor indexação e rotas localizadas.

### Melhorias Implementadas Recentes
- **Video UI**: Interface WebRTC totalmente funcional e integrada ao chat.
- **TanStack Query**: Setup concluído e migração de páginas críticas iniciada.
- **Branding Provider**: Centralização de cores dinâmicas via CSS Variables.
- **Test Credentials**: Documentação clara para facilitar a demonstração.
- **Depuração de Dependências**: Remoção de bibliotecas redundantes (bcrypt).

---

## 🛣️ Roadmap 3.0
- [ ] **Migração pgvector**: Refactor do matching para base de dados vetorial nativa.
- [ ] **Technical Challenges**: Módulo de gamificação para candidatos.
- [ ] **Ai Video Pre-screening**: Assistente de IA para análise automática de entrevistas.
- [ ] **Enterprise Dashboard**: Métricas avançadas para grandes empresas.

---
*Documentação atualizada por Jules Engineering.*
