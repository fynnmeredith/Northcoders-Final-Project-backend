"use strict";
exports.__esModule = true;
exports.getUser = exports.patchUser = exports.postUser = exports.getUsers = void 0;
var users_model_1 = require("../models/users.model");
var jvfuncs_1 = require("../utils/jvfuncs");
var getUsers = function (req, res, next) {
    return (0, users_model_1.selectUsers)().then(function (users) {
        res.status(200).send({ users: users });
    });
};
exports.getUsers = getUsers;
var postUser = function (req, res, next) {
    var _a = req.body, username = _a.username, profile = _a.profile;
    if (username.length === 0) {
        throw { status: 400, message: "Bad request, please submit a username" };
    }
    if (username.length > 12) {
        throw {
            status: 406,
            message: "Bad request, please submit a shorter username"
        };
    }
    return (0, users_model_1.insertUser)(username, profile)
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
    var _a = req.body, username = _a.username, profile = _a.profile;
    console.log(username, profile);
    if (!username) {
        next({
            status: 400,
            message: "Bad request"
        });
    }
    if ((0, jvfuncs_1.requestKeyCheck)(req.body, "profile") === false) {
        next({ status: 400, message: "Bad request" });
    }
    return (0, users_model_1.modifyUser)(username, profile)
        .then(function (user) {
        res.status(200).send({ user: user });
    })["catch"](function (err) {
        next(err);
    });
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
    console.log("CONTROLLER GET USER", username);
    return (0, users_model_1.selectUser)(username).then(function (user) {
        console.log("controller checkpoint", user);
        res.status(200).send({ user: user });
    });
};
exports.getUser = getUser;
