# TalentMatch - Plataforma de Recrutamento Inteligente

O **TalentMatch** é uma solução enterprise-grade para recrutamento moderno, utilizando Inteligência Artificial para otimizar o encontro entre talentos e oportunidades.

## 🚀 Funcionalidades Principais

### 🧠 Inteligência Artificial & Matching
- **Matching Híbrido**: Algoritmo que combina critérios determinísticos (competências, salário, localização) com análise semântica via **OpenAI Embeddings**.
- **IA Assistant**: Ferramentas integradas para geração automática de descrições de vagas e otimização de perfis de candidatos.

### 💬 Comunicação & Notificações
- **Real-Time Chat**: Sistema de mensagens diretas entre candidatos e empresas usando **Socket.io**.
- **Notificações Inteligentes**: Alertas em tempo real e e-mails transacionais (via Resend) para atualizações de candidaturas.

### 📊 Dashboards & Analytics
- **Painéis Customizados**: Dashboards específicos para Administradores, Empresas e Candidatos.
- **Visualização de Dados**: Gráficos interativos com **Recharts** para monitorizar performance de vagas e candidaturas.

### 📄 Gestão Documental
- **Upload de CV/Logo**: Suporte integral para PDF e imagens.
- **Exportação para PDF**: Geração de currículos e relatórios profissionais diretamente da plataforma.

## 🛠️ Stack Tecnológica

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Zustand.
- **Backend**: NestJS, Prisma ORM, PostgreSQL (com pgvector), Redis.
- **IA**: OpenAI API (GPT-4 & Text-Embeddings).
- **Infraestrutura**: Docker & Docker Compose.

## 📁 Estrutura do Projeto

```text
/talentmatch
├── backend/                # API NestJS
│   ├── src/
│   │   ├── modules/       # Auth, Jobs, Matching (IA), Chat, Notifications, Admin
│   │   └── database/      # Prisma & PostgreSQL
├── frontend/              # App Next.js
│   ├── src/
│   │   ├── app/          # Rotas e Dashboards
│   │   ├── components/   # Design System e Gráficos
│   │   └── services/     # Clientes API e Sockets
└── docker-compose.yml     # Infraestrutura (DB, Redis)
```

## ⚙️ Configuração Rápida

1. **Clonar e Instalar**:
```bash
git clone ...
cd talentmatch/backend && npm install
cd ../frontend && npm install
```

2. **Ambiente**:
Configurar os ficheiros `.env` no backend e `.env.local` no frontend com as chaves necessárias (`DATABASE_URL`, `OPENAI_API_KEY`, `JWT_SECRET`).

3. **Docker**:
```bash
docker-compose up -d
```

4. **Executar**:
```bash
# Backend
npm run start:dev
# Frontend
npm run dev
```

## 📈 Roadmap

- [x] **Fase 1-4**: MVP Completo (Auth, Jobs, Matching, Chat, Admin).
- [ ] **Fase 5**: Monetização com Stripe e Branding Multi-Tenant.
- [ ] **Roadmap 2.0**: Mobile App e Entrevistas por Vídeo.

---
*Desenvolvido com foco em escalabilidade e excelência técnica.*
