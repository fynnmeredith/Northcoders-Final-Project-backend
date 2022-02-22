import express from "express";
import { getGoalsByUser } from "../controllers/goals.controller";

import { getUsers, postUser } from "../controllers/users.controller";

const usersRouter = express.Router();

usersRouter.route("/").get(getUsers).post(postUser);
usersRouter.route("/").get(getUsers).post(postUser);
usersRouter.get("/:username/goals", getGoalsByUser);

export { usersRouter };
