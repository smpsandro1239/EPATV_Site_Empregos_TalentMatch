#!/bin/bash

# Deploy script para produção

set -e

echo "🚀 TalentMatch - Deploy Script"
echo "=============================="

# Build Backend
echo "📦 Building backend..."
cd backend
npm run build
npm run migrate:prod
echo "✓ Backend built"

# Build Frontend
echo "📦 Building frontend..."
cd ../frontend
npm run build
echo "✓ Frontend built"

# Start with Docker
echo "📦 Starting with Docker..."
docker-compose -f docker-compose.prod.yml up -d
echo "✓ Application running"

echo ""
echo "✅ Deploy completo!"
echo ""
echo "Aplicação disponível em:"
echo "  Frontend: https://talentmatch.pt"
echo "  Backend API: https://api.talentmatch.pt"
echo "  Swagger: https://api.talentmatch.pt/docs"
