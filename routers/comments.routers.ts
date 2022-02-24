import express from "express";

import { deleteComment } from "../controllers/comments.controllers";

const commentsRouter = express.Router();

commentsRouter.route("/:comment_id").delete(deleteComment);

export { commentsRouter };
