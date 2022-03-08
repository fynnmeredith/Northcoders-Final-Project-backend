import express from "express";

import {
  getSubgoalBySubgoalId,
  patchSubgoalStatus,
  patchSubgoalProgress,
} from "../controllers/subgoals.controller";

const subgoalsRouter = express.Router();

subgoalsRouter.route("/:subgoal_id").get(getSubgoalBySubgoalId);

subgoalsRouter.patch("/:subgoal_id/status", patchSubgoalStatus);

subgoalsRouter.patch("/:subgoal_id/progress", patchSubgoalProgress);

export { subgoalsRouter };
