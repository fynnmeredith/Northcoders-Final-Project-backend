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
exports.selectSubgoalsByUser = exports.selectSubgoalsByGoalId = exports.updateSubgoalProgress = exports.updateSubgoalStatus = exports.updateSubgoalDetails = exports.selectSubgoalBySubgoalId = exports.deleteSubgoalFrom = exports.insertSubgoal = void 0;
var connection_1 = require("../db/connection");
var format_1 = require("../utils/format");
var insertSubgoal = function (goal_id, objective, start_date, end_date, owner, target_value, unit) {
    var status = "active";
    var type = "boolean";
    var progress;
    if (target_value) {
        type = "progress";
        progress = JSON.stringify([[]]);
    }
    var query = "INSERT INTO subgoals\n        (goal_id, objective, start_date, end_date, type, status, owner, target_value, unit, progress)\n        VALUES\n        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)\n        RETURNING *;\n      ";
    var values = [
        goal_id,
        objective,
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
exports.insertSubgoal = insertSubgoal;
var deleteSubgoalFrom = function (subgoal_id) {
    return connection_1.db.query("DELETE FROM subgoals\n      WHERE subgoal_id = $1;", [subgoal_id]);
};
exports.deleteSubgoalFrom = deleteSubgoalFrom;
var selectSubgoalBySubgoalId = function (subgoal_id) {
    return connection_1.db
        .query("SELECT * FROM subgoals\n        WHERE subgoal_id = $1;", [subgoal_id])
        .then(function (res) {
        if (res.rows.length === 0) {
            throw { status: 404, message: "Subgoal not found" };
        }
        return res.rows[0];
    });
};
exports.selectSubgoalBySubgoalId = selectSubgoalBySubgoalId;
var updateSubgoalDetails = function () { };
exports.updateSubgoalDetails = updateSubgoalDetails;
var updateSubgoalStatus = function (subgoal_id, status, finish_date) {
    return connection_1.db
        .query("UPDATE subgoals\n  SET status = $1,\n  finish_date = $2\n  WHERE subgoal_id = $3\n  RETURNING *;", [status, finish_date, subgoal_id])
        .then(function (res) {
        return res.rows[0];
    });
};
exports.updateSubgoalStatus = updateSubgoalStatus;
var updateSubgoalProgress = function (subgoal_id, date, value, oldProgress, targetValue) {
    var latestValue = oldProgress[oldProgress.length - 1][1];
    var newValue = latestValue + value;
    var newProgress = oldProgress.map(function (progressPoint) {
        return __spreadArray([], progressPoint, true);
    });
    newProgress.push([new Date(date), newValue]);
    var newProgressJson = JSON.stringify(newProgress);
    return connection_1.db
        .query("UPDATE subgoals\n      SET progress = $1\n      WHERE subgoal_id = $2\n      RETURNING *;", [newProgressJson, subgoal_id])
        .then(function (res) {
        return res.rows[0];
    });
};
exports.updateSubgoalProgress = updateSubgoalProgress;
var selectSubgoalsByGoalId = function (goal_id) {
    return connection_1.db
        .query("SELECT * FROM subgoals\n      WHERE goal_id = $1;", [goal_id])
        .then(function (res) {
        return res.rows;
    });
};
exports.selectSubgoalsByGoalId = selectSubgoalsByGoalId;
var selectSubgoalsByUser = function (username, fromDate, toDate) {
    var dateLineProgress;
    var dateLineBoolean;
    if (fromDate && !toDate) {
        dateLineProgress = " AND end_date >= '".concat((0, format_1.formatDate)(fromDate), "'::date");
        dateLineBoolean = " AND end_date >= '".concat((0, format_1.formatDate)(fromDate), "'::date");
    }
    else if (toDate && !fromDate) {
        dateLineProgress = " AND start_date <= '".concat((0, format_1.formatDate)(toDate), "'::date");
        dateLineBoolean = " AND end_date <= '".concat((0, format_1.formatDate)(toDate), "'::date");
    }
    else if (toDate && fromDate) {
        dateLineProgress = " AND end_date >= '".concat((0, format_1.formatDate)(fromDate), "'::date AND start_date <= '").concat((0, format_1.formatDate)(toDate), "'::date");
        dateLineBoolean = " AND end_date >= '".concat((0, format_1.formatDate)(fromDate), "'::date AND end_date <= '").concat((0, format_1.formatDate)(toDate), "'::date");
    }
    var progressQuery = connection_1.db.query("SELECT * FROM subgoals\n      WHERE owner = $1\n      AND type = 'progress'\n      ".concat(dateLineProgress ? dateLineProgress : "", ";"), [username]);
    var booleanQuery = connection_1.db.query("SELECT * FROM subgoals\n      WHERE owner = $1\n      AND type = 'boolean'\n      ".concat(dateLineBoolean ? dateLineBoolean : "", ";"), [username]);
    return Promise.all([progressQuery, booleanQuery]).then(function (_a) {
        var progressResponse = _a[0], booleanResponse = _a[1];
        var res = __spreadArray(__spreadArray([], progressResponse.rows, true), booleanResponse.rows, true);
        return res;
    });
};
exports.selectSubgoalsByUser = selectSubgoalsByUser;
