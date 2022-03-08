"use strict";
exports.__esModule = true;
var connection_1 = require("../db/connection");
exports.selectUsers = function (searchTerm) {
    if (!searchTerm) {
        return connection_1.db
            .query("SELECT * FROM users;")
            .then(function (res) {
            return res.rows;
        })["catch"](function (err) {
            return err;
        });
    }
    else {
        return connection_1.db
            .query("SELECT * FROM users WHERE username LIKE '%" + searchTerm + "%';")
            .then(function (res) {
            return res.rows;
        })["catch"](function (err) {
            return err;
        });
    }
};
exports.insertUser = function (username, profile, avatar_url) {
    return connection_1.db
        .query("INSERT INTO users (username,profile,avatar_url) VALUES ($1,$2,$3) RETURNING *", [username, profile, avatar_url])
        .then(function (res) {
        return res.rows;
    });
};
exports.modifyUser = function (username, profile, avatar_url) {
    return connection_1.db
        .query("UPDATE users SET profile = ($2), avatar_url=($3) WHERE  username =($1) RETURNING *;", [username, profile, avatar_url])
        .then(function (res) {
        return res.rows;
    });
};
exports.selectUser = function (username) {
    return connection_1.db
        .query("SELECT * FROM users WHERE username=($1)", [username])
        .then(function (res) {
        return res.rows;
    });
};
