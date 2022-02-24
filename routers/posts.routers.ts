import express from "express";

import { getPostsByUser, postPost } from "../controllers/posts.controller";

import {
  postReaction,
  getReactionsByPost,
} from "../controllers/reactions.controller";

const postsRouter = express.Router();

postsRouter.route("/").get(getPostsByUser).post(postPost);

//TBC
// usersRouter.route("/friendsPosts/:user").get(getPostByUserFriends);

postsRouter
  .route("/:post_id/reactions")
  .post(postReaction)
  .get(getReactionsByPost);

export { postsRouter };
