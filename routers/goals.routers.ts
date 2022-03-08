import express from "express";

import {
  postGoal,
  getGoalByGoalId,
  patchGoalProgress,
  patchGoalStatus,
} from "../controllers/goals.controller";

import {
  postSubgoal,
  getSubgoalsByGoalId,
} from "../controllers/subgoals.controller";

const goalsRouter = express.Router();

goalsRouter.post("/", postGoal);

goalsRouter.route("/:goal_id").get(getGoalByGoalId);

goalsRouter.patch("/:goal_id/status", patchGoalStatus);

goalsRouter.patch("/:goal_id/progress", patchGoalProgress);

goalsRouter
  .route("/:goal_id/subgoals")
  .post(postSubgoal)
  .get(getSubgoalsByGoalId);

export { goalsRouter };
