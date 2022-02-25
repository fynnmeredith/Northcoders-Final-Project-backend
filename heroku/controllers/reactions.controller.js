"use strict";
exports.__esModule = true;
exports.getReactionsByPost = exports.deleteReaction = exports.postReaction = void 0;
var reactions_model_1 = require("../models/reactions.model");
var checkExists_1 = require("../utils/checkExists");
var postReaction = function (req, res, next) {
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
            return (0, reactions_model_1.insertReaction)(user_1, user_2);
        })
            .then(function (reaction) {
            res.status(200).send({ reaction: reaction });
        })["catch"](next);
    }
};
exports.postReaction = postReaction;
var deleteReaction = function (req, res, next) {
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
            return (0, reactions_model_1.deleteReactionFrom)(friendship_id);
        })
            .then(function () {
            res.status(204).send();
        })["catch"](next);
    }
};
exports.deleteReaction = deleteReaction;
var getReactionsByPost = function (req, res, next) {
    var username = req.params.username;
    return (0, checkExists_1.checkUserExists)(username)
        .then(function (doesUserExist) {
        if (!doesUserExist) {
            return Promise.reject({ status: 404, message: "User not found" });
        }
        return (0, reactions_model_1.selectReactionsByPost)(username);
    })
        .then(function (reactions) {
        res.status(200).send({ reactions: reactions });
    })["catch"](next);
};
exports.getReactionsByPost = getReactionsByPost;
