import express from "express";
// import { getGoalsByUser } from "../controllers/goals.controller";

import {
  getUsers,
  postUser,
  patchUser,
  deleteUser,
} from "../controllers/users.controller";

const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(getUsers)
  .post(postUser)
  .patch(patchUser)
  .delete(deleteUser);
// usersRouter.route("/").get(getUsers).post(postUser).get("/:username/goals", getGoalsByUser*/);

export { usersRouter };
