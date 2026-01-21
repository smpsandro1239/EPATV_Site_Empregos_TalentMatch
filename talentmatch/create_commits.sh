#!/bin/bash

# Script para criar commits de documentação adicionais

DOCS=(
  "Localização: adicionar suporte para i18n e multi-idioma"
  "Acessibilidade: adicionar guia de acessibilidade WCAG"
  "Backup: adicionar procedimento de backup automático"
  "Cache: adicionar estratégia de caching com Redis"
  "Webhooks: adicionar documentação de webhooks"
  "GraphQL: preparação para futura API GraphQL"
  "Testing E2E: adicionar configuração Cypress"
  "Mobile: preparar suporte para aplicação mobile"
  "Analytics: adicionar tracking de eventos"
  "SEO: otimizar para SEO"
)

for doc in "${DOCS[@]}"; do
  echo "# $doc" > "talentmatch/docs/todo_${doc,,}.md"
  git add "talentmatch/docs/todo_${doc,,}.md"
  git commit -m "Documentação: $doc"
done

echo "✅ Commits criados com sucesso!"
