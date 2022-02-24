import express from "express";

import {
  postFriendship,
  deleteFriendship,
} from "../controllers/friendships.controller";

const friendshipsRouter = express.Router();

friendshipsRouter.post("/", postFriendship);

friendshipsRouter.delete("/:friendship_id", deleteFriendship);

export { friendshipsRouter };
