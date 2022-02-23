"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.apiRouter = void 0;
var express_1 = __importDefault(require("express"));
var users_routers_1 = require("./users.routers");
// import { goalRouter } from "./goals.routers";
var apiRouter = express_1["default"].Router();
exports.apiRouter = apiRouter;
apiRouter.use("/users", users_routers_1.usersRouter);
