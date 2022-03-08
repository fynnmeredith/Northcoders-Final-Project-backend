"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var comments_controllers_1 = require("../controllers/comments.controllers");
var posts_controller_1 = require("../controllers/posts.controller");
var reactions_controller_1 = require("../controllers/reactions.controller");
var postsRouter = express_1["default"].Router();
exports.postsRouter = postsRouter;
postsRouter.route("/").post(posts_controller_1.postPost);
postsRouter.get("/:username", posts_controller_1.getPostsByUser);
postsRouter.route("/:post_id/comments/").get(comments_controllers_1.getComments).post(comments_controllers_1.postComment);
postsRouter
    .route("/:post_id/reactions")
    .post(reactions_controller_1.postReaction)
    .get(reactions_controller_1.getReactionsByPost);
