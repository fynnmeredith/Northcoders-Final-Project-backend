"use strict";
exports.__esModule = true;
var goals_model_1 = require("../models/goals.model");
var checkExists_1 = require("../utils/checkExists");
var postGoal = function (req, res, next) {
    var _a = req.body, objective = _a.objective, description = _a.description, start_date = _a.start_date, end_date = _a.end_date, owner = _a.owner, target_value = _a.target_value, unit = _a.unit;
    if (!objective || !start_date || !end_date || !owner) {
        next({ status: 400, message: "Bad request" });
    }
    else if (target_value && typeof target_value !== "number") {
        next({ status: 400, message: "Bad request" });
    }
    else if (!target_value && unit) {
        next({ status: 400, message: "Bad request" });
    }
    else if (new Date(start_date).toString() === "Invalid Date" ||
        new Date(end_date).toString() === "Invalid Date") {
        next({ status: 400, message: "Bad request" });
    }
    else {
        return checkExists_1.checkUserExists(owner)
            .then(function (doesUserExist) {
            if (!doesUserExist) {
                return Promise.reject({ status: 404, message: "User not found" });
            }
            return goals_model_1.insertGoal(objective, description, start_date, end_date, owner, target_value, unit);
        })
            .then(function (goal) {
            res.status(200).send({ goal: goal });
        })["catch"](next);
    }
};
exports.postGoal = postGoal;
var deleteGoal = function (req, res, next) {
    var goal_id = req.params.goal_id;
    if (!Number.isInteger(parseInt(goal_id))) {
        next({ status: 400, message: "Bad request" });
    }
    else {
        return checkExists_1.checkGoalExists(goal_id)
            .then(function (doesGoalExist) {
            if (!doesGoalExist) {
                return Promise.reject({ status: 404, message: "Goal not found" });
            }
            return goals_model_1.deleteGoalFrom(goal_id);
        })
            .then(function () {
            res.status(204).send();
        })["catch"](next);
    }
};
exports.deleteGoal = deleteGoal;
var getGoalByGoalId = function (req, res, next) {
    var goal_id = req.params.goal_id;
    if (!Number.isInteger(parseInt(goal_id))) {
        next({ status: 400, message: "Bad request" });
    }
    else {
        return goals_model_1.selectGoalByGoalId(goal_id)
            .then(function (goal) {
            res.status(200).send({ goal: goal });
        })["catch"](next);
    }
};
exports.getGoalByGoalId = getGoalByGoalId;
var patchGoalDetails = function (req, res, next) { };
exports.patchGoalDetails = patchGoalDetails;
var patchGoalStatus = function (req, res, next) {
    var goal_id = req.params.goal_id;
    var _a = req.body, status = _a.status, date = _a.date;
    if (!Number.isInteger(parseInt(goal_id))) {
        next({ status: 400, message: "Bad request" });
    }
    else if (status !== "completed" && status !== "active") {
        next({ status: 400, message: "Bad request" });
    }
    else if (status === "completed" &&
        new Date(date).toString() === "Invalid Date") {
        next({ status: 400, message: "Bad request" });
    }
    else {
        return checkExists_1.checkGoalExists(goal_id)
            .then(function (doesGoalExist) {
            if (!doesGoalExist) {
                return Promise.reject({ status: 404, message: "Goal not found" });
            }
            return goals_model_1.updateGoalStatus(goal_id, status, date);
        })
            .then(function (goal) {
            res.status(200).send({ goal: goal });
        })["catch"](next);
    }
};
exports.patchGoalStatus = patchGoalStatus;
var patchGoalProgress = function (req, res, next) {
    var goal_id = req.params.goal_id;
    var _a = req.body, date = _a.date, value = _a.value;
    if (!date || !value) {
        next({ status: 400, message: "Bad request" });
    }
    else if (isNaN(parseInt(value)) || !Number.isInteger(parseInt(goal_id))) {
        next({ status: 400, message: "Bad request" });
    }
    else if (new Date(date).toString() === "Invalid Date") {
        next({ status: 400, message: "Bad request" });
    }
    else {
        return goals_model_1.selectGoalByGoalId(goal_id)
            .then(function (goal) {
            if (goal.type === "boolean") {
                return Promise.reject({
                    status: 400,
                    message: "Progress cannot be added to 'boolean' type goal"
                });
            }
            if (new Date(date) < new Date(goal.start_date) ||
                new Date(date) > new Date(goal.end_date)) {
                return Promise.reject({
                    status: 400,
                    message: "Cannot add progress outside of date range of goal"
                });
            }
            return goals_model_1.updateGoalProgress(goal_id, date, value, goal.progress, goal.target_value);
        })
            .then(function (goal) {
            res.status(200).send({ goal: goal });
        })["catch"](next);
    }
};
exports.patchGoalProgress = patchGoalProgress;
var getGoalsByUser = function (req, res, next) {
    var username = req.params.username;
    var _a = req.query, from_date = _a.from_date, to_date = _a.to_date;
    if (from_date && !/\d{4}-\d{2}-\d{2}/.test(from_date)) {
        next({ status: 400, message: "Bad request" });
    }
    else if (to_date && !/\d{4}-\d{2}-\d{2}/.test(to_date)) {
        next({ status: 400, message: "Bad request" });
    }
    else {
        var formattedFromDate_1;
        var formattedToDate_1;
        if (from_date) {
            var fromDateYear = parseInt(from_date.substring(0, 4));
            var fromDateMonth = parseInt(from_date.substring(5, 7)) - 1;
            var fromDateDate = parseInt(from_date.substring(8, 10));
            formattedFromDate_1 = new Date(fromDateYear, fromDateMonth, fromDateDate);
        }
        if (to_date) {
            var toDateYear = parseInt(to_date.substring(0, 4));
            var toDateMonth = parseInt(to_date.substring(5, 7)) - 1;
            var toDateDate = parseInt(to_date.substring(8, 10));
            formattedToDate_1 = new Date(toDateYear, toDateMonth, toDateDate);
        }
        if (formattedToDate_1 &&
            formattedFromDate_1 &&
            formattedToDate_1.getTime() < formattedFromDate_1.getTime()) {
            next({
                status: 400,
                message: "to_date must be equal to or later than from_date"
            });
        }
        else if ((formattedFromDate_1 && formattedFromDate_1.toString() === "Invalid Date") ||
            (formattedToDate_1 && formattedToDate_1.toString() === "Invalid Date")) {
            next({ status: 400, message: "Bad request" });
        }
        else {
            return checkExists_1.checkUserExists(username)
                .then(function (doesUserExist) {
                if (!doesUserExist) {
                    return Promise.reject({ status: 404, message: "User not found" });
                }
                return goals_model_1.selectGoalsByUser(username, formattedFromDate_1, formattedToDate_1);
            })
                .then(function (goals) {
                res.status(200).send({ goals: goals });
            })["catch"](next);
        }
    }
};
exports.getGoalsByUser = getGoalsByUser;
