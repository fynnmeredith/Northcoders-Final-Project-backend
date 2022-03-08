"use strict";
exports.__esModule = true;
var connection_1 = require("../db/connection");
exports.insertPost = function (associated_data_type, associated_id, owner, datetime, message, progress_point) {
    return connection_1.db
        .query("INSERT INTO posts (associated_data_type,associated_id,owner,datetime,message, progress_point) VALUES ($1,$2,$3,$4,$5, $6) RETURNING *;", [
        associated_data_type,
        associated_id,
        owner,
        datetime,
        message,
        progress_point,
    ])
        .then(function (res) {
        return res.rows;
    });
};
exports.selectPostsByUser = function (owner) {
    return connection_1.db
        .query("SELECT * FROM posts WHERE owner=($1) ORDER BY datetime DESC;", [
        owner,
    ])
        .then(function (res) {
        return res.rows;
    });
};
