import express from "express";

import {
  postGoal,
  deleteGoal,
  getGoalByGoalId,
  patchGoalDetails,
  patchGoalProgress,
  patchGoalStatus,
} from "../controllers/goals.controller";

const goalRouter = express.Router();

goalRouter.post("/", postGoal);

goalRouter.route("/:goal_id").delete(deleteGoal).get(getGoalByGoalId);

goalRouter.patch("/:goal_id/details", patchGoalDetails);

goalRouter.patch("/:goal_id/status", patchGoalStatus);

goalRouter.patch("/:goal_id/progress", patchGoalProgress);

export { goalRouter };
