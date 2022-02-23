"use strict";
exports.__esModule = true;
exports.selectGoalsByUser = exports.updateGoalProgress = exports.updateGoalDetails = exports.selectGoalByGoalId = exports.deleteGoalFrom = exports.insertGoal = void 0;
var connection_1 = require("../db/connection");
var insertGoal = function () { };
exports.insertGoal = insertGoal;
var deleteGoalFrom = function () { };
exports.deleteGoalFrom = deleteGoalFrom;
var selectGoalByGoalId = function (goal_id) {
    return connection_1.db
        .query("SELECT * FROM goals\n    WHERE goal_id = ".concat(goal_id, ";"))
        .then(function (res) {
        if (res.rows.length === 0) {
            throw { status: 404, message: "Goal not found" };
        }
        return res.rows[0];
    });
};
exports.selectGoalByGoalId = selectGoalByGoalId;
var updateGoalDetails = function () { };
exports.updateGoalDetails = updateGoalDetails;
var updateGoalProgress = function () { };
exports.updateGoalProgress = updateGoalProgress;
var selectGoalsByUser = function () { };
exports.selectGoalsByUser = selectGoalsByUser;
