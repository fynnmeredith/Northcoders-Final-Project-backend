"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var connection_1 = require("../db/connection");
var insertFriendship = function (user_1, user_2) {
    return connection_1.db
        .query("INSERT INTO friendships\n    (user_1, user_2)\n    VALUES\n    ($1, $2)\n    RETURNING *;", [user_1, user_2])
        .then(function (res) {
        return res.rows[0];
    });
};
exports.insertFriendship = insertFriendship;
var deleteFriendshipFrom = function (friendship_id) {
    return connection_1.db.query("DELETE FROM friendships\n        WHERE friendship_id = $1;", [friendship_id]);
};
exports.deleteFriendshipFrom = deleteFriendshipFrom;
var selectFriendshipsByUser = function (username) {
    var user1FriendshipPromise = connection_1.db.query("SELECT * FROM friendships \n        WHERE user_1 = $1", [username]);
    var user2FriendshipPromise = connection_1.db.query("SELECT * FROM friendships \n        WHERE user_2 = $1", [username]);
    return Promise.all([user1FriendshipPromise, user2FriendshipPromise]).then(function (_a) {
        var user1Res = _a[0], user2Res = _a[1];
        var res = __spreadArrays(user1Res.rows, user2Res.rows);
        return res;
    });
};
exports.selectFriendshipsByUser = selectFriendshipsByUser;
