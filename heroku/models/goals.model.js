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
exports.selectGoalsByUser = exports.updateGoalProgress = exports.updateGoalStatus = exports.updateGoalDetails = exports.selectGoalByGoalId = exports.deleteGoalFrom = exports.insertGoal = void 0;
var connection_1 = require("../db/connection");
var format_1 = require("../utils/format");
var insertGoal = function (objective, description, start_date, end_date, owner, target_value, unit) {
    var status = "active";
    var type = "boolean";
    var progress;
    if (target_value) {
        type = "progress";
        progress = JSON.stringify([[]]);
    }
    var query = "INSERT INTO goals\n      (objective, description, start_date, end_date, type, status, owner, target_value, unit, progress)\n      VALUES\n      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)\n      RETURNING *;\n    ";
    var values = [
        objective,
        description,
        (0, format_1.formatDate)(start_date),
        (0, format_1.formatDate)(end_date),
        type,
        status,
        owner,
        target_value,
        unit,
        progress,
    ];
    return connection_1.db.query(query, values).then(function (res) {
        return res.rows[0];
    });
};
exports.insertGoal = insertGoal;
var deleteGoalFrom = function (goal_id) {
    return connection_1.db.query("DELETE FROM goals\n      WHERE goal_id = $1;", [goal_id]);
};
exports.deleteGoalFrom = deleteGoalFrom;
var selectGoalByGoalId = function (goal_id) {
    return connection_1.db
        .query("SELECT * FROM goals\n        WHERE goal_id = $1;", [goal_id])
        .then(function (res) {
        if (res.rows.length === 0) {
            return Promise.reject({ status: 404, message: "Goal not found" });
        }
        return res.rows[0];
    });
};
exports.selectGoalByGoalId = selectGoalByGoalId;
var updateGoalDetails = function () { };
exports.updateGoalDetails = updateGoalDetails;
var updateGoalStatus = function (goal_id, status, finish_date) {
    return connection_1.db
        .query("UPDATE goals\n  SET status = $1,\n  finish_date = $2\n  WHERE goal_id = $3\n  RETURNING *;", [status, finish_date, goal_id])
        .then(function (res) {
        return res.rows[0];
    });
};
exports.updateGoalStatus = updateGoalStatus;
var updateGoalProgress = function (goal_id, date, value, oldProgress, targetValue) {
    var latestValue = oldProgress[oldProgress.length - 1][1];
    var newValue = latestValue + value;
    var newProgress = oldProgress.map(function (progressPoint) {
        return __spreadArray([], progressPoint, true);
    });
    newProgress.push([new Date(date), newValue]);
    var newProgressJson = JSON.stringify(newProgress);
    return connection_1.db
        .query("UPDATE goals\n      SET progress = $1\n      WHERE goal_id = $2\n      RETURNING *;", [newProgressJson, goal_id])
        .then(function (res) {
        return res.rows[0];
    });
};
exports.updateGoalProgress = updateGoalProgress;
var selectGoalsByUser = function (username, fromDate, toDate) {
    var dateLine;
    if (fromDate && !toDate) {
        dateLine = " AND end_date >= '".concat((0, format_1.formatDate)(fromDate), "'::date");
    }
    else if (toDate && !fromDate) {
        dateLine = " AND start_date <= '".concat((0, format_1.formatDate)(toDate), "'::date");
    }
    else if (toDate && fromDate) {
        dateLine = " AND end_date >= '".concat((0, format_1.formatDate)(fromDate), "'::date AND start_date <= '").concat((0, format_1.formatDate)(toDate), "'::date");
    }
    return connection_1.db
        .query("SELECT * FROM goals\n      WHERE owner = $1\n      ".concat(dateLine ? dateLine : "", ";"), [username])
        .then(function (res) {
        return res.rows;
    });
};
exports.selectGoalsByUser = selectGoalsByUser;
