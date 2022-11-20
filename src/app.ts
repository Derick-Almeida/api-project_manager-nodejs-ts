import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleError.midleware";
import appRoutes from "./routes";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

appRoutes(app);

app.use(handleErrorMiddleware);

export default app;
