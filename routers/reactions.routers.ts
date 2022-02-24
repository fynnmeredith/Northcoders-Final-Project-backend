import express from "express";

import { deleteReaction } from "../controllers/reactions.controller";

const reactionsRouter = express.Router();

reactionsRouter.delete("/:reaction_id", deleteReaction);

export { reactionsRouter };
