"use strict";
exports.__esModule = true;
exports.getUser = exports.patchUser = exports.postUser = exports.getUsers = void 0;
var users_model_1 = require("../models/users.model");
var getUsers = function (req, res, next) {
    var searchTerm = req.query.search;
    return (0, users_model_1.selectUsers)(searchTerm).then(function (users) {
        res.status(200).send({ users: users });
    });
};
exports.getUsers = getUsers;
var postUser = function (req, res, next) {
    var _a = req.body, username = _a.username, profile = _a.profile, avatar_url = _a.avatar_url;
    if (username.length === 0) {
        throw { status: 400, message: "Bad request, please submit a username" };
    }
    if (username.length > 12) {
        throw {
            status: 406,
            message: "Bad request, please submit a shorter username"
        };
    }
    if (profile === undefined && avatar_url === undefined) {
        throw {
            status: 400,
            message: "Bad request"
        };
    }
    return (0, users_model_1.insertUser)(username, profile, avatar_url)
        .then(function (user) {
        res.status(200).send({ user: user });
    })["catch"](function (err) {
        console.log(err);
        if (err.code === "23505") {
            next({ status: 406, message: "Username already taken" });
        }
        else {
            next(err);
        }
    });
};
exports.postUser = postUser;
var patchUser = function (req, res, next) {
    var _a = req.body, username = _a.username, profile = _a.profile, avatar_url = _a.avatar_url;
    if (!username) {
        next({
            status: 400,
            message: "Bad request"
        });
    }
    else if (profile === undefined && avatar_url === undefined) {
        next({ status: 400, message: "Bad request" });
    }
    else {
        if (profile === undefined) {
            (0, users_model_1.selectUser)(username)
                .then(function (user) {
                var profile = user[0].profile;
                return profile;
            })
                .then(function (profile) {
                return (0, users_model_1.modifyUser)(username, profile, avatar_url)
                    .then(function (user) {
                    res.status(200).send({ user: user });
                })["catch"](function (err) {
                    next(err);
                });
            });
        }
        else if (avatar_url === undefined) {
            (0, users_model_1.selectUser)(username)
                .then(function (user) {
                var avatar_url = user[0].avatar_url;
                return avatar_url;
            })
                .then(function (avatar_url) {
                return (0, users_model_1.modifyUser)(username, profile, avatar_url)
                    .then(function (user) {
                    res.status(200).send({ user: user });
                })["catch"](function (err) {
                    next(err);
                });
            });
        }
        else {
            return (0, users_model_1.modifyUser)(username, profile, avatar_url)
                .then(function (user) {
                res.status(200).send({ user: user });
            })["catch"](function (err) {
                next(err);
            });
        }
    }
};
exports.patchUser = patchUser;
// DELETE USER TBC
// export const deleteUser = (req, res, next) => {
//   const { username } = req.body;
//   return deleteUserModel(username)
//     .then((user) => {
//       res.status(200).send({ user });
//     })
//     .catch((err) => {
//       console.log(err);
//       next(err);
//     });
// };
var getUser = function (req, res, next) {
    var username = req.params.username;
    return (0, users_model_1.selectUser)(username).then(function (user) {
        res.status(200).send({ user: user });
    });
};
exports.getUser = getUser;
