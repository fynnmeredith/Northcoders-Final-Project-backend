import {
  insertPost,
  removePost,
  selectPostsByUser,
  selectPostsByUserFriends,
} from "../models/posts.model";

import { checkGoalExists } from "../utils/checkExists";

export const postPost = (req, res, next) => {
  const { associated_data_type, associated_id, owner, datetime, message } =
    req.body;

  checkGoalExists(associated_id);

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
