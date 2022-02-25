"use strict";
exports.__esModule = true;
exports.deleteComment = exports.postComment = exports.getComments = void 0;
var comments_model_1 = require("../models/comments.model");
var checkExists_1 = require("../utils/checkExists");
var misc_1 = require("../utils/misc");
var getComments = function (req, res, next) {
    var post_id = req.params.post_id;
    return (0, checkExists_1.checkPostExists)(post_id)
        .then(function (postExists) {
        if (postExists === false) {
            return Promise.reject({ status: 400, message: "Bad request" });
        }
    })
        .then(function () {
        return (0, comments_model_1.selectComments)(post_id).then(function (comments) {
            res.status(200).send({ comments: comments });
        });
    })["catch"](next);
};
exports.getComments = getComments;
var postComment = function (req, res, next) {
    var post_id = req.params.post_id;
    var _a = req.body, message = _a.message, owner = _a.owner, datetime = _a.datetime;
    if ((0, misc_1.requestKeyCheck)(req.body, "message", "owner", "datetime") === false) {
        throw { status: 400, message: "Bad request" };
    }
    else {
        return (0, checkExists_1.checkUserExists)(owner)
            .then(function (res) {
            if (res === false) {
                return Promise.reject({ status: 400, message: "Bad request" });
            }
        })
            .then(function () {
            (0, comments_model_1.insertComment)(post_id, message, owner, datetime).then(function (comment) {
                res.status(200).send({ comment: comment });
            });
        })["catch"](next);
    }
};
exports.postComment = postComment;
var deleteComment = function (req, res, next) {
    var comment_id = req.params.comment_id;
    return (0, checkExists_1.checkCommentExists)(comment_id)
        .then(function (commentExists) {
        if (commentExists === false) {
            return Promise.reject({ status: 400, message: "Bad request" });
        }
    })
        .then(function () {
        return (0, comments_model_1.deleteCommentFromPost)(comment_id).then(function (comment) {
            res.status(200).send({ comment: comment });
        });
    })["catch"](next);
};
exports.deleteComment = deleteComment;
