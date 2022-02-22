import {
  selectUsers,
  insertUser,
  modifyUser,
  deleteUserModel,
} from "../models/users.model";

import { requestKeyCheck } from "../utils/jvfuncs";

export const getUsers = (req, res, next) => {
  return selectUsers().then((users) => {
    res.status(200).send({ users });
  });
};

export const postUser = (req, res, next) => {
  const { username, profile } = req.body;

  if (username.length === 0) {
    throw { status: 400, message: "Bad request, please submit a username" };
  }
  if (username.length > 12) {
    throw {
      status: 406,
      message: "Bad request, please submit a shorter username",
    };
  }

  return insertUser(username, profile)
    .then((user) => {
      res.status(200).send({ user: user });
    })
    .catch((err) => {
      console.log(err);
      if (err.code === "23505") {
        next({ status: 406, message: "Username already taken" });
      } else {
        next(err);
      }
    });
};

export const patchUser = (req, res, next) => {
  const { username, profile } = req.body;

  console.log(username, profile);

  if (!username) {
    next({
      status: 400,
      message: "Bad request",
    });
  }
  if (requestKeyCheck(req.body, "profile") === false) {
    next({ status: 400, message: "Bad request" });
  }

  return modifyUser(username, profile)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

export const deleteUser = (req, res, next) => {
  const { username } = req.body;

  return deleteUserModel(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};
