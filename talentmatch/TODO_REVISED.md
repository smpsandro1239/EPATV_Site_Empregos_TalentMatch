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
- [x] **Frontend**: Integrar secções de Experiência, Educação e Skills na página de perfil do Candidato.
- [x] **Frontend**: Implementar a página de perfil da Empresa.
- [x] **Frontend**: Formulário de criação de novas vagas por empresas.
- [x] **Frontend**: Conectar a Dashboard do Candidato com dados reais.
- [x] **Frontend**: Lista de vagas e detalhes da vaga para empresas com candidatos recomendados.
- [x] **Infraestrutura**: Implementar upload real de ficheiros (CV e Logótipos).

## 🔄 Fase 3: Matching & Candidaturas (Em Progresso)
- [x] **Backend**: CRUD de Candidaturas e fluxo de estados (Submetido, Revisão, Aceite, Rejeitado).
- [x] **Backend**: Algoritmo de Matching Inteligente (Skills, Localização, Nível, Salário).
- [x] **Frontend**: Exibir scores de matching na listagem geral de vagas para candidatos.
- [x] **Frontend**: Página para empresas verem candidatos recomendados por vaga.
- [x] **Frontend**: Secção de vagas recomendadas para candidatos baseada no matching (Dashboard).

## ✅ Fase 4: Notificações & Mensagens (Concluído)
- [x] **Backend**: Notificações em tempo real usando Socket.io.
- [x] **Backend**: Sistema de Chat em tempo real entre empresas e candidatos.
- [x] **Frontend**: Interface de Chat integrada nas candidaturas.
- [x] **Backend**: Integração de notificações por Email (Mock ready).

## ✅ Fase 5: Admin & Polimento (Em Progresso)
- [x] **Full-stack**: Painel de Administração (Moderação de utilizadores/vagas, métricas globais).
- [ ] **Qualidade**: Testes unitários e E2E abrangentes (Jest, Playwright).
- [ ] **UX/UI**: Refinamento de design, animações e responsividade total.
- [ ] **Estabilidade**: Tratamento de erros global e validações rigorosas.

---
*Atualizado em: 24 de Janeiro de 2026*
