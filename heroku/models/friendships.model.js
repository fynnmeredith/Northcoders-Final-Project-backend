"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.selectFriendshipsByUser = exports.deleteFriendshipFrom = exports.insertFriendship = void 0;
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
        var res = __spreadArray(__spreadArray([], user1Res.rows, true), user2Res.rows, true);
        return res;
    });
};
exports.selectFriendshipsByUser = selectFriendshipsByUser;
