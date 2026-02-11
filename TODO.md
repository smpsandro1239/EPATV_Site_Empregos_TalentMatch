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
- [x] **Gestão de Equipa**: Suporte para múltiplos recrutadores com UX melhorada.
- [x] **Branding por Tenant**: Personalização de cores e subdomínios via CSS Variables.
- [x] **Limites por Plano**: Restrições automáticas baseadas no nível de subscrição.

### 🚀 Melhorias Estratégicas (Roadmap 2.0)
- [x] **Video-Entrevistas**: Chamadas de vídeo integradas via WebRTC (Frontend + Backend).
- [x] **Performance AI**: Migração para **pgvector** para cálculos de similaridade nativos.
- [x] **Data Fetching**: Implementação de **TanStack Query** para cache e performance.
- [x] **Users Module**: Implementação completa de gestão de perfil e segurança de conta.
- [x] **Admin Insights**: Dashboard com estatísticas reais agregadas do banco de dados.
- [x] **Multi-idioma (i18n)**: Suporte expandido para PT-PT, EN, ES e FR.
- [x] **SEO & Performance**: Metadados dinâmicos e infraestrutura pronta para produção.
- [x] **Mobile Ready**: Infraestrutura para notificações push e registo de dispositivos.

---

## 🟡 Próximos Passos (Roadmap 3.0)

- [ ] **Templates HTML para E-mails**: Refinar o design visual das notificações.
- [ ] **App Mobile Nativa**: Desenvolvimento do cliente React Native.
- [ ] **AI Interviews**: Assistente de IA para pré-triagem em vídeo.
- [ ] **Gamification (Desafios Técnicos)**: Implementar mini-jogos ou desafios de código.
- [ ] **AI Mock Interviews**: Simulador de entrevistas com IA para candidatos treinarem.
- [ ] **SEO Middleware**: Migração total para next-intl com roteamento localizado.

---
*Status: 99% (Fases 1-5 + Roadmap 2.0 Concluídos)*
*Última atualização: Fevereiro 2026*

---
## 📝 Notas da Auditoria Técnica
- **Dívida Técnica**: Migração para pgvector concluída ✅.
- **UI de Videochamada**: Implementada e integrada ✅.
- **Otimização**: TanStack Query configurado e em uso ✅.
- **Segurança**: Dependências limpas (Argon2 apenas) ✅.
