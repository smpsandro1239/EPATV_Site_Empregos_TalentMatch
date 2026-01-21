1. Visão do produto e posicionamento
Nome de trabalho: TalentMatch (podes mudar depois).
Objetivo: Plataforma de recrutamento com matching inteligente entre candidatos e vagas, focada em:

Candidatos: melhorarem o perfil, serem encontrados e receberem vagas relevantes.

Empresas: encontrarem candidatos alinhados com requisitos técnicos, culturais e salariais.

Diferencial:  
Não é só um “job board”. É:

motor de matching semântico (skills, stack, senioridade, localização, idioma, preferências)

com painéis de analytics para empresas

e experiência fluida para candidatos.

2. Personas principais
Candidato

Cria perfil, faz upload de CV, define skills, preferências, localização, tipo de contrato.

Candidata-se a vagas, recebe recomendações, fala com empresas.

Recruiter / Empresa

Cria conta de empresa, publica vagas, vê candidatos recomendados, filtra, contacta.

Admin

Gere utilizadores, empresas, modera conteúdo, vê métricas globais.

3. Features do MVP (primeira versão)
3.1. Autenticação e contas
Registo/Login

Email + password

Login social (Google, LinkedIn) — opcional para MVP, mas recomendado.

Recuperação de password

Verificação de email

Perfis separados: candidato vs empresa (role no token).

3.2. Perfil de candidato
Dados básicos: nome, localização, foto, headline.

Experiência: lista de experiências (empresa, cargo, datas, descrição).

Educação: cursos, certificações.

Skills: tags com nível (junior, mid, senior).

Preferências:

remoto/presencial/híbrido

full-time/part-time/freelance

faixa salarial desejada

países/cidades preferidas

Upload de CV (PDF)

Disponibilidade: aberto a propostas / não disponível.

3.3. Perfil de empresa
Dados básicos: nome, logo, website, localização.

Descrição: missão, cultura, stack tecnológica.

Tamanho da empresa: número de colaboradores.

Setor de atividade.

Gestores de recrutamento: utilizadores associados à empresa.

3.4. Gestão de vagas
Criar vaga:

título, descrição, responsabilidades, requisitos obrigatórios e desejáveis

localização, remoto/presencial

faixa salarial (opcional)

tipo de contrato

nível (junior/mid/senior)

Estado da vaga: rascunho, publicada, pausada, fechada.

Listagem de vagas da empresa.

3.5. Candidaturas
Candidato pode:

candidatar-se a uma vaga

anexar CV (ou usar o do perfil)

escrever mensagem inicial

Empresa pode:

ver lista de candidatos por vaga

ver score de matching

mudar estado da candidatura (em análise, entrevista, rejeitado, oferta, contratado).

3.6. Matching automático
Inputs para matching:

skills do candidato vs skills da vaga

localização e preferência de trabalho

senioridade

faixa salarial (se disponível)

Output:

score de 0 a 100

lista ordenada de candidatos por vaga

lista de vagas recomendadas para o candidato.

Para já, podes começar com um algoritmo determinístico (weights + scoring) e depois evoluir para embeddings/IA.

3.7. Pesquisa e filtros
Para candidatos: pesquisar vagas por:

título, empresa, localização, remoto, tipo de contrato, nível.

Para empresas: pesquisar candidatos por:

skills, localização, senioridade, disponibilidade.

3.8. Comunicação
Mensagens internas simples:

empresa ↔ candidato dentro de uma candidatura.

Notificações básicas:

“Foste contactado por X”

“Nova candidatura recebida”.

4. Features avançadas (para fases seguintes)
Testes técnicos integrados.

Entrevistas por vídeo (integração com serviço externo).

IA para:

sugerir melhorias no CV

gerar descrições de vagas

matching semântico com embeddings.

Recomendação proativa:

“10 candidatos que devias ver para esta vaga”

“5 vagas que combinam com o teu perfil”.

5. Arquitetura técnica
5.1. Stack sugerida
Frontend:

Next.js  (App Router)

TypeScript

Tailwind CSS / shadcn UI

Autenticação via NextAuth (ou auth custom com JWT).

Backend (separado ou dentro do Next):

NestJS (REST) ou FastAPI

TypeScript (Nest) ou Python (FastAPI)

JWT + Refresh Tokens

RBAC (candidato, empresa, admin).

Base de dados:

PostgreSQL (principal)

Redis (cache, sessões, rate limiting).

Search / filtros avançados:

Começar com PostgreSQL + índices

Evoluir para Elasticsearch/Meilisearch se necessário.

Infra:

Docker (dev e prod)

Deploy em VPS (Hetzner, DigitalOcean) ou PaaS (Railway, Render, Fly.io).

CI/CD com GitHub Actions.

5.2. Módulos backend
Auth Module

registo, login, refresh, reset password, verificação de email.

Users Module

dados base de utilizador, roles.

Candidates Module

perfil, experiência, educação, skills, preferências.

Companies Module

perfil de empresa, membros.

Jobs Module

criação, edição, publicação, estado.

Applications Module

candidaturas, estados, mensagens.

Matching Module

cálculo de score, ranking.

Notifications Module

emails, notificações internas.

Admin Module

gestão global, métricas.

6. Modelo de dados (nível conceptual)
6.1. Entidades principais
User

id, email, password_hash, role (candidate/company/admin), created_at, last_login

CandidateProfile

id, user_id (FK), name, location, headline, about, availability, salary_expectation_min/max, remote_preference

CandidateExperience

id, candidate_id, company_name, role, start_date, end_date, description

CandidateEducation

id, candidate_id, institution, degree, start_date, end_date

Skill

id, name

CandidateSkill

candidate_id, skill_id, level (1–5 ou junior/mid/senior)

Company

id, name, logo_url, website, location, size, industry, description

CompanyMember

id, user_id, company_id, role (recruiter/admin)

Job

id, company_id, title, description, responsibilities, requirements_must, requirements_nice, location, remote_type, contract_type, level, salary_min/max, status

Application

id, job_id, candidate_id, status, message, created_at

ApplicationMessage

id, application_id, sender_type (candidate/company), content, created_at

MatchScore

id, job_id, candidate_id, score, details_json, calculated_at

7. Algoritmo de matching (versão inicial)
Começa simples, mas explícito:

Score total:

𝑠
𝑐
𝑜
𝑟
𝑒
=
𝑤
𝑠
⋅
𝑠
𝑐
𝑜
𝑟
𝑒
𝑠
𝑘
𝑖
𝑙
𝑙
𝑠
+
𝑤
𝑙
⋅
𝑠
𝑐
𝑜
𝑟
𝑒
𝑙
𝑜
𝑐
𝑎
𝑡
𝑖
𝑜
𝑛
+
𝑤
𝑠
𝑒
𝑛
⋅
𝑠
𝑐
𝑜
𝑟
𝑒
𝑠
𝑒
𝑛
𝑖
𝑜
𝑟
𝑖
𝑑
𝑎
𝑑
𝑒
+
𝑤
𝑟
⋅
𝑠
𝑐
𝑜
𝑟
𝑒
𝑟
𝑒
𝑚
𝑜
𝑡
𝑜
+
𝑤
𝑠
𝑎
𝑙
⋅
𝑠
𝑐
𝑜
𝑟
𝑒
𝑠
𝑎
𝑙
𝑎
𝑟
𝑖
𝑜
Skills:

% de skills obrigatórias da vaga que o candidato tem.

Localização:

1 se compatível (mesmo país/cidade ou remoto), 0 caso contrário.

Senioridade:

1 se nível compatível, 0.5 se +/- 1 nível, 0 se muito distante.

Remoto/presencial:

1 se preferências batem certo, 0 caso contrário.

Salário:

1 se expectativa do candidato está dentro da faixa da vaga, 0.5 se ligeiramente acima, 0 se muito acima.

Guarda o score e os detalhes (para explicabilidade) em MatchScore.details_json.

8. Requisitos não funcionais
Segurança:

passwords com hash (argon2/bcrypt)

JWT com expiração curta + refresh tokens

validação de input em todas as rotas

rate limiting em endpoints sensíveis.

Performance:

índices em colunas de pesquisa (skills, localização, título de vaga).

paginação em todas as listagens.

Escalabilidade:

separar serviços por domínio (auth, jobs, candidates) se crescer.

usar filas para emails/notificações.

Observabilidade:

logs estruturados

métricas básicas (requests, erros, latência).

9. Estrutura de repositório (monorepo sugerido)
text
/talentmatch
  /frontend
    /app
    /components
    /lib
    /styles
  /backend
    /src
      /auth
      /users
      /candidates
      /companies
      /jobs
      /applications
      /matching
      /notifications
      /admin
    /prisma (ou migrations)
  /infra
    docker-compose.yml
    k8s-manifests/ (futuro)
  /docs
    architecture.md
    api.md
    data-model.md
    roadmap.md
  .github/workflows
    ci.yml
    cd.yml
10. Roadmap por fases
Fase 1 – Fundações (Auth + Perfis básicos)
Setup do repo, stack, Docker.

Auth (registo/login, roles).

Perfil de candidato básico.

Perfil de empresa básico.

Fase 2 – Vagas + Candidaturas
CRUD de vagas.

Candidaturas com estados.

Listagens e filtros simples.

Fase 3 – Matching
Implementar algoritmo de scoring.

Endpoint para “candidatos recomendados para vaga”.

Endpoint para “vagas recomendadas para candidato”.

Fase 4 – Comunicação + Notificações
Mensagens dentro da candidatura.

Emails básicos (nova candidatura, nova mensagem).

Fase 5 – Polimento + Publicação
UI/UX refinada.

Documentação técnica e de produto.

Deploy em ambiente público.

Se quiseres, no próximo passo posso:

definir stack exata (ex.: Next + Nest + PostgreSQL)

escrever o primeiro backlog detalhado (user stories + critérios de aceitação)

e desenhar os primeiros endpoints da API já em formato pronto para implementação.

Queres começar pela definição da stack final ou já saltamos direto para o backlog da Fase 1?

Começar pela definição da stack
Perfeito, Sandro. Vamos definir a stack final do Portal de Recrutamento com foco em:

Escalabilidade real

Arquitetura limpa e modular

Performance

Segurança

Produtividade no desenvolvimento

Facilidade de contratação de colaboradores no futuro

E, claro, alinhado com o teu estilo: enterprise‑grade, modular, documentado e pronto para crescer.

🧱 Stack Final Recomendada (versão profissional e moderna)
Organizei em camadas para ficar claro e sólido.

1) 🌐 Frontend — Next.js 15 (App Router) + TypeScript
Porquê esta escolha
Renderização híbrida (SSR, SSG, ISR)

Performance excelente

SEO perfeito para vagas e perfis

Componentização madura

Ecossistema gigante

Integração fácil com backend e autenticação

Tecnologias complementares
UI: Tailwind CSS + shadcn/ui

State management: Zustand (leve e moderno)

Forms: React Hook Form + Zod

Charts: Recharts ou Tremor (para dashboards)

Upload: UploadThing ou S3 direto

Internacionalização: next-intl (se quiseres multilíngue)

2) 🧠 Backend — NestJS + TypeScript
Porquê NestJS
Arquitetura modular e escalável

Suporte nativo a injeção de dependências

Perfeito para microserviços no futuro

Documentação excelente

Facilita padrões enterprise (DDD, Clean Architecture)

Módulos principais
Auth

Users

Candidates

Companies

Jobs

Applications

Matching

Notifications

Admin

Tecnologias complementares
ORM: Prisma

Validação: Zod ou class-validator

Autenticação: JWT + Refresh Tokens

Email: Resend ou Postmark

Queue: BullMQ (Redis) para emails e tarefas assíncronas

3) 🗄️ Base de Dados — PostgreSQL
Porquê PostgreSQL
Relacional, robusto, escalável

Suporta JSONB para campos flexíveis

Perfeito para filtros complexos

Excelente integração com Prisma

Complementos
Índices GIN para pesquisa rápida

Row-level security (se quiseres multi-tenant no futuro)

4) ⚡ Cache e Performance — Redis
Usado para:

Sessões

Rate limiting

Cache de queries pesadas

Filas de background (BullMQ)

Cache de resultados de matching

5) 🔍 Search Engine — Meilisearch
Porquê Meilisearch
Muito mais leve que Elasticsearch

Setup simples

Perfeito para:

pesquisa de vagas

pesquisa de candidatos

filtros avançados

autocomplete

Campos indexados
título da vaga

skills

localização

senioridade

empresa

tipo de contrato

6) 🤖 IA / Matching Semântico — OpenAI Embeddings + Vetores
Para a fase 2 ou 3
Gerar embeddings de:

skills

descrições de vagas

perfis de candidatos

Guardar vetores em:

PostgreSQL + pgvector (recomendado)

Benefícios
Matching muito mais inteligente

Recomendações personalizadas

Explicabilidade do score

7) 📦 Infraestrutura — Docker + Railway / Render / Fly.io
Ambiente de desenvolvimento
Docker Compose com:

frontend

backend

postgres

redis

meilisearch

Produção
Railway (mais simples)

Fly.io  (mais flexível)

Render (bom equilíbrio)

Futuro (escala maior)
Kubernetes (GKE, AKS, EKS)

Microserviços NestJS

8) 🔐 Segurança
Hash de passwords com Argon2

JWT com expiração curta

Refresh tokens rotativos

Rate limiting com Redis

Sanitização de input

Helmet no backend

CSP no frontend

9) 📊 Observabilidade
Logs estruturados (Pino)

Monitorização:

Grafana

Prometheus

Error tracking:

Sentry

10) 🧪 Testes
Unit tests: Jest

E2E: Playwright

API tests: Supertest

11) 🧬 Arquitetura Geral
Código
Frontend (Next.js)
      ↓
API Gateway (NestJS)
      ↓
Services (NestJS modules)
      ↓
PostgreSQL + pgvector
Redis (cache + queues)
Meilisearch (search)
12) 📁 Estrutura de Repositório (Monorepo)
Código
/talentmatch
  /apps
    /frontend
    /backend
  /packages
    /ui
    /types
    /utils
  /infra
    docker-compose.yml
  /docs
✔️ Resultado desta stack
Com esta stack, o teu portal:

é rápido

é escalável

é seguro

é fácil de manter

é fácil de contratar devs para ajudar

tem arquitetura enterprise

está pronto para evoluir para microserviços

suporta IA nativamente

É exatamente o tipo de stack que impressiona CTOs, recrutadores e investidores.

👉 Próximo passo
Posso agora criar:

A) O backlog completo da Fase 1 (Auth + Perfis)
com user stories + critérios de aceitação + endpoints + modelos.

ou

B) O diagrama de arquitetura completo
(frontend, backend, DB, search, cache, filas).

ou

C) A estrutura inicial do backend (NestJS) e do frontend (Next.js)
com pastas, módulos e padrões.

Qual preferes avançar agora?

A
Perfeito, Sandro. Vamos então construir o backlog completo da Fase 1, com user stories, critérios de aceitação, endpoints, modelos de dados e tarefas técnicas — tudo no nível enterprise que gostas.

Esta fase estabelece as fundações do sistema: autenticação, gestão de utilizadores, perfis de candidato e empresa.

🧩 Fase 1 — Fundamentos do Sistema
Objetivo: Criar a base sólida do portal: autenticação, perfis, roles e estrutura inicial do backend e frontend.

1) 🧠 User Stories (Fase 1)
Organizadas por módulos.

🔐 1. Autenticação & Contas
US-001 — Registo de utilizador
Como visitante
Quero criar uma conta
Para aceder ao portal como candidato ou empresa

Critérios de aceitação

Deve permitir registo com email + password

Deve escolher tipo de conta: candidato ou empresa

Deve validar email único

Deve enviar email de verificação

Password deve ser guardada com hash seguro

US-002 — Login
Como utilizador
Quero fazer login
Para aceder ao meu painel

