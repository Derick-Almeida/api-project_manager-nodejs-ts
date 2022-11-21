<h1 align='center'>Project_manager</h1>

<h2>Sobre a API</h2>

Project_manager é uma aplicação que permite o usuário armazenar seus
projetos e filtrá-los através das categorias:

- frontEnd
- backEnd
- fullStack

essa API tem o intuito de fornecer ao desenvolvedor um local onde ele possa armazenar </br>
seus projetos de forma mais seletiva para que seja possível exibilos em outros projetos de forma </br>
mais fácil como por exemplo, na contrução de seu portifólio.

O url base da API é: https://

---

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Início Rápido](#2-início-rápido)
  - [Instalando Dependências](#21-instalando-dependências)
  - [Variáveis de Ambiente](#22-variáveis-de-ambiente)
  - [Migrations](#23-migrations)
- [Autenticação](#3-autenticação)
- [Endpoints](#4-endpoints)
- [Query params](#5-query-params)
- [Filtros](#6-filtros)
- [Paginação](#7-paginação)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Docker](https://docs.docker.com/)
- [Jest](https://jestjs.io/docs/getting-started)
- [Yup](https://www.npmjs.com/package/yup)

A URL base da aplicação:
https://portifolioapi-production.up.railway.app/

## 2. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 2.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 2.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 2.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source
```

---

## 3. Autenticação

[ Voltar para o topo ](#tabela-de-conteúdos)

Rotas que necessitam de autenticação deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

---

## 4. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
  - [POST - /users](#11-criação-de-usuário)
  - [POST - /login](#12-iniciando-sessão)
  - [GET - /users/profile](#13-pegar-usuário-logado)
  - [PATCH - /users/:user_id](#14-atualizar-usuário-por-id)
  - [DELETE - /users/:user_id](#15-remover-usuário-por-id)
- [Projects](#2-projects)
  - [POST - /projects](#21-criação-de-projeto)
  - [GET - /projects](#22-listando-projetos)
  - [GET - /projects/:id](#23-pegar-projeto-por-id)
  - [PATCH - /projects/:id](#24-atualizar-projeto-por-id)
  - [DELETE - /projects/:id](#25-remover-projeto-por-id)

## 5. Query params

[ Voltar para o topo ](#tabela-de-conteúdos)

Ao total existen 3 query params para serem utilizados, são eles?

- `/projects?type=<tipo-desejado>`
- `/projects?page=<pagina-desejada>`
- `/projects?results=<numero-de-resultados-na-pagina>`

O uso dos mesmos serão mostrados aabaixo na filtragem dos projetos e na paginaação. Vale lembrar que todos os query params combinaveis, basta adicionar um `&` entre eles, ficando assim:

- `/projects?type=<tipo-desejado>&results=<numero-de-resultados-na-pagina>`
- `/projects?page=<pagina-desejada>&results=<numero-de-resultados-na-pagina>`

dessa forma tornando possível filtragens mais especificas ou apenas facilitando o retorno dos resultados por pádina

## 6. Filtros

[ Voltar para o topo ](#tabela-de-conteúdos)

Apenas a listgem de projetos possue filtro. <br/> É possível filtra-los
pelo seu `type` adicioando na url o query param `/projects?type=<tipo-desejado>`

## 7. paginação

[ Voltar para o topo ](#tabela-de-conteúdos)

Apenas a listgem de projetos possue páginação. <br/>
Por padrão a páginação começa na página 1 e caso queira ir para a próxima deve substitur o número da página atual pelo desejado, usando o query param ficaria assim: `/projects?page=2`.
No caso da página 1 pode ser passado o query param `/projects?page=1` ou apenas `/projects`.

além da mudança de página também é possível manipular a quantidade de resultados por páginas, por padrão são retornados 15 itens por páginas, porém usando o query param `/projects?results=<numero-de-resultados-na-pagina>` podemos mudar esse retorno, como por exemplo para 2 por páginas, ficando então assim: `/projects?results=2`

---

## 1. **Users**

[ Voltar para os Endpoints ](#4-endpoints)

O objeto User é definido como:

| Campo     | Tipo   | Descrição                             |
| --------- | ------ | ------------------------------------- |
| id        | string | Identificador único do usuário        |
| name      | string | O nome do usuário.                    |
| email     | string | O e-mail do usuário.                  |
| password  | string | A senha de acesso do usuário          |
| createdAt | date   | Data da criação do usuário            |
| updatedAt | date   | Data da ultima atualização do usuário |
| projects  | array  | Lista dos projetos do usuário         |

### Endpoints

| Método | Rota           | Descrição                                       |
| ------ | -------------- | ----------------------------------------------- |
| POST   | /users         | Criação de um usuário.                          |
| POST   | /login         | Inicia a sessão do usuário                      |
| GET    | /users/profile | Busca o usuário logado                          |
| PATCH  | /users/:id     | Atualiza o usuário usando seu ID como parâmetro |
| DELETE | /users/:id     | Remove o usuário usando seu ID como parâmetro   |

---

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#4-endpoints)

### `/users`

### Exemplo de Request:

```
POST /users
Host: https://portifolioapi-production.up.railway.app/users
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "jorge",
  "email": "jorge@email.com",
  "password": "123456"
}
```

### Schema de Validação com Yup:

```javascript
  name: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "a5a82435-b641-4efc-9acb-16464e38cd09",
  "name": "jorge",
  "email": "jorge@email.com",
  "createdAt": "2022-11-17",
  "updatedAt": "2022-11-17",
  "projects": []
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                               |
| --------------- | --------------------------------------- |
| 400 Bad Request | Email already registered.               |
| 400 Bad Request | Password must be at least 6 characters. |
| 400 Bad Request | `key` is a required field.              |

---

### 1.2. **Iniciando sessão**

[ Voltar aos Endpoints ](#4-endpoints)

### `/login`

### Exemplo de Request:

```
POST /login
Host: https://portifolioapi-production.up.railway.app/login
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "email": "jorge@email.com",
  "password": "123456"
}
```

### Schema de Validação com Yup:

```javascript
  email: yup.string().required(),
  password: yup.string().required(),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
200 OK
```

```json
{
  "token": "xxx.xxx.xxx"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                  |
| --------------- | -------------------------- |
| 400 Bad Request | Email or password invalid. |

### 1.3. **Pegar Usuário Logado**

[ Voltar aos Endpoints ](#4-endpoints)

### `/users/profile`

### Exemplo de Request:

```
GET /profile
Host: https://portifolioapi-production.up.railway.app/users/profile
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "a5a82435-b641-4efc-9acb-16464e38cd09",
  "name": "jorge",
  "email": "jorge@email.com",
  "createdAt": "2022-11-17",
  "updatedAt": "2022-11-17",
  "projects": []
}
```

### Possíveis Erros:

| Código do Erro   | Descrição      |
| ---------------- | -------------- |
| 401 Unauthorized | Invalid token. |

---

### 1.4. **Atualizar Usuário por ID**

[ Voltar aos Endpoints ](#4-endpoints)

### `/users/:id`

### Exemplo de Request:

```
PATCH /users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: https://portifolioapi-production.up.railway.app/users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Authorization: Bearer {token}
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                             |
| --------- | ------ | ------------------------------------- |
| id        | string | Identificador único do usuário (User) |

### Corpo da Requisição:

```json
{
  "name": "sergio",
  "email": "sergio@email.com",
  "password": "123456"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "d4a71f65-8f6b-40ea-a6a1-0435d4ed6bae",
  "name": "sergio",
  "email": "sergio@email.com",
  "createdAt": "2022-09-03",
  "updatedAt": "2022-09-03",
  "projects": []
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                      |
| ---------------- | ------------------------------ |
| 401 Unauthorized | Invalid token.                 |
| 403 Forbidden    | User does not have permission. |
| 404 Not Found    | User not found.                |

### 1.5. **Remover Usuário por ID**

[ Voltar aos Endpoints ](#4-endpoints)

### `/users/:id`

### Exemplo de Request:

```
DELETE /users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: https://portifolioapi-production.up.railway.app/users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Authorization: Bearer {token}
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                             |
| --------- | ------ | ------------------------------------- |
| id        | string | Identificador único do usuário (User) |

### Corpo da Requisição:

```json
vazio
```

### Exemplo de Response:

```
204 OK
```

```json
vazio
```

### Possíveis Erros:

| Código do Erro   | Descrição                      |
| ---------------- | ------------------------------ |
| 401 Unauthorized | Invalid token.                 |
| 403 Forbidden    | User does not have permission. |
| 404 Not Found    | User not found.                |

## 2. **Projects**

[ Voltar para os Endpoints ](#4-endpoints)

O objeto User é definido como:

| Campo       | Tipo   | Descrição                                |
| ----------- | ------ | ---------------------------------------- |
| id          | string | Identificador único do usuário           |
| name        | string | O nome do usuário.                       |
| type        | string | O tipo do projeto (frontend ou backend). |
| image       | string | Url da imagem do projeto                 |
| description | string | Descrição do projeto                     |
| repository  | string | Link para o repositório do projeto       |
| application | string | Link para a aplicação                    |
| createdAt   | date   | Data da criação do usuário               |
| updatedAt   | date   | Data da ultima atualização do usuário    |

### Endpoints

| Método | Rota                | Descrição                                       |
| ------ | ------------------- | ----------------------------------------------- |
| POST   | /projects           | Criação de um projeto.                          |
| GET    | /projects           | Lista os projetos do usuário.                   |
| GET    | /projects/:id       | Busca o projeto usando seu ID como parâmetro    |
| GET    | /projects/frontEnd  | Busca os projetos do tipo frontEnd              |
| GET    | /projects/backEnd   | Busca os projetos do tipo backEnd               |
| GET    | /projects/fullStack | Busca os projetos do tipo fullStack             |
| PATCH  | /projects/:id       | Atualiza o projeto usando seu ID como parâmetro |
| DELETE | /projects/:id       | Remove o projeto usando seu ID como parâmetro   |

### Filtros

| Método | Rota                     | Descrição                           |
| ------ | ------------------------ | ----------------------------------- |
| GET    | /projects?type=frontEnd  | Busca os projetos do tipo frontEnd  |
| GET    | /projects?type=backEnd   | Busca os projetos do tipo backEnd   |
| GET    | /projects?type=fullStack | Busca os projetos do tipo fullStack |

---

### 2.1. **Criação de Projeto**

[ Voltar para os Endpoints ](#4-endpoints)

### `/projects`

### Exemplo de Request:

```
POST /projects
Host: https://portifolioapi-production.up.railway.app/projects
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "projeto",
  "type": "frontEnd",
  "image": "https://www.projeto.com.br",
  "description": "site do projeto",
  "repository": "https://projeto.com.br",
  "application": "https://projeto.com.br"
}
```

### Schema de Validação com Yup:

```javascript
  name: yup.string().required().min(3),
  type: yup.string().required().min(5),
  image: yup.string().required().matches(validUrl, "URL is not valid image"),
  description: yup.string().required().min(10),
  repository: yup.string().required().matches(validUrl, "URL is not valid repository"),
  application: yup.string().required().matches(validUrl, "URL is not valid application"),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "def1b011-1aef-4bd4-a97e-b3b0954cbbfc",
  "name": "projeto",
  "type": "frontEnd",
  "image": "https://www.projeto.com.br",
  "description": "site do projeto",
  "repository": "https://projeto.com.br",
  "application": "https://projeto.com.br",
  "createdAt": "2022-11-18",
  "updatedAt": "2022-11-18"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                  |
| ---------------- | -------------------------- |
| 400 Bad Request  | `key` is a required field. |
| 401 Unauthorized | Invalid token.             |

---

### 2.2. **Listando Projetos**

[ Voltar aos Endpoints ](#4-endpoints)

### `/projects`

### Exemplo de Request:

```
GET /projects
Host: https://portifolioapi-production.up.railway.app/projects
Authorization: Bearer {token}
Content-type: application/json
```

### Corpo da Requisição:

```json
vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "def1b011-1aef-4bd4-a97e-b3b0954cbbfc",
    "name": "projeto",
    "type": "frontEnd",
    "image": "https://www.projeto.com.br",
    "description": "site do projeto",
    "repository": "https://projeto.com.br",
    "application": "https://projeto.com.br",
    "createdAt": "2022-11-18",
    "updatedAt": "2022-11-18"
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

### 2.3. **Pegar Projeto por ID**

[ Voltar aos Endpoints ](#4-endpoints)

### `/projects/:id`

### Exemplo de Request:

```
GET /projects/def1b011-1aef-4bd4-a97e-b3b0954cbbfc
Host: https://portifolioapi-production.up.railway.app/projects/def1b011-1aef-4bd4-a97e-b3b0954cbbfc
Authorization: Bearer {token}
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único do projeto (Project) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "def1b011-1aef-4bd4-a97e-b3b0954cbbfc",
  "name": "projeto",
  "type": "frontEnd",
  "image": "https://www.projeto.com.br",
  "description": "site do projeto",
  "repository": "https://projeto.com.br",
  "application": "https://projeto.com.br",
  "createdAt": "2022-11-18",
  "updatedAt": "2022-11-18"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                         |
| ---------------- | --------------------------------- |
| 401 Unauthorized | Invalid token.                    |
| 403 Forbidden    | Project does not have permission. |
| 404 Not Found    | Project not found.                |

---

### 2.4. **Atualizar Projeto por ID**

[ Voltar aos Endpoints ](#4-endpoints)

### `/projects/:id`

### Exemplo de Request:

```
PATCH /projects/def1b011-1aef-4bd4-a97e-b3b0954cbbfc
Host: https://portifolioapi-production.up.railway.app/projects/def1b011-1aef-4bd4-a97e-b3b0954cbbfc
Authorization: Bearer {token}
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único do projeto (Project) |

### Corpo da Requisição:

```json
{
  "name": "updated",
  "type": "backEnd",
  "image": "updated",
  "description": "updated do updated",
  "repository": "updated",
  "application": "updated"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "def1b011-1aef-4bd4-a97e-b3b0954cbbfc",
  "name": "updated",
  "type": "backEnd",
  "image": "updated",
  "description": "updated do updated",
  "repository": "updated",
  "application": "updated",
  "createdAt": "2022-09-03",
  "updatedAt": "2022-09-03"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                         |
| ---------------- | --------------------------------- |
| 401 Unauthorized | Invalid token.                    |
| 403 Forbidden    | Project does not have permission. |
| 404 Not Found    | Project not found.                |

### 2.5. **Remover Projeto por ID**

[ Voltar aos Endpoints ](#4-endpoints)

### `/projects/:id`

### Exemplo de Request:

```
DELETE /projects/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: https://portifolioapi-production.up.railway.app/projects/def1b011-1aef-4bd4-a97e-b3b0954cbbfc
Authorization: Bearer {token}
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                 |
| --------- | ------ | ----------------------------------------- |
| id        | string | Identificador único do projects (Project) |

### Corpo da Requisição:

```json
vazio
```

### Exemplo de Response:

```
204 OK
```

```json
vazio
```

### Possíveis Erros:

| Código do Erro   | Descrição                         |
| ---------------- | --------------------------------- |
| 401 Unauthorized | Invalid token.                    |
| 403 Forbidden    | Project does not have permission. |
| 404 Not Found    | Project not found.                |
