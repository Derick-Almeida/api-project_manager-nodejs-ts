import { Router } from "express";
import authUser from "../middlewares/authUser.middleware";
import validationSchema from "../middlewares/validationSchema.middleware";
import { createProjectSchema } from "../schemas/projects.schema";

import {
  createProjectController,
  listProjectsController,
  getOneProjectController,
  updatedProjectController,
  deleteProjectController,
} from "../controllers/project.controllers";

const router = Router();

const projectRoutes = () => {
  router.post("/", validationSchema(createProjectSchema), authUser, createProjectController);
  router.get("", authUser, listProjectsController);
  router.get("/:id", authUser, getOneProjectController);
  router.patch("/:id", authUser, updatedProjectController);
  router.delete("/:id", authUser, deleteProjectController);

  return router;
};

export default projectRoutes;