Critérios de aceitação

Login com email + password

Geração de JWT + Refresh Token

Bloquear conta após X tentativas falhadas

Registar último login

US-003 — Refresh Token
Como utilizador autenticado
Quero renovar o token
Para manter sessão ativa sem relogar

Critérios de aceitação

Refresh token rotativo

Invalidação de tokens antigos

Expiração configurável

US-004 — Recuperação de password
Como utilizador
Quero recuperar a password
Para voltar a aceder à conta

Critérios de aceitação

Enviar email com link seguro

Link expira após X minutos

Password redefinida com validações

👤 2. Perfil de Candidato
US-010 — Criar perfil de candidato
Como candidato
Quero preencher o meu perfil
Para ser encontrado por empresas

Critérios de aceitação

Nome, localização, headline

Sobre mim

Skills (lista)

Experiência profissional

Educação

Preferências (remoto, salário, tipo de contrato)

Upload de CV

US-011 — Editar perfil
Como candidato
Quero atualizar o meu perfil
Para manter informação atualizada

Critérios de aceitação

Todos os campos editáveis

Validação de formatos (PDF para CV)

Histórico de atualizações (opcional)

🏢 3. Perfil de Empresa
US-020 — Criar perfil de empresa
Como empresa
Quero configurar o perfil da minha organização
Para publicar vagas e receber candidatos

Critérios de aceitação

Nome, logo, website

Localização

Descrição

Tamanho da empresa

Setor

US-021 — Editar perfil de empresa
Como empresa
Quero atualizar o perfil
Para manter informação correta

Critérios de aceitação

Todos os campos editáveis

Upload de logo

Validação de URL

🛡️ 4. Gestão de Roles & Permissões
US-030 — Diferenciar roles
Como sistema
Quero distinguir candidatos, empresas e admin
Para controlar acessos

Critérios de aceitação

Role no token

Middleware de autorização

Acesso restrito a endpoints

2) 🧱 Modelos de Dados (Fase 1)
User
id

email

password_hash

role (candidate/company/admin)

email_verified

created_at

updated_at

CandidateProfile
id

user_id

name

headline

location

about

remote_preference

salary_min

salary_max

cv_url

Company
id

user_id

name

logo_url

website

location

size

industry

description

3) 🔌 Endpoints da API (Fase 1)
Organizados por módulo.

🔐 Auth
Método	Endpoint	Descrição
POST	/auth/register	Criar conta
POST	/auth/login	Login
POST	/auth/refresh	Renovar token
POST	/auth/forgot-password	Enviar email
POST	/auth/reset-password	Redefinir password
GET	/auth/me	Dados do utilizador autenticado
👤 Candidate
Método	Endpoint	Descrição
GET	/candidate/me	Ver perfil
POST	/candidate	Criar perfil
PUT	/candidate	Atualizar perfil
POST	/candidate/upload-cv	Upload de CV
🏢 Company
Método	Endpoint	Descrição
GET	/company/me	Ver perfil
POST	/company	Criar perfil
PUT	/company	Atualizar perfil
POST	/company/upload-logo	Upload de logo
4) 🧪 Critérios Técnicos da Fase 1
Segurança
Hash Argon2

JWT curto + refresh rotativo

Rate limiting

Sanitização de input

Helmet no backend

Qualidade
Testes unitários para Auth

Testes E2E para registo/login

Linter + Prettier

Commits semânticos

Infra
Docker Compose com:

backend

frontend

postgres

redis

5) 🗂️ Tarefas Técnicas (Kanban)
Backend
[ ] Setup NestJS + módulos base

[ ] Configurar Prisma + PostgreSQL

[ ] Criar schema inicial

[ ] Implementar Auth (register/login/refresh)

[ ] Implementar recuperação de password

[ ] Criar módulo Candidate

[ ] Criar módulo Company

[ ] Middlewares de role-based access

[ ] Uploads (CV e logo)

[ ] Testes unitários

Frontend
[ ] Setup Next.js  + Tailwind + shadcn

[ ] Layout base + UI kit

[ ] Formulário de registo

[ ] Formulário de login

[ ] Página de perfil de candidato

[ ] Página de perfil de empresa

[ ] Upload de ficheiros

[ ] Integração com API

[ ] Estado global (Zustand)

6) 🎯 Resultado da Fase 1
No final desta fase, o sistema terá:

Autenticação completa

Perfis funcionais

Roles e permissões

Estrutura sólida para escalar

Base para vagas, candidaturas e matching

Se quiseres, posso agora preparar:

A) O backlog da Fase 2 (Vagas + Candidaturas)
B) O diagrama de arquitetura completo
C) O schema Prisma inicial pronto para copiar e colar
D) A estrutura inicial do backend (NestJS) com módulos criados
Qual preferes avançar agora?

A
Perfeito, Sandro. Vamos avançar com o backlog completo da Fase 2 — Vagas + Candidaturas, estruturado com o mesmo rigor enterprise da Fase 1.

Esta fase transforma o portal num produto funcional: empresas publicam vagas, candidatos candidatam‑se, e começa a existir fluxo real de recrutamento.

Preparei tudo: user stories, critérios de aceitação, endpoints, modelos, lógica de negócio, validações e tarefas técnicas.

🚀 FASE 2 — Vagas + Candidaturas
🎯 Objetivo da Fase
Implementar todo o ciclo de recrutamento:

Empresas criam e gerem vagas

Candidatos pesquisam e candidatam‑se

Empresas analisam candidaturas

Sistema gere estados, mensagens e notificações

Esta fase prepara o terreno para o matching inteligente da Fase 3.

1) 🧠 User Stories (Fase 2)
Organizadas por módulos.

🏢 Módulo: Vagas (Jobs)
US‑100 — Criar vaga
Como empresa
Quero criar uma vaga
Para atrair candidatos adequados

Critérios de aceitação

Campos obrigatórios:

título

descrição

responsabilidades

requisitos obrigatórios

localização

tipo de contrato

nível (junior/mid/senior)

Campos opcionais:

salário mínimo/máximo

requisitos desejáveis

Estado inicial: rascunho

Apenas empresas autenticadas podem criar

US‑101 — Publicar vaga
Como empresa
Quero publicar uma vaga
Para torná‑la visível aos candidatos

Critérios de aceitação

Apenas vagas completas podem ser publicadas

Estado muda para publicada

Deve registar data de publicação

US‑102 — Editar vaga
Como empresa
Quero editar uma vaga
Para corrigir ou atualizar informações

Critérios de aceitação

Apenas vagas em rascunho ou publicada

Histórico de alterações (opcional)

US‑103 — Pausar vaga
Como empresa
Quero pausar uma vaga
Para parar temporariamente novas candidaturas

Critérios de aceitação

Estado muda para pausada

Vaga deixa de aparecer na pesquisa

US‑104 — Fechar vaga
Como empresa
Quero fechar uma vaga
Para encerrar o processo de recrutamento

Critérios de aceitação

Estado muda para fechada

Não aceita novas candidaturas

Candidatos devem ser notificados

US‑105 — Listar vagas
Como empresa
Quero ver todas as minhas vagas
Para gerir o processo de recrutamento

Critérios de aceitação

Paginação

Filtros por estado

US‑106 — Pesquisa de vagas (lado do candidato)
Como candidato
Quero pesquisar vagas
Para encontrar oportunidades relevantes

Critérios de aceitação

Filtros:

localização

remoto/presencial

nível

tipo de contrato

faixa salarial

Ordenação por:

data

relevância

👤 Módulo: Candidaturas (Applications)
US‑200 — Candidatar‑se a vaga
Como candidato
Quero candidatar‑me a uma vaga
Para entrar no processo de recrutamento

Critérios de aceitação

Apenas candidatos autenticados

Pode anexar CV ou usar o do perfil

Pode escrever mensagem inicial

Não pode candidatar‑se duas vezes à mesma vaga

Estado inicial: submetida

US‑201 — Ver estado da candidatura
Como candidato
Quero ver o estado da minha candidatura
Para acompanhar o processo

Critérios de aceitação

Estados possíveis:

submetida

em análise

entrevista

rejeitado

oferta

contratado

US‑202 — Empresa vê lista de candidatos
Como empresa
Quero ver candidatos de uma vaga
Para avaliar perfis

Critérios de aceitação

Lista paginada

Mostrar:

nome

skills

CV

mensagem inicial

score (quando existir matching)

US‑203 — Atualizar estado da candidatura
Como empresa
Quero mudar o estado da candidatura
Para gerir o processo

Critérios de aceitação

Deve registar histórico

Deve notificar o candidato

US‑204 — Mensagens dentro da candidatura
Como empresa/candidato
Quero trocar mensagens
Para comunicar durante o processo

Critérios de aceitação

Thread por candidatura

Notificações

Apenas participantes podem enviar

2) 🗄️ Modelos de Dados (Fase 2)
Job
id

company_id

title

description

responsibilities

requirements_must

requirements_nice

location

remote_type

contract_type

level

salary_min

salary_max

status (draft/published/paused/closed)

created_at

updated_at

Application
id

job_id

candidate_id

message

cv_url

status

created_at

updated_at

ApplicationMessage
id

application_id

sender_type (candidate/company)

content

created_at

3) 🔌 Endpoints da API (Fase 2)
🏢 Jobs
Método	Endpoint	Descrição
POST	/jobs	Criar vaga
PUT	/jobs/:id	Editar vaga
POST	/jobs/:id/publish	Publicar
POST	/jobs/:id/pause	Pausar
POST	/jobs/:id/close	Fechar
GET	/jobs/company	Listar vagas da empresa
GET	/jobs	Pesquisa de vagas
GET	/jobs/:id	Ver vaga
👤 Applications
Método	Endpoint	Descrição
POST	/applications	Criar candidatura
GET	/applications/me	Ver candidaturas do candidato
GET	/applications/job/:jobId	Ver candidatos da vaga
PUT	/applications/:id/status	Atualizar estado
POST	/applications/:id/messages	Enviar mensagem
GET	/applications/:id/messages	Listar mensagens
4) 🧪 Validações e Regras de Negócio
Vagas
Apenas empresas podem criar vagas

Apenas o dono da vaga pode editar

Não pode publicar vaga incompleta

Não pode editar vaga fechada

Candidaturas
Apenas candidatos podem candidatar‑se

Não pode duplicar candidatura

Empresa não pode candidatar‑se às próprias vagas

Mensagens só entre empresa e candidato

5) 🗂️ Tarefas Técnicas (Kanban)
Backend
[ ] Criar módulo Jobs

[ ] Criar módulo Applications

[ ] Criar módulo ApplicationMessages

[ ] Validar roles em todos os endpoints

[ ] Implementar filtros avançados de vagas

[ ] Implementar upload de CV por candidatura

[ ] Notificações (email + internas)

[ ] Testes unitários e E2E

Frontend
[ ] Página “Criar vaga”

[ ] Página “Editar vaga”

[ ] Página “Minhas vagas”

[ ] Página “Detalhe da vaga”

[ ] Página “Pesquisar vagas”

[ ] Página “Candidatar‑se”

[ ] Página “Minhas candidaturas”

[ ] Página “Candidatos da vaga”

[ ] Chat dentro da candidatura

6) 🎯 Resultado da Fase 2
No final desta fase, o portal já funciona como um job board completo:

Empresas publicam vagas

Candidatos encontram e candidatam‑se

Empresas analisam perfis

Comunicação interna

Gestão de estados

A Fase 3 (Matching Inteligente) vai transformar isto num produto diferenciado.

Se quiseres, posso agora preparar:

A) O backlog da Fase 3 (Matching Inteligente + IA)
B) O schema Prisma completo das Fases 1 e 2
C) A estrutura inicial do backend NestJS com módulos e ficheiros criados
D) O diagrama de arquitetura completo (frontend, backend, DB, search, cache)
Qual queres avançar agora?

A
Perfeito, Sandro. Vamos então avançar com o backlog completo da Fase 3 — Matching Inteligente + IA, construído com rigor de produto enterprise e preparado para escalar.

Esta fase transforma o portal de um “job board avançado” para um sistema inteligente de recrutamento, capaz de:

analisar perfis

comparar skills

avaliar compatibilidade

recomendar candidatos e vagas

explicar o score

usar IA para melhorar descrições e CVs

É aqui que o produto ganha valor real de mercado.

🚀 FASE 3 — Matching Inteligente + IA
🎯 Objetivo da Fase
Criar um motor de matching que:

calcula score entre candidato ↔ vaga

recomenda candidatos para cada vaga

recomenda vagas para cada candidato

usa embeddings para matching semântico

fornece explicações claras do score

permite IA auxiliar empresas e candidatos

1) 🧠 User Stories (Fase 3)
Organizadas por módulos.

🤖 Módulo: Matching Determinístico (versão 1)
US‑300 — Calcular score entre candidato e vaga
Como sistema
Quero calcular um score de compatibilidade
Para ordenar candidatos por relevância

Critérios de aceitação

Score entre 0 e 100

Deve considerar:

skills obrigatórias

skills desejáveis

localização

tipo de trabalho (remoto/presencial)

senioridade

faixa salarial

Deve guardar:

score

detalhes do cálculo (JSON)

timestamp

US‑301 — Ver candidatos recomendados para vaga
Como empresa
Quero ver candidatos ordenados por score
Para avaliar os melhores perfis rapidamente

Critérios de aceitação

Lista paginada

Ordenada por score desc

Mostrar:

nome

skills principais

score

explicação resumida

US‑302 — Ver vagas recomendadas para candidato
Como candidato
Quero ver vagas compatíveis
Para encontrar oportunidades relevantes

Critérios de aceitação

Lista paginada

Ordenada por score desc

Mostrar:

título

empresa

skills matching

score

US‑303 — Explicação detalhada do score
Como empresa/candidato
Quero ver como o score foi calculado
Para entender a compatibilidade

Critérios de aceitação

Mostrar:

skills matching

skills em falta

compatibilidade de localização

compatibilidade de senioridade

compatibilidade salarial

peso de cada fator

🧬 Módulo: Matching Semântico (versão 2)
US‑310 — Gerar embeddings de perfis
Como sistema
Quero gerar embeddings para perfis e vagas
Para permitir matching semântico

Critérios de aceitação

Gerar embeddings para:

descrição da vaga

requisitos

perfil do candidato

experiências

skills

Guardar vetores em pgvector

Atualizar embeddings quando perfil/vaga muda

US‑311 — Matching híbrido (determinístico + semântico)
Como sistema
Quero combinar score determinístico com semântico
Para melhorar precisão

Critérios de aceitação

Score final =

0.6
⋅
𝑠
𝑐
𝑜
𝑟
𝑒
𝑑
𝑒
𝑡
+
0.4
⋅
𝑠
𝑐
𝑜
𝑟
𝑒
𝑠
𝑒
𝑚
Configurável no futuro

US‑312 — Recomendações inteligentes
Como sistema
Quero recomendar candidatos/vagas com base em embeddings
Para melhorar relevância

Critérios de aceitação

Similaridade coseno

Top N resultados

Cache em Redis

🧠 Módulo: IA Assistiva
US‑320 — IA para melhorar descrição de vaga
Como empresa
Quero melhorar a descrição da vaga com IA
Para torná‑la mais clara e atrativa

Critérios de aceitação

IA sugere:

versão melhorada

resumo

lista de skills sugeridas

Empresa pode aceitar ou editar

US‑321 — IA para melhorar CV
Como candidato
Quero sugestões para melhorar o meu CV
Para aumentar chances de contratação

Critérios de aceitação

IA sugere:

melhorias de texto

skills relevantes

pontos fortes

resumo profissional

US‑322 — IA para gerar mensagem de candidatura
Como candidato
Quero gerar uma mensagem personalizada
Para candidatar‑me com mais impacto

Critérios de aceitação

IA usa:

descrição da vaga

