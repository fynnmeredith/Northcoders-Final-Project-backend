import {
  insertPost,
  removePost,
  selectPostByUser,
  selectPostByUserFriends,
} from "../models/posts.model";

export const postPost = () => {
  return insertPost().then(() => {});
};

export const deletePost = () => {
  return removePost().then(() => {});
};

export const getPostByUser = () => {
  return selectPostByUser().then(() => {});
};

export const getPostByUserFriends = () => {
  return selectPostByUserFriends().then(() => {});
};
