import express from "express";

import {
  getPostByUser,
  postPost,
  deletePost,
  getPostByUserFriends,
} from "../controllers/posts.controller";

const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(getPostByUser)
  .post(postPost)
  .patch()
  .delete(deletePost);

usersRouter.route("/friendsPosts/:user").get(getPostByUserFriends);

export { usersRouter };
