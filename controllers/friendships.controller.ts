import {
  insertFriendship,
  deleteFriendshipFrom,
  selectFriendshipsByUser,
} from "../models/friendships.model";
import { Friendship } from "../types";
import {
  checkFriendshipExists,
  checkIfUsersAreFriends,
  checkUserExists,
} from "../utils/checkExists";

const postFriendship = (req, res, next) => {
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
        return insertFriendship(user_1, user_2);
      })
      .then((friendship: Friendship) => {
        res.status(200).send({ friendship });
      })
      .catch(next);
  }
};

const deleteFriendship = (req, res, next) => {
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
        return deleteFriendshipFrom(friendship_id);
      })
      .then(() => {
        res.status(204).send();
      })
      .catch(next);
  }
};

const getFriendshipsbyUser = (req, res, next) => {
  const { username } = req.params;
  return checkUserExists(username)
    .then((doesUserExist: boolean) => {
      if (!doesUserExist) {
        return Promise.reject({ status: 404, message: "User not found" });
      }
      return selectFriendshipsByUser(username);
    })
    .then((friendships: Friendship[]) => {
      res.status(200).send({ friendships });
    })
    .catch(next);
};

export { postFriendship, deleteFriendship, getFriendshipsbyUser };
