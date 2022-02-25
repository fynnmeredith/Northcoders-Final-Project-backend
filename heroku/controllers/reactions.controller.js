"use strict";
exports.__esModule = true;
exports.getReactionsByPost = exports.deleteReaction = exports.postReaction = void 0;
var reactions_model_1 = require("../models/reactions.model");
var checkExists_1 = require("../utils/checkExists");
var postReaction = function (req, res, next) {
    var post_id = req.params.post_id;
    var _a = req.body, owner = _a.owner, reaction = _a.reaction;
    var validReactions = [
        "Congratulations!",
        "Awesome!",
        "Keep on going",
        "I'm proud of you",
    ];
    if (!owner || !reaction) {
        next({ status: 400, message: "Bad request" });
    }
    else if (!validReactions.includes(reaction)) {
        next({ status: 400, message: "Reaction not valid" });
    }
    else if (!Number.isInteger(parseInt(post_id))) {
        next({ status: 400, message: "Bad request" });
    }
    else {
        return (0, checkExists_1.checkPostExists)(post_id)
            .then(function (doesPostExist) {
            if (!doesPostExist) {
                return Promise.reject({ status: 404, message: "Post not found" });
            }
            return (0, checkExists_1.checkUserExists)(owner);
        })
            .then(function (doesUserExist) {
            if (!doesUserExist) {
                return Promise.reject({ status: 404, message: "User not found" });
            }
            return (0, checkExists_1.checkIfUserHasReacted)(post_id, owner);
        })
            .then(function (hasUserReacted) {
            if (hasUserReacted) {
                return Promise.reject({
                    status: 400,
                    message: "Cannot react to post user has already reacted to"
                });
            }
            return (0, reactions_model_1.insertReaction)(post_id, owner, reaction);
        })
            .then(function (reaction) {
            res.status(200).send({ reaction: reaction });
        })["catch"](next);
    }
};
exports.postReaction = postReaction;
var deleteReaction = function (req, res, next) {
    var reaction_id = req.params.reaction_id;
    if (!Number.isInteger(parseInt(reaction_id))) {
        next({ status: 400, message: "Bad request" });
    }
    else {
        return (0, checkExists_1.checkReactionExists)(reaction_id)
            .then(function (doesReactionExist) {
            if (!doesReactionExist) {
                return Promise.reject({
                    status: 404,
                    message: "Reaction not found"
                });
            }
            return (0, reactions_model_1.deleteReactionFrom)(reaction_id);
        })
            .then(function () {
            res.status(204).send();
        })["catch"](next);
    }
};
exports.deleteReaction = deleteReaction;
var getReactionsByPost = function (req, res, next) {
    var post_id = req.params.post_id;
    if (!Number.isInteger(parseInt(post_id))) {
        next({ status: 400, message: "Bad request" });
    }
    else {
        return (0, checkExists_1.checkPostExists)(post_id)
            .then(function (doesPostExist) {
            if (!doesPostExist) {
                return Promise.reject({ status: 404, message: "Post not found" });
            }
            return (0, reactions_model_1.selectReactionsByPost)(post_id);
        })
            .then(function (reactions) {
            res.status(200).send({ reactions: reactions });
        })["catch"](next);
    }
};
exports.getReactionsByPost = getReactionsByPost;
