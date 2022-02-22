import express from "express";

import { usersRouter } from "./users.routers";
import { goalRouter } from "./goals.routers";

const apiRouter = express.Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/goals", goalRouter);

export { apiRouter };
