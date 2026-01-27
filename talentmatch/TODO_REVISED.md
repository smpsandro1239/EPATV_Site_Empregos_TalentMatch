# 📋 TalentMatch - Lista de Tarefas (TODO List)

Esta lista reflete o estado atual do projeto após as implementações recentes.

## ✅ Fase 1: Autenticação & Base (Concluído)
- [x] **Backend**: Sistema de autenticação JWT completo (Register, Login, Refresh, Me).
- [x] **Backend**: RBAC (Controlo de acesso baseado em roles: CANDIDATE, COMPANY, ADMIN).
- [x] **Frontend**: Páginas de Login e Registo funcionais.
- [x] **Frontend**: Contexto de Autenticação (`AuthProvider`) e hook `useAuth`.
- [x] **Frontend**: Proteção de rotas e redirecionamento por role.

## ✅ Fase 2: Perfis e Gestão (Concluído)
- [x] **Backend**: CRUD de Candidatos, Experiências, Educação e Skills.
- [x] **Backend**: CRUD de Empresas.
- [x] **Backend**: CRUD de Vagas e sistema de filtros.
- [x] **Frontend**: Edição completa do perfil de Candidato (Experiência, Educação, Skills).
- [x] **Frontend**: Edição completa do perfil de Empresa.
- [x] **Frontend**: Formulário de criação de novas vagas por empresas.
- [x] **Frontend**: Conectar Dashboards com dados reais.
- [x] **Infraestrutura**: Sistema de Upload de ficheiros (CV e Logótipos).

## ✅ Fase 3: Matching & Candidaturas (Concluído)
- [x] **Backend**: CRUD de Candidaturas e fluxo de estados.
- [x] **Backend**: Algoritmo de Matching Inteligente (Determinístico).
- [x] **Frontend**: Exibir scores de matching na listagem geral e dashboards.
- [x] **Frontend**: Visualização de candidatos recomendados por vaga para empresas.

## ✅ Fase 4: Notificações & Mensagens (Concluído)
- [x] **Backend**: Notificações em tempo real (Socket.io).
- [x] **Backend**: Sistema de Chat em tempo real entre empresas e candidatos.
- [x] **Frontend**: Interface de Chat integrada.
- [x] **Backend**: Integração real de Email com **Resend**.

## ✅ Fase 5: Administração & Métricas (Concluído)
- [x] **Full-stack**: Painel de Administração (Gestão de utilizadores, vagas e estatísticas).

## ✅ Fase 6: Refinamento & UX (Concluído)
- [x] **Frontend**: Sistema de Notificações Internas (In-app).
- [x] **UX/UI**: Feedback visual com Toasts e Animações (Framer Motion).
- [x] **Estabilidade**: Boundary de erro global e localização em PT-PT.

## ✅ Fase 7: Qualidade & Exportação (Concluído)
- [x] **Qualidade**: Testes unitários base no Backend.
- [x] **Funcionalidade**: Exportação de currículos e relatórios de vagas em **PDF**.

---

## 🚀 O QUE FALTA REALIZAR (Pendente)

### 1. Infraestrutura & IA Avançada
- [ ] **Storage**: Integração com **AWS S3** para armazenamento de ficheiros na cloud (atualmente local).
- [ ] **IA**: Integração do Matching Semântico usando os **Embeddings** da OpenAI (Infraestrutura pronta, falta integrar no cálculo de score).

### 2. Novas Funcionalidades
- [ ] **Pesquisa Global de Candidatos**: Permitir que empresas procurem talentos fora do contexto de uma vaga específica.
- [ ] **Filtros Avançados**: Melhorar filtros de pesquisa com categorias dinâmicas.

---

## 💡 SUGESTÕES DE MELHORIA (Good to Have)

### 1. Interface (UI/UX)
- [ ] **Modo Escuro (Dark Mode)**: Suporte para tema escuro em toda a plataforma.
- [ ] **Gráficos Avançados**: Usar Tremor ou Recharts para visualizar métricas de recrutamento.
- [ ] **Skeleton Loaders**: Melhorar a perceção de carregamento em vez de spinners.

### 2. Qualidade & Funcionalidade
- [ ] **Testes E2E**: Implementar fluxos de teste automáticos com Playwright.
- [ ] **Multi-idioma (i18n)**: Suporte para Inglês além do Português.
- [ ] **Social Login**: Login com Google ou LinkedIn.

---
*Atualizado em: 27 de Janeiro de 2026*
