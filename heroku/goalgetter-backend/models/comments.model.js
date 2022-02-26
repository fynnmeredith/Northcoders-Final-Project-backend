"use strict";
exports.__esModule = true;
var connection_1 = require("../db/connection");
exports.selectComments = function (post_id) {
    return connection_1.db
        .query("SELECT * FROM comments WHERE post_id=$1", [post_id])
        .then(function (res) {
        return res.rows;
    });
};
exports.insertComment = function (post_id, message, owner, datetime) {
    return connection_1.db
        .query("INSERT INTO comments (post_id,message,owner,datetime) VALUES ($1,$2,$3,$4) RETURNING *;", [post_id, message, owner, datetime])
        .then(function (res) {
        console.log(res.rows);
        return res.rows;
    });
};
exports.deleteCommentFromPost = function (comment_id) {
    return connection_1.db
        .query("DELETE FROM comments WHERE comment_id=($1) RETURNING *;", [
        comment_id,
    ])
        .then(function (res) {
        console.log(res.rows);
        return res.rows;
    });
};
