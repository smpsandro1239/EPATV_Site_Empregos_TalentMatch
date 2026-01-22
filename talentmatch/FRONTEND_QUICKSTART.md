# 🚀 QUICK START - Frontend Implementation

**Data:** 22 de Janeiro de 2026
**Objetivo:** Implementar pages do frontend em 1-2 dias

---

## 📋 Checklist de Implementação

### ✅ DONE - Backend
```
✅ 55+ API endpoints implementados
✅ Documentação de API em PHASE_1B_TESTS.md
✅ Docker Compose rodando
✅ Database com schema completo
```

### ⏳ TODO - Frontend

#### 1. Candidate Profile Page
```
[ ] /candidate/profile - Criar página
[ ] - Form campos: name, location, headline, about, cvUrl
[ ] - Upload CV
[ ] - Upload foto de perfil
[ ] - Integração com POST /candidates
[ ] - Integração com PUT /candidates/:id
[ ] - Seção de experiências (add, edit, delete)
[ ] - Seção de educação (add, edit, delete)
[ ] - Seção de skills (add, remove)
[ ] - Validação de formulários
[ ] - Loading states
[ ] - Error handling
[ ] - Success messages
```

#### 2. Company Profile Page
```
[ ] /company/profile - Criar página
[ ] - Form campos: name, location, website, industry, size, description, logoUrl
[ ] - Upload logo
[ ] - Integração com POST /companies
[ ] - Integração com PUT /companies/:id
[ ] - Validação de formulários
[ ] - Loading states
[ ] - Error handling
```

#### 3. Candidate Dashboard
```
[ ] /candidate/dashboard - Criar página
[ ] - Perfil resumido
[ ] - Últimas candidaturas
[ ] - Vagas recomendadas
[ ] - Stats (total candidaturas, em revisão, etc)
[ ] - Links para ações (buscar vaga, editar perfil)
```

#### 4. Company Dashboard
```
[ ] /company/dashboard - Criar página
[ ] - Perfil resumido
[ ] - Minhas vagas (com status)
[ ] - Últimas candidaturas
[ ] - Botão criar vaga
[ ] - Stats (total vagas, candidaturas, etc)
```

#### 5. Jobs Listing Page
```
[ ] /jobs - Criar página
[ ] - GET /jobs com paginação
[ ] - JobCard component (title, company, location, salary)
[ ] - Busca por texto (search)
[ ] - Filtros:
[   ] - Level (JUNIOR, MID, SENIOR)
[   ] - Contract Type (FULL_TIME, PART_TIME, etc)
[   ] - Location
[   ] - Remote Type (FULLY_REMOTE, HYBRID, ON_SITE)
[ ] - Paginação
[ ] - Loading skeleton
[ ] - Empty state
[ ] - Clique abre /jobs/[id]
```

#### 6. Job Detail Page
```
[ ] /jobs/[id] - Criar página
[ ] - GET /jobs/:id
[ ] - Informações da vaga (title, description, requirements, etc)
[ ] - Logo da empresa
[ ] - Botão Apply (se não aplicou ainda)
[ ] - Mensagem "Já aplicou" (se já aplicou)
[ ] - Form de candidatura (se não aplicou):
[   ] - CV upload ou usar do perfil
[   ] - Cover letter
[   ] - Integração com POST /applications
[ ] - Validação
[ ] - Loading states
[ ] - Success/error messages
```

---

## 🔧 Setup & Tools

### Ambiente
```bash
# Verificar que backend está rodando
curl http://localhost:3001/jobs
# Deve retornar lista de vagas

# Verificar frontend
npm run dev
# Deve estar em http://localhost:3000
```

### Bibliotecas Já Instaladas
```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "tailwindcss": "^3.0.0",
  "@hookform/resolvers": "^3.0.0",
  "react-hook-form": "^7.0.0"
}
```

### Bibliotecas a Instalar (Opcional)
```bash
# Para componentes
npm install @radix-ui/react-dialog @radix-ui/react-select

# Para notificações
npm install react-toastify

# Para loading skeleton
npm install react-loading-skeleton

# Para upload
npm install react-dropzone
```

---

