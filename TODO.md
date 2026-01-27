# TalentMatch - Roadmap & TODO List

Este documento regista o progresso de desenvolvimento da plataforma TalentMatch, uma solução de recrutamento inteligente com matching semântico e IA.

---

## 🟢 Concluído (✅)

### 🧩 Fase 1: Fundamentos (Auth + Perfis)
- [x] **Autenticação**: Login/Registo, JWT + Refresh Tokens, RBAC (Candidato, Empresa, Admin).
- [x] **Perfis de Candidato**: Dados básicos, experiência, educação, skills e preferências.
- [x] **Perfis de Empresa**: Dados básicos, website, localização e branding inicial (Logo).
- [x] **Upload de Ficheiros**: Sistema funcional para CVs (PDF) e Logótipos (Multer).

### 🧩 Fase 2: Vagas + Candidaturas
- [x] **CRUD de Vagas**: Criação, edição, publicação e alteração de estados (Published, Paused, Closed).
- [x] **Sistema de Candidaturas**: Fluxo completo de submissão e gestão de estados pela empresa.
- [x] **Pesquisa & Filtros**: Listagem de vagas com filtros por localização, nível e tipo de contrato.

### 🧩 Fase 3: Matching Inteligente + IA
- [x] **Algoritmo de Matching Híbrido**: 60% determinístico (skills/salário) + 40% semântico.
- [x] **Integração OpenAI**:
    - [x] Geração de Embeddings para candidatos e vagas.
    - [x] IA Assistant para melhoria de descrições e perfis.
- [x] **Explicação de Score**: Visualização do match score nos dashboards.

### 🧩 Fase 4: Comunicação, Notificações & Admin
- [x] **Chat em Tempo Real**: Mensagens diretas entre empresa e candidato via WebSockets (Socket.io).
- [x] **Centro de Notificações**: Notificações em tempo real e integração base com Resend (Mock fallback).
- [x] **Admin Dashboard**: Gestão de utilizadores, vagas e métricas globais da plataforma.
- [x] **Analytics**: Gráficos dinâmicos (Recharts) em todos os dashboards.
- [x] **Exportação**: Geração de PDF para currículos e relatórios de recrutamento.

---

## 🟡 Próximos Passos (Próximo Sprint)

### 🧩 Fase 5: Premium, Monetização & Multi-Tenant
- [ ] **Integração Stripe**: Checkout e subscrições para empresas (Planos Free, Pro, Enterprise).
- [ ] **Limites por Plano**: Restringir número de vagas e acesso a IA avançada por subscrição.
- [ ] **Gestão de Equipa**: Permitir múltiplos recrutadores na mesma conta de empresa.
- [ ] **Branding por Tenant**: Personalização de cores e subdomínios para empresas Enterprise.

---

## 🔴 Melhorias Futuras & Sugestões (Roadmap 2.0)

### 1. Tecnologia & Infraestrutura
- [ ] **Aplicação Mobile**: Desenvolvimento em React Native para notificações push.
- [ ] **Otimização de Pesquisa**: Integrar Meilisearch para pesquisa "fuzzy" ultra-rápida.
- [ ] **Multi-idioma (i18n)**: Suporte para Inglês e Espanhol.

### 2. Experiência do Utilizador (UX)
- [ ] **Video Entrevistas**: Integração de WebRTC para entrevistas remotas na plataforma.
- [ ] **Templates de E-mail**: E-mails transacionais com design profissional (HTML).

### 3. Inteligência Artificial (Avançado)
- [ ] **Análise de Sentimento**: Avaliação automatizada de cartas de apresentação.
- [ ] **Previsão Salarial**: Sugestões baseadas em tendências de mercado.

---
*Status: 92% Concluído (MVP Pronto para Produção)*
*Última atualização: Julho 2024*
