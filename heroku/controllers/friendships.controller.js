"use strict";
exports.__esModule = true;
exports.getFriendshipsbyUser = exports.deleteFriendship = exports.postFriendship = void 0;
var friendships_model_1 = require("../models/friendships.model");
var checkExists_1 = require("../utils/checkExists");
var postFriendship = function (req, res, next) {
    var _a = req.body, user_1 = _a.user_1, user_2 = _a.user_2;
    if (!user_1 || !user_2) {
        next({ status: 400, message: "Bad request" });
    }
    else if (user_1 === user_2) {
        next({ status: 400, message: "User cannot befriend themselves" });
    }
    else {
        return (0, checkExists_1.checkUserExists)(user_1)
            .then(function (doesUser1Exist) {
            if (!doesUser1Exist) {
                return Promise.reject({ status: 404, message: "User 1 not found" });
            }
            return (0, checkExists_1.checkUserExists)(user_2);
        })
            .then(function (doesUser2Exist) {
            if (!doesUser2Exist) {
                return Promise.reject({ status: 404, message: "User 2 not found" });
            }
            return (0, checkExists_1.checkIfUsersAreFriends)(user_1, user_2);
        })
            .then(function (areUsersFriends) {
            if (areUsersFriends) {
                return Promise.reject({
                    status: 400,
                    message: "Users are already friends"
                });
            }
            return (0, friendships_model_1.insertFriendship)(user_1, user_2);
        })
            .then(function (friendship) {
            res.status(200).send({ friendship: friendship });
        })["catch"](next);
    }
};
exports.postFriendship = postFriendship;
var deleteFriendship = function (req, res, next) {
    var friendship_id = req.params.friendship_id;
    if (!Number.isInteger(parseInt(friendship_id))) {
        next({ status: 400, message: "Bad request" });
    }
    else {
        return (0, checkExists_1.checkFriendshipExists)(friendship_id)
            .then(function (doesFriendshipExist) {
            if (!doesFriendshipExist) {
                return Promise.reject({
                    status: 404,
                    message: "Friendship not found"
                });
            }
            return (0, friendships_model_1.deleteFriendshipFrom)(friendship_id);
        })
            .then(function () {
            res.status(204).send();
        })["catch"](next);
    }
};
exports.deleteFriendship = deleteFriendship;
var getFriendshipsbyUser = function (req, res, next) {
    var username = req.params.username;
    return (0, checkExists_1.checkUserExists)(username)
        .then(function (doesUserExist) {
        if (!doesUserExist) {
            return Promise.reject({ status: 404, message: "User not found" });
        }
        return (0, friendships_model_1.selectFriendshipsByUser)(username);
    })
        .then(function (friendships) {
        res.status(200).send({ friendships: friendships });
    })["catch"](next);
};
exports.getFriendshipsbyUser = getFriendshipsbyUser;
