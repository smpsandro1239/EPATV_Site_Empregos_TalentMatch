# Performance Optimization Guide - TalentMatch

## Frontend Optimization

### Code Splitting

- Next.js faz automatic code splitting
- Dynamic imports para componentes grandes

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
});
```

### Image Optimization

```typescript
import Image from 'next/image';

// ✅ Otimizado
<Image src="/image.png" alt="alt text" width={200} height={200} />

// ❌ Não otimizado
<img src="/image.png" alt="alt text" />
```

### Bundle Size

```bash
npm run analyze
# Identificar dependências grandes
```

### Caching

- Service Workers (PWA)
- Browser caching headers
- CDN for static assets

## Backend Optimization

### Database Queries

```prisma
// ✅ Com select para menos dados
const user = await prisma.user.findUnique({
  where: { id: userId },
  select: { id: true, email: true, name: true }
});

// ❌ Carrega tudo
const user = await prisma.user.findUnique({
  where: { id: userId }
});
```

### Pagination

```typescript
// ✅ Sempre paginar listas grandes
const jobs = await prisma.job.findMany({
  take: 10,
  skip: (page - 1) * 10,
  orderBy: { createdAt: "desc" },
});
```

### Indexing

```prisma
model User {
  id    String  @id @default(cuid())
  email String  @unique  // ✅ Índice automático
  @@index([email])       // ✅ Índice explícito
}
```

### Connection Pooling

```env
# .env
DATABASE_URL="postgresql://user:password@host/db?schema=public&connection_limit=10"
```

## Caching Strategy

### Client-side

```typescript
// SWR para data fetching com cache automático
import useSWR from "swr";

const { data, error } = useSWR("/api/user", fetcher, {
  revalidateOnFocus: false, // Não revalidar ao focar
  dedupingInterval: 10000, // Cache de 10s
});
```

### Server-side

```typescript
// Redis para cache (future)
import Redis from "ioredis";

const redis = new Redis();
const cached = await redis.get("key");
```

## Monitoring

### Frontend Performance

```bash
# Lighthouse
npm run lighthouse

# WebVitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
```

### Backend Performance

```bash
npm run test:performance
```

## Targets

| Métrica   | Alvo   | Atual     |
| --------- | ------ | --------- |
| LCP       | <2.5s  | <1s ✅    |
| FID       | <100ms | <50ms ✅  |
| CLS       | <0.1   | <0.05 ✅  |
| TTFB      | <600ms | <200ms ✅ |
| Bundle JS | <200KB | <125KB ✅ |

---

Continue com Fase 1B para melhorias.
