# TalentMatch - Plataforma de Recrutamento Inteligente

O TalentMatch é uma solução moderna de recrutamento que utiliza Inteligência Artificial para ligar os melhores talentos às empresas certas através de um algoritmo de matching híbrido.

## 🚀 Novas Funcionalidades (v1.0)

- **Matching IA**: Algoritmo que combina competências técnicas e análise semântica (OpenAI) para calcular o score de compatibilidade.
- **Chat em Tempo Real**: Comunicação direta entre recrutadores e candidatos via WebSockets.
- **Dashboards Dinâmicos**: Visualização de métricas e estatísticas com gráficos interativos.
- **Gestão de Documentos**: Sistema de upload para CVs e logótipos com exportação para PDF.
- **IA Assistant**: Geração automática de descrições de vagas otimizadas.

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Recharts.
- **Backend**: NestJS, Prisma ORM, PostgreSQL, Socket.io.
- **IA/Serviços**: OpenAI API (Embeddings & GPT-4), Resend (E-mail).
- **Infraestrutura**: Docker, Redis (Cache/WebSockets).

## 📁 Estrutura do Projeto

```text
/talentmatch
├── backend/                # API NestJS
│   ├── src/
│   │   ├── modules/       # Auth, Jobs, Matching (IA), Chat, Notifications
│   │   └── database/      # Prisma & PostgreSQL
├── frontend/              # App Next.js
│   ├── src/
│   │   ├── app/          # Dashboards (Admin, Company, Candidate)
│   │   ├── components/   # UI & Gráficos
│   │   └── services/     # Integração API & Sockets
└── docker-compose.yml     # PostgreSQL, Redis, Meilisearch
```

## ⚙️ Configuração

### Backend (.env)
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/talentmatch"
JWT_SECRET="seu_secret"
OPENAI_API_KEY="sk-..."
RESEND_API_KEY="re_..."
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

## 📊 Status das Fases

- [x] **Fase 1: Fundações** (Auth & Perfis) - **100%**
- [x] **Fase 2: Vagas & Candidaturas** - **100%**
- [x] **Fase 3: Matching Inteligente & IA** - **100%**
- [x] **Fase 4: Dashboards, Chat & Notificações** - **100%**
- [ ] **Fase 5: Premium & Expansão** (Stripe, i18n) - **Em Planeamento**

---
Desenvolvido com foco em performance e inteligência artificial para o mercado de recrutamento moderno.