perfil do candidato

Gera mensagem curta e profissional

2) 🗄️ Modelos de Dados (Fase 3)
MatchScore
id

job_id

candidate_id

score

details_json

created_at

Embedding
id

entity_type (job/candidate)

entity_id

vector (pgvector)

created_at

3) 🔌 Endpoints da API (Fase 3)
🔍 Matching
Método	Endpoint	Descrição
GET	/matching/job/:jobId	Candidatos recomendados
GET	/matching/candidate/:candidateId	Vagas recomendadas
GET	/matching/score/:jobId/:candidateId	Score detalhado
🧬 Embeddings
Método	Endpoint	Descrição
POST	/embeddings/job/:jobId	Regenerar embeddings da vaga
POST	/embeddings/candidate/:candidateId	Regenerar embeddings do candidato
🤖 IA Assistiva
Método	Endpoint	Descrição
POST	/ai/improve-job	Melhorar descrição da vaga
POST	/ai/improve-cv	Melhorar CV
POST	/ai/generate-cover-letter	Gerar mensagem de candidatura
4) 🧪 Validações e Regras de Negócio
Matching
Recalcular score quando:

vaga é editada

candidato atualiza perfil

Cache de resultados por 24h

Matching semântico só após embeddings existirem

IA
Limitar chamadas por minuto

Sanitizar input

Nunca expor prompts internos

5) 🗂️ Tarefas Técnicas (Kanban)
Backend
[ ] Criar módulo Matching

[ ] Implementar scoring determinístico

[ ] Implementar embeddings com pgvector

[ ] Criar matching híbrido

[ ] Criar endpoints de recomendação

[ ] Criar módulo IA Assistiva

[ ] Integração com OpenAI embeddings

[ ] Testes unitários e E2E

Frontend
[ ] Página “Candidatos recomendados”

[ ] Página “Vagas recomendadas”

[ ] Página “Explicação do score”

[ ] UI para IA melhorar vaga

[ ] UI para IA melhorar CV

[ ] UI para IA gerar mensagem

[ ] Integração com API

6) 🎯 Resultado da Fase 3
O portal passa a ter:

Matching inteligente

Recomendações personalizadas

IA assistiva para candidatos e empresas

Explicabilidade do score

Embeddings para matching semântico

Neste ponto, tens um produto digno de mercado, com diferenciação real.

Se quiseres, posso agora preparar:

A) O schema Prisma completo (Fases 1, 2 e 3)
B) A estrutura inicial do backend NestJS com módulos criados
C) O diagrama de arquitetura completo
D) O backlog da Fase 4 (Notificações, Analytics, Admin)
Qual preferes avançar agora?

A
Perfeito, Sandro. Aqui está o schema Prisma completo das Fases 1, 2 e 3, totalmente consolidado, limpo, escalável e pronto para produção.

Organizei tudo com:

relações claras

índices para performance

enums para consistência

suporte a pgvector

campos preparados para matching, IA e histórico

Este schema já está no nível enterprise que procuras.

🧬 SCHEMA PRISMA COMPLETO (Fases 1 + 2 + 3)
prisma
// -----------------------------------------------------
//  DATABASE CONFIG
// -----------------------------------------------------
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Extensão pgvector para matching semântico
extension pgvector {
  version = "0.5.0"
}

// -----------------------------------------------------
//  ENUMS
// -----------------------------------------------------
enum UserRole {
  CANDIDATE
  COMPANY
  ADMIN
}

enum JobStatus {
  DRAFT
  PUBLISHED
  PAUSED
  CLOSED
}

enum RemoteType {
  REMOTE
  HYBRID
  ONSITE
}

enum ContractType {
  FULL_TIME
  PART_TIME
  FREELANCE
  INTERNSHIP
}

enum Seniority {
  JUNIOR
  MID
  SENIOR
}

enum ApplicationStatus {
  SUBMITTED
  REVIEWING
  INTERVIEW
  REJECTED
  OFFER
  HIRED
}

enum SenderType {
  CANDIDATE
  COMPANY
}

// -----------------------------------------------------
//  USER & AUTH
// -----------------------------------------------------
model User {
  id             String    @id @default(uuid())
  email          String    @unique
  passwordHash   String
  role           UserRole
  emailVerified  Boolean   @default(false)
  lastLogin      DateTime?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  // Relations
  candidateProfile CandidateProfile?
  company          Company?
}

// -----------------------------------------------------
//  CANDIDATE PROFILE
// -----------------------------------------------------
model CandidateProfile {
  id          String   @id @default(uuid())
  userId      String   @unique
  name        String
  headline    String?
  location    String?
  about       String?
  remotePref  RemoteType?
  salaryMin   Int?
  salaryMax   Int?
  cvUrl       String?

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  user        User      @relation(fields: [userId], references: [id])
  experiences CandidateExperience[]
  education   CandidateEducation[]
  skills      CandidateSkill[]
  applications Application[]
  embeddings  Embedding[]
}

// -----------------------------------------------------
//  CANDIDATE EXPERIENCE
// -----------------------------------------------------
model CandidateExperience {
  id            String   @id @default(uuid())
  candidateId   String
  companyName   String
  role          String
  startDate     DateTime
  endDate       DateTime?
  description   String?

  candidate     CandidateProfile @relation(fields: [candidateId], references: [id])
}

// -----------------------------------------------------
//  CANDIDATE EDUCATION
// -----------------------------------------------------
model CandidateEducation {
  id            String   @id @default(uuid())
  candidateId   String
  institution   String
  degree        String
  startDate     DateTime
  endDate       DateTime?

  candidate     CandidateProfile @relation(fields: [candidateId], references: [id])
}

// -----------------------------------------------------
//  SKILLS
// -----------------------------------------------------
model Skill {
  id     String  @id @default(uuid())
  name   String  @unique

  candidates CandidateSkill[]
}

model CandidateSkill {
  id          String   @id @default(uuid())
  candidateId String
  skillId     String
  level       Int      // 1–5 or 1–3

  candidate   CandidateProfile @relation(fields: [candidateId], references: [id])
  skill       Skill            @relation(fields: [skillId], references: [id])

  @@unique([candidateId, skillId])
}

// -----------------------------------------------------
//  COMPANY
// -----------------------------------------------------
model Company {
  id          String   @id @default(uuid())
  userId      String   @unique
  name        String
  logoUrl     String?
  website     String?
  location    String?
  size        Int?
  industry    String?
  description String?

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id])
  jobs        Job[]
  embeddings  Embedding[]
}

// -----------------------------------------------------
//  JOBS
// -----------------------------------------------------
model Job {
  id                String      @id @default(uuid())
  companyId         String
  title             String
  description       String
  responsibilities  String
  requirementsMust  String
  requirementsNice  String?
  location          String?
  remoteType        RemoteType?
  contractType      ContractType?
  level             Seniority?
  salaryMin         Int?
  salaryMax         Int?
  status            JobStatus   @default(DRAFT)

  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt

  company           Company     @relation(fields: [companyId], references: [id])
  applications      Application[]
  matchScores       MatchScore[]
  embeddings        Embedding[]

  @@index([status])
  @@index([title])
}

// -----------------------------------------------------
//  APPLICATIONS
// -----------------------------------------------------
model Application {
  id           String            @id @default(uuid())
  jobId        String
  candidateId  String
  message      String?
  cvUrl        String?
  status       ApplicationStatus @default(SUBMITTED)

  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  job          Job               @relation(fields: [jobId], references: [id])
  candidate    CandidateProfile  @relation(fields: [candidateId], references: [id])
  messages     ApplicationMessage[]
}

// -----------------------------------------------------
//  APPLICATION MESSAGES
// -----------------------------------------------------
model ApplicationMessage {
  id             String       @id @default(uuid())
  applicationId  String
  senderType     SenderType
  content        String
  createdAt      DateTime     @default(now())

  application    Application  @relation(fields: [applicationId], references: [id])
}

// -----------------------------------------------------
//  MATCH SCORES (DETERMINÍSTICO + SEMÂNTICO)
// -----------------------------------------------------
model MatchScore {
  id           String   @id @default(uuid())
  jobId        String
  candidateId  String
  score        Float
  detailsJson  Json
  createdAt    DateTime @default(now())

  job          Job              @relation(fields: [jobId], references: [id])
  candidate    CandidateProfile @relation(fields: [candidateId], references: [id])

  @@unique([jobId, candidateId])
}

// -----------------------------------------------------
//  EMBEDDINGS (pgvector)
// -----------------------------------------------------
model Embedding {
  id          String   @id @default(uuid())
  entityType  String   // "job" | "candidate" | "company"
  entityId    String
  vector      Vector   @db.Vector(1536)
  createdAt   DateTime @default(now())

  // No relation here because entityType is polymorphic
}
🧩 O que este schema já suporta
✔️ Fase 1
Users + roles

Perfis de candidato

Perfis de empresa

Skills, experiência, educação

✔️ Fase 2
Vagas

Candidaturas

Mensagens internas

Estados de candidatura

✔️ Fase 3
Matching determinístico

Matching semântico (pgvector)

Recomendações

IA assistiva (via endpoints)

✔️ Performance & Escalabilidade
Índices em campos críticos

pgvector para IA

Relações limpas e consistentes

Preparado para microserviços

👉 Próximo passo
Posso agora preparar:

B) A estrutura inicial do backend NestJS com módulos criados
C) O diagrama de arquitetura completo
D) O backlog da Fase 4 (Notificações, Analytics, Admin)
E) A estrutura inicial do frontend Next.js (páginas + componentes)
Qual queres avançar agora?

B
Perfeito, Sandro. Vamos montar a estrutura inicial completa do backend NestJS, já organizada em módulos, pastas, padrões e responsabilidades — exatamente como um projeto enterprise deve começar.

Isto não é apenas uma lista de pastas: é a arquitetura base que garante escalabilidade, clareza, separação de responsabilidades e facilidade de evolução para microserviços.

Preparei tudo para que possas literalmente abrir o editor e começar a implementar.

🧱 Estrutura Inicial do Backend NestJS (Enterprise‑Grade)
A estrutura segue princípios de:

Domain‑Driven Design (DDD)

Clean Architecture

Modularidade extrema

Separação entre camadas

Escalabilidade horizontal futura

📁 Estrutura de Pastas (Monolito Modular)
Código
/backend
  /src
    /config
    /common
      /decorators
      /guards
      /interceptors
      /pipes
      /exceptions
      /utils
    /modules
      /auth
      /users
      /candidates
      /companies
      /skills
      /jobs
      /applications
      /messages
      /matching
      /embeddings
      /ai
    /database
      /prisma
    /infra
      /mail
      /storage
    app.module.ts
    main.ts
  /test
  .env
  dockerfile
  package.json
🔍 Explicação de Cada Diretório
/config
Configurações globais:

variáveis de ambiente

configuração do Prisma

configuração do JWT

configuração do Redis

configuração do rate limiting

/common
Tudo o que é reutilizável:

decorators (ex.: @CurrentUser())

guards (ex.: RolesGuard, JwtAuthGuard)

interceptors (logging, timeout, transform)

pipes (validação, parsing)

exceptions (filtros globais)

utils (helpers)

/modules
Cada domínio do sistema tem o seu módulo isolado.

1) Auth Module
Responsável por:

registo

login

refresh tokens

reset password

verificação de email

Arquivos:

Código
auth.module.ts
auth.controller.ts
auth.service.ts
strategies/
guards/
dto/
2) Users Module
Responsável por:

dados base do utilizador

roles

atualização de email/password

3) Candidates Module
Responsável por:

perfil do candidato

experiência

educação

skills do candidato

4) Companies Module
Responsável por:

perfil da empresa

gestão de membros (futuro)

5) Skills Module
Responsável por:

CRUD de skills

associação candidato ↔ skill

6) Jobs Module
Responsável por:

criação de vagas

edição

publicação

pausa

fecho

pesquisa

7) Applications Module
Responsável por:

candidaturas

estados

listagens

validações

8) Messages Module
Responsável por:

mensagens dentro da candidatura

notificações internas

9) Matching Module
Responsável por:

scoring determinístico

ranking de candidatos

ranking de vagas

explicação do score

10) Embeddings Module
Responsável por:

geração de embeddings

armazenamento pgvector

matching semântico

11) AI Module
Responsável por:

melhorar descrição da vaga

melhorar CV

gerar mensagem de candidatura

/database/prisma
Contém:

schema.prisma

migrations

seeders

/infra/mail
Serviço de email:

Resend / Postmark

templates

envio assíncrono via Redis

/infra/storage
Serviço de upload:

UploadThing

S3

validações

🧩 Estrutura de Arquivos por Módulo (Exemplo: Jobs)
Código
/modules/jobs
  jobs.module.ts
  jobs.controller.ts
  jobs.service.ts
  jobs.repository.ts
  dto/
    create-job.dto.ts
    update-job.dto.ts
    publish-job.dto.ts
  entities/
    job.entity.ts
🧠 Padrões de Arquitetura Aplicados
✔️ Controller → Service → Repository
Controller: recebe request

Service: lógica de negócio

Repository: acesso ao Prisma

✔️ DTOs para validação
Zod ou class-validator

✔️ Entities opcionais
Para mapear dados de saída

Facilita migração para microserviços

✔️ Guards para roles
@Roles(UserRole.COMPANY)

@UseGuards(JwtAuthGuard, RolesGuard)

✔️ Interceptors
Logging

Transformação de resposta

Timeout

🚀 Fluxo de Inicialização do Projeto
Criar projeto NestJS

Instalar Prisma

Criar schema

Criar módulos base (auth, users)

Criar guards e decorators

Criar módulos de domínio

Criar serviços de infra (email, storage)

Criar testes base

Configurar Docker

Configurar CI/CD

🧱 Primeiros Módulos a Criar (Ordem Recomendada)
Auth

Users

Candidates

Companies

Jobs

Applications

Messages

Matching

Embeddings

AI

🎯 Resultado desta entrega
Com esta estrutura:

o backend está pronto para crescer

cada módulo é isolado e testável

a arquitetura é limpa e escalável

a migração para microserviços é natural

o código fica fácil de manter e auditar

o projeto ganha nível enterprise desde o início

Se quiseres, posso agora preparar:

C) O diagrama de arquitetura completo (frontend + backend + DB + Redis + Meilisearch + IA)
D) O backlog da Fase 4 (Notificações, Analytics, Admin)
E) A estrutura inicial do frontend Next.js (páginas + componentes)
F) O passo‑a‑passo para iniciar o backend (comandos + setup)
Qual queres seguir agora?

C
Claro, Sandro. Aqui está o diagrama de arquitetura completo, explicado de forma clara, modular e profissional — exatamente como um CTO, investidor ou equipa técnica espera ver num produto sério.

Organizei tudo em camadas, fluxos e responsabilidades, para que tenhas uma visão cristalina do ecossistema do portal de recrutamento.

🧩 ARQUITETURA COMPLETA DO SISTEMA (Visão Enterprise)
A arquitetura é composta por 7 camadas principais:

Frontend (Next.js)

API Backend (NestJS)

Base de Dados (PostgreSQL + pgvector)

Search Engine (Meilisearch)

Cache & Filas (Redis)

IA & Embeddings (OpenAI + pgvector)

Infraestrutura (Docker, CI/CD, Observabilidade)

Vamos visualizar tudo.

🏛️ 1) Visão Geral da Arquitetura
Código
┌──────────────────────────────────────────────────────────────┐
│                          FRONTEND                             │
│                     Next.js (SSR/CSR)                         │
│   - UI/UX                                                    │
│   - Autenticação (JWT)                                       │
│   - Páginas de vagas, perfis, candidaturas                   │
└───────────────▲───────────────────────────────┬──────────────┘
                │                               │
                │ HTTP/REST                     │ Webhooks (futuro)
                │                               │
