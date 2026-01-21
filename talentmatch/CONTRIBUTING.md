# Contribuindo - TalentMatch

Obrigado por querer contribuir para o TalentMatch! Este documento fornece diretrizes e instruções para contribuir.

## Código de Conduta

Por favor, note que este projeto é lançado com um Código de Conduta para Colaboradores. Ao participar neste projeto, você concorda em cumprir seus termos.

## Como Contribuir

### Reportar Bugs

Antes de criar relatórios de bug, verifique a lista de problemas, pois você pode descobrir que não precisa criar um. Quando criar um relatório de bug, inclua o máximo de detalhes possível:

* **Use um título claro e descritivo** para a issue
* **Descreva os passos exatos** que reproduzem o problema
* **Forneça exemplos específicos** para demonstrar os passos
* **Descreva o comportamento observado** e aponte o que está errado
* **Explique qual é o comportamento esperado** e por quê
* **Inclua screenshots/videos** se possível

### Sugestões de Melhorias

Sugestões de melhorias são sempre bem-vindas! Ao criar uma sugestão de melhoria, inclua:

* **Use um título claro e descritivo**
* **Forneça uma descrição detalhada** da melhoria sugerida
* **Liste alguns exemplos** de como essa melhoria seria útil
* **Mencione outros projetos** que implementam essa funcionalidade

### Pull Requests

* Siga o [guia de estilo TypeScript](#guia-de-estilo)
* Inclua screenshots e GIFs animados em suas pull requests
* Termine todos os arquivos com uma nova linha
* Evite submeter PRs muito grandes - divida em múltiplos PRs menores

## Guia de Estilo

### Git Commit Messages

* Use o tempo verbal imperativo ("adiciona funcionalidade" não "adicionou funcionalidade")
* Use a primeira pessoa do singular ("mudo X" não "muda X")
* Limite a primeira linha a 72 caracteres ou menos
* Referencie issues e pull requests genericamente após a primeira linha
* Use português de Portugal (PT-PT)

Exemplos:
```
feat: adiciona autenticação com Google
fix: corrige erro ao atualizar perfil
refactor: reorganiza código de validação
docs: atualiza guia de contribuição
test: adiciona testes para autenticação
```

### TypeScript

* Sempre declare tipos explícitos
* Use interfaces para estruturas públicas
* Evite `any` - use `unknown` se necessário
* Mantenha funções pequenas e focadas
* Adicione comentários para lógica complexa

### React/Next.js

* Use functional components com hooks
* Nomes de componentes em PascalCase
* Nomes de hooks começam com `use`
* Extraia lógica complexa em custom hooks
* Use propTypes ou TypeScript para validação de props

### CSS/Tailwind

* Use classes Tailwind ao invés de CSS custom
* Mantenha componentes responsivos
* Teste em mobile, tablet e desktop
* Evite cores hardcoded - use config do Tailwind

## Processo de Desenvolvimento

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie uma branch** para sua funcionalidade (`git checkout -b feature/AmazingFeature`)
4. **Faça suas mudanças** seguindo o guia de estilo
5. **Commit suas mudanças** (`git commit -m 'feat: adiciona AmazingFeature'`)
6. **Push** para a branch (`git push origin feature/AmazingFeature`)
7. **Abra uma Pull Request**

### Setup Local

```bash
# Clonar seu fork
git clone https://github.com/seu-usuario/EPATV_Site_Empregos_TalentMatch.git
cd EPATV_Site_Empregos_TalentMatch/talentmatch

# Criar branch
git checkout -b feature/minha-funcionalidade

# Instalar dependências
cd backend && npm install
cd ../frontend && npm install

# Fazer suas mudanças...

# Testar localmente
# Terminal 1
cd backend && npm run start:dev

# Terminal 2
cd frontend && npm run dev
```

## Testes

* Escreva testes para nova funcionalidade
* Mantenha cobertura de testes acima de 80%
* Execute `npm run test` antes de fazer commit

```bash
# Backend
npm run test
npm run test:watch

# Frontend
npm run test
npm run test:e2e
```

## Documentação

* Atualize README.md se adicionar nova funcionalidade
* Atualize comentários de código inline
* Atualize CHANGELOG.md com suas mudanças
* Atualize documentação da API se modificar endpoints

## Licença

Ao contribuir para TalentMatch, você concorda que suas contribuições serão licenciadas sob sua Licença MIT.

## Dúvidas?

Sinta-se à vontade para abrir uma issue ou entrar em contato através do email.

---

Obrigado por contribuir! 🎉
