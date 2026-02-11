# 🚀 TalentMatch - Plataforma de Recrutamento Inteligente (AI-Powered)

TalentMatch é uma solução SaaS enterprise de recrutamento que utiliza Inteligência Artificial (OpenAI) para realizar o matching perfeito entre candidatos e empresas. Com uma arquitetura multi-tenant, permite que empresas personalizem a sua identidade visual, gerenciem equipas e realizem entrevistas por vídeo, tudo numa única plataforma.

---

## 🎯 Objetivos do Projeto
- **Eficiência**: Reduzir o tempo de triagem através de algoritmos de matching híbridos.
- **Personalização**: Oferecer uma experiência única para cada empresa (Tenant Branding).
- **Engajamento**: Proporcionar comunicação em tempo real via chat e vídeo.
- **Escalabilidade**: Arquitetura modular preparada para milhares de utilizadores.

---

## ✨ Funcionalidades Principais

### ✅ Implementadas
- **Autenticação RBAC**: Gestão de papéis (Candidato, Empresa, Admin) com JWT e Argon2.
- **Matching Híbrido**: Algoritmo que combina critérios determinísticos (skills, salário, local) com semântica por IA (Embeddings).
- **Gestão de Vagas**: CRUD completo, estados (Rascunho, Publicada, Pausada, Fechada).
- **Candidaturas Inteligentes**: Fluxo de submissão com análise de compatibilidade instantânea.
- **Multi-tenant Branding**: Configuração de cores e subdomínios por empresa.
- **Monetização**: Planos de subscrição integrados com Stripe.
- **Notificações & Chat**: Sistema em tempo real (Socket.io) e e-mails (Resend).
- **Multi-idioma**: Suporte total para PT-PT, EN, ES e FR.

### 🟡 Em Desenvolvimento / Planeado
- **Video-Entrevistas (UI)**: Sinalização backend pronta, interface frontend em desenvolvimento.
- **AI Mock Interviews**: Simulador de entrevistas para candidatos.
- **Gamification**: Desafios técnicos e medalhas para candidatos.
- **App Mobile**: Versão nativa em React Native.

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
- **Estado**: Zustand + React Query (em transição)
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
npm install
npx prisma migrate dev
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run build
npm start
```

---

## 📊 Relatório de Auditoria (Resumo)

### Problemas Identificados
1. **Performance de Busca**: Cálculo de similaridade vetorial feito em JS (recomendado migrar para `pgvector`).
2. **UI de Vídeo**: Ausência de componentes visuais para chamadas WebRTC (backend funcional).
3. **Redundância**: Presença de `bcrypt` e `argon2` nas dependências.

### Recomendações
- Implementar **TanStack Query** globalmente no frontend.
- Centralizar branding via **CSS Variables** num Provider dedicado.
- Migrar i18n para **next-intl middleware** para melhor SEO.

---

## 🛣️ Roadmap 3.0
- [ ] Refactor do matching para base de dados vetorial.
- [ ] Lançamento do módulo de Gamification.
- [ ] Dashboard avançado para Administradores.
- [ ] Assistente de IA para pré-triagem de vídeo.

---
*Gerado automaticamente pela auditoria Jules Engineering.*