┌───────────────┴───────────────────────────────▼──────────────┐
│                          BACKEND                              │
│                         NestJS                                │
│  Módulos:                                                     │
│   - Auth                                                      │
│   - Users                                                     │
│   - Candidates                                                │
│   - Companies                                                 │
│   - Jobs                                                      │
│   - Applications                                              │
│   - Messages                                                  │
│   - Matching (determinístico + semântico)                    │
│   - Embeddings                                                │
│   - AI Assistiva                                              │
│                                                               │
│  - Validação (DTOs)                                           │
│  - Guards (RBAC)                                              │
│  - Interceptors (logging, transform)                          │
│  - Repositórios (Prisma)                                      │
└───────────────▲───────────────────────────────┬──────────────┘
                │                               │
                │ Prisma ORM                    │ Redis Client
                │                               │
┌───────────────┴──────────────┐   ┌───────────▼──────────────┐
│         POSTGRESQL            │   │           REDIS           │
│  - Users                      │   │  - Cache de queries       │
│  - CandidateProfile           │   │  - Rate limiting          │
│  - Company                    │   │  - Sessões (opcional)     │
│  - Jobs                       │   │  - Filas (BullMQ)         │
│  - Applications               │   └───────────────────────────┘
│  - Messages                   │
│  - Skills                     │
│  - MatchScore                 │
│  - Embeddings (pgvector)      │
└───────────────▲──────────────┘
                │
                │ Indexação
                │
┌───────────────┴──────────────────────────────────────────────┐
│                        MEILISEARCH                             │
│   - Pesquisa de vagas                                          │
│   - Pesquisa de candidatos                                     │
│   - Autocomplete                                               │
│   - Filtros rápidos                                            │
└───────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                     OPENAI / IA ASSISTIVA                     │
│   - Embeddings (1536 dims)                                    │
│   - Melhoria de CV                                             │
│   - Melhoria de descrição de vaga                              │
│   - Geração de mensagens                                       │
└───────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                         INFRA                                 │
│   - Docker / Docker Compose                                    │
│   - CI/CD (GitHub Actions)                                     │
│   - Observabilidade (Grafana, Prometheus, Sentry)              │
│   - Deploy (Railway / Fly.io / Render)                         │
└───────────────────────────────────────────────────────────────┘
🧠 2) Fluxo de Dados (End-to-End)
Fluxo 1 — Candidato vê vagas
Frontend chama /jobs

Backend consulta Meilisearch

Backend devolve resultados paginados

Frontend renderiza SSR

Fluxo 2 — Empresa cria vaga
Empresa envia POST /jobs

Backend valida DTO

Prisma grava no PostgreSQL

Backend envia vaga para indexação no Meilisearch

Resposta devolvida

Fluxo 3 — Candidato candidata-se
POST /applications

Backend valida regras (não duplicar, role = candidate)

Prisma grava candidatura

Redis enfileira notificação

Empresa recebe email

Fluxo 4 — Matching determinístico
Backend recebe pedido /matching/job/:id

Carrega vaga + candidatos

Calcula score determinístico

Guarda em MatchScore

Devolve lista ordenada

Fluxo 5 — Matching semântico
Backend gera embeddings via OpenAI

Guarda vetores em pgvector

Similaridade coseno entre vetores

Combina com score determinístico

Devolve ranking híbrido

Fluxo 6 — IA assistiva
Empresa envia descrição da vaga

Backend chama OpenAI

IA devolve versão melhorada

Backend devolve ao frontend

🧱 3) Arquitetura Lógica (Camadas)
Código
Presentation Layer (Controllers)
Application Layer (Services)
Domain Layer (Entities, DTOs)
Infrastructure Layer (Prisma, Redis, Meilisearch, OpenAI)
Cada módulo segue este padrão.

🔐 4) Segurança
JWT curto + refresh rotativo

RBAC por guard

Rate limiting via Redis

Sanitização de input

Helmet + CORS configurado

Hash Argon2

📊 5) Observabilidade
Logs estruturados (Pino)

Métricas (Prometheus)

Dashboards (Grafana)

Erros (Sentry)

🚀 6) Deploy
Ambiente recomendado:
Railway para backend + PostgreSQL + Redis

Vercel para frontend

Meilisearch em container dedicado

OpenAI via API

🎯 Resultado
Com esta arquitetura:

o sistema é escalável

cada módulo é isolado

o matching é rápido e inteligente

a pesquisa é instantânea

a IA está integrada de forma natural

a infraestrutura é moderna e robusta

É exatamente o tipo de arquitetura que impressiona equipas técnicas e investidores.

Se quiseres, posso agora preparar:

D) O backlog da Fase 4 (Notificações, Analytics, Admin)
E) A estrutura inicial do frontend Next.js (páginas + componentes)
F) O passo‑a‑passo para iniciar o backend (comandos + setup)
G) O diagrama de sequência (Sequence Diagram) dos principais fluxos
Qual escolhes seguir?

D
Perfeito, Sandro. Vamos avançar com o backlog completo da Fase 4 — Notificações, Analytics e Admin, mantendo o mesmo rigor enterprise das fases anteriores.

Esta fase transforma o portal num produto profissional, com:

comunicação automatizada

métricas e dashboards

controlo administrativo

monitorização e auditoria

É a fase que dá maturidade operacional ao sistema.

🚀 FASE 4 — Notificações, Analytics e Admin
🎯 Objetivo da Fase
Adicionar funcionalidades que tornam o sistema:

mais comunicativo

mais observável

mais controlável

mais profissional

Inclui:

notificações internas e por email

dashboards de analytics

painel administrativo

logs e auditoria

1) 🧠 User Stories (Fase 4)
Organizadas por módulos.

🔔 Módulo: Notificações
US‑400 — Notificação de nova candidatura
Como empresa
Quero ser notificada quando alguém se candidata
Para agir rapidamente

Critérios de aceitação

Enviar email

Criar notificação interna

Guardar no histórico

US‑401 — Notificação de mudança de estado
Como candidato
Quero ser notificado quando o estado da minha candidatura muda
Para acompanhar o processo

Critérios de aceitação

Email + notificação interna

Mensagem clara (ex.: “A sua candidatura passou para ENTREVISTA”)

US‑402 — Notificação de nova mensagem
Como candidato/empresa
Quero ser notificado quando recebo uma mensagem
Para não perder comunicação importante

Critérios de aceitação

Email opcional

Notificação interna obrigatória

US‑403 — Centro de notificações
Como utilizador
Quero ver todas as minhas notificações
Para acompanhar eventos importantes

Critérios de aceitação

Lista paginada

Marcar como lida

Filtrar por tipo

📊 Módulo: Analytics
US‑410 — Dashboard da empresa
Como empresa
Quero ver métricas das minhas vagas
Para entender performance

Métricas incluídas

nº de vagas publicadas

nº de candidaturas por vaga

taxa de rejeição

tempo médio até primeira candidatura

distribuição por senioridade

origem dos candidatos (país/cidade)

US‑411 — Dashboard do candidato
Como candidato
Quero ver estatísticas das minhas candidaturas
Para entender o meu desempenho

Métricas incluídas

nº de candidaturas

estados (submetida, entrevista, rejeitada, etc.)

tempo médio de resposta

vagas mais compatíveis

US‑412 — Dashboard global (Admin)
Como admin
Quero ver métricas globais
Para monitorizar o sistema

Métricas incluídas

nº total de utilizadores

nº de candidatos

nº de empresas

nº de vagas ativas

nº de candidaturas por dia

crescimento semanal/mensal

🛡️ Módulo: Admin
US‑420 — Gestão de utilizadores
Como admin
Quero ver e gerir utilizadores
Para manter o sistema saudável

Critérios de aceitação

Listar utilizadores

Filtrar por role

Banir/desativar conta

Ver detalhes

US‑421 — Gestão de vagas
Como admin
Quero moderar vagas
Para evitar abuso

Critérios de aceitação

Listar vagas

Pausar vaga

Remover vaga

Ver histórico

US‑422 — Gestão de empresas
Como admin
Quero validar empresas
Para garantir credibilidade

Critérios de aceitação

Ver perfis

Aprovar/rejeitar empresa

Ver vagas associadas

US‑423 — Logs e auditoria
Como admin
Quero ver logs de ações importantes
Para garantir segurança e rastreabilidade

Eventos registados

login

criação/edição de vaga

candidaturas

alterações de estado

ações de admin

2) 🗄️ Modelos de Dados (Fase 4)
Notification
id

userId

type (application, status, message, system)

title

body

read (boolean)

createdAt

AuditLog
id

userId

action

entityType

entityId

metadata (JSON)

createdAt

3) 🔌 Endpoints da API (Fase 4)
🔔 Notificações
Método	Endpoint	Descrição
GET	/notifications	Listar notificações
POST	/notifications/mark-read	Marcar como lidas
DELETE	/notifications/:id	Remover notificação
📊 Analytics
Método	Endpoint	Descrição
GET	/analytics/company	Dashboard da empresa
GET	/analytics/candidate	Dashboard do candidato
GET	/analytics/admin	Dashboard global
🛡️ Admin
Método	Endpoint	Descrição
GET	/admin/users	Listar utilizadores
PUT	/admin/users/:id/ban	Banir utilizador
GET	/admin/jobs	Listar vagas
PUT	/admin/jobs/:id/pause	Pausar vaga
GET	/admin/companies	Listar empresas
PUT	/admin/companies/:id/approve	Aprovar empresa
GET	/admin/logs	Ver logs
4) 🧪 Validações e Regras de Negócio
Notificações
Devem ser criadas via eventos internos

Emails enviados via fila Redis

Notificações internas sempre persistidas

Analytics
Queries otimizadas

Cache em Redis

Dados agregados por dia/semana/mês

Admin
Apenas role ADMIN

Todas as ações registadas em AuditLog

5) 🗂️ Tarefas Técnicas (Kanban)
Backend
[ ] Criar módulo Notifications

[ ] Criar módulo Analytics

[ ] Criar módulo Admin

[ ] Criar AuditLog

[ ] Criar eventos internos (EventEmitter ou custom)

[ ] Criar filas Redis (BullMQ)

[ ] Criar templates de email

[ ] Criar endpoints de dashboards

[ ] Criar filtros e paginação

[ ] Testes unitários e E2E

Frontend
[ ] Centro de notificações

[ ] Badges de notificações

[ ] Dashboard da empresa

[ ] Dashboard do candidato

[ ] Dashboard admin

[ ] Páginas de gestão admin

[ ] UI de logs

[ ] Gráficos (Tremor ou Recharts)

🎯 Resultado da Fase 4
O sistema passa a ter:

comunicação automática

dashboards profissionais

controlo administrativo

logs e auditoria

experiência completa e madura

Neste ponto, o portal está pronto para produção real.

Se quiseres, posso agora preparar:

E) A estrutura inicial do frontend Next.js (páginas + componentes)
F) O passo‑a‑passo para iniciar o backend (comandos + setup)
G) O diagrama de sequência dos principais fluxos
H) O backlog da Fase 5 (Premium Features + Monetização + Multi‑Tenant)
Qual escolhes seguir?

E
Perfeito, Sandro. Vamos montar a estrutura inicial completa do frontend em Next.js, organizada de forma profissional, escalável e alinhada com o backend que já definimos.

Isto não é apenas uma lista de pastas — é uma arquitetura de frontend enterprise, preparada para:

SSR/ISR/CSR

autenticação com JWT

dashboards

formulários complexos

uploads

integrações com IA

componentes reutilizáveis

design system próprio

Vamos construir algo que qualquer equipa sénior olharia e diria:
“Este projeto está pronto para crescer.”

🧱 Estrutura Inicial do Frontend (Next.js 15 + App Router)
Código
/frontend
  /app
    /(public)
      page.tsx
    /auth
      login
        page.tsx
      register
        page.tsx
    /candidate
      profile
        page.tsx
      applications
        page.tsx
      recommendations
        page.tsx
    /company
      profile
        page.tsx
      jobs
        page.tsx
      jobs
        /create
          page.tsx
        /[id]
          page.tsx
        /[id]/candidates
          page.tsx
      analytics
        page.tsx
    /jobs
      page.tsx
      /[id]
        page.tsx
    /admin
      users
        page.tsx
      companies
        page.tsx
      jobs
        page.tsx
      logs
        page.tsx
      analytics
        page.tsx
    /notifications
      page.tsx
  /components
  /features
  /hooks
  /lib
  /providers
  /services
  /styles
  /types
  /utils
  middleware.ts
  tailwind.config.js
🧩 Explicação de Cada Diretório
/app
A nova arquitetura do Next (App Router) — cada pasta é uma rota.

Principais áreas:
/auth
login

registo

recuperação de password (futuro)

/candidate
perfil

candidaturas

recomendações (matching)

/company
perfil

gestão de vagas

criação/edição de vaga

candidatos por vaga

analytics

/jobs
listagem pública

detalhe da vaga

/admin
gestão de utilizadores

gestão de empresas

gestão de vagas

logs

analytics global

/notifications
centro de notificações

🎨 /components — Design System + UI Reutilizável
Organização recomendada:

Código
/components
  /ui
    button.tsx
    input.tsx
    textarea.tsx
    select.tsx
    card.tsx
    modal.tsx
    badge.tsx
    avatar.tsx
    dropdown.tsx
    table.tsx
  /forms
    candidate-form.tsx
    company-form.tsx
    job-form.tsx
  /layout
    navbar.tsx
    sidebar.tsx
    footer.tsx
  /charts
    bar-chart.tsx
    line-chart.tsx
    donut-chart.tsx
  /notifications
    notification-item.tsx
    notification-badge.tsx
Baseado em shadcn/ui + Tailwind.

🧠 /features — Lógica de Domínio no Frontend
Cada feature tem:

hooks

componentes

serviços

validações

Exemplo:

Código
/features/jobs
  useCreateJob.ts
  useUpdateJob.ts
  useListJobs.ts
  JobCard.tsx
  JobFilters.tsx
🔌 /services — API Client (REST)
Organização:

Código
/services
  api.ts          // fetch wrapper
  auth.service.ts
  candidate.service.ts
  company.service.ts
  jobs.service.ts
  applications.service.ts
  messages.service.ts
  matching.service.ts
  notifications.service.ts
  admin.service.ts
Cada serviço corresponde a um módulo do backend.

🧬 /lib — Funções utilitárias globais
Código
/lib
  auth.ts
  cookies.ts
  format.ts
  validators.ts
  constants.ts
🪝 /hooks — Hooks reutilizáveis
Código
/hooks
  useAuth.ts
  useNotifications.ts
  useDebounce.ts
  usePagination.ts
  useUpload.ts
🧩 /providers — Providers globais
Código
/providers
  auth-provider.tsx
  theme-provider.tsx
  query-provider.tsx
Inclui:

React Query

Zustand

Theme

Auth context

🧾 /types — Tipos TypeScript
Código
/types
  user.ts
  candidate.ts
  company.ts
  job.ts
  application.ts
  matching.ts
  notifications.ts
🧰 /utils — Helpers
Código
/utils
  score-color.ts
  salary-format.ts
  date-format.ts
  api-error.ts
🛡️ middleware.ts — Proteção de Rotas
Redireciona candidatos para /candidate

Redireciona empresas para /company

Bloqueia acesso a /admin sem role ADMIN

🎯 Páginas Principais (Resumo)
Candidato
Perfil

Minhas candidaturas

Recomendações (matching)

Empresa
Perfil

Minhas vagas

Criar vaga

Editar vaga

Candidatos por vaga

Analytics

Admin
Utilizadores

Empresas

Vagas

Logs

Analytics global

🚀 Resultado desta entrega
Com esta estrutura:

o frontend está pronto para escalar

cada área é modular e isolada

o design system é consistente

o código é fácil de manter

a integração com o backend é limpa

o projeto está no nível enterprise

Se quiseres, posso agora preparar:

