# Anotações sobre a API.

### DDD - Domain Driven Design
### Solid : Single Responsability Principle | Open Closed Principle | Liskov Substitution Principle |


## Injeção de Dependencia.


### Testes Automatizados.
-- Que a nossa aplicaçao continue funcinando independente do número de novas funcionalidades e do número dedevs n time.

1. Testes unitários:

Testam funcionalidaes específicas da nossa aplicação (precisam ser funções puras).

JAMAIS: Chamada à uma API, efeito colateral.

2. Testes de Integração:

Testam uma funcionalidade comleta, passando por várias camadas da aplicação.

Route -> Controller -> Serviço -> Repositório -> ...

3. Testes E2E

Testes que simulam a ação do usuário dentro da nossa aplicação.

1. Clique no input de email
2. Preencha o email gabriel@email.com.br
3. clique no input de senha
4. Preencha 123456
5. Clique no botão "Login"
6. Espero que o e-mail tenha sido enviado

### TDD (Test Driven Developmet)
- Quando o usuário se cadatrar na aicaçcao, ele dev receber um email de boas-vindas;
