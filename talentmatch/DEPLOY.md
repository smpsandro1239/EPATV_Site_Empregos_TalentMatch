# Guia de Deploy - TalentMatch

Este guia fornece instruções para realizar o deploy da plataforma no Railway (Backend) e Vercel (Frontend).

## 🚀 Backend (Railway)

1.  **Crie um novo projeto no Railway** e conecte o seu repositório GitHub.
2.  **Adicione um serviço de PostgreSQL**. Certifique-se de que a extensão `pgvector` pode ser instalada ou use uma imagem que a suporte.
3.  **Adicione um serviço de Redis**.
4.  **Configure as Variáveis de Ambiente**:
    *   `DATABASE_URL`: Pegue no serviço PostgreSQL do Railway.
    *   `JWT_SECRET`: Uma string aleatória segura.
    *   `OPENAI_API_KEY`: A sua chave OpenAI.
    *   `STRIPE_SECRET_KEY`: A sua chave secreta Stripe.
    *   `STRIPE_WEBHOOK_SECRET`: Obtido após configurar o endpoint do webhook no Stripe.
    *   `RESEND_API_KEY`: Para e-mails.
    *   `CORS_ORIGIN`: A URL final do seu frontend na Vercel.
5.  **Build Command**: `npm run build`
    *   *Nota*: Certifique-se de que o `npx prisma generate` é executado durante o build. No `package.json`, adicione `"postinstall": "prisma generate"`.

## 🎨 Frontend (Vercel)

1.  **Crie um novo projeto na Vercel** e conecte o subdiretório `talentmatch/frontend`.
2.  **Configure as Variáveis de Ambiente**:
    *   `NEXT_PUBLIC_API_URL`: A URL do backend no Railway.
3.  **Framework Preset**: Next.js.
4.  **Build Settings**: Padronizadas.

## 💳 Configuração Stripe (Webhooks)

Para que as subscrições funcionem:
1.  Vá ao dashboard do Stripe -> Developers -> Webhooks.
2.  Adicione um endpoint: `https://sua-api-railway.app/billing/webhook`.
3.  Selecione os eventos: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`.
4.  Copie o "Signing secret" para a variável `STRIPE_WEBHOOK_SECRET` no Railway.

---
*Deploy finalizado com sucesso!*
