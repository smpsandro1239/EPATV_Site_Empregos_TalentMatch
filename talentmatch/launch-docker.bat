@echo off
echo ========================================
echo     TalentMatch - Lancamento com Docker
echo ========================================
echo.

echo Iniciando servicos com Docker Compose...
docker-compose -f docker-compose.prod.yml up --build

echo.
echo Servicos iniciados!
echo.
echo URLs de acesso:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:3001
echo   Swagger:  http://localhost:3001/api/docs
echo.
echo Credenciais de teste:
echo   Candidato: candidato@test.com
echo   Empresa:   empresa@test.com
echo   Senha:     TestPass123!
echo.
pause
