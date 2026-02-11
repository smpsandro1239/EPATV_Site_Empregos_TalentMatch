# TalentMatch - Roadmap & TODO List

Este documento regista o progresso de desenvolvimento da plataforma TalentMatch.

---

## 🟢 Concluído (✅)

### 🧩 Fase 1-4: Core Business (MVP)
- [x] **Autenticação**: Login/Registo, JWT + Refresh Tokens, RBAC (Candidato, Empresa, Admin).
- [x] **Perfis**: Perfis completos para Candidato e Empresa.
- [x] **Vagas & Candidaturas**: CRUD total de vagas e gestão de fluxo de candidaturas.
- [x] **Matching Inteligente**: Algoritmo híbrido (Determinístico + OpenAI Semantic).
- [x] **Comunicação**: Chat real-time (Socket.io) e Notificações (in-app/email).
- [x] **Admin**: Painel de moderação e métricas globais.

### 🧩 Fase 5: Monetização & Expansão
- [x] **Integração Stripe**: Sistema de subscrições (Free, Pro, Enterprise) funcional.
- [x] **Gestão de Equipa**: Suporte para múltiplos recrutadores (Multi-tenant).
- [x] **Branding por Tenant**: Personalização de cores e subdomínios (Enterprise).
- [x] **Limites por Plano**: Restrições automáticas baseadas no nível de subscrição.

### 🚀 Melhorias Estratégicas (Roadmap 2.0)
- [x] **Video-Entrevistas**: Chamadas de vídeo integradas via WebRTC no chat.
- [x] **Multi-idioma (i18n)**: Suporte expandido para Português (PT-PT), Inglês, Espanhol e Francês.
- [x] **SEO & Performance**: Metadados dinâmicos, robots.txt e sitemaps otimizados.
- [x] **Mobile Ready**: Infraestrutura para notificações push e registo de dispositivos.
- [x] **Build Fix**: Correção do erro de build na página de faturação (unused variable 'subscription') e outros erros de tipo.
- [x] **PT-PT Localization**: Tradução completa dos perfis (Empresa/Candidato) e gestão de vagas para Português Europeu.
- [x] **Backend Alignment**: Implementação de endpoints em falta para Team, Stats e Branding.

---

## 🟡 Próximos Passos (Roadmap 3.0)

- [ ] **Templates HTML para E-mails**: Refinar o design visual das notificações.
- [ ] **App Mobile Nativa**: Desenvolvimento do cliente React Native.
- [ ] **AI Interviews**: Assistente de IA para pré-triagem em vídeo.
- [ ] **Gamification (Desafios Técnicos)**: Implementar mini-jogos ou desafios de código para candidatos ganharem medalhas e melhorarem o matching score.
- [ ] **Leaderboard de Recrutadores**: Gamificação para o lado das empresas, premiando eficiência no recrutamento.
- [ ] **AI Mock Interviews**: Simulador de entrevistas com IA para candidatos treinarem.

---
*Status: 96% (i18n expandido para 4 idiomas)*
*Última atualização: Fevereiro 2026*

---
## 📝 Notas da Auditoria Técnica (Fev 2026)
- **Estado**: 96% Concluído.
- **Dívida Técnica**: Migrar similaridade vetorial para o PostgreSQL (pgvector).
- **Pendência Crítica**: Implementar UI de Videochamada no Frontend (Backend OK).
- **Otimização**: Refatorar data-fetching para TanStack Query.
