#!/bin/bash

echo "🚀 Lançando TalentMatch..."
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para matar processos antigos
cleanup() {
    echo -e "${YELLOW}⏹️  Limpando processos antigos...${NC}"
    pkill -f "node" 2>/dev/null || true
    pkill -f "npm" 2>/dev/null || true
    sleep 2
}

# Menu principal
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║    TalentMatch - Sistema de Empregos   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""
echo "O que deseja fazer?"
echo ""
echo "1) 🚀 Iniciar Backend + Frontend"
echo "2) 🔙 Iniciar apenas Backend"
echo "3) 🎨 Iniciar apenas Frontend"
echo "4) 🧹 Limpar e reiniciar"
echo "5) 📊 Ver credenciais de teste"
echo "6) 🗄️  Abrir Prisma Studio"
echo "7) ❌ Sair"
echo ""
read -p "Escolha uma opção (1-7): " option

case $option in
    1)
        echo ""
        echo -e "${GREEN}✅ Iniciando Backend + Frontend...${NC}"
        cleanup
        
        # Terminal 1: Backend
        echo -e "${BLUE}[Terminal 1]${NC} Iniciando Backend na porta 3001..."
        cd "/c/laragon/www/EPATV_Site_Empregos_TalentMatch/talentmatch/backend"
        npm run start:dev &
        BACKEND_PID=$!
        
        sleep 8
        
        # Terminal 2: Frontend
        echo -e "${BLUE}[Terminal 2]${NC} Iniciando Frontend..."
        cd "/c/laragon/www/EPATV_Site_Empregos_TalentMatch/talentmatch/frontend"
        npm run dev &
        FRONTEND_PID=$!
        
        echo ""
        echo -e "${GREEN}✅ Servidores iniciados!${NC}"
        echo ""
        echo -e "${BLUE}URLs de Acesso:${NC}"
        echo -e "  Frontend: ${BLUE}http://localhost:3000${NC}"
        echo -e "  Backend:  ${BLUE}http://localhost:3001${NC}"
        echo -e "  Swagger:  ${BLUE}http://localhost:3001/api/docs${NC}"
        echo ""
        echo -e "${YELLOW}Credenciais de teste:${NC}"
        echo "  📧 Candidato: candidato@test.com"
        echo "  📧 Empresa:   empresa@test.com"
        echo "  🔑 Senha:     TestPass123!"
        echo ""
        
        wait
        ;;
        
    2)
        echo ""
        echo -e "${GREEN}✅ Iniciando Backend...${NC}"
        cleanup
        
        cd "/c/laragon/www/EPATV_Site_Empregos_TalentMatch/talentmatch/backend"
        npm run start:dev
        ;;
        
    3)
        echo ""
        echo -e "${GREEN}✅ Iniciando Frontend...${NC}"
        cleanup
        
        cd "/c/laragon/www/EPATV_Site_Empregos_TalentMatch/talentmatch/frontend"
        npm run dev
        ;;
        
    4)
        echo ""
        echo -e "${YELLOW}🧹 Limpando e reiniciando...${NC}"
        cleanup
        
        echo -e "${BLUE}Recriando dados de teste...${NC}"
        cd "/c/laragon/www/EPATV_Site_Empregos_TalentMatch/talentmatch/backend"
        npm run prisma:seed
        
        echo ""
        echo -e "${GREEN}✅ Sistema limpo. Iniciando servidores...${NC}"
        npm run start:dev &
        BACKEND_PID=$!
        
        sleep 8
        
        cd "/c/laragon/www/EPATV_Site_Empregos_TalentMatch/talentmatch/frontend"
        npm run dev &
        FRONTEND_PID=$!
        
        echo ""
        echo -e "${GREEN}✅ Servidores iniciados!${NC}"
        
        wait
        ;;
        
    5)
        echo ""
        cat "/c/laragon/www/EPATV_Site_Empregos_TalentMatch/talentmatch/TEST_CREDENTIALS.md"
        ;;
        
    6)
        echo ""
        echo -e "${BLUE}Abrindo Prisma Studio...${NC}"
        cd "/c/laragon/www/EPATV_Site_Empregos_TalentMatch/talentmatch/backend"
        npm run prisma:studio
        ;;
        
    7)
        echo ""
        echo -e "${GREEN}Até logo!${NC}"
        exit 0
        ;;
        
    *)
        echo ""
        echo -e "${YELLOW}⚠️  Opção inválida. Saindo...${NC}"
        exit 1
        ;;
esac
