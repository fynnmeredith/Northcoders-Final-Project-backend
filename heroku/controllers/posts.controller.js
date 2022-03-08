"use strict";
exports.__esModule = true;
var posts_model_1 = require("../models/posts.model");
var checkExists_1 = require("../utils/checkExists");
var misc_1 = require("../utils/misc");
exports.postPost = function (req, res, next) {
    var _a = req.body, associated_data_type = _a.associated_data_type, associated_id = _a.associated_id, owner = _a.owner, datetime = _a.datetime, message = _a.message, progress_point = _a.progress_point;
    return checkExists_1.checkUserExists(owner)
        .then(function (res) {
        if (res === false) {
            throw {
                status: 400,
                message: "Bad request"
            };
        }
    })
        .then(function () {
        switch (associated_data_type) {
            case "goal":
                return checkExists_1.checkGoalExists(associated_id)
                    .then(function (doesGoalExist) {
                    if (doesGoalExist === false) {
                        return Promise.reject({
                            status: 400,
                            message: "Bad request"
                        });
                    }
                })["catch"](next);
            case "subgoal":
                return checkExists_1.checkSubgoalExists(associated_id)
                    .then(function (doesSubgoalExist) {
                    if (doesSubgoalExist === false) {
                        return Promise.reject({
                            status: 400,
                            message: "Bad request"
                        });
                    }
                })["catch"](next);
        }
    })
        .then(function () {
        if (misc_1.requestKeyCheck(req.body, "associated_data_type", "associated_id", "owner") === false) {
            throw {
                status: 400,
                message: "Bad request"
            };
        }
    })
        .then(function () {
        return posts_model_1.insertPost(associated_data_type, associated_id, owner, datetime, message, progress_point);
    })
        .then(function (post) {
        res.status(200).send({ post: post });
    })["catch"](function (err) {
        next(err);
    });
};
exports.getPostsByUser = function (req, res, next) {
    var username = req.params.username;
    return checkExists_1.checkUserExists(username)
        .then(function (res) {
        if (res === false) {
            throw {
                status: 400,
                message: "Bad request"
            };
        }
    })
        .then(function () {
        return posts_model_1.selectPostsByUser(username);
    })
        .then(function (posts) {
        res.status(200).send({ posts: posts });
    })["catch"](function (err) {
        next(err);
    });
};
