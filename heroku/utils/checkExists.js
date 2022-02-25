"use strict";
exports.__esModule = true;
exports.checkIfUsersAreFriends = exports.checkReactionExists = exports.checkFriendshipExists = exports.checkCommentExists = exports.checkPostExists = exports.checkSubgoalExists = exports.checkUserExists = exports.checkGoalExists = void 0;
var connection_1 = require("../db/connection");
var checkGoalExists = function (goal_id) {
    return connection_1.db
        .query("SELECT * FROM goals\n    WHERE goal_id = $1;", [goal_id])
        .then(function (res) {
        return res.rows.length === 1;
    });
};
exports.checkGoalExists = checkGoalExists;
var checkUserExists = function (username) {
    return connection_1.db
        .query("SELECT * FROM users\n    WHERE username = $1;", [username])
        .then(function (res) {
        return res.rows.length === 1;
    });
};
exports.checkUserExists = checkUserExists;
var checkSubgoalExists = function (subgoal_id) {
    return connection_1.db
        .query("SELECT * FROM subgoals\n  WHERE subgoal_id = $1;", [subgoal_id])
        .then(function (res) {
        return res.rows.length === 1;
    });
};
exports.checkSubgoalExists = checkSubgoalExists;
var checkPostExists = function (post_id) {
    return connection_1.db
        .query("SELECT * FROM posts\n  WHERE post_id = $1;", [post_id])
        .then(function (res) {
        return res.rows.length === 1;
    });
};
exports.checkPostExists = checkPostExists;
var checkCommentExists = function (comment_id) {
    return connection_1.db
        .query("SELECT * FROM comments\n  WHERE comment_id = $1;", [comment_id])
        .then(function (res) {
        return res.rows.length === 1;
    });
};
exports.checkCommentExists = checkCommentExists;
var checkFriendshipExists = function (friendship_id) {
    return connection_1.db
        .query("SELECT * FROM friendships\n  WHERE friendship_id = $1;", [friendship_id])
        .then(function (res) {
        return res.rows.length === 1;
    });
};
exports.checkFriendshipExists = checkFriendshipExists;
var checkReactionExists = function (reaction_id) {
    return connection_1.db
        .query("SELECT * FROM friendships\n  WHERE friendship_id = $1;", [reaction_id])
        .then(function (res) {
        return res.rows.length === 1;
    });
};
exports.checkReactionExists = checkReactionExists;
var checkIfUsersAreFriends = function (user_1, user_2) {
    var user1FriendshipPromise = connection_1.db.query("SELECT * FROM friendships\n      WHERE user_1 = $1\n      AND user_2 = $2;", [user_1, user_2]);
    var user2FriendshipPromise = connection_1.db.query("SELECT * FROM friendships\n      WHERE user_1 = $1\n      AND user_2 = $2;", [user_2, user_1]);
    return Promise.all([user1FriendshipPromise, user2FriendshipPromise]).then(function (_a) {
        var user1Res = _a[0], user2Res = _a[1];
        return user1Res.rows.length + user2Res.rows.length > 0;
    });
};
exports.checkIfUsersAreFriends = checkIfUsersAreFriends;
