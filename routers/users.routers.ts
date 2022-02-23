import express from "express";

import { getGoalsByUser } from "../controllers/goals.controller";

import { getSubgoalsByUser } from "../controllers/subgoals.controller";

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

usersRouter.get("/:username/goals", getGoalsByUser);

usersRouter.get("/:username/subgoals", getSubgoalsByUser);

export { usersRouter };