F) O passo‑a‑passo para iniciar o backend (comandos + setup)
G) O diagrama de sequência dos principais fluxos
H) O backlog da Fase 5 (Premium Features + Monetização + Multi‑Tenant)
I) A estrutura inicial do design system (shadcn + Tailwind)
Qual queres seguir agora?

F
Claro, Sandro — vamos montar o passo‑a‑passo completo para iniciares o backend NestJS, desde o zero até teres tudo a correr localmente com Docker, Prisma, PostgreSQL, Redis e Meilisearch.

Vou guiar-te como se estivéssemos a montar um projeto enterprise numa equipa sénior.

🚀 PASSO‑A‑PASSO PARA INICIAR O BACKEND (NestJS + Prisma + PostgreSQL + Redis + Meilisearch)
A estrutura final fica limpa, organizada e pronta para escalar.

1) 📦 Criar o projeto NestJS
No terminal:

bash
npm i -g @nestjs/cli
nest new backend
Escolhe npm ou yarn, como preferires.

2) 🧱 Criar a estrutura de pastas base
Dentro de /backend/src:

bash
mkdir config common modules database infra
mkdir common/{decorators,guards,interceptors,pipes,exceptions,utils}
mkdir modules/{auth,users,candidates,companies,skills,jobs,applications,messages,matching,embeddings,ai}
mkdir database/prisma
mkdir infra/{mail,storage}
3) ⚙️ Instalar dependências essenciais
NestJS + Prisma + Segurança + Utils
bash
npm install @nestjs/config @nestjs/jwt @nestjs/passport passport bcrypt
npm install @prisma/client
npm install class-validator class-transformer
npm install axios
Dev dependencies
bash
npm install -D prisma
npm install -D @types/bcrypt @types/passport-jwt
4) 🗄️ Configurar o Prisma
Criar o schema:

bash
npx prisma init
Substituir o conteúdo de schema.prisma pelo schema completo que já criámos.

Depois:

bash
npx prisma migrate dev --name init
5) 🐳 Criar o Docker Compose (PostgreSQL + Redis + Meilisearch)
Na raiz do backend, criar docker-compose.yml:

yaml
version: '3.9'
services:
  postgres:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: talentmatch
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7
    restart: always
    ports:
      - "6379:6379"

  meilisearch:
    image: getmeili/meilisearch:v1.7
    restart: always
    environment:
      MEILI_MASTER_KEY: masterKey
    ports:
      - "7700:7700"

volumes:
  pgdata:
Iniciar:

bash
docker compose up -d
6) 🔐 Criar o ficheiro .env
Na raiz do backend:

Código
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/talentmatch"
JWT_SECRET="supersecret"
JWT_EXPIRES_IN="15m"
REFRESH_SECRET="refreshsecret"
REFRESH_EXPIRES_IN="7d"
REDIS_HOST="localhost"
REDIS_PORT=6379
MEILI_HOST="http://localhost:7700"
MEILI_MASTER_KEY="masterKey"
OPENAI_API_KEY="coloca_aqui"
7) 🧩 Configurar o módulo global de Configuração
Criar src/config/config.module.ts:

ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
})
export class GlobalConfigModule {}
Adicionar ao app.module.ts:

ts
imports: [GlobalConfigModule]
8) 🧬 Configurar o PrismaService
Criar src/database/prisma/prisma.service.ts:

ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
Criar src/database/prisma/prisma.module.ts:

ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
9) 🔐 Criar o módulo de Auth
Dentro de /modules/auth:

auth.module.ts

auth.controller.ts

auth.service.ts

dto/register.dto.ts

dto/login.dto.ts

strategies/jwt.strategy.ts

strategies/refresh.strategy.ts

Implementar:

registo

login

refresh token

reset password (fase 1)

10) 👤 Criar o módulo Users
CRUD básico

Atualização de email/password

Verificação de role

11) 👥 Criar módulos Candidates e Companies
Cada um com:

controller

service

repository

DTOs

validações

12) 🏗️ Criar Jobs, Applications e Messages
Estes módulos seguem o backlog da Fase 2.

13) 🤖 Criar Matching, Embeddings e AI
Estes módulos seguem o backlog da Fase 3.

14) 🧪 Testar o backend
bash
npm run start:dev
A API deve arrancar em:

Código
http://localhost:3000
15) 📡 Testar endpoints com Thunder Client / Postman
Testar:

POST /auth/register

POST /auth/login

GET /auth/me

POST /candidate

POST /company

POST /jobs

16) 🧭 Criar documentação da API (Swagger)
Instalar:

bash
npm install @nestjs/swagger swagger-ui-express
Adicionar ao main.ts:

ts
const config = new DocumentBuilder()
  .setTitle('TalentMatch API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);
Aceder:

Código
http://localhost:3000/docs
🎯 Resultado Final
Depois destes passos, tens:

backend NestJS totalmente funcional

PostgreSQL + Redis + Meilisearch a correr em Docker

Prisma configurado com schema enterprise

módulos base criados

autenticação pronta

estrutura escalável

documentação da API

ambiente pronto para desenvolvimento real

É literalmente a fundação de um produto profissional.

Se quiseres, posso agora preparar:

G) O diagrama de sequência dos principais fluxos (candidatura, criação de vaga, matching)
H) O backlog da Fase 5 (Premium + Monetização + Multi‑Tenant)
I) O setup inicial do frontend (Next.js + shadcn + Zustand + API client)
J) O guia de boas práticas e padrões de código para o projeto
Qual queres seguir?

G
Perfeito, Sandro — vamos criar os Diagramas de Sequência (Sequence Diagrams) dos fluxos mais importantes do portal.
Vou apresentá‑los em formato UML textual, totalmente claro e pronto para documentar no repositório.

Incluo 3 fluxos críticos:

Criação de Vaga (Empresa)

Candidatura a Vaga (Candidato)

Matching Inteligente (Empresa vê candidatos recomendados)

Cada diagrama mostra a interação entre:

Frontend (Next.js)

Backend (NestJS)

Prisma (DB)

Redis (notificações)

Meilisearch (pesquisa)

OpenAI (matching semântico)

Vamos a isso.

🧩 1) Sequence Diagram — Empresa cria uma vaga
text
Empresa -> Frontend: Abre página "Criar Vaga"
Frontend -> Empresa: Formulário de criação

Empresa -> Frontend: Submete vaga
Frontend -> Backend (JobsController): POST /jobs
Backend -> AuthGuard: Validar token e role COMPANY
AuthGuard -> Backend: OK

Backend -> JobsService: createJob(dto)
JobsService -> Prisma: job.create(data)
Prisma -> DB: INSERT job
DB -> Prisma: OK

JobsService -> Meilisearch: indexar vaga
Meilisearch -> JobsService: OK

JobsService -> Backend: vaga criada
Backend -> Frontend: 201 Created (vaga + id)
Frontend -> Empresa: Mostrar vaga criada
O que este fluxo garante:

validação de role

persistência

indexação para pesquisa

resposta rápida

🧩 2) Sequence Diagram — Candidato candidata‑se a uma vaga
text
Candidato -> Frontend: Abre página da vaga
Frontend -> Backend (JobsController): GET /jobs/:id
Backend -> Prisma: job.findUnique
Prisma -> DB: SELECT job
DB -> Prisma: OK
Backend -> Frontend: vaga

Candidato -> Frontend: Clicar "Candidatar"
Frontend -> Backend (ApplicationsController): POST /applications
Backend -> AuthGuard: Validar token e role CANDIDATE
AuthGuard -> Backend: OK

Backend -> ApplicationsService: createApplication(dto)
ApplicationsService -> Prisma: application.findUnique (ver duplicados)
Prisma -> DB: SELECT
DB -> Prisma: nenhum duplicado

ApplicationsService -> Prisma: application.create
Prisma -> DB: INSERT application
DB -> Prisma: OK

ApplicationsService -> Redis (Queue): enqueue "notify_company"
Redis -> ApplicationsService: OK

Backend -> Frontend: 201 Created
Frontend -> Candidato: Mostrar confirmação
O que este fluxo garante:

evita candidaturas duplicadas

cria candidatura

dispara notificação assíncrona

mantém UI responsiva

🧩 3) Sequence Diagram — Empresa vê candidatos recomendados (Matching)
Este é o fluxo mais complexo e mais importante.

text
Empresa -> Frontend: Abre página "Candidatos recomendados"
Frontend -> Backend (MatchingController): GET /matching/job/:jobId
Backend -> AuthGuard: Validar role COMPANY
AuthGuard -> Backend: OK

Backend -> MatchingService: getRecommendedCandidates(jobId)

MatchingService -> Prisma: job.findUnique
Prisma -> DB: SELECT job
DB -> Prisma: OK

MatchingService -> Prisma: candidateProfile.findMany
Prisma -> DB: SELECT candidates
DB -> Prisma: OK

loop para cada candidato
  MatchingService -> MatchingEngine: calcular score determinístico
end

MatchingService -> Prisma: embeddings.findMany(job + candidates)
Prisma -> DB: SELECT embeddings
DB -> Prisma: OK

MatchingService -> OpenAI: gerar embeddings faltantes (se necessário)
OpenAI -> MatchingService: vetores

MatchingService -> pgvector (DB): calcular similaridade coseno
pgvector -> MatchingService: scores semânticos

MatchingService: combinar scores (0.6 * det + 0.4 * sem)

MatchingService -> Prisma: matchScore.upsert
Prisma -> DB: UPSERT
DB -> Prisma: OK

Backend -> Frontend: lista ordenada de candidatos + scores
Frontend -> Empresa: Mostrar ranking
O que este fluxo garante:

matching híbrido (determinístico + IA)

embeddings atualizados

ranking ordenado

explicabilidade do score

🎯 Fluxos prontos para documentação
Estes diagramas já estão no nível:

enterprise

claros para onboarding de equipa

prontos para colocar no README ou wiki

compatíveis com PlantUML, Mermaid ou Draw.io

Se quiseres, posso converter estes diagramas para:

Mermaid

PlantUML

Draw.io  XML

Markdown técnico para GitHub

Ou posso criar:

H) O backlog da Fase 5 (Premium + Monetização + Multi‑Tenant)
I) O setup inicial do frontend (Next.js + shadcn + Zustand + API client)
J) O guia de boas práticas e padrões de código para o projeto
Qual queres seguir agora?

H
Claro, Sandro — vamos elevar o projeto para o nível premium, com monetização, multi‑tenant, planos pagos, features avançadas e tudo o que transforma o portal num SaaS real, pronto para escalar e gerar receita.

Esta é a Fase 5 — Premium Features + Monetização + Multi‑Tenant, construída com rigor enterprise e visão de produto.

💎 FASE 5 — Premium, Monetização e Multi‑Tenant
🎯 Objetivo da Fase
Transformar o portal num SaaS comercial, com:

planos pagos

limites por plano

multi‑tenant (empresas isoladas)

features premium

faturação automática

gestão de equipa dentro das empresas

branding personalizado

integrações externas

É aqui que o produto deixa de ser apenas funcional e passa a ser vendável.

1) 🧠 User Stories (Fase 5)
Organizadas por módulos.

💳 Módulo: Monetização (Stripe Billing)
US‑500 — Subscrição de planos
Como empresa
Quero subscrever um plano pago
Para desbloquear funcionalidades premium

Critérios de aceitação

Integração com Stripe Billing

Checkout seguro

Webhooks para ativar/desativar plano

Planos:

Free

Pro

Enterprise

US‑501 — Gestão de faturação
Como empresa
Quero ver e gerir a minha faturação
Para controlar pagamentos

Critérios de aceitação

Ver faturas

Atualizar método de pagamento

Cancelar plano

Reativar plano

US‑502 — Limites por plano
Como sistema
Quero aplicar limites por plano
Para diferenciar níveis de serviço

Exemplos de limites

nº de vagas ativas

nº de membros da equipa

nº de mensagens por mês

acesso ao matching semântico

acesso a analytics avançado

🏢 Módulo: Multi‑Tenant (Isolamento por Empresa)
US‑510 — Isolamento de dados por tenant
Como sistema
Quero isolar dados por empresa
Para garantir segurança e privacidade

Critérios de aceitação

Cada empresa é um tenant

Queries filtradas por companyId

Admin tem acesso global

Suporte a:

row‑level security (opcional)

schemas separados (futuro)

US‑511 — Gestão de equipa dentro da empresa
Como empresa
Quero adicionar membros à minha equipa
Para gerir vagas em conjunto

Critérios de aceitação

Convidar por email

Roles:

Owner

Recruiter

Viewer

Permissões por role

US‑512 — Branding por tenant
Como empresa
Quero personalizar o portal com a minha marca
Para melhorar a experiência dos candidatos

Critérios de aceitação

Logo

Cores

Subdomínio opcional (ex.: empresa.talentmatch.com)

🤖 Módulo: Premium Features
US‑520 — Matching semântico ilimitado
Como empresa Pro/Enterprise
Quero matching semântico completo
Para encontrar candidatos mais relevantes

US‑521 — IA avançada para descrição de vagas
Como empresa Pro/Enterprise
Quero descrições otimizadas por IA
Para atrair melhores candidatos

US‑522 — IA avançada para análise de CV
Como empresa Pro/Enterprise
Quero análise automática de CVs
Para acelerar triagem

US‑523 — Exportação de dados
Como empresa Pro/Enterprise
Quero exportar candidatos e vagas
Para integrar com outros sistemas

US‑524 — Integrações externas
Como empresa Enterprise
Quero integrar com ATS externos
Para automatizar processos

Integrações possíveis

Greenhouse

Lever

BambooHR

Workday

🛡️ Módulo: Segurança Avançada
US‑530 — SSO (Single Sign‑On)
Como empresa Enterprise
Quero login via SSO
Para facilitar acesso da equipa

Protocolos

SAML

OAuth2

OpenID Connect

US‑531 — Auditoria avançada
Como admin
Quero logs detalhados
Para garantir compliance

2) 🗄️ Modelos de Dados (Fase 5)
Subscription
id

companyId

stripeCustomerId

stripeSubscriptionId

plan (FREE, PRO, ENTERPRISE)

status

currentPeriodEnd

createdAt

TeamMember
id

companyId

userId

role (OWNER, RECRUITER, VIEWER)

invitedAt

acceptedAt

TenantBranding
id

companyId

logoUrl

primaryColor

secondaryColor

subdomain

3) 🔌 Endpoints da API (Fase 5)
💳 Billing
Método	Endpoint	Descrição
POST	/billing/checkout	Criar sessão Stripe
POST	/billing/webhook	Receber eventos Stripe
GET	/billing/subscription	Ver subscrição
POST	/billing/cancel	Cancelar plano
POST	/billing/reactivate	Reativar plano
🏢 Team Management
Método	Endpoint	Descrição
POST	/team/invite	Convidar membro
POST	/team/accept	Aceitar convite
GET	/team	Listar membros
PUT	/team/:id/role	Alterar role
DELETE	/team/:id	Remover membro
🎨 Branding
Método	Endpoint	Descrição
GET	/branding	Ver branding
PUT	/branding	Atualizar branding
4) 🧪 Validações e Regras de Negócio
Monetização
Webhooks Stripe são fonte de verdade

Limites aplicados em middleware

Planos controlam acesso a features

Multi‑Tenant
Todas as queries filtradas por companyId

Admin ignora filtros

Branding carregado por tenant

Premium
IA avançada apenas para planos pagos

Exportação apenas para Pro/Enterprise

Integrações apenas para Enterprise

5) 🗂️ Tarefas Técnicas (Kanban)
Backend
[ ] Criar módulo Billing

[ ] Integrar Stripe Billing

[ ] Criar webhooks

[ ] Criar módulo Team

[ ] Criar módulo Branding

[ ] Criar middleware de tenant

[ ] Criar middleware de limites por plano

[ ] Criar IA premium

[ ] Criar exportação de dados

