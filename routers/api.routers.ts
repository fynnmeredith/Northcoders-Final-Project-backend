import express from "express";

import { usersRouter } from "./users.routers";
import { goalsRouter } from "./goals.routers";
import { subgoalsRouter } from "./subgoals.routers";
import { postsRouter } from "./posts.routers";
import { reactionsRouter } from "./reactions.routers";
import { friendshipsRouter } from "./friendships.routers";

const apiRouter = express.Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/goals", goalsRouter);
apiRouter.use("/subgoals", subgoalsRouter);
apiRouter.use("/posts", postsRouter);
apiRouter.use("/reactions", reactionsRouter);
apiRouter.use("/friendships", friendshipsRouter);

export { apiRouter };
