import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedInvalidUserLogin,
  mockedUpdatedUser,
  mockedUpdatedUserLogin,
  mockedUpdatedUserToBeDeleted,
  mockedUser,
  mockedUserLogin,
  mockedUserLoginToBeDeleted,
  mockedUserToBeDeleted,
} from "../../mocks";

describe("teste das rotas de usuário", () => {
  let connection: DataSource;
  let userCreated = {};
  let userId: string = "";
  let invalidUserId: string = "1d27feef-8549-47c7-b576-d6fbcd427a18";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users - Deve ser capaz de criar um usuário", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body.name).toEqual("jorge");
    expect(response.body.email).toEqual("jorge@email.com");
    userCreated = response.body;
    userId = response.body.id;
  });

  test("POST /users - Não deve ser capaz de criar um usuário que já existe", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /users - Não deve ser capaz de criar um usuário com dados inválidos", async () => {
    const response = await request(app).post("/users").send(mockedUserLogin);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /login - Deve ser capaz de iniciar a sessão", async () => {
    const response = await request(app).post("/login").send(mockedUserLogin);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("POST /login - Não deve ser capaz de iniciar a sessão com dados inválidos", async () => {
    const response = await request(app).post("/login").send(mockedInvalidUserLogin);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /users/:id - Deve ser capaz de buscar um usuário", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);
    const response = await request(app)
      .get(`/users/${userId}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(userCreated);
  });

  test("GET /users/:id - Não deve ser capaz de buscar um usuário sem autorização", async () => {
    const response = await request(app).get(`/users/${userId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /users/:id - Não deve ser capaz de buscar um usuário caso o id informado não seja pertecente ao usuário logado", async () => {
    const otherUser = await request(app).post("/users").send(mockedUserToBeDeleted);
    const userLogin = await request(app).post("/login").send(mockedUserLogin);
    const response = await request(app)
      .get(`/users/${otherUser.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /users/:id - Não deve ser capaz de buscar um usuário com id inválido", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);
    const response = await request(app)
      .get(`/users/${invalidUserId}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /users/:id - Não deve ser capaz de atualizar os dados do usuário sem autorização", async () => {
    const response = await request(app).patch(`/users/${userId}`).send(mockedUpdatedUser);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /users/:id - Não deve ser capaz de atualizar os dados do usuário caso o id informado não seja pertecente ao usuário logado", async () => {
    await request(app).post("/users").send(mockedUserToBeDeleted);
    const userLogin = await request(app).post("/login").send(mockedUserLoginToBeDeleted);
    const response = await request(app)
      .patch(`/users/${userId}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedUpdatedUserToBeDeleted);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /users/:id - Não deve ser capaz de atualizar os dados do usuário caso o email informado já exista", async () => {
    const userToBeDeleted = await request(app).post("/users").send(mockedUserToBeDeleted);
    const userLogin = await request(app).post("/login").send(mockedUserLoginToBeDeleted);
    const response = await request(app)
      .patch(`/users/${userToBeDeleted.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedUser);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /users/:id - Não deve ser capaz de atualizar os dados do usuário caso o id informado seja inválido", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);
    const response = await request(app)
      .patch(`/users/${invalidUserId}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedUpdatedUser);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /users/:id - Deve ser capaz de atualizar os dados o usuário", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);
    const response = await request(app)
      .patch(`/users/${userId}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedUpdatedUser);

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("ronaldo");
    expect(response.body.email).toEqual("ronaldo@email.com");
  });

  test("DELETE /users/:id - Não deve ser capaz de remover um usuário sem autorização", async () => {
    const response = await request(app).delete(`/users/${userId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /users/:id - Não deve ser capaz de remover um usuário caso o id informado não pertença ao usuário logado", async () => {
    await request(app).post("/users").send(mockedUserToBeDeleted);
    const userLogin = await request(app).post("/login").send(mockedUserLoginToBeDeleted);
    const response = await request(app)
      .delete(`/users/${userId}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /users/:id - Não deve ser capaz de remover um usuário caso o id informado seja inválido", async () => {
    await request(app).post("/users").send(mockedUserToBeDeleted);
    const userLogin = await request(app).post("/login").send(mockedUserLoginToBeDeleted);
    const response = await request(app)
      .delete(`/users/${invalidUserId}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /users/:id - Deve ser capaz de remover um usuário", async () => {
    const userLogin = await request(app).post("/login").send(mockedUpdatedUserLogin);
    const response = await request(app)
      .delete(`/users/${userId}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(204);
  });
});
