"use strict";
exports.__esModule = true;
exports.getSubgoalsByUser = exports.patchSubgoalProgress = exports.patchSubgoalStatus = exports.patchSubgoalDetails = exports.getSubgoalBySubgoalId = exports.deleteSubgoal = exports.getSubgoalsByGoalId = exports.postSubgoal = void 0;
var subgoals_model_1 = require("../models/subgoals.model");
var checkExists_1 = require("../utils/checkExists");
var postSubgoal = function (req, res, next) {
    var _a = req.body, objective = _a.objective, start_date = _a.start_date, end_date = _a.end_date, owner = _a.owner, target_value = _a.target_value, unit = _a.unit;
    var goal_id = req.params.goal_id;
    if (!objective || !end_date || !owner) {
        next({ status: 400, message: "Bad request" });
    }
    else if (target_value && typeof target_value !== "number") {
        next({ status: 400, message: "Bad request" });
    }
    else if (!target_value && unit) {
        next({ status: 400, message: "Bad request" });
    }
    else if (!target_value && start_date) {
        next({ status: 400, message: "Bad request" });
    }
    else if (!start_date && target_value) {
        next({ status: 400, message: "Bad request" });
    }
    else if (!Number.isInteger(parseInt(goal_id))) {
        next({ status: 400, message: "Bad request" });
    }
    else if ((start_date && new Date(start_date).toString() === "Invalid Date") ||
        new Date(end_date).toString() === "Invalid Date") {
        next({ status: 400, message: "Bad request" });
    }
    else {
        return (0, checkExists_1.checkUserExists)(owner)
            .then(function (doesUserExist) {
            if (!doesUserExist) {
                return Promise.reject({ status: 404, message: "User not found" });
            }
            return (0, checkExists_1.checkGoalExists)(goal_id);
        })
            .then(function (doesGoalExist) {
            if (!doesGoalExist) {
                return Promise.reject({ status: 404, message: "Goal not found" });
            }
            return (0, subgoals_model_1.insertSubgoal)(goal_id, objective, start_date, end_date, owner, target_value, unit);
        })
            .then(function (subgoal) {
            res.status(200).send({ subgoal: subgoal });
        })["catch"](next);
    }
};
exports.postSubgoal = postSubgoal;
var deleteSubgoal = function (req, res, next) {
    var subgoal_id = req.params.subgoal_id;
    if (!Number.isInteger(parseInt(subgoal_id))) {
        next({ status: 400, message: "Bad request" });
    }
    else {
        return (0, checkExists_1.checkSubgoalExists)(subgoal_id)
            .then(function (doesSubgoalExist) {
            if (!doesSubgoalExist) {
                return Promise.reject({ status: 404, message: "Subgoal not found" });
            }
            return (0, subgoals_model_1.deleteSubgoalFrom)(subgoal_id);
        })
            .then(function () {
            res.status(204).send();
        })["catch"](next);
    }
};
exports.deleteSubgoal = deleteSubgoal;
var getSubgoalBySubgoalId = function (req, res, next) {
    var subgoal_id = req.params.subgoal_id;
    if (!Number.isInteger(parseInt(subgoal_id))) {
        next({ status: 400, message: "Bad request" });
    }
    else {
        return (0, subgoals_model_1.selectSubgoalBySubgoalId)(subgoal_id)
            .then(function (subgoal) {
            res.status(200).send({ subgoal: subgoal });
        })["catch"](next);
    }
};
exports.getSubgoalBySubgoalId = getSubgoalBySubgoalId;
var patchSubgoalDetails = function (req, res, next) { };
exports.patchSubgoalDetails = patchSubgoalDetails;
var patchSubgoalStatus = function (req, res, next) {
    var subgoal_id = req.params.subgoal_id;
    var _a = req.body, status = _a.status, date = _a.date;
    if (!Number.isInteger(parseInt(subgoal_id))) {
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
        return (0, checkExists_1.checkSubgoalExists)(subgoal_id)
            .then(function (doesSubgoalExist) {
            if (!doesSubgoalExist) {
                return Promise.reject({ status: 404, message: "Subgoal not found" });
            }
            return (0, subgoals_model_1.updateSubgoalStatus)(subgoal_id, status, date);
        })
            .then(function (subgoal) {
            res.status(200).send({ subgoal: subgoal });
        })["catch"](next);
    }
};
exports.patchSubgoalStatus = patchSubgoalStatus;
var patchSubgoalProgress = function (req, res, next) {
    var subgoal_id = req.params.subgoal_id;
    var _a = req.body, date = _a.date, value = _a.value;
    if (!date || !value) {
        next({ status: 400, message: "Bad request" });
    }
    else if (isNaN(parseInt(value)) ||
        !Number.isInteger(parseInt(subgoal_id))) {
        next({ status: 400, message: "Bad request" });
    }
    else if (new Date(date).toString() === "Invalid Date") {
        next({ status: 400, message: "Bad request" });
    }
    else {
        return (0, subgoals_model_1.selectSubgoalBySubgoalId)(subgoal_id)
            .then(function (subgoal) {
            if (subgoal.type === "boolean") {
                return Promise.reject({
                    status: 400,
                    message: "Progress cannot be added to 'boolean' type subgoal"
                });
            }
            if (new Date(date) < new Date(subgoal.start_date) ||
                new Date(date) > new Date(subgoal.end_date)) {
                return Promise.reject({
                    status: 400,
                    message: "Cannot add progress outside of date range of subgoal"
                });
            }
            return (0, subgoals_model_1.updateSubgoalProgress)(subgoal_id, date, value, subgoal.progress, subgoal.target_value);
        })
            .then(function (subgoal) {
            res.status(200).send({ subgoal: subgoal });
        })["catch"](next);
    }
};
exports.patchSubgoalProgress = patchSubgoalProgress;
var getSubgoalsByGoalId = function (req, res, next) {
    var goal_id = req.params.goal_id;
    if (!Number.isInteger(parseInt(goal_id))) {
        next({ status: 400, message: "Bad request" });
    }
    else {
        return (0, checkExists_1.checkGoalExists)(goal_id)
            .then(function (doesGoalExist) {
            if (!doesGoalExist) {
                return Promise.reject({ status: 404, message: "Goal not found" });
            }
            return (0, subgoals_model_1.selectSubgoalsByGoalId)(goal_id);
        })
            .then(function (subgoals) {
            res.status(200).send({ subgoals: subgoals });
        })["catch"](next);
    }
};
exports.getSubgoalsByGoalId = getSubgoalsByGoalId;
var getSubgoalsByUser = function (req, res, next) {
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
            return (0, checkExists_1.checkUserExists)(username)
                .then(function (doesUserExist) {
                if (!doesUserExist) {
                    return Promise.reject({ status: 404, message: "User not found" });
                }
                return (0, subgoals_model_1.selectSubgoalsByUser)(username, formattedFromDate_1, formattedToDate_1);
            })
                .then(function (subgoals) {
                res.status(200).send({ subgoals: subgoals });
            })["catch"](next);
        }
    }
};
exports.getSubgoalsByUser = getSubgoalsByUser;
