"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var goals_controller_1 = require("../controllers/goals.controller");
var subgoals_controller_1 = require("../controllers/subgoals.controller");
var friendships_controller_1 = require("../controllers/friendships.controller");
var users_controller_1 = require("../controllers/users.controller");
var usersRouter = express_1["default"].Router();
exports.usersRouter = usersRouter;
usersRouter.route("/").get(users_controller_1.getUsers).post(users_controller_1.postUser).patch(users_controller_1.patchUser);
usersRouter.get("/:username", users_controller_1.getUser);
// .delete(deleteUser)
usersRouter.get("/:username/goals", goals_controller_1.getGoalsByUser);
usersRouter.get("/:username/subgoals", subgoals_controller_1.getSubgoalsByUser);
usersRouter.get("/:username/friendships", friendships_controller_1.getFriendshipsbyUser);
