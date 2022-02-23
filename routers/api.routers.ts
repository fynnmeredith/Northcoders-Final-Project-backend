import express from "express";

import { usersRouter } from "./users.routers";
import { postsRouter } from "./posts.routers";
import { goalsRouter } from "./goals.routers";
import { subgoalsRouter } from "./subgoals.routers";
import { friendshipsRouter } from "./friendships.routers";

const apiRouter = express.Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/goals", goalsRouter);
apiRouter.use("/subgoals", subgoalsRouter);
apiRouter.use("/posts", postsRouter);
apiRouter.use("/friendships", friendshipsRouter);

export { apiRouter };
