<h1 align='center'>Project_manager</h1>

<p>
a APi possui 12 endpoint sendo 5 deles ralacionados ao gerenciamento da conta do usuário e 7 deles de gerenciamento dos projetos
</p>
_____________________________________________________________________________________________________________________________________

<h2 align="center">Rotas de usuário</h2>

## Rotas que não precisam de autorização

`POST /users - cria um novo usuário`

### Formato da Requisição:

```json
{
  "name": "jorge",
  "email": "jorge@email.com",
  "password": "123456"
}
```

### Retorno esperado - STATUS 201 Created:

```json

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

POST /users - cria um usuário <br/>
POST /login - inicia a seção <br/>
POST /email - envia um email <br/>
POST /projects - cria um novo projeto <br/>

GET /projects - lista todos os projetos do usuário <br/>
GET /projects/frontEnd - lista os projetos frontEnd do usuário <br/>
GET /projects/backEnd - lista os projetos backEnd do usuário <br/>
GET /projects/:id - pega um projeto do usuário <br/>

PATCH /projects/:id - atualiza um projeto do usuário <br/>
PATCH /users/:id - atualiza um usuário <br/>

DELETE /users/:id - remove um usuário <br/>
DELETE /projects/:id - remove um projeto do usuário <br/>
