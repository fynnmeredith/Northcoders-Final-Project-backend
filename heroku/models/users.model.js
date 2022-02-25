"use strict";
exports.__esModule = true;
exports.selectUser = exports.modifyUser = exports.insertUser = exports.selectUsers = void 0;
var connection_1 = require("../db/connection");
var selectUsers = function (searchTerm) {
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
            .query("SELECT * FROM users WHERE username LIKE '%".concat(searchTerm, "%';"))
            .then(function (res) {
            return res.rows;
        })["catch"](function (err) {
            console.log(err);
            return err;
        });
    }
};
exports.selectUsers = selectUsers;
var insertUser = function (username, profile, avatar_url) {
    return connection_1.db
        .query("INSERT INTO users (username,profile,avatar_url) VALUES ($1,$2,$3) RETURNING *", [username, profile, avatar_url])
        .then(function (res) {
        // console.log(res.rows);
        return res.rows;
    });
};
exports.insertUser = insertUser;
var modifyUser = function (username, profile, avatar_url) {
    console.log("MODEL CHECKPOINT", username, profile, avatar_url);
    return connection_1.db
        .query("UPDATE users SET profile = ($2), avatar_url=($3) WHERE  username =($1) RETURNING *;", [username, profile, avatar_url])
        .then(function (res) {
        return res.rows;
    });
};
exports.modifyUser = modifyUser;
//TBC
// export const deleteUserModel = (username) => {
//   return db
//     .query(`DELETE FROM users WHERE username=($1) RETURNING *;`, [username])
//     .then((res) => {
//       return res.rows;
//     });
// };
var selectUser = function (username) {
    return connection_1.db
        .query("SELECT username, profile FROM users WHERE username=($1)", [
        username,
    ])
        .then(function (res) {
        return res.rows;
    });
};
exports.selectUser = selectUser;
