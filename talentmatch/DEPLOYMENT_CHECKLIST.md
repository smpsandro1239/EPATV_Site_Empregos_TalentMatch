# Checklist - Deployment Produção

## Pré-Deployment

### Configuração

- [ ] DATABASE_URL configurada para servidor de produção
- [ ] JWT_SECRET alterada (não usar default)
- [ ] JWT_REFRESH_SECRET alterada
- [ ] CORS_ORIGIN alterada para domínio produção
- [ ] NODE_ENV=production
- [ ] NEXT_PUBLIC_API_URL aponta para API produção

### Segurança

- [ ] HTTPS/TLS ativado
- [ ] Certificados SSL válidos
- [ ] Rate limiting configurado
- [ ] WAF (Web Application Firewall) ativado
- [ ] DDoS protection ativado
- [ ] Secrets gerenciados (não em .env)

### Banco de Dados

- [ ] Backup database realizado
- [ ] Migrations executadas
- [ ] Índices criados
- [ ] Connection pooling configurado
- [ ] Replica para HA configurada (opcional)

### Testes

- [ ] Testes unitários passando
- [ ] Testes de integração passando
- [ ] Testes de performance ok
- [ ] Teste de segurança (OWASP ZAP)
- [ ] Verificação de dependências vulneráveis

### Monitoring

- [ ] Logging centralizado configurado
- [ ] Error tracking (Sentry) configurado
- [ ] Health checks implementados
- [ ] Alertas configurados
- [ ] Dashboard de monitoring criado

### Documentação

- [ ] Runbook de operações criado
- [ ] Procedimento de rollback documentado
- [ ] Contatos de emergência documentados
- [ ] Disaster recovery planeado

## Deployment

### Frontend

- [ ] `npm run build` executado com sucesso
- [ ] Bundle size verificado
- [ ] Images otimizadas
- [ ] Deploy em CDN (se aplicável)
- [ ] Cache headers configurados

### Backend

- [ ] `npm run build` executado com sucesso
- [ ] Migrations executadas em produção
- [ ] Health check respondendo
- [ ] Swagger docs acessível (opcional em prod)
- [ ] Rate limiting funcionando

### Docker

- [ ] Docker images builded
- [ ] Images enviadas para registry
- [ ] Docker-compose versão prod testada
- [ ] Volumes/Mounts verificados
- [ ] Network configuration ok

## Pós-Deployment

### Verificação

- [ ] Frontend carrega em produção
- [ ] API respondendo normalmente
- [ ] Login funcionando
- [ ] Database conectando
- [ ] Emails sendo enviados (se aplicável)

### Monitoramento

- [ ] Error logs verificados
- [ ] Performance metrics ok
- [ ] User feedback positivo
- [ ] No critical errors

### Rollback (se necessário)

- [ ] Backup anterior restaurado
- [ ] Database reverted
- [ ] DNS apontando para versão anterior
- [ ] Notificação aos users enviada

## Releases Futuras

- [ ] Changelog atualizado
- [ ] Versão em package.json bump
- [ ] Release notes criadas
- [ ] Git tag criada
- [ ] GitHub release publicada

---

**Deployment iniciado por:** ****\_\_\_****
**Data:** ****\_\_\_****
**Status:** ✅ Sucesso / ❌ Falhou
**Notas:** ****\_\_\_****
