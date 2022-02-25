"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.commentsRouter = void 0;
var express_1 = __importDefault(require("express"));
var comments_controllers_1 = require("../controllers/comments.controllers");
var commentsRouter = express_1["default"].Router();
exports.commentsRouter = commentsRouter;
commentsRouter.route("/:comment_id")["delete"](comments_controllers_1.deleteComment);
