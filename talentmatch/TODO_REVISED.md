# 📋 TalentMatch - Lista de Tarefas (TODO List)

Esta lista reflete o estado atual do projeto baseado na análise do código e documentação.

## ✅ Fase 1: Autenticação & Base (Concluído)
- [x] **Backend**: Sistema de autenticação JWT completo (Register, Login, Refresh, Me).
- [x] **Backend**: RBAC (Controlo de acesso baseado em roles: CANDIDATE, COMPANY, ADMIN).
- [x] **Frontend**: Páginas de Login e Registo funcionais.
- [x] **Frontend**: Contexto de Autenticação (`AuthProvider`) e hook `useAuth`.
- [x] **Frontend**: Proteção de rotas e redirecionamento por role.

## 🔄 Fase 1B/2: Perfis e Gestão (Em Progresso)
- [x] **Backend**: CRUD de Candidatos, Experiências, Educação e Skills.
- [x] **Backend**: CRUD de Empresas.
- [x] **Backend**: CRUD de Vagas e sistema de filtros.
- [x] **Frontend**: Edição básica do perfil de Candidato.
- [ ] **Frontend (Pendente)**: Integrar secções de Experiência, Educação e Skills na página de perfil do Candidato (componentes já existem mas não estão na página).
- [ ] **Frontend (Crítico)**: Implementar a página de perfil da Empresa (atualmente é um placeholder "Coming soon").
- [x] **Frontend**: Formulário de criação de novas vagas por empresas.
- [ ] **Frontend (Pendente)**: Conectar a Dashboard do Candidato com dados reais (atualmente usa dados estáticos/placeholders).
- [ ] **Infraestrutura**: Implementar upload real de ficheiros (CV e Logótipos) - atualmente o sistema usa apenas URLs.

## 🔄 Fase 3: Matching & Candidaturas (Em Progresso)
- [x] **Backend**: CRUD de Candidaturas e fluxo de estados (Submetido, Revisão, Aceite, Rejeitado).
- [x] **Backend**: Algoritmo de Matching Inteligente (Skills, Localização, Nível, Salário).
- [ ] **Frontend (Pendente)**: Exibir scores de matching na listagem de vagas para candidatos.
- [ ] **Frontend (Pendente)**: Página para empresas verem candidatos recomendados por vaga.
- [ ] **Frontend (Pendente)**: Secção de vagas recomendadas para candidatos baseada no matching.

## ⏳ Fase 4: Notificações & Mensagens (Não Iniciado)
- [ ] **Backend**: Notificações em tempo real usando Socket.io.
- [ ] **Backend**: Sistema de Chat em tempo real entre empresas e candidatos.
- [ ] **Frontend**: Interface de Chat e painel de notificações.
- [ ] **Backend**: Integração de notificações por Email (ex: Resend/Postmark).

## ⏳ Fase 5: Admin & Polimento (Não Iniciado)
- [ ] **Full-stack**: Painel de Administração (Moderação de utilizadores/vagas, métricas globais).
- [ ] **Qualidade**: Testes unitários e E2E abrangentes (Jest, Playwright).
- [ ] **UX/UI**: Refinamento de design, animações e responsividade total.
- [ ] **Estabilidade**: Tratamento de erros global e validações rigorosas.

---
*Atualizado em: 24 de Janeiro de 2026*
