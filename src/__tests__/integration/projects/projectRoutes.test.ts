import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedInvalidProject,
  mockedProject,
  mockedUpdatedProject,
  mockedUser,
  mockedUserLogin,
  mockedUserLoginToBeDeleted,
  mockedUserToBeDeleted,
} from "../../mocks";

describe("teste das rotas de projetos", () => {
  let connection: DataSource;
  let createdProject = {};
  let token: string = "";
  let projectId: string = "";
  let otherUserToken: string = "";
  let invalidProjectId: string = "1d27feef-8549-47c7-b576-d6fbcd427a18";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUser);
    const user = await request(app).post("/login").send(mockedUserLogin);
    token = user.body.token;

    await request(app).post("/users").send(mockedUserToBeDeleted);
    const otherUser = await request(app).post("/login").send(mockedUserLoginToBeDeleted);
    otherUserToken = otherUser.body.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /projects - Deve ser capaz de criar um novo projeto", async () => {
    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedProject);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("image");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("application");
    expect(response.body).toHaveProperty("repository");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    createdProject = response.body;
    projectId = response.body.id;
  });

  test("POST /projects - Não deve ser capaz de criar um novo projeto sem autorização", async () => {
    const response = await request(app).post("/projects").send(mockedProject);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /projects - Não deve ser capaz de criar um novo projeto caso os dados sejam invalidos", async () => {
    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedInvalidProject);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /projects - Deve ser capaz de listar os projetos do usuário", async () => {
    const response = await request(app).get("/projects").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("GET /projects - Não deve ser capaz de listar os projetos do usuário sem autorização", async () => {
    const response = await request(app).get("/projects");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /projects/:id - Deve ser capaz de buscar um projeto do usuário", async () => {
    const response = await request(app)
      .get(`/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(createdProject);
  });

  test("GET /projects/:id - Não deve ser capaz de buscar o projeto do usuário sem autorização", async () => {
    const response = await request(app).get(`/projects/${projectId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /projects/:id - Não deve ser capaz de buscar o projeto de um usuário diferente do logado", async () => {
    const response = await request(app)
      .get(`/projects/${projectId}`)
      .set("Authorization", `Bearer ${otherUserToken}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /projects/:id - Não deve ser capaz de buscar o projeto caso o id passado não exista", async () => {
    const response = await request(app)
      .get(`/projects/${invalidProjectId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /projects/:id - Não deve ser capaz de atualizar um projeto sem autorização", async () => {
    const response = await request(app).patch(`/projects/${projectId}`).send(mockedUpdatedProject);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /projects/:id - Não deve ser capaz de atualizar um projeto de um usuário diferente do logado", async () => {
    const response = await request(app)
      .patch(`/projects/${projectId}`)
      .set("Authorization", `Bearer ${otherUserToken}`)
      .send(mockedUpdatedProject);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /projects/:id - Não deve ser capaz de atualizar um projeto caso o id passado seja inválido", async () => {
    const response = await request(app)
      .patch(`/projects/${invalidProjectId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedUpdatedProject);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /projects/:id - Deve ser capaz de atualizar um projeto", async () => {
    const response = await request(app)
      .patch(`/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(mockedUpdatedProject);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("image");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("application");
    expect(response.body).toHaveProperty("repository");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
  });

  test("DELETE /projects/:id - Não deve ser capaz de remover um projeto sem autorização", async () => {
    const response = await request(app).delete(`/projects/${projectId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /projects/:id - Não deve ser capaz de remover um projeto caso ele não pertença ao usuário logado", async () => {
    const response = await request(app)
      .delete(`/projects/${projectId}`)
      .set("Authorization", `Bearer ${otherUserToken}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /projects/:id - Não deve ser capaz de remover um projeto caso o id passado seja inválido", async () => {
    const response = await request(app)
      .delete(`/projects/${invalidProjectId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /projects/:id - Deve ser capaz de remover um projeto", async () => {
    const response = await request(app)
      .delete(`/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
