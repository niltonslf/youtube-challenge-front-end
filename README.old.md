Teste Front-End
Desenvolver uma aplicação HTML5

Instruções
Crie um repositório para o projeto no Github ou Bitbucket.
Siga as especificações abaixo.
Crie um README com as instruções para compilar, testar e rodar o projeto.
Especificações técnicas
Utilizar diretrizes do Google Material Design
Utilizar a API de busca do YouTube
Mobile first e responsivo
Usar framework JS (React, Vue ou frameworks relacionados)
Cores livres, layout livre, imagens livres
Gitflow
Observações
Para consumir os dados desta API, você deve gerar sua api_key de aplicação neste link.
Especificações funcionais
Tela Inicial
Essa tela terá um formulário de busca posicionado no meio da tela com campo de texto com placeholder "Pesquisar" e um botão "Buscar". Esse formulário deverá ter validação.

Essa busca deverá chamar a url https://www.googleapis.com/youtube/v3/search?part=id,snippet&q={termo_de_busca}&key={API_KEY}

Ao fazer a busca, o formulário deve ser movido para o topo da tela usando css animate e mostrar a lista de resultados com os campos título, descrição, thumbnail e um link para a página de detalhes.

Essa página deverá ter paginação, utilizando os recursos de paginação da api.

Tela de detalhes
A partir do videoId retornado na outra chamada, deve ser feito uma chamada para https://www.googleapis.com/youtube/v3/videos?id={VIDEO_ID}&part=snippet,statistics&key={API_KEY}

A partir desse retorno, deve-se montar uma tela contendo embed do video, título, like, deslike, descrição e visualizações.

Essa tela deve ter um botão para voltar, exibindo os últimos resultados da busca com a página em questão ativa.

Wireframe
Wireframe Mobile

Wireframe Desktop

O que será avaliado?
Organização do projeto
Lógica do código
Uso do Git
Uso de componentização