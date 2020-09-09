# Anotações.

- API Rest.
Metodos HTTP:  Get, Post, Put, Delete
- Get: Para obter dados.
- Post: Para enviar dados.
- Put: Para Alterar dados.
- Delete: Para deletar dados.

Rotas --> Caminhos para os dados da sua aplicação.
http://www.facebook.com/home
http://www.facebook.com/perfil

http://localhost:3333 -> habilitando a sua porta 3333 para ser o servidor da sua aplicação.

Classes, metodos(funções), atributos.

MVC -> Model View Controller.

Model -> Entities -> users {
  nome VARCHAR (String),
  email VARCHAR (String),
  telefone INT (Number),
  idade INT (Number)
}


Controller ->
If(user.idade < 18 ) {
  throw new Error('Usario nao pode ter menos de 18Anos');
}

localhost:3333/julia

yarn dev:server

Linter: Padronizador de codigo. ; {} ()

EsLint -> Linter para aplicacoes JS.


int fuano = ""
string fulano = ""

var, let, const

req.body
req.query
req.header


http://localhost:3333/julia?name="julia"&idade=19


use()

class Objeto {
  construtor(asdhasj)
}


Objeto gabriel = new Objeto();

DDD - DOMAIN DRIVEN DESIGN.

SERVICES -> A parte que ate quem na programa deveria entender.


undefined ->

yarn -> yarn add bcryptjs

SQL - Strucured Query Language

Sql X js

ORM
Object-relational mapping
JS -> SQl

git clone -> cria uma "copia" do repositorio na sua máquina. [x]
git status -> mostra as alterações do seu codigo com relação ao ultimo commit [x]
git add -> Prepara os arquivos para serem adicionados a versao [x]
git commit -> adiciona os arquivos na nova vesao.
git push -> adiciona os arquivos na linha do tempo "origem".
git pull -> Resgata novas atualizacoes na linh do tempo "origem"
git checkout -b -> cria uma nova "Linha do tempo"
git remote -> mostra a linha do tempo origem.

-m = mensagem.
