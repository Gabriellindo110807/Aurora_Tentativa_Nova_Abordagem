MVC + Repository architecture
=============================

Objetivo
--------
Propor uma refatoração incremental para o servidor do projeto em direção a um padrão MVC (Model - View - Controller) combinado com Repository para abstrair a camada de persistência. Isso facilita testes, separação de responsabilidades e futuras trocas de banco de dados.

Visão geral da proposta
-----------------------
- Models: tipagens e DTOs (usamos os tipos atuais em `@shared/schema`).
- Repositories: camada que encapsula a persistência (atualmente delegará para `server/storage.ts`).
- Services: regras de negócio, validações, transações, orquestração entre repositories.
- Controllers: handlers HTTP (recebem Request/Response, chamam Services e formatam respostas).

Estrutura de diretórios proposta
-------------------------------

server/
  controllers/   # controllers HTTP
  services/      # regras de negócio
  repositories/  # abstrações de persistência
  models/        # modelos / tipos específicos do domínio (se necessário)
  storage.ts     # implementação atual (MemStorage) - migrar gradualmente

Contratos mínimos (exemplos)
----------------------------
- Repositório deve expor métodos CRUD simples (getById, find, create, update, delete).
- Service deve expor operações do domínio (registerUser, authenticate, createOrder).
- Controller deve ser minimalista, converter req -> chamada de service -> res.

Plano de migração incremental
----------------------------
1. Adicionar a pasta de `repositories/` com classes que delegam para `storage` (sem alterar routes) — isso permite escrever testes unitários para services/repositories.
2. Adicionar `services/` que encapsulam regras de negócio e usam `repositories`.
3. Adicionar `controllers/` e começar a substituir os handlers inline em `server/routes.ts` por chamadas aos controllers (faça por rota/feature, por exemplo: primeiro Auth, depois Products, etc.).
4. Depois de todas as rotas trocadas, remover o uso direto de `storage` e tratar a injeção de dependências (factory ou container leve) se necessário.
5. Substituir `MemStorage` por uma implementação baseada em DB (Postgres/SQLite) implementando os mesmos métodos do repositório.

Quality gates e testes
----------------------
- Escrever testes unitários para repositories (mockar storage), services (mockar repositories) e controllers (mockar services).
- Lint/Build: rodar TypeScript compiler e linters.
- Smoke tests: testar endpoints principais (register/login, products list, cart flow).

Edge cases e considerações
-------------------------
- Autenticação: atualmente sem hashing — planejar migração para bcrypt/Argon2 e JWT/session.
- Validação: já se usa Zod em `@shared/schema`. Reaproveitar nos controllers/services.
- Erros: padronizar resposta de erro e código HTTP.
- Transações: operações como createOrder + clearCart precisam de atomicidade quando migrar para DB.

Exemplo mínimo implementado neste PR
-----------------------------------
Será incluído um exemplo de `UserRepository`, `UserService` e `UserController`; eles delegam ao `storage` atual para manter compatibilidade. Use-os como referência para migrar outras áreas.

Checklist para revisão do PR
---------------------------
- [ ] Scaffolding consistente com o restante do projeto (tsconfig, paths)
- [ ] Não quebra as rotas existentes
- [ ] Documentação clara dos próximos passos

Fim
