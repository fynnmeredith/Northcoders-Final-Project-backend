import {
  selectComments,
  insertComment,
  removeComment,
} from "../models/comments.model";

export const getComments = (req, res, next) => {
  return selectComments.then((comments) => {
    console.log(comments);
    res.status(200).send({ comments });
  });
};

export const postComment = (req, res, next) => {
  return insertComment.then((comment) => {
    console.log(comment);
    res.status(200).send({ comment });
  });
};

export const deleteComment = (req, res, next) => {
  return removeComment.then((comment) => {
    console.log(comment);
    res.status(200).send({ comment });
  });
};
