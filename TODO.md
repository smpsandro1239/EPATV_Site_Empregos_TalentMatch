# TalentMatch - TODO List & Roadmap de Desenvolvimento

Este documento detalha o progresso atual do projeto TalentMatch e as metas para o futuro.

## 🟢 Concluído (✅) - Implementado nas últimas fases

### Backend (NestJS)
- [x] **Matching Híbrido Avançado**: Integração de 60% lógica determinística (skills, localização, salário) com 40% matching semântico via OpenAI Embeddings.
- [x] **Sistema de Chat em Tempo Real**: Implementação completa usando Socket.io com persistência em base de dados.
- [x] **Centro de Notificações**: Notificações in-app (real-time) e integração base para e-mails via Resend.
- [x] **Gestão de Ficheiros**: Upload real de CVs (PDF) e Logótipos de empresas usando Multer e armazenamento local seguro.
- [x] **IA Assistant**: Rota para geração automática de descrições de vagas e headlines de candidatos usando GPT-4.
- [x] **Moderação Admin**: Dashboards para gestão de utilizadores, moderação de vagas e visualização de métricas globais.
- [x] **Testes Unitários**: Cobertura principal para serviços de Autenticação, Vagas e Matching.

### Frontend (Next.js)
- [x] **Dashboards Interativos**:
    - [x] Uso de **Recharts** para visualização de candidaturas e visualizações de vagas.
    - [x] Painéis específicos para Admin, Empresa e Candidato.
- [x] **Exportação de Dados**: Funcionalidade de download de CV em formato PDF e relatórios de vagas.
- [x] **Experiência do Utilizador (UX)**:
    - [x] Transições de página suaves com **Framer Motion**.
    - [x] Sistema de feedback visual com **react-hot-toast**.
    - [x] Tratamento de erros global com **ErrorBoundary**.
- [x] **Localização**: Interface totalmente traduzida para Português (PT-PT).

## 🟡 Próximos Passos (Curto Prazo)

- [ ] **Integração com Stripe**: Implementar fluxos de subscrição para empresas (Planos Premium para maior visibilidade).
- [ ] **Templates de E-mail**: Criar templates HTML profissionais para as notificações de e-mail (Boas-vindas, Nova Candidatura).
- [ ] **Otimização de Pesquisa**: Integrar Meilisearch ou Algolia para pesquisa de vagas ultra-rápida.

## 🔴 Melhorias Futuras & Sugestões (Roadmap 2.0)

### 1. Funcionalidades Técnicas
- [ ] **Entrevistas por Vídeo**: Integração de WebRTC para chamadas de vídeo diretamente na plataforma.
- [ ] **Multi-idioma (i18n)**: Adicionar suporte para Inglês e Espanhol para expansão do mercado.
- [ ] **App Mobile**: Desenvolvimento de aplicação nativa (React Native ou Flutter) para notificações push móveis.

### 2. Inteligência Artificial (Avançado)
- [ ] **Análise de Sentimento**: Analisar o tom das cartas de apresentação dos candidatos.
- [ ] **Previsão Salarial**: Sugerir intervalos salariais baseados no mercado e nos requisitos da vaga.

### 3. Analytics & SEO
- [ ] **Dashboard de Retenção**: Métricas para empresas sobre o tempo médio de contratação.
- [ ] **SEO Dinâmico**: Otimização automática de metatags para vagas públicas para indexação no Google Jobs.

---
*Status Atual: ~92% Concluído*
*Desenvolvido por Jules (AI Engineer) em colaboração com Sandro Pereira.*
