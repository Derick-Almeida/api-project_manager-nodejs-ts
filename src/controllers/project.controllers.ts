import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IProjectRequest } from "../interfaces/projects";

import createProjectService from "../services/projects/createProject.service";
import deleteProjectService from "../services/projects/deleteProject.service";
import getOneProjectService from "../services/projects/getOneProject.service";
import ListProjectsService from "../services/projects/listProjects.service";
import updateProjectService from "../services/projects/updateProject.service";

const createProjectController = async (req: Request, res: Response) => {
  const { name, type, image, description, application, repository }: IProjectRequest = req.body;
  const userId = req.user.id;
  const project = await createProjectService(
    { name, type, image, description, application, repository },
    userId
  );

  return res.status(201).json(instanceToPlain(project));
};

const listProjectsController = async (req: Request, res: Response) => {
  const projectList = await ListProjectsService();

  return res.json(projectList);
};

const getOneProjectController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await getOneProjectService(id);

  return res.json(project);
};

const updatedProjectController = async (req: Request, res: Response) => {
  const { name, type, image, description, application, repository }: IProjectRequest = req.body;
  const { id } = req.params;
  const userId = req.user.id;
  const project = await updateProjectService(id, userId, {
    name,
    type,
    image,
    description,
    application,
    repository,
  });

  return res.status(201).json(project);
};

const deleteProjectController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;
  await deleteProjectService(id, userId);

  return res.status(204).send();
};

export {
  createProjectController,
  listProjectsController,
  getOneProjectController,
  updatedProjectController,
  deleteProjectController,
};
