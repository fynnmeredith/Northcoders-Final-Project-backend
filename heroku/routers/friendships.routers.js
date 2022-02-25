"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.friendshipsRouter = void 0;
var express_1 = __importDefault(require("express"));
var friendships_controller_1 = require("../controllers/friendships.controller");
var friendshipsRouter = express_1["default"].Router();
exports.friendshipsRouter = friendshipsRouter;
friendshipsRouter.post("/", friendships_controller_1.postFriendship);
friendshipsRouter["delete"]("/:friendship_id", friendships_controller_1.deleteFriendship);
