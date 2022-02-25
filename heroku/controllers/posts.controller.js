"use strict";
exports.__esModule = true;
exports.getPostsByUserFriends = exports.getPostsByUser = exports.deletePost = exports.postPost = void 0;
var posts_model_1 = require("../models/posts.model");
var checkExists_1 = require("../utils/checkExists");
var misc_1 = require("../utils/misc");
var postPost = function (req, res, next) {
    var _a = req.body, associated_data_type = _a.associated_data_type, associated_id = _a.associated_id, owner = _a.owner, datetime = _a.datetime, message = _a.message;
    console.log(req.body);
    return (0, checkExists_1.checkUserExists)(owner)
        .then(function (res) {
        console.log("YOOOO", res);
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
                return (0, checkExists_1.checkGoalExists)(associated_id)
                    .then(function (doesGoalExist) {
                    if (doesGoalExist === false) {
                        return Promise.reject({
                            status: 400,
                            message: "Bad request"
                        });
                    }
                })["catch"](next);
            case "subgoal":
                return (0, checkExists_1.checkSubgoalExists)(associated_id)
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
        if ((0, misc_1.requestKeyCheck)(req.body, "associated_data_type", "associated_id", "owner") === false) {
            throw {
                status: 400,
                message: "Bad request"
            };
        }
    })
        .then(function () {
        return (0, posts_model_1.insertPost)(associated_data_type, associated_id, owner, datetime, message);
    })
        .then(function (post) {
        console.log(post);
        res.status(200).send({ post: post });
    })["catch"](function (err) {
        console.log(err);
        next(err);
    });
};
exports.postPost = postPost;
// TBC
var deletePost = function (req, res, next) {
    var post_id = req.body.post_id;
    return (0, posts_model_1.removePost)(post_id)
        .then(function (post) {
        console.log(post);
        res.status(200).send({ post: post });
    })["catch"](function (err) {
        console.log(err);
        next(err);
    });
};
exports.deletePost = deletePost;
var getPostsByUser = function (req, res, next) {
    var username = req.params.username;
    console.log("USERNAME PARAM CHECK", username);
    return (0, checkExists_1.checkUserExists)(username)
        .then(function (res) {
        if (res === false) {
            throw {
                status: 400,
                message: "Bad request"
            };
        }
    })
        .then(function () {
        return (0, posts_model_1.selectPostsByUser)(username);
    })
        .then(function (posts) {
        // console.log(posts);
        res.status(200).send({ posts: posts });
    })["catch"](function (err) {
        console.log(err);
        next(err);
    });
};
exports.getPostsByUser = getPostsByUser;
// TBC
var getPostsByUserFriends = function (req, res, next) {
    // const { owner } = req.body;
    return (0, posts_model_1.selectPostsByUserFriends)()
        .then(function (posts) {
        console.log(posts);
        res.status(200).send({ posts: posts });
    })["catch"](function (err) {
        console.log(err);
        next(err);
    });
};
exports.getPostsByUserFriends = getPostsByUserFriends;
