## Resumo
Introduz scaffolding para uma refatoração do servidor em direção ao padrão MVC (Controllers → Services → Repositories) e propõe um plano de migração incremental. Inclui um exemplo concreto para a área de Auth (User) sem alterar o comportamento atual.

## O que foi adicionado
- `server/architecture/ARCHITECTURE.md` — proposta e plano de migração incremental.
- Scaffolding inicial (não intrusivo):
  - `server/repositories/user.repository.ts`
  - `server/services/user.service.ts`
  - `server/controllers/user.controller.ts`
- Template de PR: `.github/PULL_REQUEST_TEMPLATE/refactor-mvc-repository.md`

## Motivação
Separar responsabilidades facilita:
- Testes unitários (mockável por camada),
- Substituição da camada de persistência (trocar `MemStorage` por DB com mínimo impacto),
- Manutenção e entendimento do fluxo (Controller → Service → Repository).

## Comportamento / compatibilidade
- Roteamento atual não foi alterado; `server/routes.ts` continua funcionando.
- Os novos arquivos delegam ao `server/storage.ts` (implementação `MemStorage`) para garantir compatibilidade imediata.

## Como testar (smoke tests)
1. Faça checkout da branch:
```bash
git checkout refactor/mvc-repository
```
2. Instale dependências (pasta do projeto):
```bash
cd CarrinhoInteligente
npm install
```
3. Inicie em modo dev:
```bash
npm run dev
```
4. Teste endpoints principais (exemplos):
- POST /api/auth/register
- POST /api/auth/login
- GET /api/products

Ex.: usar curl ou Postman para validar registros e login. O comportamento deve ser o mesmo que antes da mudança.

## Próximos passos (sugestão de migração incremental)
1. Mover handlers de `server/routes.ts` para controllers por domínio (Auth primeiro).
2. Criar `repositories/services/controllers` para Products, Cart, ShoppingList e Orders.
3. Adicionar hashing de senha (bcrypt/argon2) e autenticação com JWT/session.
4. Adicionar testes unitários (services/controllers) e integração leve (endpoints).
5. Implementar uma camada de persistência baseada em DB (Postgres/SQLite) que atenda os contratos do repository.

## Checklist para revisão
- [ ] Estrutura e nomenclatura alinhadas com o projeto
- [ ] Não quebra rotas existentes
- [ ] Tipagens mantidas e sem regressões
- [ ] Plano de migração aprovado

## Arquivos principais alterados / adicionados
- `server/architecture/ARCHITECTURE.md`
- `server/repositories/user.repository.ts`
- `server/services/user.service.ts`
- `server/controllers/user.controller.ts`
- `.github/PULL_REQUEST_TEMPLATE/refactor-mvc-repository.md`

---

Cole este conteúdo no campo de descrição do PR ao criar (ou editar) a PR na interface do GitHub.
