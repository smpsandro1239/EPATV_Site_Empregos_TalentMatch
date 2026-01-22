# 🎯 QUICK START - Iniciar em 30 segundos

## 1️⃣ Copiar e Executar (Recomendado)

Abra uma terminal e execute:

```bash
cd /c/laragon/www/EPATV_Site_Empregos_TalentMatch/talentmatch
bash launch.sh
```

Selecione opção **1** para iniciar tudo.

---

## 2️⃣ Ou Manual em Duas Terminais

### Terminal 1 - Backend
```bash
cd /c/laragon/www/EPATV_Site_Empregos_TalentMatch/talentmatch/backend
npm run start:dev
```
✅ Backend rodará em `http://localhost:3001`

### Terminal 2 - Frontend  
```bash
cd /c/laragon/www/EPATV_Site_Empregos_TalentMatch/talentmatch/frontend
npm run dev
```
✅ Frontend rodará em `http://localhost:3000`

---

## 3️⃣ Aceder à Aplicação

Abra o navegador:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend Swagger**: [http://localhost:3001/api/docs](http://localhost:3001/api/docs)

---

## 4️⃣ Fazer Login

### Opção A: Candidato
```
Email:    candidato@test.com
Senha:    TestPass123!
```

### Opção B: Empresa
```
Email:    empresa@test.com
Senha:    TestPass123!
```

---

## 5️⃣ Testar Funcionalidades

### Como Candidato:
1. Clique em "Procurar Vagas"
2. Veja as 2 vagas disponíveis
3. Clique numa vaga para detalhes
4. Preencha o formulário e candide-se
5. Veja sua candidatura em "Minhas Candidaturas"

### Como Empresa:
1. Clique em "Minhas Vagas"
2. Veja as vagas que publicou
3. Clique numa vaga para ver os candidatos
4. Acompanhe as aplicações

---

## 🆘 Problemas Comuns?

**Porta ocupada:**
```bash
pkill -f node
sleep 3
bash launch.sh
```

**Banco de dados vazio:**
```bash
cd backend
npm run prisma:seed
```

**Backend não responde:**
```bash
curl http://localhost:3001/health
```

---

**Status**: ✅ Tudo pronto! Divirta-se! 🚀
