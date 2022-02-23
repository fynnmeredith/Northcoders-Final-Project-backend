"use strict";
exports.__esModule = true;
exports.getGoalsByUser = exports.patchGoalProgress = exports.patchGoalDetails = exports.getGoalByGoalId = exports.deleteGoal = exports.postGoal = void 0;
var goals_model_1 = require("../models/goals.model");
var postGoal = function (req, res, next) { };
exports.postGoal = postGoal;
var deleteGoal = function (req, res, next) { };
exports.deleteGoal = deleteGoal;
var getGoalByGoalId = function (req, res, next) {
    var goal_id = req.params.goal_id;
    if (!Number.isInteger(parseInt(goal_id))) {
        next({ status: 400, message: "Bad request" });
    }
    else {
        return (0, goals_model_1.selectGoalByGoalId)(goal_id)
            .then(function (goal) {
            res.status(200).send({ goal: goal });
        })["catch"](next);
    }
};
exports.getGoalByGoalId = getGoalByGoalId;
var patchGoalDetails = function (req, res, next) { };
exports.patchGoalDetails = patchGoalDetails;
var patchGoalProgress = function (req, res, next) { };
exports.patchGoalProgress = patchGoalProgress;
var getGoalsByUser = function (req, res, next) { };
exports.getGoalsByUser = getGoalsByUser;
