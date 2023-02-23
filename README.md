
# My Books - Backend

Projeto escrito em NodeJS + Typescript, onde temos como principal funcionalidade, alugar livros.


## Autores

- [@mauricimendes](https://www.github.com/mauricimendes)


## Instalação

Para rodar o projeto é necessário:

```bash
  npm i
```
```bash
  npm run dev:server
```


## Rodando os testes

Para rodar ultilize o comando:

```bash
  npm run test
```


## Funcionalidades

- Criar usuário
- Fazer login com usuários
- Cadastrar livros - somente para usuários do tipo admin
- Alterar livros - somente para usuários do tipo admin e não estiver alugado
- Deletar livros - somente para usuários do tipo admin e não estiver alugado
- Listar livros
- Ver detalhes de um livro
- Alugar livro - se o mesmo não estiver alugado
- Devolver livro


## Documentação da API

#### Cria um usuário - application/json

```http
  POST /users
```

| BODY   | Tipo       | Exemplo     | Descrição |
| :---------- | :--------- | :--------- | :------------- |
| `name` | `string` |  Maurici Mendes Júnior | **Obrigatório**. Nome do usuário
| `email` | `string` |  maurici@example.com | **Obrigatório**. Email do usuário
| `password` | `string` |  123@abc | **Obrigatório**. Senha do usuário
| `is_admin` | `boolean` |  true | **Não obrigatório**. Usuário é Admin?
| `phone` | `string` |  (00) 12345-6789 | **Obrigatório**. Numéro de Telefone do usuário


#### Login - application/json

```http
  POST /sessions
```

| BODY   | Tipo       | Exemplo     | Descrição |
| :---------- | :--------- | :--------- | :------------- |
| `email` | `string` |  maurici@example.com | **Obrigatório**. Email do usuário
| `password` | `string` |  123@abc | **Obrigatório**. Senha do usuáriousuário

#### Cria um livro- multipart/form-data

```http
  POST /books
```

| BODY   | Tipo       | Exemplo     | Descrição |
| :---------- | :--------- | :--------- | :------------- |
| `title` | `string` |  Harry Potter e a pedra filosofal | **Obrigatório**. Título do livro
| `author` | `string` |  J.K. Rowling | **Obrigatório**. Author(a) do livro
| `synopsis` | `string` |  Harry é um criança fora do comum... | **Obrigatório**. Sinopse do livro
| `number_pages` | `number` |  206 | **Obrigatório**. Número de páginas do livro
| `images` | `array` |  [{filename: 'capa.png'}, {filename: 'verso.png'}]  | **Obrigatório**. Número de páginas do livro

| AUTHORIZATION   | Tipo       | Exemplo     | Descrição |
| :---------- | :--------- | :--------- | :------------- |
| `api_key` | `authBearer` | eyJhbGciOiJIUz... | **Obrigatório**. JWT TOKEN e ADMIN

#### Altera um livro - multipart/form-data

```http
  PUT /books/:book_id
```

| BODY   | Tipo       | Exemplo     | Descrição |
| :---------- | :--------- | :--------- | :------------- |
| `title` | `string` |  Harry Potter e a pedra filosofal | **Não obrigatório**. Título do livro
| `author` | `string` |  J.K. Rowling | **Não obrigatório**. Author(a) do livro
| `synopsis` | `string` |  Harry é um criança fora do comum... | **Não obrigatório**. Sinopse do livro
| `number_pages` | `number` |  206 | **Não obrigatório**. Número de páginas do livro
| `images` | `array` |  [{filename: 'capa.png'}, {filename: 'verso.png'}]  | **Não obrigatório**. Número de páginas do livro

| AUTHORIZATION   | Tipo       | Exemplo     | Descrição |
| :---------- | :--------- | :--------- | :------------- |
| `api_key` | `authBearer` | eyJhbGciOiJIUz... | **Obrigatório**. JWT TOKEN e ADMIN

#### Lista todos os livros

```http
  GET /books
```

| QUERY   | Tipo       | Exemplo     | Descrição |
| :---------- | :--------- | :--------- | :------------- |
| `title` | `string` |  Harr | **Não obrigatório**. Título do livro
| `author` | `string` |  J.K | **Não obrigatório**. Author(a) do livro

| AUTHORIZATION   | Tipo       | Exemplo     | Descrição |
| :---------- | :--------- | :--------- | :------------- |
| `api_key` | `authBearer` | eyJhbGciOiJIUz... | **Obrigatório**. JWT TOKEN


#### Detalhes de um livro

```http
  GET /books/:book_id
```

| AUTHORIZATION   | Tipo       | Exemplo     | Descrição |
| :---------- | :--------- | :--------- | :------------- |
| `api_key` | `authBearer` | eyJhbGciOiJIUz... | **Obrigatório**. JWT TOKEN

#### Deleta um livro

```http
  DELETE /books/:book_id
```

| AUTHORIZATION   | Tipo       | Exemplo     | Descrição |
| :---------- | :--------- | :--------- | :------------- |
| `api_key` | `authBearer` | eyJhbGciOiJIUz... | **Obrigatório**. JWT TOKEN e ADMIN

#### Aluga um livro - application/json

```http
  POST /rents/:book_id
```
| AUTHORIZATION   | Tipo       | Exemplo     | Descrição |
| :---------- | :--------- | :--------- | :------------- |
| `api_key` | `authBearer` | eyJhbGciOiJIUz... | **Obrigatório**. JWT TOKEN

#### Devolve o livro alugado - application/json

```http
  PATCH /rents/:book_id
```
| AUTHORIZATION   | Tipo       | Exemplo     | Descrição |
| :---------- | :--------- | :--------- | :------------- |
| `api_key` | `authBearer` | eyJhbGciOiJIUz... | **Obrigatório**. JWT TOKEN




## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`APP_SECRET`
`APP_API_URL`
`APP_DATA_SOURCE_HOST`
`APP_DATA_SOURCE_PORT`
`APP_DATA_SOURCE_DATABASE`


## Stack utilizada

**Back-end:** Node, Express, TypeScript, TypeORM, MongoDB

## Bibliotecas utilizadas

**Back-end:** cors, bcryptjs, celebrate, class-transformer, dontenv, jsonwebtoken, multer, reflect-metadata, ts-node-dev 

