# Versioning Strategy - TalentMatch

## Semantic Versioning

Versão: `MAJOR.MINOR.PATCH`

### MAJOR
Quebra compatibilidade:
- Mudanças na API
- Removel de features
- Alterações de database schema

### MINOR
Nova funcionalidade compatível:
- Novas features
- Melhorias sem quebrar compatibilidade

### PATCH
Correções:
- Bug fixes
- Performance improvements
- Documentação

## Release Schedule

- **v1.0.0**: Janeiro 2026 (Fase 1)
- **v1.1.0**: Janeiro 2026 (Fase 1B)
- **v1.2.0**: Fevereiro 2026 (Fase 1C)
- **v2.0.0**: Fevereiro/Março 2026 (Fase 2)

## Branch Strategy

### main
- Production ready
- Tags com versão
- Protected branch

### develop
- Development branch
- Staging environment
- Pre-release

### feature/*
- Feature branches
- PR para develop

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create PR to main
4. Tag release
5. Push to production
6. Create GitHub release

## Backward Compatibility

- Mantém compatibilidade por 2 versões minor
- Deprecações anunciadas 30 dias antes
- Migration guides fornecidos