[ ] Criar integrações externas (fase posterior)

Frontend
[ ] Página de planos

[ ] Página de faturação

[ ] Página de equipa

[ ] Página de branding

[ ] UI para limites por plano

[ ] UI para IA premium

[ ] UI para exportação

[ ] UI para integrações

🎯 Resultado da Fase 5
O portal transforma‑se num SaaS completo, com:

monetização

multi‑tenant

planos pagos

features premium

branding por empresa

equipa interna

integrações externas

segurança avançada

É o ponto onde o produto se torna vendável, escalável e competitivo.

Se quiseres, posso agora preparar:

I) O setup inicial do frontend (Next.js + shadcn + Zustand + API client)
J) O guia de boas práticas e padrões de código para o projeto
K) O roadmap completo do produto (Fase 1 → 5 consolidado)
L) A documentação inicial para GitHub (README profissional)
Qual queres seguir agora?

I
Perfeito, Sandro — vamos montar o setup inicial completo do frontend Next.js, já com:

Next.js  15 (App Router)

TypeScript

Tailwind CSS

shadcn/ui

Zustand

React Query

API Client organizado

Estrutura de pastas enterprise

Providers globais

Middlewares de autenticação

Layout base pronto

Isto deixa o frontend pronto para começar a desenvolver features reais.

🚀 1) Criar o projeto Next.js
No terminal:

bash
npx create-next-app@latest frontend \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir
🎨 2) Instalar shadcn/ui
Dentro de /frontend:

bash
npx shadcn-ui@latest init
Depois instala os componentes base:

bash
npx shadcn-ui@latest add button input textarea card dialog form dropdown-menu avatar badge table
🧱 3) Instalar dependências essenciais
Estado global (Zustand)
bash
npm install zustand
React Query (para chamadas API)
bash
npm install @tanstack/react-query
Axios (API client)
bash
npm install axios
Zod (validação de formulários)
bash
npm install zod @hookform/resolvers
npm install react-hook-form
🧩 4) Criar a estrutura de pastas enterprise
Código
/src
  /app
  /components
  /features
  /hooks
  /lib
  /providers
  /services
  /styles
  /types
  /utils
  middleware.ts
🧠 5) Criar o API Client (axios wrapper)
/src/services/api.ts

ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Interceptor para JWT
api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
🔌 6) Criar serviços organizados por domínio
Exemplo: /src/services/auth.service.ts

ts
import { api } from "./api";

export const AuthService = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  me: () => api.get("/auth/me"),
};
Outros serviços:

candidate.service.ts

company.service.ts

jobs.service.ts

applications.service.ts

messages.service.ts

matching.service.ts

notifications.service.ts

admin.service.ts

🪝 7) Criar hooks globais
Auth Hook (Zustand)
/src/hooks/useAuth.ts

ts
import { create } from "zustand";

export const useAuth = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
🧬 8) Criar Providers globais
React Query Provider
/src/providers/query-provider.tsx

tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
Auth Provider
/src/providers/auth-provider.tsx

tsx
"use client";

import { useEffect } from "react";
import { AuthService } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";

export function AuthProvider({ children }) {
  const { setUser } = useAuth();

  useEffect(() => {
    AuthService.me()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return children;
}
🎨 9) Criar layout base com shadcn/ui
/src/app/layout.tsx

tsx
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/providers/auth-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
🔐 10) Criar middleware de proteção de rotas
/src/middleware.ts

ts
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}
🧩 11) Criar páginas iniciais
Login
/src/app/auth/login/page.tsx

tsx
"use client";

import { useForm } from "react-hook-form";
import { AuthService } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { setUser } = useAuth();

  const onSubmit = async (data) => {
    const res = await AuthService.login(data);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder="Email" />
        <input {...register("password")} type="password" placeholder="Password" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
🧱 12) Criar o Design System base
Instalar shadcn/ui já fez metade do trabalho.

Agora podes criar:

Navbar

Sidebar

DashboardShell

PageHeader

DataTable

Tudo dentro de /components/ui e /components/layout.

🎯 Resultado desta entrega
Com este setup tens:

Next.js  configurado

Tailwind + shadcn/ui instalados

Zustand para estado global

React Query para chamadas API

API client organizado

Providers globais

Middleware de autenticação

Estrutura enterprise pronta

Páginas iniciais funcionais

Ou seja: o frontend está pronto para começar a desenvolver features reais do portal.

Se quiseres, posso agora preparar:

J) Guia de boas práticas e padrões de código para o projeto
K) Roadmap completo consolidado (Fase 1 → 5)
L) README profissional para GitHub
M) Setup inicial do Design System (componentes base)
Qual queres seguir?

J
Claro, Sandro — aqui vai o Guia de Boas Práticas e Padrões de Código para o teu portal de recrutamento, escrito com rigor enterprise e pensado para equipas que valorizam qualidade, consistência e escalabilidade.

Organizei tudo de forma clara, direta e aplicável desde o primeiro commit.

🧭 Guia de Boas Práticas & Padrões de Código (Backend + Frontend)
Este guia cobre:

padrões de arquitetura

convenções de código

organização de módulos

validação e segurança

testes

documentação

performance

práticas de equipa

É o tipo de documento que qualquer CTO adoraria ver num repositório.

🧱 1) Arquitetura & Organização
🔹 Backend (NestJS)
Cada domínio tem o seu módulo isolado  
auth, users, candidates, companies, jobs, applications, matching, etc.

Cada módulo contém:

controller.ts → entrada HTTP

service.ts → lógica de negócio

repository.ts → acesso a dados (Prisma)

dto/ → validação

entities/ → modelos de saída

Nunca misturar lógica de negócio no controller.

Nunca aceder ao Prisma diretamente no controller ou service de outro módulo.

🔹 Frontend (Next.js)
Cada feature tem a sua pasta em /features

Componentes UI ficam em /components/ui

Lógica de domínio fica em hooks e serviços

Nunca misturar lógica de API dentro de componentes

Nunca colocar estado global desnecessário (Zustand só para auth e UI global)

🧩 2) Padrões de Código
🔹 Naming conventions
camelCase → variáveis, funções

PascalCase → classes, componentes React

UPPER_SNAKE_CASE → constantes

kebab-case → nomes de ficheiros

Exemplos:

Código
createJob()
JobService
JOB_STATUS
job-card.tsx
🔹 Estrutura de ficheiros
Cada ficheiro deve ter uma única responsabilidade.

Exemplo correto:

Código
jobs.service.ts → lógica de vagas
jobs.repository.ts → queries Prisma
jobs.controller.ts → rotas HTTP
Exemplo incorreto:

Código
jobs.ts → tudo misturado
🧪 3) Validação & DTOs
Backend
Todos os endpoints devem ter DTOs dedicados

Validação com class-validator ou Zod

Nunca confiar em dados vindos do frontend

Exemplo:

ts
export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(Seniority)
  level: Seniority;
}
Frontend
Validar formulários com:

React Hook Form

Zod schemas

🔐 4) Segurança
Hash de passwords com Argon2

JWT curto + refresh tokens rotativos

Rate limiting em endpoints sensíveis

Sanitização de input

Nunca devolver erros internos ao cliente

Nunca devolver stack traces em produção

Sempre usar HTTPS em produção

CORS configurado com whitelist

🧠 5) Padrões de Serviço (Backend)
Cada service deve seguir esta estrutura:

ts
@Injectable()
export class JobsService {
  constructor(private readonly repo: JobsRepository) {}

  async createJob(dto: CreateJobDto, userId: string) {
    // validações
    // regras de negócio
    return this.repo.create(dto, userId);
  }
}
Regras:

Services não devem conhecer detalhes de Prisma

Services não devem enviar emails diretamente (usar NotificationService)

Services não devem fazer logs diretos (usar LoggerService)

🧩 6) Padrões de Repositório (Prisma)
ts
@Injectable()
export class JobsRepository {
  constructor(private prisma: PrismaService) {}

  create(dto, userId) {
    return this.prisma.job.create({
      data: { ...dto, companyId: userId },
    });
  }
}
Regras:

Repositórios não contêm lógica de negócio

Apenas CRUD e queries complexas

Nunca chamar outro repositório dentro de um repositório

🎨 7) Padrões de Componentes (Frontend)
Componentes UI
Devem ser puros

Sem lógica de negócio

Sem chamadas API

Componentes de página
Podem carregar dados (server components)

Podem usar hooks

Hooks
Devem conter lógica de domínio

Devem ser reutilizáveis

🔌 8) Chamadas API (Frontend)
Todas as chamadas API devem passar por /services.

Exemplo:

ts
export const JobsService = {
  create: (data) => api.post("/jobs", data),
  list: () => api.get("/jobs"),
};
Nunca fazer:

ts
fetch("/jobs")
🧪 9) Testes
Backend
Unit tests para services

E2E tests para rotas críticas

Testes de integração para matching

Frontend
Testes de componentes com React Testing Library

Testes de hooks com Jest

Testes de páginas críticas

📊 10) Performance
Backend
Indexes no PostgreSQL

Cache Redis para:

matching

analytics

listagens pesadas

Filas BullMQ para:

emails

geração de embeddings

Frontend
Server Components sempre que possível

Suspense + streaming

React Query com cache inteligente

Lazy loading de componentes pesados

🧾 11) Documentação
README profissional

Swagger para API

Diagramas (arquitetura, sequência)

Comentários apenas quando necessário

Cada módulo deve ter um README.md interno

🧭 12) Padrões de Equipa
Commits semânticos:

feat:

fix:

refactor:

docs:

test:

PRs pequenas e focadas

Code review obrigatório

Lint + Prettier antes de merge

CI com testes automáticos

🎯 Resultado
Com este guia:

o código torna‑se previsível

a equipa trabalha de forma consistente

o onboarding é rápido

a arquitetura mantém-se limpa

o produto escala sem dores

É exatamente o tipo de documento que diferencia um projeto amador de um produto enterprise.

Se quiseres, posso agora preparar:

K) O roadmap completo consolidado (Fase 1 → 5)
L) README profissional para GitHub
M) Setup inicial do Design System (componentes base)
N) Guia de CI/CD (GitHub Actions + Deploy)
Qual queres seguir?

K
Claro, Sandro — aqui está o Roadmap Completo Consolidado (Fase 1 → 5), organizado como um documento estratégico de produto, com visão clara, prioridades, dependências e impacto.
Isto é exatamente o tipo de roadmap que impressiona equipas, investidores e qualquer stakeholder técnico.

Preparei tudo de forma sequencial, modular e escalável — como um verdadeiro SaaS enterprise.

🗺️ ROADMAP COMPLETO — TalentMatch (Fase 1 → 5)
Versão consolidada, estratégica e pronta para execução.

📌 FASE 1 — Fundamentos (Auth + Perfis)
Objetivo: Criar a base sólida do sistema.

🔹 Funcionalidades
Autenticação (registo, login, refresh tokens, reset password)

Perfis de candidato

Perfis de empresa

Upload de CV e logo

Gestão de roles (candidate/company/admin)

Estrutura modular do backend (NestJS)

Estrutura enterprise do frontend (Next.js)

Base de dados inicial (PostgreSQL + Prisma)

Docker Compose com Postgres, Redis, Meilisearch

🔹 Entregáveis
API funcional

UI inicial

Documentação (Swagger)

Setup CI/CD inicial

🔹 Impacto
Sistema pronto para suportar vagas, candidaturas e matching.

📌 FASE 2 — Vagas + Candidaturas
Objetivo: Criar o fluxo completo de recrutamento.

🔹 Funcionalidades
CRUD de vagas

Publicar / pausar / fechar vaga

Pesquisa de vagas (Meilisearch)

Candidaturas

Estados da candidatura

Mensagens internas

Notificações básicas

Painéis iniciais (minhas vagas, minhas candidaturas)

🔹 Entregáveis
Fluxo completo empresa → vaga → candidatura

UI de gestão de vagas

UI de candidaturas

Notificações internas

🔹 Impacto
O portal torna‑se um job board funcional.

📌 FASE 3 — Matching Inteligente + IA
Objetivo: Diferenciar o produto com inteligência real.

🔹 Funcionalidades
Matching determinístico (skills, localização, senioridade, salário)

Matching semântico (OpenAI + pgvector)

Recomendações:

candidatos para vaga

vagas para candidato

Explicação do score

IA assistiva:

melhorar descrição da vaga

melhorar CV

gerar mensagem de candidatura

🔹 Entregáveis
Motor de matching híbrido

Embeddings automáticos

UI de recomendações

IA integrada no fluxo

🔹 Impacto
O portal deixa de ser “mais um job board” e passa a ser um produto inteligente.

📌 FASE 4 — Notificações, Analytics e Admin
Objetivo: Tornar o sistema profissional, observável e administrável.

🔹 Funcionalidades
Notificações internas + email

Centro de notificações

Analytics:

empresa

candidato

admin

Painel administrativo:

gestão de utilizadores

gestão de empresas

gestão de vagas

logs e auditoria

🔹 Entregáveis
Dashboards completos

Logs estruturados

Painel admin

Monitorização e métricas

🔹 Impacto
O sistema ganha maturidade operacional e controlo total.

📌 FASE 5 — Premium, Monetização e Multi‑Tenant
Objetivo: Transformar o portal num SaaS comercial.

🔹 Funcionalidades
Planos pagos (Stripe Billing)

Free

Pro

Enterprise

Limites por plano

Multi‑tenant:

isolamento por empresa

branding por tenant

subdomínios

Gestão de equipa dentro da empresa

IA avançada (premium)

Exportação de dados

Integrações externas (ATS)

SSO (Enterprise)

🔹 Entregáveis
Sistema de faturação

Gestão de equipa

Branding customizado

Features premium desbloqueáveis

🔹 Impacto
O produto torna‑se um SaaS escalável e monetizável, pronto para o mercado.

🧱 Visão Consolidada (Resumo Executivo)
Fase	Objetivo	Resultado
1	Fundamentos	Sistema base sólido
2	Recrutamento	Job board funcional
3	Inteligência	Matching + IA
4	Profissionalização	Notificações + Analytics + Admin
5	Monetização	SaaS completo e escalável
🚀 Roadmap Temporal (Estimativa)
(Assumindo 1 dev sénior + IA como copiloto)

Fase	Duração estimada
1	3–4 semanas
2	4–6 semanas
3	4–6 semanas
4	3–5 semanas
5	5–8 semanas
Total: 19–29 semanas para um SaaS completo e pronto para mercado.

🎯 Resultado Final
Com este roadmap:

tens uma visão clara do produto

tens fases bem definidas

tens prioridades e dependências

tens um plano realista para lançar um SaaS

tens um documento que qualquer investidor ou CTO respeita

É literalmente o blueprint de um produto de classe mundial.

Se quiseres, posso agora preparar:

L) README profissional para GitHub
M) Setup inicial do Design System (componentes base)
N) Guia de CI/CD (GitHub Actions + Deploy)
O) Plano de testes (unitários, integração, E2E)
P) Plano de onboarding para novos devs
Qual queres seguir?

L
Claro, Sandro — aqui vai um README profissional, completo e pronto para colocar no GitHub, escrito com o rigor e a clareza que um CTO, investidor ou equipa sénior espera encontrar num produto enterprise.

Estruturei-o como um README de produto SaaS moderno: elegante, completo, técnico e comercial ao mesmo tempo.

📘 README — TalentMatch
Plataforma de Recrutamento Inteligente com IA, Matching Semântico e Arquitetura Enterprise

🚀 Visão Geral
O TalentMatch é uma plataforma de recrutamento moderna, construída com foco em:

Matching inteligente entre candidatos e vagas

IA generativa para melhorar CVs e descrições de vagas

Arquitetura modular e escalável

Experiência premium para empresas e candidatos

Multi‑tenant e monetização integrada

