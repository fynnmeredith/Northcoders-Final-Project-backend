import express from "express";

import { getPostsByUser, postPost } from "../controllers/posts.controller";

const postsRouter = express.Router();

postsRouter.route("/").get(getPostsByUser).post(postPost);

//TBC
// usersRouter.route("/friendsPosts/:user").get(getPostByUserFriends);

export { postsRouter };
