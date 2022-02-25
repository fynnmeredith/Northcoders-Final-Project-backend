"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.reactionsRouter = void 0;
var express_1 = __importDefault(require("express"));
var reactions_controller_1 = require("../controllers/reactions.controller");
var reactionsRouter = express_1["default"].Router();
exports.reactionsRouter = reactionsRouter;
reactionsRouter["delete"]("/:reaction_id", reactions_controller_1.deleteReaction);