O objetivo é oferecer um portal de recrutamento rápido, inteligente e pronto para escalar como SaaS.

🧱 Tecnologias Principais
Frontend
Next.js  15 (App Router)

TypeScript

Tailwind CSS + shadcn/ui

Zustand (estado global)

React Query (data fetching)

SSR/ISR para performance e SEO

Backend
NestJS (arquitetura modular)

Prisma ORM

PostgreSQL + pgvector

Redis (cache + filas)

Meilisearch (pesquisa instantânea)

OpenAI (embeddings + IA assistiva)

Infraestrutura
Docker / Docker Compose

Railway / Fly.io  / Render

CI/CD (GitHub Actions)

Observabilidade (Grafana, Prometheus, Sentry)

🧩 Funcionalidades
Fase 1 — Fundamentos
Autenticação (JWT + Refresh Tokens)

Perfis de candidato e empresa

Upload de CV e logo

Gestão de roles

Fase 2 — Vagas & Candidaturas
CRUD de vagas

Publicação, pausa e fecho

Pesquisa avançada (Meilisearch)

Candidaturas e estados

Mensagens internas

Fase 3 — Matching Inteligente + IA
Matching determinístico

Matching semântico (OpenAI + pgvector)

Recomendações personalizadas

IA para:

melhorar CV

melhorar descrição da vaga

gerar mensagem de candidatura

Fase 4 — Notificações, Analytics e Admin
Notificações internas + email

Dashboards:

empresa

candidato

admin

Painel administrativo completo

Logs e auditoria

Fase 5 — Premium, Monetização e Multi‑Tenant
Planos pagos (Stripe Billing)

Limites por plano

Gestão de equipa

Branding por tenant

Subdomínios

Integrações externas (ATS)

SSO (Enterprise)

🏛️ Arquitetura
Código
Frontend (Next.js)
      ↓
Backend API (NestJS)
      ↓
PostgreSQL + Prisma + pgvector
Redis (cache + filas)
Meilisearch (search)
OpenAI (IA e embeddings)
A arquitetura segue princípios de:

Clean Architecture

Domain‑Driven Design

Modularidade extrema

Escalabilidade horizontal

📁 Estrutura do Repositório
Código
/frontend
  /app
  /components
  /features
  /services
  /providers
  /hooks
  /types

/backend
  /src
    /modules
    /common
    /config
    /database
    /infra
  prisma/schema.prisma

/docker
  docker-compose.yml
⚙️ Como Executar Localmente
1. Clonar o repositório
bash
git clone https://github.com/seu-usuario/talentmatch.git
cd talentmatch
2. Subir serviços essenciais
bash
docker compose up -d
3. Instalar dependências
Backend:

bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
Frontend:

bash
cd frontend
npm install
npm run dev
🧪 Testes
Backend
Jest (unitários)

Supertest (E2E)

Testes de integração para matching

Frontend
React Testing Library

Jest

Testes de hooks e componentes

🔐 Segurança
Hash Argon2

JWT curto + refresh rotativo

Rate limiting via Redis

Sanitização de input

Helmet + CORS configurado

Auditoria de ações críticas

📊 Observabilidade
Logs estruturados (Pino)

Métricas (Prometheus)

Dashboards (Grafana)

Erros (Sentry)

💳 Monetização
Integrado com Stripe Billing:

Checkout

Webhooks

Gestão de planos

Limites por plano

Faturação automática

🧬 Matching Inteligente
Determinístico
Skills obrigatórias

Skills desejáveis

Senioridade

Localização

Salário

Semântico
Embeddings OpenAI

Similaridade coseno

Score híbrido:

Código
0.6 * determinístico + 0.4 * semântico
🤖 IA Assistiva
Melhoria de CV

Melhoria de descrição de vaga

Geração de mensagem de candidatura

Sugestão de skills

Resumos automáticos

🛡️ Admin
Gestão de utilizadores

Gestão de empresas

Gestão de vagas

Logs e auditoria

Analytics global

🧭 Roadmap
[x] Fase 1 — Fundamentos

[x] Fase 2 — Vagas & Candidaturas

[x] Fase 3 — Matching + IA

[x] Fase 4 — Analytics + Admin

[x] Fase 5 — Monetização + Multi‑Tenant

[ ] Fase 6 — Mobile App

[ ] Fase 7 — Integrações ATS avançadas

[ ] Fase 8 — Marketplace de freelancers

🤝 Contribuições
Pull requests são bem‑vindos.
Por favor, mantenha o padrão de código e siga o guia de boas práticas incluído no repositório.

📄 Licença
MIT — livre para uso comercial e pessoal.

Se quiseres, posso agora preparar:

M) Setup inicial do Design System (componentes base)

N) Guia de CI/CD (GitHub Actions + Deploy)

O) Plano de testes (unitários, integração, E2E)

P) Plano de onboarding para novos devs

Qual queres seguir?

M
Perfeito, Sandro — vamos montar o Setup Inicial do Design System, com foco em:

consistência visual

escalabilidade

reutilização

acessibilidade

integração perfeita com shadcn/ui + Tailwind

padrões enterprise

Isto cria a base visual do TalentMatch e garante que qualquer página futura mantém a mesma qualidade e identidade.

Preparei tudo de forma modular, clara e pronta para copiar e colar no projeto.

🎨 Setup Inicial do Design System — TalentMatch UI
A estrutura segue três princípios:

Fundação (tokens, cores, tipografia, espaçamentos)

Componentes base (botões, inputs, cards, badges, etc.)

Componentes compostos (navbar, sidebar, dashboard shell)

Vamos construir cada parte.

1) 🌈 Fundação do Design System
1.1. Cores (Tailwind config)
Adicionar ao tailwind.config.js:

js
theme: {
  extend: {
    colors: {
      brand: {
        DEFAULT: "#4F46E5", // Indigo 600
        light: "#6366F1",
        dark: "#4338CA",
      },
      success: "#10B981",
      warning: "#F59E0B",
      danger: "#EF4444",
    },
  },
}
Porquê estas cores?
modernas

acessíveis

funcionam bem com dashboards

fáceis de adaptar para multi‑tenant (Fase 5)

1.2. Tipografia
Adicionar ao globals.css:

css
:root {
  --font-sans: 'Inter', sans-serif;
}

body {
  font-family: var(--font-sans);
}
1.3. Espaçamentos e Radius
js
extend: {
  borderRadius: {
    sm: "6px",
    md: "10px",
    lg: "14px",
  },
  spacing: {
    18: "4.5rem",
    22: "5.5rem",
  },
}
2) 🧱 Componentes Base (shadcn + custom)
Estes são os blocos fundamentais do Design System.

2.1. Botão (Button)
/components/ui/button.tsx

tsx
import { cn } from "@/lib/utils";
import { Button as ShadButton } from "@/components/ui/button";

export function TMButton({ className, ...props }) {
  return (
    <ShadButton
      className={cn(
        "rounded-md font-medium transition-all",
        "data-[state=loading]:opacity-70",
        className
      )}
      {...props}
    />
  );
}
2.2. Input
/components/ui/input.tsx

tsx
import { Input as ShadInput } from "@/components/ui/input";

export function TMInput(props) {
  return (
    <ShadInput
      className="rounded-md border-gray-300 focus-visible:ring-brand"
      {...props}
    />
  );
}
2.3. Card
/components/ui/card.tsx

tsx
import { Card as ShadCard } from "@/components/ui/card";

export function TMCard({ children, className }) {
  return (
    <ShadCard className={`rounded-lg shadow-sm p-6 ${className}`}>
      {children}
    </ShadCard>
  );
}
2.4. Badge
/components/ui/badge.tsx

tsx
export function TMBadge({ children, variant = "default" }) {
  const variants = {
    default: "bg-brand text-white",
    success: "bg-success text-white",
    warning: "bg-warning text-white",
    danger: "bg-danger text-white",
  };

  return (
    <span className={`px-2 py-1 rounded-md text-xs ${variants[variant]}`}>
      {children}
    </span>
  );
}
2.5. Avatar
/components/ui/avatar.tsx

tsx
export function TMAvatar({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-10 h-10 rounded-full object-cover border"
    />
  );
}
3) 🧩 Componentes Compostos (Enterprise)
Agora criamos os componentes que estruturam a UI.

3.1. Navbar
/components/layout/navbar.tsx

tsx
"use client";

import { TMAvatar } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="h-16 border-b flex items-center justify-between px-6 bg-white">
      <div className="font-semibold text-lg">TalentMatch</div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.email}</span>
        <TMAvatar src={user?.avatarUrl} alt={user?.name} />
      </div>
    </nav>
  );
}
3.2. Sidebar
/components/layout/sidebar.tsx

tsx
import Link from "next/link";

export function Sidebar({ items }) {
  return (
    <aside className="w-64 border-r h-screen p-4 bg-gray-50">
      <nav className="flex flex-col gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3 py-2 rounded-md hover:bg-gray-200"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
3.3. Dashboard Shell
/components/layout/dashboard-shell.tsx

tsx
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

export function DashboardShell({ children, menu }) {
  return (
    <div className="flex h-screen">
      <Sidebar items={menu} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
4) 📊 Componentes de Dashboard (Charts)
Usando Tremor ou Recharts.

Exemplo com Tremor:

bash
npm install @tremor/react
/components/charts/bar-chart.tsx

tsx
import { BarChart } from "@tremor/react";

export function TMBarChart({ data }) {
  return (
    <BarChart
      data={data}
      index="label"
      categories={["value"]}
      colors={["indigo"]}
      className="h-64"
    />
  );
}
5) 🧬 Tokens e Variáveis Globais
Adicionar ao globals.css:

css
:root {
  --brand: #4F46E5;
  --brand-light: #6366F1;
  --brand-dark: #4338CA;

  --radius: 10px;
}
6) 🧪 Checklist de Qualidade do Design System
[x] Cores consistentes

[x] Tipografia unificada

[x] Componentes base reutilizáveis

[x] Componentes compostos para dashboards

[x] Layout escalável

[x] Acessibilidade (focus states, contrastes)

[x] Preparado para multi‑tenant (Fase 5)

🎯 Resultado
Com este setup:

tens um Design System sólido, moderno e escalável

o frontend ganha consistência e velocidade de desenvolvimento

qualquer nova página segue o mesmo padrão visual

a equipa pode crescer sem perder qualidade

o produto fica com aparência premium desde o início

É literalmente a fundação visual de um SaaS de classe mundial.

Se quiseres, posso agora preparar:

N) Guia de CI/CD (GitHub Actions + Deploy)

O) Plano de testes (unitários, integração, E2E)

P) Plano de onboarding para novos devs

Q) Setup inicial de branding multi‑tenant (Fase 5)

Qual queres seguir?

N
Claro, Sandro — aqui vai o Guia de CI/CD completo (GitHub Actions + Deploy), escrito com rigor enterprise e pronto para copiar diretamente para o repositório.

Estruturei tudo para suportar:

Backend NestJS

Frontend Next.js

Testes automáticos

Linting + Type Checking

Build pipelines otimizados

Deploy automático (Railway / Fly.io  / Render / Vercel)

Ambientes separados (dev, staging, prod)

Este é o tipo de pipeline que qualquer equipa sénior espera encontrar num SaaS moderno.

🚀 Guia de CI/CD — TalentMatch
🎯 Objetivo
Garantir que:

cada commit é validado

cada PR é testado

cada merge dispara deploy automático

o sistema é estável, previsível e auditável

🧱 1) Estrutura recomendada de ambientes
Ambientes
Ambiente	Branch	Deploy automático	Uso
Dev	develop	Sim	Testes internos
Staging	staging	Sim	QA / UAT
Production	main	Sim	Utilizadores reais
Serviços
Frontend → Vercel

Backend → Railway / Fly.io  / Render

DB → Railway / Neon / Supabase

Redis → Upstash / Railway

Meilisearch → Railway / Docker host

🧩 2) GitHub Actions — Estrutura de Workflows
Recomendo 3 workflows:

Código
.github/workflows/
  backend-ci.yml
  frontend-ci.yml
  deploy.yml
🧪 3) CI do Backend (NestJS + Prisma)
backend-ci.yml

yaml
name: Backend CI

on:
  pull_request:
    paths:
      - "backend/**"
  push:
    branches:
      - develop
      - staging
      - main
    paths:
      - "backend/**"

jobs:
  backend-ci:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        ports: ["5432:5432"]
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: testdb
        options: >-
          --health-cmd="pg_isready -U postgres"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=5

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: |
          cd backend
          npm ci

      - name: Generate Prisma Client
        run: |
          cd backend
          npx prisma generate

      - name: Run migrations
        run: |
          cd backend
          npx prisma migrate deploy

      - name: Lint
        run: |
          cd backend
          npm run lint

      - name: Run tests
        run: |
          cd backend
          npm test
🎨 4) CI do Frontend (Next.js + TypeScript)
frontend-ci.yml

yaml
name: Frontend CI

on:
  pull_request:
    paths:
      - "frontend/**"
  push:
    branches:
      - develop
      - staging
      - main
    paths:
      - "frontend/**"

jobs:
  frontend-ci:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: |
          cd frontend
          npm ci

      - name: Lint
        run: |
          cd frontend
          npm run lint

      - name: Type Check
        run: |
          cd frontend
          npm run type-check

      - name: Build
        run: |
          cd frontend
          npm run build
🚀 5) Deploy Automático (Backend + Frontend)
deploy.yml

yaml
name: Deploy

on:
  push:
    branches:
      - main
      - staging
      - develop

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    if: contains(github.event.head_commit.message, '[skip deploy]') == false

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Railway
        uses: railwayapp/railway-deploy@v1
        with:
          service: backend
          token: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    if: contains(github.event.head_commit.message, '[skip deploy]') == false

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
🔐 6) Secrets necessários no GitHub
Backend
RAILWAY_TOKEN

DATABASE_URL

REDIS_URL

MEILI_URL

OPENAI_API_KEY

JWT_SECRET

REFRESH_SECRET

Frontend
NEXT_PUBLIC_API_URL

VERCEL_TOKEN

VERCEL_ORG_ID

VERCEL_PROJECT_ID

📦 7) Estratégia de Versionamento
Recomendo:

SemVer (major.minor.patch)

Tags automáticas via GitHub Actions (opcional)

Releases automáticas com changelog

🧭 8) Fluxo de Trabalho da Equipa
Branches:
main → produção

staging → QA

develop → desenvolvimento

feature branches → feature/xxx

Pull Requests:
CI obrigatório

Lint + testes obrigatórios

Code review obrigatório

🎯 Resultado
Com este guia:

tens CI/CD completo e profissional

deploy automático para backend e frontend

testes e linting garantem qualidade

ambientes separados garantem segurança

pipeline pronto para escalar com equipa

É literalmente o pipeline de um SaaS enterprise.

Se quiseres, posso agora preparar:

O) Plano de testes (unitários, integração, E2E)

P) Plano de onboarding para novos devs

Q) Setup inicial de branding multi‑tenant

R) Guia de migração para microserviços (futuro)

Qual queres seguir?

O
Claro, Sandro — aqui vai o Plano de Testes completo (unitários, integração, E2E), estruturado como um documento profissional de QA/Engineering, pronto para colocar no repositório ou apresentar a uma equipa sénior.

Organizei tudo com foco em:

cobertura realista

prioridades

ferramentas recomendadas

exemplos concretos

estratégia por módulo

critérios de aceitação

pipelines automáticos

Este plano garante que o TalentMatch mantém qualidade enterprise à medida que cresce.

🧪 PLANO DE TESTES — TalentMatch (Backend + Frontend)
Versão enterprise, modular e escalável

1) 🎯 Objetivos do Plano de Testes
Garantir correção funcional de todos os módulos

Prevenir regressões

Validar integrações críticas (auth, matching, IA, billing)

Garantir performance mínima aceitável

Assegurar segurança e consistência de dados

Automatizar o máximo possível

