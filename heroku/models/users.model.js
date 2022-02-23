"use strict";
exports.__esModule = true;
exports.selectUser = exports.modifyUser = exports.insertUser = exports.selectUsers = void 0;
var connection_1 = require("../db/connection");
var selectUsers = function () {
    return connection_1.db
        .query("SELECT * FROM users;")
        .then(function (res) {
        return res.rows;
    })["catch"](function (err) {
        return err;
    });
};
exports.selectUsers = selectUsers;
var insertUser = function (username, profile) {
    return connection_1.db
        .query("INSERT INTO users (username,profile) VALUES ($1,$2) RETURNING *", [
        username,
        profile,
    ])
        .then(function (res) {
        // console.log(res.rows);
        return res.rows;
    });
};
exports.insertUser = insertUser;
var modifyUser = function (username, profile) {
    return connection_1.db
        .query("UPDATE users SET profile = ($2) WHERE  username =($1) RETURNING *;", [username, profile])
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
        console.log("Model checkpoint", res.rows);
        return res.rows;
    });
};
exports.selectUser = selectUser;
