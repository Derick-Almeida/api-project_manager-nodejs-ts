import { Router } from "express";
import validationSchema from "../middlewares/validationSchema.middleware";
import { createEmailSchema } from "../schemas/emails.schema";

import { sendEmailController } from "../controllers/email.controllers";

const router = Router();

const emailRoutes = () => {
  router.post("", validationSchema(createEmailSchema), sendEmailController);

  return router;
};

export default emailRoutes;
