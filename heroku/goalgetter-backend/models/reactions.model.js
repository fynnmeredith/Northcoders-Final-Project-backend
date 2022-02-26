"use strict";
exports.__esModule = true;
var connection_1 = require("../db/connection");
var insertReaction = function (post_id, owner, reaction) {
    return connection_1.db
        .query("INSERT INTO reactions\n    (post_id, owner, reaction)\n    VALUES\n    ($1, $2, $3)\n    RETURNING *;", [post_id, owner, reaction])
        .then(function (res) {
        return res.rows[0];
    });
};
exports.insertReaction = insertReaction;
var deleteReactionFrom = function (reaction_id) {
    return connection_1.db.query("DELETE FROM reactions\n        WHERE reaction_id = $1;", [reaction_id]);
};
exports.deleteReactionFrom = deleteReactionFrom;
var selectReactionsByPost = function (post_id) {
    return connection_1.db
        .query("SELECT * FROM reactions \n        WHERE post_id = $1", [post_id])
        .then(function (res) {
        return res.rows;
    });
};
exports.selectReactionsByPost = selectReactionsByPost;
