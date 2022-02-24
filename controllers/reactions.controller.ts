import {
  insertReaction,
  deleteReactionFrom,
  selectReactionsByPost,
} from "../models/reactions.model";
import { Reaction } from "../types";
import {
  checkFriendshipExists,
  checkIfUsersAreFriends,
  checkUserExists,
} from "../utils/checkExists";

const postReaction = (req, res, next) => {
  const { user_1, user_2 } = req.body;

  if (!user_1 || !user_2) {
    next({ status: 400, message: "Bad request" });
  } else if (user_1 === user_2) {
    next({ status: 400, message: "User cannot befriend themselves" });
  } else {
    return checkUserExists(user_1)
      .then((doesUser1Exist: boolean) => {
        if (!doesUser1Exist) {
          return Promise.reject({ status: 404, message: "User 1 not found" });
        }
        return checkUserExists(user_2);
      })
      .then((doesUser2Exist: boolean) => {
        if (!doesUser2Exist) {
          return Promise.reject({ status: 404, message: "User 2 not found" });
        }
        return checkIfUsersAreFriends(user_1, user_2);
      })
      .then((areUsersFriends: boolean) => {
        if (areUsersFriends) {
          return Promise.reject({
            status: 400,
            message: "Users are already friends",
          });
        }
        return insertReaction(user_1, user_2);
      })
      .then((reaction: Reaction) => {
        res.status(200).send({ reaction });
      })
      .catch(next);
  }
};

const deleteReaction = (req, res, next) => {
  const { friendship_id } = req.params;
  if (!Number.isInteger(parseInt(friendship_id))) {
    next({ status: 400, message: "Bad request" });
  } else {
    return checkFriendshipExists(friendship_id)
      .then((doesFriendshipExist: boolean) => {
        if (!doesFriendshipExist) {
          return Promise.reject({
            status: 404,
            message: "Friendship not found",
          });
        }
        return deleteReactionFrom(friendship_id);
      })
      .then(() => {
        res.status(204).send();
      })
      .catch(next);
  }
};

const getReactionsByPost = (req, res, next) => {
  const { username } = req.params;
  return checkUserExists(username)
    .then((doesUserExist: boolean) => {
      if (!doesUserExist) {
        return Promise.reject({ status: 404, message: "User not found" });
      }
      return selectReactionsByPost(username);
    })
    .then((reactions: Reaction[]) => {
      res.status(200).send({ reactions });
    })
    .catch(next);
};

export { postReaction, deleteReaction, getReactionsByPost };
