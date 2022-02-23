import express from "express";

import {
  deleteSubgoal,
  getSubgoalBySubgoalId,
  patchSubgoalDetails,
  patchSubgoalStatus,
  patchSubgoalProgress,
} from "../controllers/subgoals.controller";

const subgoalsRouter = express.Router();

subgoalsRouter
  .route("/:subgoal_id")
  .delete(deleteSubgoal)
  .get(getSubgoalBySubgoalId);

subgoalsRouter.patch("/:subgoal_id/details", patchSubgoalDetails);

subgoalsRouter.patch("/:subgoal_id/status", patchSubgoalStatus);

subgoalsRouter.patch("/:subgoal_id/progress", patchSubgoalProgress);

export { subgoalsRouter };
