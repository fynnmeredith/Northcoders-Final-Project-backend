"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.seed = void 0;
var connection_1 = require("../connection");
var pg_format_1 = __importDefault(require("pg-format"));
var format_1 = require("../../utils/format");
var seed = function (data) {
    var userData = data.userData, goalData = data.goalData, subgoalData = data.subgoalData, postData = data.postData, commentData = data.commentData, reactionData = data.reactionData, friendshipData = data.friendshipData;
    return connection_1.db
        .query("DROP TABLE IF EXISTS friendships;")
        .then(function () {
        return connection_1.db.query("DROP TABLE IF EXISTS reactions;");
    })
        .then(function () {
        return connection_1.db.query("DROP TABLE IF EXISTS comments;");
    })
        .then(function () {
        return connection_1.db.query("DROP TABLE IF EXISTS posts;");
    })
        .then(function () {
        return connection_1.db.query("DROP TABLE IF EXISTS subgoals;");
    })
        .then(function () {
        return connection_1.db.query("DROP TABLE IF EXISTS goals;");
    })
        .then(function () {
        return connection_1.db.query("DROP TABLE IF EXISTS users;");
    })
        .then(function () {
        return connection_1.db.query("\n      CREATE TABLE users (\n        username VARCHAR(25) PRIMARY KEY,\n        profile VARCHAR(300),\n        avatar_url VARCHAR(500)\n      );");
    })
        .then(function () {
        return connection_1.db.query("\n      CREATE TABLE goals (\n        goal_id SERIAL PRIMARY KEY,\n        objective VARCHAR(200) NOT NULL,\n        description VARCHAR(500) NOT NULL,\n        start_date DATE,\n        end_date DATE NOT NULL,\n        type VARCHAR(15) NOT NULL,\n        status VARCHAR(15) NOT NULL,\n        owner VARCHAR(25) NOT NULL,\n        target_value DECIMAL,\n        unit VARCHAR(15),\n        progress JSONB,\n        finish_date DATE,\n        FOREIGN KEY (owner)\n        REFERENCES users(username)\n      );");
    })
        .then(function () {
        return connection_1.db.query("\n      CREATE TABLE subgoals (\n        subgoal_id SERIAL PRIMARY KEY,\n        goal_id INTEGER NOT NULL,\n        objective VARCHAR(200) NOT NULL,\n        start_date DATE,\n        end_date DATE NOT NULL,\n        type VARCHAR(15) NOT NULL,\n        status VARCHAR(15) NOT NULL,\n        owner VARCHAR(25) NOT NULL,\n        target_value DECIMAL,\n        unit VARCHAR(15),\n        progress JSONB,\n        finish_date DATE,\n        FOREIGN KEY (owner)\n        REFERENCES users(username),\n        FOREIGN KEY (goal_id)\n        REFERENCES goals(goal_id)\n      );");
    })
        .then(function () {
        return connection_1.db.query("\n      CREATE TABLE posts (\n        post_id SERIAL PRIMARY KEY,\n        associated_data_type VARCHAR(10) NOT NULL,\n        associated_id INTEGER NOT NULL,\n        owner VARCHAR(25) NOT NULL,\n        datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n        message VARCHAR(2000),\n        FOREIGN KEY (owner)\n        REFERENCES users(username)\n      );");
    })
        .then(function () {
        return connection_1.db.query("\n      CREATE TABLE comments (\n        comment_id SERIAL PRIMARY KEY,\n        post_id INTEGER NOT NULL,\n        owner VARCHAR(25) NOT NULL,\n        message VARCHAR(1000) NOT NULL,\n        datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (post_id)\n        REFERENCES posts(post_id),\n        FOREIGN KEY (owner)\n        REFERENCES users(username)\n      );");
    })
        .then(function () {
        return connection_1.db.query("\n      CREATE TABLE reactions (\n        reaction_id SERIAL PRIMARY KEY,\n        post_id INTEGER NOT NULL,\n        owner VARCHAR(25) NOT NULL,\n        reaction VARCHAR(25) NOT NULL,\n        FOREIGN KEY (post_id)\n        REFERENCES posts(post_id),\n        FOREIGN KEY (owner)\n        REFERENCES users(username)\n      );");
    })
        .then(function () {
        return connection_1.db.query("\n      CREATE TABLE friendships (\n        friendship_id SERIAL PRIMARY KEY,\n        user_1 VARCHAR(25) NOT NULL,\n        user_2 VARCHAR(25) NOT NULL\n      );");
    })
        .then(function () {
        var query = (0, pg_format_1["default"])("INSERT INTO users\n          (username, profile, avatar_url)\n          VALUES\n          %L;", (0, format_1.formatUsers)(userData));
        return connection_1.db.query(query);
    })
        .then(function () {
        var query = (0, pg_format_1["default"])("INSERT INTO goals\n          (objective, description, start_date, end_date, type, status, owner, target_value, unit, progress, finish_date)\n          VALUES\n          %L;", (0, format_1.formatGoals)(goalData));
        return connection_1.db.query(query);
    })
        .then(function () {
        var query = (0, pg_format_1["default"])("INSERT INTO subgoals\n          (goal_id, objective, start_date, end_date, type, status, owner, target_value, unit, progress, finish_date)\n          VALUES\n          %L;", (0, format_1.formatSubgoals)(subgoalData));
        return connection_1.db.query(query);
    })
        .then(function () {
        var query = (0, pg_format_1["default"])("INSERT INTO posts\n          (associated_data_type, associated_id, owner, datetime, message)\n          VALUES\n          %L;", (0, format_1.formatPosts)(postData));
        return connection_1.db.query(query);
    })
        .then(function () {
        var query = (0, pg_format_1["default"])("INSERT INTO comments\n          (post_id, owner, message, datetime)\n          VALUES\n          %L;", (0, format_1.formatComments)(commentData));
        return connection_1.db.query(query);
    })
        .then(function () {
        var query = (0, pg_format_1["default"])("INSERT INTO reactions\n          (post_id, owner, reaction)\n          VALUES\n          %L;", (0, format_1.formatReactions)(reactionData));
        return connection_1.db.query(query);
    })
        .then(function () {
        var query = (0, pg_format_1["default"])("INSERT INTO friendships\n          (user_1, user_2)\n          VALUES\n          %L;", (0, format_1.formatFriendships)(friendshipData));
        return connection_1.db.query(query);
    });
};
exports.seed = seed;
