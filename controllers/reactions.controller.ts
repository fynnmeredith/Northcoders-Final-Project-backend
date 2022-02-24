import {
  insertReaction,
  deleteReactionFrom,
  selectReactionsByPost,
} from "../models/reactions.model";
import { Reaction } from "../types";
import {
  checkReactionExists,
  checkUserExists,
  checkPostExists,
  checkIfUserHasReacted,
} from "../utils/checkExists";

const postReaction = (req, res, next) => {
  const { post_id } = req.params;
  const { owner, reaction } = req.body;

  const validReactions = [
    "Congratulations!",
    "Awesome!",
    "Keep on going",
    "I'm proud of you",
  ];

  if (!owner || !reaction) {
    next({ status: 400, message: "Bad request" });
  } else if (!validReactions.includes(reaction)) {
    next({ status: 400, message: "Reaction not valid" });
  } else if (!Number.isInteger(parseInt(post_id))) {
    next({ status: 400, message: "Bad request" });
  } else {
    return checkPostExists(post_id)
      .then((doesPostExist: boolean) => {
        if (!doesPostExist) {
          return Promise.reject({ status: 404, message: "Post not found" });
        }
        return checkUserExists(owner);
      })
      .then((doesUserExist: boolean) => {
        if (!doesUserExist) {
          return Promise.reject({ status: 404, message: "User not found" });
        }
        return checkIfUserHasReacted(post_id, owner);
      })
      .then((hasUserReacted: boolean) => {
        if (hasUserReacted) {
          return Promise.reject({
            status: 400,
            message: "Cannot react to post user has already reacted to",
          });
        }

        return insertReaction(post_id, owner, reaction);
      })
      .then((reaction: Reaction) => {
        res.status(200).send({ reaction });
      })
      .catch(next);
  }
};

const deleteReaction = (req, res, next) => {
  const { reaction_id } = req.params;
  if (!Number.isInteger(parseInt(reaction_id))) {
    next({ status: 400, message: "Bad request" });
  } else {
    return checkReactionExists(reaction_id)
      .then((doesReactionExist: boolean) => {
        if (!doesReactionExist) {
          return Promise.reject({
            status: 404,
            message: "Reaction not found",
          });
        }
        return deleteReactionFrom(reaction_id);
      })
      .then(() => {
        res.status(204).send();
      })
      .catch(next);
  }
};

const getReactionsByPost = (req, res, next) => {
  const { post_id } = req.params;
  if (!Number.isInteger(parseInt(post_id))) {
    next({ status: 400, message: "Bad request" });
  } else {
    return checkPostExists(post_id)
      .then((doesPostExist: boolean) => {
        if (!doesPostExist) {
          return Promise.reject({ status: 404, message: "Post not found" });
        }
        return selectReactionsByPost(post_id);
      })
      .then((reactions: Reaction[]) => {
        res.status(200).send({ reactions });
      })
      .catch(next);
  }
};

export { postReaction, deleteReaction, getReactionsByPost };
