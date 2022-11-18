import { Router } from "express";
import { createSessionController } from "../controllers/session.controllers";
import validationSchema from "../middlewares/validationSchema.middleware";
import { createSessionSchema } from "../schemas/session.schema";

const router = Router();

const sessionRoutes = () => {
  router.post("", validationSchema(createSessionSchema), createSessionController);

  return router;
};

export default sessionRoutes;
