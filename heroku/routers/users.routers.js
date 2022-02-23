"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.usersRouter = void 0;
var express_1 = __importDefault(require("express"));
// import { getGoalsByUser } from "../controllers/goals.controller";
var users_controller_1 = require("../controllers/users.controller");
var usersRouter = express_1["default"].Router();
exports.usersRouter = usersRouter;
usersRouter.route("/").get(users_controller_1.getUsers).post(users_controller_1.postUser).patch(users_controller_1.patchUser);
usersRouter.get("/:username", users_controller_1.getUser);
