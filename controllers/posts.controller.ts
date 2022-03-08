import { insertPost, selectPostsByUser } from "../models/posts.model";

import {
  checkGoalExists,
  checkSubgoalExists,
  checkUserExists,
} from "../utils/checkExists";

import { requestKeyCheck } from "../utils/misc";

export const postPost = (req, res, next) => {
  const {
    associated_data_type,
    associated_id,
    owner,
    datetime,
    message,
    progress_point,
  } = req.body;

  return checkUserExists(owner)
    .then((res) => {
      if (res === false) {
        throw {
          status: 400,
          message: "Bad request",
        };
      }
    })
    .then(() => {
      switch (associated_data_type) {
        case "goal":
          return checkGoalExists(associated_id)
            .then((doesGoalExist) => {
              if (doesGoalExist === false) {
                return Promise.reject({
                  status: 400,
                  message: "Bad request",
                });
              }
            })
            .catch(next);
        case "subgoal":
          return checkSubgoalExists(associated_id)
            .then((doesSubgoalExist: boolean) => {
              if (doesSubgoalExist === false) {
                return Promise.reject({
                  status: 400,
                  message: "Bad request",
                });
              }
            })
            .catch(next);
      }
    })
    .then(() => {
      if (
        requestKeyCheck(
          req.body,
          "associated_data_type",
          "associated_id",
          "owner"
        ) === false
      ) {
        throw {
          status: 400,
          message: "Bad request",
        };
      }
    })
    .then(() => {
      return insertPost(
        associated_data_type,
        associated_id,
        owner,
        datetime,
        message,
        progress_point
      );
    })
    .then((post) => {
      res.status(200).send({ post });
    })
    .catch((err) => {
      next(err);
    });
};

export const getPostsByUser = (req, res, next) => {
  const { username } = req.params;
  return checkUserExists(username)
    .then((res) => {
      if (res === false) {
        throw {
          status: 400,
          message: "Bad request",
        };
      }
    })
    .then(() => {
      return selectPostsByUser(username);
    })
    .then((posts) => {
      res.status(200).send({ posts });
    })
    .catch((err) => {
      next(err);
    });
};
