import express from "express";

import { usersRouter } from "./users.routers";
import { postsRouter } from "./posts.routers";
import { goalsRouter } from "./goals.routers";
import { subgoalsRouter } from "./subgoals.routers";

const apiRouter = express.Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/posts", postsRouter);
apiRouter.use("/goals", goalsRouter);
apiRouter.use("/subgoals", subgoalsRouter);

export { apiRouter };
