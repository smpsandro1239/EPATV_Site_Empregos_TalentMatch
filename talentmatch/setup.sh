#!/bin/bash

# Setup script para desenvolvimento local do TalentMatch

set -e

echo "🚀 TalentMatch - Setup Script"
echo "=============================="
echo ""

# Check Node.js
echo "✓ Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "✗ Node.js não encontrado. Por favor instale Node.js 16+"
    exit 1
fi
echo "  Node.js $(node -v)"

# Check PostgreSQL
echo "✓ Verificando PostgreSQL..."
if ! command -v psql &> /dev/null; then
    echo "✗ PostgreSQL não encontrado. Por favor instale PostgreSQL 12+"
    exit 1
fi
echo "  PostgreSQL $(psql --version)"

# Setup Backend
echo ""
echo "📦 Configurando Backend..."
cd backend
npm install
npx prisma generate
npx prisma migrate dev
echo "✓ Backend pronto"

# Setup Frontend
echo ""
echo "📦 Configurando Frontend..."
cd ../frontend
npm install
echo "✓ Frontend pronto"

echo ""
echo "✅ Setup completo!"
echo ""
echo "Próximos passos:"
echo "  1. Abrir dois terminais"
echo "  2. Terminal 1: cd backend && npm run start:dev"
echo "  3. Terminal 2: cd frontend && npm run dev"
echo "  4. Abrir http://localhost:3000"
echo ""
