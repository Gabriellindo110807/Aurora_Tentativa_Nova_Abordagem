Resumo
------
Proposta de refatoração: introduzir arquitetura MVC + Repository no servidor.

O que foi adicionado neste PR
----------------------------
- Arquivo `server/architecture/ARCHITECTURE.md` com a proposta e plano de migração.
- Scaffolding inicial:
  - `server/repositories/user.repository.ts`
  - `server/services/user.service.ts`
  - `server/controllers/user.controller.ts`

Observações importantes
----------------------
- O código atual continua funcionando — ainda não substituímos `server/routes.ts` para evitar breaking changes.
- Os novos módulos delegam para `server/storage.ts` atualmente. A migração para uma camada de DB real deve implementar os mesmos métodos do repositório.

Checklist para revisão
---------------------
- [ ] Estrutura e nomenclatura estão alinhadas com o projeto
- [ ] Nenhuma rota existente foi removida ou alterada
- [ ] Tipagens mantidas e sem regressões de runtime

Próximos passos (após merge)
---------------------------
1. Mover handlers de `server/routes.ts` para `server/controllers/*` por domínio (sugestão: Auth primeiro).
2. Implementar repositories para Products/Cart/Orders.
3. Adicionar testes unitários para services e controllers.
