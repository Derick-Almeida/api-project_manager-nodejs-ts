<h1 align='center'>Project_manager</h1>

<p>
a APi possui 12 endpoint sendo 5 deles ralacionados ao gerenciamento da conta do usuario e 7 deles de gerenciamento dos projetos
</p>
_____________________________________________________________________________________________________________________________________

<h2 align="center">Rotas de Usuario</h2>

## Rotas que não precisam de autorização

`POST /users - cria um novo usuario`

### Formato da Requisição:

```json
{
  "name": "carlos",
  "email": "carlos@email.com",
  "password": "123456"
}
```

### Retorno esperado - STATUS 201 Created:

```json
{
  "name": "carlos",
  "email": "carlos@email.com",
  "projects": {},
  "id": "591f82db-8ea1-4202-98de-475f4910bfbe",
  "createdAt": "2022-09-03",
  "updatedAt": "2022-09-03"
}
```

```json

```

```json

```

```json

```

```json

```

## Rotas que necessitam de autorização

### Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

POST /users - cria um usuario <br/>
POST /login - inicia a seção <br/>
POST /email - envia um email <br/>
POST /projects - cria um novo projeto <br/>

GET /projects - lista todos os projetos do usuario <br/>
GET /projects/frontEnd - lista os projetos frontEnd do usuario <br/>
GET /projects/backEnd - lista os projetos backEnd do usuario <br/>
GET /projects/:id - pega um projeto do usuario <br/>

PATCH /projects/:id - atualiza um projeto do usuario <br/>
PATCH /users/:id - atualiza um usuario <br/>

DELETE /users/:id - remove um usuario <br/>
DELETE /projects/:id - remove um projeto do usuario <br/>