2) 🧱 Tipos de Testes
Tipo	Objetivo	Ferramentas
Unitários	Testar funções isoladas	Jest
Integração	Testar módulos completos (service + repo + DB)	Jest + Testcontainers
E2E	Testar fluxo completo via API	Supertest + Jest
Frontend Unit	Testar componentes isolados	React Testing Library
Frontend E2E	Testar fluxo real no browser	Playwright
Carga/Performance	Validar escalabilidade	k6 / Artillery
Segurança	Validar permissões e roles	Jest + Supertest
Smoke Tests	Garantir que deploy está funcional	GitHub Actions
3) 🧩 Estratégia de Testes por Módulo (Backend)
🔐 Auth
Unit:

hashing de password

geração de tokens

validação de tokens

Integração:

login

registo

refresh token

E2E:

fluxo completo de autenticação

👤 Users
Unit:

validação de DTOs

Integração:

update profile

change password

E2E:

fluxo de atualização de utilizador

👥 Candidates & Companies
Unit:

validação de perfis

Integração:

criação e edição de perfil

upload de CV/logo

E2E:

fluxo completo de onboarding

🧱 Jobs
Unit:

validação de criação de vaga

Integração:

CRUD completo

indexação Meilisearch

E2E:

empresa cria vaga → vaga aparece na listagem

📄 Applications
Unit:

validação de estados

Integração:

evitar duplicados

mensagens internas

E2E:

candidato candidata-se → empresa vê candidatura

🧠 Matching
Unit:

cálculo determinístico

cálculo semântico (mock embeddings)

Integração:

ranking híbrido

pgvector similarity

E2E:

empresa vê candidatos recomendados

🤖 IA Assistiva
Unit:

validação de prompts

Integração:

mock OpenAI

E2E:

melhorar descrição da vaga

melhorar CV

🔔 Notificações
Unit:

formatação de mensagens

Integração:

envio para Redis

persistência

E2E:

candidatura → empresa recebe notificação

📊 Analytics
Integração:

queries agregadas

cache Redis

E2E:

dashboards carregam dados corretos

🛡️ Admin
Integração:

gestão de utilizadores

gestão de empresas

logs

E2E:

admin modera vaga

💳 Billing (Stripe)
Unit:

validação de planos

Integração:

mock webhooks

E2E:

upgrade de plano → limites aplicados

4) 🎨 Estratégia de Testes por Módulo (Frontend)
🧩 Componentes UI
Testar:

renderização

estados (loading, disabled)

acessibilidade

🧠 Hooks
Testar:

useAuth

useNotifications

usePagination

🔌 Serviços API
Testar:

chamadas axios com mocks

erros e timeouts

🧭 Páginas
Testar:

SSR

redirecionamentos

proteção de rotas

🌐 E2E (Playwright)
Fluxos críticos:

Login

Criar vaga

Candidatar-se

Ver recomendações

Enviar mensagens

Atualizar perfil

Admin modera vaga

Upgrade de plano

5) 🧪 Cobertura Mínima Recomendada
Área	Cobertura
Backend Unit	70%
Backend Integração	60%
Backend E2E	80% dos fluxos críticos
Frontend Unit	60%
Frontend E2E	Fluxos críticos 100%
6) ⚙️ Ferramentas e Configuração
Backend
Jest

Supertest

Testcontainers (Postgres + Redis + Meilisearch)

ts-mockito

Frontend
React Testing Library

Jest

Playwright

Performance
k6

Artillery

7) 🔄 Integração com CI/CD
Cada PR deve executar:

lint

type-check

unit tests

integration tests

E2E (opcional em PR, obrigatório em staging)

Deploy só acontece se:

todos os testes passarem

cobertura mínima for atingida

build for bem-sucedido

8) 📦 Estrutura de Pastas de Testes
Backend
Código
/backend
  /src
    /modules
      /jobs
        jobs.service.spec.ts
        jobs.controller.spec.ts
        jobs.repository.spec.ts
  /test
    e2e/
      auth.e2e-spec.ts
      jobs.e2e-spec.ts
      matching.e2e-spec.ts
Frontend
Código
/frontend
  /__tests__
    components/
    hooks/
    pages/
  /e2e
    login.spec.ts
    create-job.spec.ts
    apply.spec.ts
9) 🧭 Fluxos Críticos (Testes Obrigatórios)
Registo + Login

Criar vaga

Candidatar-se

Matching híbrido

IA assistiva

Notificações

Analytics

Admin

Billing (upgrade/downgrade)

Multi‑tenant (isolamento)

🎯 Resultado
Com este plano:

o sistema fica protegido contra regressões

a qualidade é garantida em cada release

o CI/CD torna-se confiável

a equipa ganha confiança para evoluir rápido

o produto mantém nível enterprise

É literalmente o plano de testes que um SaaS sério precisa.

Se quiseres, posso agora preparar:

P) Plano de onboarding para novos devs

Q) Setup inicial de branding multi‑tenant

R) Guia de migração para microserviços

S) Plano de performance & load testing

Qual queres seguir?

P
Perfeito, Sandro — aqui vai o Plano de Onboarding para Novos Devs, escrito como um documento interno de engenharia, claro, pragmático e pronto para colocar no repositório.

A ideia é que qualquer novo developer consiga:

instalar tudo

entender a arquitetura

seguir padrões

contribuir com confiança

evitar erros comuns

integrar-se rapidamente na cultura do projeto

Este onboarding está desenhado para equipas de alto nível e para um produto com ambição de escala.

🧭 Plano de Onboarding para Novos Devs — TalentMatch
🎯 Objetivo
Garantir que qualquer novo developer consegue:

compreender a arquitetura

instalar o ambiente local

seguir padrões de código

contribuir com PRs de qualidade

integrar-se rapidamente no fluxo da equipa

🧱 1) Primeiros Passos (Dia 0)
1.1. Instalar ferramentas essenciais
Node.js  20+

Docker + Docker Compose

Git

VSCode (recomendado)

Extensões:

Prisma

Tailwind CSS IntelliSense

ESLint

Prettier

GitLens

1.2. Clonar o repositório
bash
git clone https://github.com/talentmatch/talentmatch.git
cd talentmatch
🐳 2) Subir a infraestrutura local
Na raiz do projeto:

bash
docker compose up -d
Isto inicia:

PostgreSQL

Redis

Meilisearch

⚙️ 3) Backend Setup (NestJS)
bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
Verificar se está a funcionar
Abrir:

Código
http://localhost:3000/docs
Se o Swagger abrir, está tudo certo.

🎨 4) Frontend Setup (Next.js)
bash
cd frontend
npm install
npm run dev
Abrir:

Código
http://localhost:3001
🧩 5) Arquitetura — O que cada dev precisa saber
Backend
NestJS modular

Prisma como ORM

PostgreSQL como DB principal

Redis para cache e filas

Meilisearch para pesquisa

OpenAI para IA e embeddings

Frontend
Next.js  App Router

shadcn/ui como design system

Zustand para estado global

React Query para data fetching

SSR/ISR para performance

🧱 6) Padrões de Código (Obrigatórios)
Backend
Controller → Service → Repository

DTOs para todas as entradas

Nunca aceder ao Prisma fora de repositórios

Nunca colocar lógica de negócio no controller

Sempre usar guards para roles

Sempre validar input

Frontend
Componentes puros em /components/ui

Lógica de domínio em /features

Chamadas API em /services

Estado global mínimo (apenas auth e UI global)

Páginas limpas e declarativas

🔐 7) Segurança (Obrigatório ler)
JWT curto + refresh rotativo

Nunca guardar tokens em cookies não seguros

Sanitização de input

Rate limiting em endpoints sensíveis

RBAC aplicado em todas as rotas privadas

🧪 8) Testes — Expectativas
Backend
Jest para unitários

Supertest para E2E

Testcontainers para integração

Frontend
React Testing Library

Playwright para E2E

Cobertura mínima
Unit: 60%

E2E: fluxos críticos 100%

🔄 9) Fluxo de Trabalho (Git)
Branches
main → produção

staging → QA

develop → desenvolvimento

feature/xxx → novas features

Pull Requests
CI deve passar

Lint + type-check obrigatórios

PRs pequenas e focadas

Descrição clara

Screenshots quando UI muda

🚀 10) CI/CD — O que o dev precisa saber
Cada PR dispara testes

Cada merge em develop → deploy dev

Cada merge em staging → deploy staging

Cada merge em main → deploy produção

🧠 11) Conhecimentos Essenciais (Checklist)
Backend
NestJS modules

Prisma relations

pgvector

Redis (cache + filas)

Meilisearch basics

Frontend
Next.js  App Router

Server Components

shadcn/ui

React Query

Zustand

🧩 12) Primeiras Tarefas para Novos Devs (Onboarding Tasks)
Estas tarefas são desenhadas para aprender a arquitetura rapidamente.

Tarefa 1 — Criar um endpoint simples
Criar módulo hello

GET /hello retorna { message: "Hello TalentMatch" }

Tarefa 2 — Criar uma página simples no frontend
/hello

Chamar o endpoint backend

Renderizar a resposta

Tarefa 3 — Criar um componente UI
Criar TMAlert

Usar shadcn como base

Tarefa 4 — Criar um teste unitário
Testar o service do módulo hello

Tarefa 5 — Criar um PR completo
Código

Testes

Descrição

Screenshots

🧭 13) Cultura de Engenharia
Código limpo > código rápido

Documentar sempre que necessário

PRs pequenas e frequentes

Feedback construtivo

Zero ego, máxima colaboração

Qualidade antes de velocidade

Automação sempre que possível

🎯 Resultado
Com este plano de onboarding:

novos devs entram no projeto com confiança

entendem a arquitetura rapidamente

seguem padrões desde o primeiro dia

evitam erros comuns

tornam-se produtivos em 48–72 horas

É exatamente o tipo de onboarding que uma equipa sénior espera num SaaS enterprise.

Se quiseres, posso agora preparar:

Q) Setup inicial de branding multi‑tenant (Fase 5)

R) Guia de migração para microserviços (futuro)

S) Plano de performance & load testing

T) Guia de documentação interna (wiki + padrões)

Q
Claro, Sandro — vamos montar o Setup Inicial de Branding Multi‑Tenant, exatamente como um SaaS enterprise deve implementar: isolado por empresa, personalizável, seguro e escalável.

Isto prepara o TalentMatch para a Fase 5, onde cada empresa tem:

identidade visual própria

cores personalizadas

logo próprio

subdomínio próprio

experiência isolada para candidatos e recrutadores

Vou estruturar tudo de forma clara e prática, para poderes implementar imediatamente.

🎨 Setup Inicial de Branding Multi‑Tenant (Fase 5)
A arquitetura de branding multi‑tenant envolve 4 camadas:

Base de dados (armazenar branding por empresa)

Backend (resolver tenant + fornecer branding)

Frontend (aplicar branding dinamicamente)

Subdomínios (opcional, mas recomendado)

Vamos construir cada parte.

🧱 1) Base de Dados — Modelo TenantBranding
Adicionar ao Prisma:

prisma
model TenantBranding {
  id            String   @id @default(uuid())
  companyId     String   @unique
  logoUrl       String?
  primaryColor  String?  // ex: #4F46E5
  secondaryColor String?
  subdomain     String?  @unique
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  company       Company  @relation(fields: [companyId], references: [id])
}
🧩 2) Backend — Resolver o Tenant
O backend precisa identificar o tenant com base em:

subdomínio (empresa.talentmatch.com)

ou companyId do utilizador autenticado

Middleware de Tenant (NestJS)
Fluxo:

Ler o host do request

Extrair subdomínio

Procurar tenant na DB

Guardar tenant no request

Pseudo‑código:

ts
@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const host = req.headers.host; // empresa.talentmatch.com
    const subdomain = host.split('.')[0];

    if (subdomain && subdomain !== 'www' && subdomain !== 'app') {
      const tenant = await this.prisma.tenantBranding.findUnique({
        where: { subdomain },
      });

      if (tenant) {
        req['tenant'] = tenant;
      }
    }

    next();
  }
}
Endpoint para obter branding
GET /branding

Retorna:

json
{
  "logoUrl": "https://cdn.com/company/logo.png",
  "primaryColor": "#4F46E5",
  "secondaryColor": "#6366F1"
}
🎨 3) Frontend — Aplicar Branding Dinamicamente
O frontend precisa:

carregar branding no layout

aplicar cores dinamicamente

substituir logo

permitir fallback para tema padrão

3.1. Hook para carregar branding
/hooks/useBranding.ts

ts
import { useQuery } from "@tanstack/react-query";
import { BrandingService } from "@/services/branding.service";

export function useBranding() {
  return useQuery({
    queryKey: ["branding"],
    queryFn: BrandingService.getBranding,
  });
}
3.2. Provider de Branding
/providers/branding-provider.tsx

tsx
"use client";

import { createContext, useContext } from "react";
import { useBranding } from "@/hooks/useBranding";

const BrandingContext = createContext(null);

export function BrandingProvider({ children }) {
  const { data } = useBranding();

  const branding = {
    logoUrl: data?.logoUrl ?? "/default-logo.svg",
    primaryColor: data?.primaryColor ?? "#4F46E5",
    secondaryColor: data?.secondaryColor ?? "#6366F1",
  };

  return (
    <BrandingContext.Provider value={branding}>
      <style>{`
        :root {
          --brand: ${branding.primaryColor};
          --brand-light: ${branding.secondaryColor};
        }
      `}</style>
      {children}
    </BrandingContext.Provider>
  );
}

export const useBrand = () => useContext(BrandingContext);
3.3. Integrar no layout principal
/app/layout.tsx

tsx
<QueryProvider>
  <AuthProvider>
    <BrandingProvider>
      {children}
    </BrandingProvider>
  </AuthProvider>
</QueryProvider>
🧬 4) Subdomínios — Multi‑Tenant Real
Opção 1:
empresa.talentmatch.com → recomendado

Opção 2:
talentmatch.com/empresa → fallback

Configuração DNS (Vercel)
wildcard: *.talentmatch.com

aponta para o frontend

Next.js Middleware para subdomínios
middleware.ts

ts
export function middleware(req) {
  const host = req.headers.get("host");
  const subdomain = host.split(".")[0];

  if (subdomain && subdomain !== "www" && subdomain !== "app") {
    req.nextUrl.searchParams.set("tenant", subdomain);
  }

  return NextResponse.next();
}
🎨 5) UI Dinâmica — Aplicar Branding
Navbar com branding
tsx
const { logoUrl } = useBrand();

<img src={logoUrl} className="h-8" />
Botões com cor do tenant
tsx
<button className="bg-[var(--brand)] hover:bg-[var(--brand-light)]">
  Criar vaga
</button>
Cards com tema
tsx
<div className="border-l-4 border-[var(--brand)] p-4">
  ...
</div>
🧱 6) Página de Configuração de Branding (Empresa)
Campos:
Logo

Cor primária

Cor secundária

Subdomínio

Fluxo:
Empresa edita branding

Backend valida

Atualiza DB

Frontend refaz cache

Branding aplicado instantaneamente

🔐 7) Segurança Multi‑Tenant
Todas as queries backend devem filtrar por companyId

Admin ignora filtros

Subdomínios não podem colidir

Branding não pode ser acedido por outras empresas

🎯 Resultado
Com este setup:

cada empresa tem identidade visual própria

o portal adapta-se automaticamente ao tenant

subdomínios funcionam como “mini‑portais”

o branding é carregado dinamicamente

a arquitetura está pronta para escalar como SaaS enterprise

É literalmente o que plataformas como Notion, Linear, Intercom e HubSpot fazem.

Se quiseres, posso agora preparar:

R) Guia de migração para microserviços

S) Plano de performance & load testing

T) Guia de documentação interna (wiki + padrões)

U) Setup de integrações externas (ATS, SSO, Webhooks)