"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.goalRouter = void 0;
var express_1 = __importDefault(require("express"));
var goals_controller_1 = require("../controllers/goals.controller");
var goalRouter = express_1["default"].Router();
exports.goalRouter = goalRouter;
goalRouter.post("/", goals_controller_1.postGoal);
goalRouter.route("/:goal_id")["delete"](goals_controller_1.deleteGoal).get(goals_controller_1.getGoalByGoalId);
goalRouter.patch("/:goal_id/details", goals_controller_1.patchGoalDetails);
goalRouter.patch("/:goal_id/progress", goals_controller_1.patchGoalProgress);
