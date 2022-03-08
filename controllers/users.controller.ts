import {
  selectUsers,
  insertUser,
  modifyUser,
  selectUser,
} from "../models/users.model";

export const getUsers = (req, res, next) => {
  const searchTerm = req.query.search;

  return selectUsers(searchTerm).then((users) => {
    res.status(200).send({ users });
  });
};

export const postUser = (req, res, next) => {
  const { username, profile, avatar_url } = req.body;

  if (username.length === 0) {
    throw { status: 400, message: "Bad request, please submit a username" };
  }
  if (username.length > 12) {
    throw {
      status: 406,
      message: "Bad request, please submit a shorter username",
    };
  }

  if (profile === undefined && avatar_url === undefined) {
    throw {
      status: 400,
      message: "Bad request",
    };
  }

  return insertUser(username, profile, avatar_url)
    .then((user) => {
      res.status(200).send({ user: user });
    })
    .catch((err) => {
      if (err.code === "23505") {
        next({ status: 406, message: "Username already taken" });
      } else {
        next(err);
      }
    });
};

export const patchUser = (req, res, next) => {
  const { username, profile, avatar_url } = req.body;

  if (!username) {
    next({
      status: 400,
      message: "Bad request",
    });
  } else if (profile === undefined && avatar_url === undefined) {
    next({ status: 400, message: "Bad request" });
  } else {
    if (profile === undefined) {
      selectUser(username)
        .then((user) => {
          const profile = user[0].profile;
          return profile;
        })
        .then((profile) => {
          return modifyUser(username, profile, avatar_url)
            .then((user) => {
              res.status(200).send({ user });
            })
            .catch((err) => {
              next(err);
            });
        });
    } else if (avatar_url === undefined) {
      selectUser(username)
        .then((user) => {
          const avatar_url = user[0].avatar_url;
          return avatar_url;
        })
        .then((avatar_url) => {
          return modifyUser(username, profile, avatar_url)
            .then((user) => {
              res.status(200).send({ user });
            })
            .catch((err) => {
              next(err);
            });
        });
    } else {
      return modifyUser(username, profile, avatar_url)
        .then((user) => {
          res.status(200).send({ user });
        })
        .catch((err) => {
          next(err);
        });
    }
  }
};

export const getUser = (req, res, next) => {
  const { username } = req.params;

  return selectUser(username).then((user) => {
    res.status(200).send({ user });
  });
};