## 📝 Estrutura de Arquivos

```
frontend/src/
├── app/
│   ├── candidate/
│   │   ├── profile/
│   │   │   └── page.tsx         ← CRIAR
│   │   ├── dashboard/
│   │   │   └── page.tsx         ← CRIAR
│   │   └── applications/
│   │       └── page.tsx         ← CRIAR (depois)
│   ├── company/
│   │   ├── profile/
│   │   │   └── page.tsx         ← CRIAR
│   │   ├── dashboard/
│   │   │   └── page.tsx         ← CRIAR
│   │   └── jobs/
│   │       ├── new/
│   │       │   └── page.tsx     ← CRIAR (depois)
│   │       └── page.tsx         ← CRIAR (depois)
│   ├── jobs/
│   │   ├── page.tsx             ← CRIAR (listagem)
│   │   └── [id]/
│   │       └── page.tsx         ← CRIAR (detalhe)
│   └── ...
│
├── components/
│   ├── JobCard.tsx              ← CRIAR
│   ├── JobList.tsx              ← CRIAR
│   ├── CandidateForm.tsx         ← CRIAR
│   ├── CompanyForm.tsx           ← CRIAR
│   ├── JobForm.tsx               ← CRIAR
│   ├── ExperienceForm.tsx         ← CRIAR
│   ├── EducationForm.tsx          ← CRIAR
│   ├── SkillForm.tsx              ← CRIAR
│   ├── Header.tsx                 ← Melhorar
│   └── ...
│
├── services/
│   ├── api.ts                   ← USAR EXISTENTE
│   ├── candidateService.ts      ← CRIAR
│   ├── companyService.ts        ← CRIAR
│   ├── jobsService.ts           ← CRIAR
│   └── applicationsService.ts   ← CRIAR
│
├── hooks/
│   ├── useAuth.ts               ← USAR EXISTENTE
│   ├── useCandidate.ts          ← CRIAR
│   ├── useCompany.ts            ← CRIAR
│   ├── useJobs.ts               ← CRIAR
│   └── useFetch.ts              ← CRIAR
│
├── types/
│   ├── index.ts                 ← Adicionar tipos
│   ├── candidate.ts             ← CRIAR
│   ├── company.ts               ← CRIAR
│   ├── job.ts                   ← CRIAR
│   └── application.ts           ← CRIAR
│
└── styles/
    └── globals.css
```

---

## 💻 Código Template

### Service Exemplo (candidateService.ts)
```typescript
import { axiosInstance } from './api';

export interface CandidateProfile {
  id: string;
  userId: string;
  name: string;
  location: string;
  headline?: string;
  about?: string;
}

export const candidateService = {
  // Criar perfil
  createProfile: async (data: Partial<CandidateProfile>) => {
    const response = await axiosInstance.post('/candidates', data);
    return response.data;
  },

  // Obter perfil
  getProfile: async (id: string) => {
    const response = await axiosInstance.get(`/candidates/${id}`);
    return response.data;
  },

  // Atualizar perfil
  updateProfile: async (id: string, data: Partial<CandidateProfile>) => {
    const response = await axiosInstance.put(`/candidates/${id}`, data);
    return response.data;
  },

  // ... mais métodos
};
```

### Hook Exemplo (useCandidate.ts)
```typescript
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { candidateService } from '@/services/candidateService';

export const useCandidate = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await candidateService.getProfile(user.candidateId);
      setProfile(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: any) => {
    setLoading(true);
    try {
      const updated = await candidateService.updateProfile(profile.id, data);
      setProfile(updated);
      return updated;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  return { profile, loading, error, getProfile, updateProfile };
};
```

