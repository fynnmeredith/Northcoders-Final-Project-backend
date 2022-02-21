import express from "express";

import { userRouter } from "./users.routers";
import { goalRouter } from "./goals.routers";

const apiRouter = express.Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/goals", goalRouter);

export { apiRouter };
