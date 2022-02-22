import express from "express";
// import { getGoalsByUser } from "../controllers/goals.controller";

import {
  getUsers,
  postUser,
  patchUser,
  getUser,
} from "../controllers/users.controller";

const usersRouter = express.Router();

usersRouter.route("/").get(getUsers).post(postUser).patch(patchUser);

usersRouter.get("/:username", getUser);
// .delete(deleteUser)
// usersRouter.route("/").get(getUsers).post(postUser).get("/:username/goals", getGoalsByUser*/);

export { usersRouter };
