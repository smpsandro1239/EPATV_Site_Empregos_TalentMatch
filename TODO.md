# TalentMatch - TODO List & Status

Este documento regista o progresso das tarefas para a conclusão do projeto TalentMatch.

## 🟢 Concluído (✅)

### Backend (NestJS)
- [x] **Autenticação & RBAC**: JWT, Roles (ADMIN, CANDIDATE, COMPANY).
- [x] **Perfis**: CRUD para Candidatos e Empresas.
- [x] **Vagas**: Gestão completa de anúncios de emprego.
- [x] **Candidaturas**: Sistema de submissão e alteração de estado.
- [x] **Matching Inteligente**:
    - [x] Algoritmo híbrido (60% determinístico / 40% semântico).
    - [x] Integração com OpenAI Embeddings.
- [x] **Upload de Ficheiros**: Sistema para CVs e Logótipos (Multer).
- [x] **Chat & Notificações**: Socket.io para mensagens em tempo real e notificações in-app.
- [x] **Admin**: Estatísticas globais e moderação.
- [x] **IA Assistant**: Melhoria de descrições e headlines via GPT-4.
- [x] **Testes**: Suíte de testes unitários base para Auth, Jobs e Matching.

### Frontend (Next.js)
- [x] **UI/UX**: Design moderno com Tailwind CSS e Framer Motion.
- [x] **Dashboards**:
    - [x] Candidato: Resumo, candidaturas e recomendações.
    - [x] Empresa: Gestão de vagas, candidatos e estatísticas (Charts).
    - [x] Admin: Painel de controlo global com gráficos.
- [x] **Feedback**: Notificações toast (react-hot-toast) e Error Boundaries.
- [x] **Funcionalidades Extra**:
    - [x] Exportação de CVs e Relatórios para PDF.
    - [x] Filtros avançados de pesquisa.

## 🟡 Em Progresso (🔄)

- [ ] **Integração de Pagamentos**: Implementar Stripe para funcionalidades Premium.
- [ ] **E-mails Transacionais**: Finalizar integração real com Resend (atualmente em mock).
- [ ] **SEO & Performance**: Otimização de meta tags e Core Web Vitals.

## 🔴 Pendente / Futuro (🚀)

- [ ] **Aplicação Mobile**: Versão em React Native.
- [ ] **Video Entrevistas**: Integração com WebRTC para entrevistas remotas.
- [ ] **Multi-idioma (i18n)**: Suporte para Inglês e Espanhol.

---
*Última atualização: Julho 2024*
*Status: 90% Concluído*
