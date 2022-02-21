import express from "express";
import cors from "cors";
import { apiRouter } from "./routers/api.routers";
const app = express();

app.use(express.json());

app.use(cors());

app.use("/api", apiRouter);

export { app };
