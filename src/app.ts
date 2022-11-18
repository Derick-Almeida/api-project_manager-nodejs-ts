import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleError.midleware";
import appRoutes from "./routes";

const app = express();
app.use(express.json());

appRoutes(app);

app.use(handleErrorMiddleware);

export default app;
