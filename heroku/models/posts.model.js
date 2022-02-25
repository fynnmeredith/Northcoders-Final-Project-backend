"use strict";
exports.__esModule = true;
exports.selectPostsByUserFriends = exports.selectPostsByUser = exports.removePost = exports.insertPost = void 0;
var connection_1 = require("../db/connection");
var insertPost = function (associated_data_type, associated_id, owner, datetime, message) {
    return connection_1.db
        .query("INSERT INTO posts (associated_data_type,associated_id,owner,datetime,message) VALUES ($1,$2,$3,$4,$5) RETURNING *;", [associated_data_type, associated_id, owner, datetime, message])
        .then(function (res) {
        console.log(res.rows);
        return res.rows;
    });
};
exports.insertPost = insertPost;
// TBC
var removePost = function (post_id) {
    return connection_1.db
        .query("DELETE FROM posts WHERE post_id=($1) RETURNING *;", [post_id])
        .then(function (res) {
        console.log(res);
        return res;
    });
};
exports.removePost = removePost;
var selectPostsByUser = function (owner) {
    return connection_1.db
        .query("SELECT * FROM posts WHERE owner=($1) ORDER BY datetime DESC;", [
        owner,
    ])
        .then(function (res) {
        console.log("MODEL CHECKPOINT", res.rows);
        return res.rows;
    });
};
exports.selectPostsByUser = selectPostsByUser;
// TBC
var selectPostsByUserFriends = function () {
    return connection_1.db.query("").then(function (res) {
        return res;
    });
};
exports.selectPostsByUserFriends = selectPostsByUserFriends;
