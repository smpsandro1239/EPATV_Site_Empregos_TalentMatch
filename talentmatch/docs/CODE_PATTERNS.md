# Padrões de Código - TalentMatch

## Convenções de Nomenclatura

### TypeScript/JavaScript

- Classes: `PascalCase` - `UserService`
- Interfaces: `PascalCase` - `IUserService`
- Types: `PascalCase` - `UserType`
- Variáveis: `camelCase` - `userName`
- Constantes: `UPPER_SNAKE_CASE` - `MAX_LOGIN_ATTEMPTS`
- Funções: `camelCase` - `getUserById`
- Métodos privados: `_camelCase` - `_validateEmail`

### React/Next.js

- Componentes: `PascalCase` - `UserCard`
- Hooks customizados: `useXxx` - `useAuth`
- Páginas: `lowercase` - `/pages/auth/login`
- Props interface: `{Component}Props` - `UserCardProps`

### Arquivos

- Components: `PascalCase.tsx` - `Button.tsx`
- Services: `lowercase.ts` - `auth.service.ts`
- Utilities: `lowercase.ts` - `validators.ts`
- Types: `lowercase.ts` - `user.types.ts`

## Estrutura de Pasta

```
src/
├── app/              # Pages (Next.js App Router)
├── components/       # Componentes reutilizáveis
├── features/         # Features específicas
├── hooks/            # Custom hooks
├── lib/              # Utilitários e configs
├── providers/        # Context providers
├── services/         # API clients e serviços
├── types/            # Tipos globais
└── utils/            # Funções auxiliares
```

## TypeScript Best Practices

### ✅ Use tipos explícitos

```typescript
// Bom
function getName(user: User): string {
  return user.name;
}

// Evitar
function getName(user: any) {
  return user.name;
}
```

### ✅ Use interfaces para props públicas

```typescript
// Bom
interface ButtonProps {
  label: string;
  onClick: () => void;
}

// Evitar
const Button = (props: any) => {};
```

### ✅ Use types para aliases

```typescript
// Bom
type UserRole = "CANDIDATE" | "COMPANY" | "ADMIN";

// Evitar
interface UserRole {
  name: string;
}
```

## React Best Practices

### ✅ Use functional components

```typescript
// Bom
const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return <div>{user.name}</div>;
};

// Evitar
class UserCard extends React.Component { }
```

### ✅ Use hooks para lógica

```typescript
// Bom
const { user, login } = useAuth();

// Evitar
const user = useState(null)[0];
```

### ✅ Extraia lógica em custom hooks

```typescript
// Bom
const useFormValidation = (initialValues) => {};

// Evitar
// Lógica inline em componente
```

## Async/Await

### ✅ Sempre use try/catch

```typescript
try {
  const response = await fetch(url);
} catch (error) {
  handleError(error);
}
```

### ✅ Não misture promises e async

```typescript
// Bom
const data = await fetchData();

// Evitar
fetchData().then((data) => {});
```

## Erros

### ✅ Use classes customizadas

```typescript
class ValidationError extends Error {
  constructor(
    public field: string,
    message: string,
  ) {
    super(message);
  }
}
```

## Testes

### ✅ Uma responsabilidade por teste

```typescript
// Bom
it("deveria validar email correto", () => {
  expect(validateEmail("test@example.com")).toBe(true);
});

// Evitar
it("deveria fazer tudo", () => {
  // múltiplas asserções
});
```

## Commits

### Formato

```
<tipo>: <descrição em português de portugal>

<corpo - opcional>

<footer - opcional>
```

### Tipos

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `refactor`: Refatoração
- `docs`: Documentação
- `test`: Testes
- `chore`: Tarefas de manutenção

### Exemplos

```
feat: adiciona autenticação JWT

Implementa registro, login e refresh de tokens

Closes #123
```

---

Última atualização: 21-01-2026
