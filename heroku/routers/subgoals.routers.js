"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var subgoals_controller_1 = require("../controllers/subgoals.controller");
var subgoalsRouter = express_1["default"].Router();
exports.subgoalsRouter = subgoalsRouter;
subgoalsRouter.route("/:subgoal_id").get(subgoals_controller_1.getSubgoalBySubgoalId);
subgoalsRouter.patch("/:subgoal_id/status", subgoals_controller_1.patchSubgoalStatus);
subgoalsRouter.patch("/:subgoal_id/progress", subgoals_controller_1.patchSubgoalProgress);