### Component Exemplo (JobCard.tsx)
```typescript
'use client';

import Link from 'next/link';

export interface JobCardProps {
  id: string;
  title: string;
  company: {
    name: string;
    logoUrl?: string;
    location: string;
  };
  level: string;
  contractType: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
}

export const JobCard = ({ job }: { job: JobCardProps }) => {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-start gap-4">
          {job.company.logoUrl && (
            <img
              src={job.company.logoUrl}
              alt={job.company.name}
              className="w-12 h-12 rounded"
            />
          )}
          <div className="flex-1">
            <h3 className="font-bold text-lg">{job.title}</h3>
            <p className="text-gray-600">{job.company.name}</p>
            <div className="flex gap-2 mt-2">
              <span className="text-sm bg-blue-100 px-2 py-1 rounded">
                {job.level}
              </span>
              <span className="text-sm bg-green-100 px-2 py-1 rounded">
                {job.contractType}
              </span>
            </div>
            <p className="text-gray-600 text-sm mt-2">{job.location}</p>
            {job.salaryMin && (
              <p className="text-gray-800 font-semibold mt-2">
                €{job.salaryMin.toLocaleString()} - €{job.salaryMax?.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
```

---

## 🧪 Teste Cada Feature

### Após criar Job List
```bash
# 1. Verificar que /jobs carrega
curl http://localhost:3001/jobs

# 2. Verificar que componente renderiza
# Abrir http://localhost:3000/jobs

# 3. Verificar filtros funcionam
curl "http://localhost:3001/jobs/search?query=developer&level=SENIOR"
```

### Após criar Candidate Profile
```bash
# 1. Registrar candidato (se não tiver)
# 2. Ir para /candidate/profile
# 3. Preencher formulário
# 4. Enviar (POST /candidates)
# 5. Verificar que foi criado
# 6. Editar (PUT /candidates/:id)
# 7. Adicionar experiência
# 8. Adicionar educação
# 9. Adicionar skills
```

---

## ⚡ Performance Tips

```typescript
// Use dynamic imports
const JobList = dynamic(() => import('@/components/JobList'), {
  loading: () => <div>Carregando...</div>,
});

// Use React.memo para componentes
export const JobCard = React.memo(({ job }) => (...));

// Paginar em vez de carregar tudo
const [page, setPage] = useState(1);
const { data, loading } = useFetch(`/jobs?offset=${(page-1)*20}`);

// Cache results
const queryClient = new QueryClient();
```

---

## 🔍 Debugging

### Verificar requisições
```bash
# Abrir DevTools (F12)
# Network tab
# Procurar requests aos endpoints

# Exemplo esperado:
GET http://localhost:3001/jobs?limit=20&offset=0
Response: { data: [...], pagination: {...} }
```

### Verificar autenticação
```typescript
// No console do DevTools
localStorage.getItem('access_token')
// Deve retornar um token válido

// Se não tiver, fazer login primeiro
```

---

## 📚 Referências

**Endpoints que vão usar:**
- `POST /candidates` - Criar perfil
- `GET /candidates/:id` - Obter perfil
- `PUT /candidates/:id` - Atualizar perfil
- `POST /candidates/:id/experiences` - Adicionar experiência
- `GET /jobs` - Listar vagas
- `GET /jobs/:id` - Detalhe vaga
- `POST /applications` - Aplicar vaga

**Ver PHASE_1B_TESTS.md para exemplos curl de cada endpoint**

---

## 🎯 Ordem Recomendada de Desenvolvimento

1. **JobCard + JobList components** (fácil, rápido)
2. **Jobs listing page** (/jobs) - GET /jobs
3. **Job detail page** (/jobs/[id]) - GET /jobs/:id
4. **Candidate profile form** - POST/PUT /candidates
5. **Experience/Education/Skills forms** - nested
6. **Apply job form** - POST /applications
7. **Dashboards** (agregam dados)
8. **Testes E2E**

---

## ✅ Definição de Pronto

✅ Página renderiza sem erros
✅ Requisições à API funcionam
✅ Dados exibem corretamente
✅ Validação de formulários funciona
✅ Loading states mostram
✅ Erros tratados e mostrados ao user
✅ Responsive (mobile + desktop)
✅ Performance aceitável

---

## 🚀 Próximo Passo

1. Abrir VS Code
2. Criar `/frontend/src/components/JobCard.tsx`
3. Copiar template acima
4. Criar `/frontend/src/app/jobs/page.tsx`
5. Renderizar JobCard
6. Testar em http://localhost:3000/jobs

**Tempo estimado:** 30-45 min para primeira página funcional! ⚡

---

**Sucesso! Vamos lá! 🚀**
