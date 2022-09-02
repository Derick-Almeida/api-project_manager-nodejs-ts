import { Express } from "express";
import userRoutes from "./user.routes";
import emailRoutes from "./email.routes";
import sessionRoutes from "./session.routes";
import projectRoutes from "./project.routes";

const appRoutes = (app: Express) => {
  app.use("/users", userRoutes());
  app.use("/login", sessionRoutes());
  app.use("/email", emailRoutes());
  app.use("/projects", projectRoutes());
};

export default appRoutes;
