import express from "express";
import { getComments, postComment } from "../controllers/comments.controllers";

import { getPostsByUser, postPost } from "../controllers/posts.controller";

const postsRouter = express.Router();

postsRouter.route("/").post(postPost);

postsRouter.get("/:username", getPostsByUser);
//TBC
// usersRouter.route("/friendsPosts/:user").get(getPostByUserFriends);

postsRouter.route("/:post_id/comments/").get(getComments).post(postComment);

export { postsRouter };
