# TalentMatch - Plataforma de Recrutamento Inteligente

O **TalentMatch** é uma solução de recrutamento enterprise-grade que utiliza Inteligência Artificial e tecnologias modernas para conectar talentos a oportunidades de forma eficiente.

## Live Demo

The application is deployed and can be accessed here: [epatv-site-empregos-talent-match-enzg04cf8.vercel.app](httpss://epatv-site-empregos-talent-match-enzg04cf8.vercel.app/)

## 🚀 Funcionalidades Principais

- **Matching IA Híbrido**: Algoritmo que combina competências técnicas com análise semântica OpenAI.
- **Video-Entrevistas**: Chamadas de vídeo integradas via WebRTC para triagem rápida sem sair da plataforma.
- **Multi-Tenant & Branding**: Personalização total de marca e subdomínios para empresas Enterprise.
- **Global & Multilingue**: Suporte nativo para Português, Inglês e Espanhol.
- **Faturação Stripe**: Sistema de subscrições para gestão de planos e monetização.
- **Dashboards & Analytics**: Métricas em tempo real com gráficos interativos.

## 🛠️ Stack Tecnológica

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Recharts.
- **Backend**: NestJS, Prisma ORM, PostgreSQL (pgvector), Redis, Socket.io.
- **IA**: OpenAI (Embeddings & GPT-4).
- **Pagamentos**: Stripe API.
- **Comunicação**: Socket.io & WebRTC (Simple-Peer).

## 📁 Estrutura do Projeto

```text
/talentmatch
├── backend/                # API NestJS (Auth, Jobs, Matching, Billing, Chat, Devices)
├── frontend/              # App Next.js (Dashboards, I18n, WebRTC, Stripe UI)
└── docker-compose.yml     # Infraestrutura (PostgreSQL, Redis)
```

## ⚙️ Configuração para Deploy

### Requisitos de Ambiente (Backend)
- `DATABASE_URL`: PostgreSQL connection string.
- `JWT_SECRET`: Secret para tokens JWT.
- `OPENAI_API_KEY`: Chave da API OpenAI.
- `STRIPE_SECRET_KEY`: Chave secreta do Stripe.
- `STRIPE_WEBHOOK_SECRET`: Secret do webhook do Stripe.
- `RESEND_API_KEY`: API Key para envio de e-mails.

### Requisitos de Ambiente (Frontend)
- `NEXT_PUBLIC_API_URL`: URL do backend.

---
*Status: 100% Concluído*
