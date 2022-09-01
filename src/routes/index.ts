import { Express } from "express";
import emailRoutes from "./email.routes";
import projectRoutes from "./project.routes";
import sessionRoutes from "./session.routes";
import userRoutes from "./user.routes";

const appRoutes = (app: Express) => {
  app.use("/users", userRoutes());
  app.use("/session"), sessionRoutes();
  app.use("/email", emailRoutes());
  app.use("/projects", projectRoutes());
};

export default appRoutes;
