import express from "express";

import { usersRouter } from "./users.routers";
import { goalRouter } from "./goals.routers";
import { postsRouter } from "./posts.routers";

const apiRouter = express.Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/goals", goalRouter);
apiRouter.use("/posts", postsRouter);

export { apiRouter };
