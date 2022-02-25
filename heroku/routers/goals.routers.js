"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.goalsRouter = void 0;
var express_1 = __importDefault(require("express"));
var goals_controller_1 = require("../controllers/goals.controller");
var subgoals_controller_1 = require("../controllers/subgoals.controller");
var goalsRouter = express_1["default"].Router();
exports.goalsRouter = goalsRouter;
goalsRouter.post("/", goals_controller_1.postGoal);
goalsRouter.route("/:goal_id")["delete"](goals_controller_1.deleteGoal).get(goals_controller_1.getGoalByGoalId);
goalsRouter.patch("/:goal_id/details", goals_controller_1.patchGoalDetails);
goalsRouter.patch("/:goal_id/status", goals_controller_1.patchGoalStatus);
goalsRouter.patch("/:goal_id/progress", goals_controller_1.patchGoalProgress);
goalsRouter
    .route("/:goal_id/subgoals")
    .post(subgoals_controller_1.postSubgoal)
    .get(subgoals_controller_1.getSubgoalsByGoalId);
