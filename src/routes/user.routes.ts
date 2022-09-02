import { Router } from "express";
import authUser from "../middlewares/authUser.middleware";
import validationSchema from "../middlewares/validationSchema.middleware";
import { createUserSchema } from "../schemas/users.schema";

import {
  createUserController,
  deleteUserController,
  getUserController,
  updateUserController,
} from "../controllers/user.controllers";

const router = Router();

const userRoutes = () => {
  router.post("", validationSchema(createUserSchema), createUserController);
  router.get("/:id", authUser, getUserController);
  router.patch("/:id", authUser, updateUserController);
  router.delete("/:id", authUser, deleteUserController);

  return router;
};

export default userRoutes;
