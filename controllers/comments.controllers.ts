import {
  selectComments,
  insertComment,
  deleteCommentFromPost,
} from "../models/comments.model";
import {
  checkUserExists,
  checkPostExists,
  checkCommentExists,
} from "../utils/checkExists";

import { requestKeyCheck } from "../utils/misc";

export const getComments = (req, res, next) => {
  const post_id = req.params.post_id;

  return checkPostExists(post_id)
    .then((postExists) => {
      if (postExists === false) {
        return Promise.reject({ status: 400, message: "Bad request" });
      }
    })
    .then(() => {
      return selectComments(post_id).then((comments) => {
        res.status(200).send({ comments });
      });
    })
    .catch(next);
};

export const postComment = (req, res, next) => {
  const post_id = req.params.post_id;
  const { message, owner, datetime } = req.body;

  if (requestKeyCheck(req.body, "message", "owner", "datetime") === false) {
    throw { status: 400, message: "Bad request" };
  } else {
    return checkUserExists(owner)
      .then((res) => {
        if (res === false) {
          return Promise.reject({ status: 400, message: "Bad request" });
        }
      })
      .then(() => {
        insertComment(post_id, message, owner, datetime).then((comment) => {
          res.status(200).send({ comment });
        });
      })
      .catch(next);
  }
};

export const deleteComment = (req, res, next) => {
  const comment_id = req.params.comment_id;
  return checkCommentExists(comment_id)
    .then((commentExists) => {
      if (commentExists === false) {
        return Promise.reject({ status: 400, message: "Bad request" });
      }
    })
    .then(() => {
      return deleteCommentFromPost(comment_id).then((comment) => {
        res.status(200).send({ comment });
      });
    })
    .catch(next);
};
