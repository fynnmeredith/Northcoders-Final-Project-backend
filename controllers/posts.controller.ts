import {
  insertPost,
  removePost,
  selectPostsByUser,
  selectPostsByUserFriends,
} from "../models/posts.model";

import {
  checkGoalExists,
  checkSubgoalExists,
  checkUserExists,
} from "../utils/checkExists";

export const postPost = (req, res, next) => {
  const { associated_data_type, associated_id, owner, datetime, message } =
    req.body;

  switch (associated_data_type) {
    case "goal":
      return checkGoalExists(associated_id)
        .then((res) => {
          if (res === false) {
            return Promise.reject({
              status: 400,
              message: "Bad request",
            });
          }
        })
        .catch(next);
    case "subgoal":
      return checkSubgoalExists(associated_id)
        .then((res) => {
          if (res === false) {
            return Promise.reject({
              status: 400,
              message: "Bad request",
            });
          }
        })
        .catch(next);
  }

  return checkUserExists(owner).then((res) => {
    console.log("YOOOO", res);
    if (res === false) {
      throw {
        status: 400,
        message: "Bad request",
      };
    }
  });

  return insertPost(
    associated_data_type,
    associated_id,
    owner,
    datetime,
    message
  )
    .then((post) => {
      console.log(post);
      res.status(200).send({ post });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

// TBC
export const deletePost = (req, res, next) => {
  const { post_id } = req.body;
  return removePost(post_id)
    .then((post) => {
      console.log(post);
      res.status(200).send({ post });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

export const getPostsByUser = (req, res, next) => {
  const { owner } = req.body;
  return selectPostsByUser(owner)
    .then((posts) => {
      console.log(posts);
      res.status(200).send({ posts });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

// TBC
export const getPostsByUserFriends = (req, res, next) => {
  // const { owner } = req.body;
  return selectPostsByUserFriends()
    .then((posts) => {
      console.log(posts);
      res.status(200).send({ posts });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
