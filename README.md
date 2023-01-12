# avaliacaoGrupoGNC

## Descrição Básica

Olá, o projeto solicitado foi desenvolvido com o Framework Bootstrap com interações em Jquery + AJAX. Adicionei um pequeno detalhe para que o usuário possa baixar os dados em PDF.

\*\*Ao clicar no botão "Detalhes", é importante aguardar alguns segundos para que as consultas de "Filmes" & "Endereço" sejam carregadas corretamente, evitando erros ou informações não definidas. (Ocorre uma demora na consulta)

- [][bootstrap] Versão uUtilizada: 5.2
- [][jquery + ajax] Versão Utilizada: 3.6
- [][jspdf] Versão Utilizada: 2.5

- [][paginacao] Nesse caso, optei por utilizar botões juntamente com o AJAX para manter o cliente na mesma página e exibindo dados novos (Sem Refresh). Dando uma impressão de velocidade para o mesmo que estiver utilizando.
- [][selects] Infelizmente acabei esquecendo dessa funcionalidade no projeto, peço desculpas!
- [][tabela] Escolhi um modelo mais simples em Bootstrap somente para uma exibição básica dos pesonagens.

## Funcionamento do Projeto

- Assim que iniciado, o sistema vai acionar o AJAX e efeturar uma consulta na [API](https://swapi.dev/api/people) em busca dos personagens da Primeira lista.
- Em seguida, será exibido os dados da consulta juntamente com o Botão "Próximo" para avançar e o "Anterior" para retornar a paginação.
- O botão "Detalhes" realizará uma consulta básica em AJAX das informações do personagem escolhido, assim que as informações forem retornadas será exibida em um [Alert](https://sweetalert2.github.io/) personalizado.
- Com as informações abertas, o usuário poderá acessar um [Link](#) com os dados mais detalhados, poderá realizar o [download](#) das informações um pouco mais detalhadas do que as exibidas no alert ou poderá [Fechar](#)
- Utilizei o [LocalStorage](#) para identificar a listagem atual que o usuário está.

## Ferramentas Utilizadas

- [][background] [Link](https://animatedbackgrounds.me/)
- [][loading] [Link](https://cssloaders.github.io/)
- [][jspdf] [Link](https://github.com/parallax/jsPDF)

## Agradecimentos

- Agradeço pela oportunidade de ter participado da avaliação, abraços!
