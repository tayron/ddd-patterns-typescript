# DDD Patterns

Como modelar um software utilizando DDD e como aplicar os principais patterns que estão envolta do conceito de modelagem

Link do curso: https://plataforma.fullcycle.com.br/courses/222/168/167/conteudos

## Descrição
 
O desenvolvimento orientado a DDD (Domain-Driven Design), também conhecido como "Desenvolvimento Orientado ao Domínio", é uma abordagem de design de software que se concentra em entender e modelar o domínio do problema em questão. O DDD é baseado na ideia de que o sucesso de um software depende de uma compreensão profunda do domínio específico no qual ele está sendo aplicado.

No DDD, o domínio refere-se ao conjunto de regras, conceitos e lógica de negócios que estão relacionados a um problema específico. O objetivo principal do DDD é desenvolver software que reflita com precisão esse domínio, permitindo uma melhor comunicação entre os especialistas do domínio e os desenvolvedores de software.

No desenvolvimento orientado a DDD, a modelagem do domínio é realizada colaborativamente entre especialistas do domínio e desenvolvedores, geralmente usando linguagem ubíqua, que é uma linguagem comum que ambos entendem e usam para descrever o domínio. A modelagem é geralmente realizada por meio de diagramas, como diagramas de classes, diagramas de sequência e diagramas de estados.

Uma das principais características do DDD é a ênfase na divisão do sistema em diferentes contextos delimitados, chamados de bounded contexts. Cada bounded context representa uma parte específica do domínio e pode ter seu próprio modelo de domínio, regras e terminologia. Essa abordagem ajuda a simplificar a complexidade do sistema e permite um desenvolvimento mais modular e escalável.

Outro conceito importante no DDD é o de agregados. Um agregado é um grupo de objetos relacionados que são tratados como uma unidade coesa. Eles têm uma raiz de agregado, que é a entidade principal e o ponto de entrada para a interação com o agregado. Os agregados ajudam a garantir a consistência e a integridade dos dados dentro do domínio.

Além disso, o DDD também promove o uso de padrões de design como Value Objects (objetos de valor), Entities (entidades), Services (serviços) e Repositories (repositórios), que são responsáveis por representar e manipular os conceitos do domínio de forma eficaz.

Em resumo, o desenvolvimento orientado a DDD é uma abordagem de design de software que coloca o domínio do problema em primeiro plano, buscando uma melhor compreensão e representação do mesmo. Isso resulta em sistemas mais alinhados com as necessidades do negócio, melhorando a qualidade e a manutenibilidade do software.

## Configurando projeto
Instalando as dependências
```sh
npm install
```

Rodando os testes unitários
```sh
npm run test
```
Resultado o último teste executado
```sh
> @ test /home/tayron/Arquivos/Projetos/Estudos/ddd-patterns-typescript
> npm run tsc -- --noEmit && jest


> @ tsc /home/tayron/Arquivos/Projetos/Estudos/ddd-patterns-typescript
> tsc "--noEmit"

 PASS  src/infrastructure/order/repository/sequilize/order.repository.spec.ts
 PASS  src/infrastructure/customer/repository/sequelize/customer.repository.spec.ts
 PASS  src/infrastructure/product/repository/sequelize/product.repository.spec.ts
 PASS  src/domain/customer/entity/customer.spec.ts
 PASS  src/domain/customer/factory/customer.factory.spec.ts
 PASS  src/domain/product/entity/product.spec.ts
 PASS  src/domain/checkout/service/order.service.spec.ts
 PASS  src/domain/checkout/entity/order.spec.ts
 PASS  src/domain/@shared/event/event-dispatcher.spec.ts
  ● Console

    console.log
      Sending email to .....

      at SendEmailWhenProductIsCreatedHandler.handle (src/domain/product/event/handler/send-email-when-product-is-created.handler.ts:8:13)
          at Array.forEach (<anonymous>)

 PASS  src/domain/product/service/product.service.spec.ts
 PASS  src/domain/checkout/factory/order.factory.spec.ts
 PASS  src/domain/product/factory/product.factory.spec.ts

Test Suites: 12 passed, 12 total
Tests:       6 skipped, 40 passed, 46 total
Snapshots:   0 total
Time:        2.611 s
Ran all test suites.
```