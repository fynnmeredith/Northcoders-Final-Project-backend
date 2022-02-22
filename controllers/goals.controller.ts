import e from "cors";
import {
  insertGoal,
  deleteGoalFrom,
  selectGoalByGoalId,
  updateGoalDetails,
  updateGoalProgress,
  selectGoalsByUser,
} from "../models/goals.model";
import { checkGoalExists, checkUserExists } from "../utils/checkExists";
import { Goal } from "../types";

const postGoal = (req, res, next) => {
  const {
    objective,
    description,
    start_date,
    end_date,
    owner,
    target_value,
    unit,
  } = req.body;

  if (!objective || !start_date || !end_date || !owner) {
    next({ status: 400, message: "Bad request" });
  } else if (target_value && typeof target_value !== "number") {
    next({ status: 400, message: "Bad request" });
  } else if (!target_value && unit) {
    next({ status: 400, message: "Bad request" });
  } else if (
    new Date(start_date).toString() === "Invalid Date" ||
    new Date(end_date).toString() === "Invalid Date"
  ) {
    next({ status: 400, message: "Bad request" });
  } else {
    return checkUserExists(owner)
      .then((doesUserExist) => {
        if (!doesUserExist) {
          return Promise.reject({ status: 404, message: "User not found" });
        }
        return insertGoal(
          objective,
          description,
          start_date,
          end_date,
          owner,
          target_value,
          unit
        );
      })
      .then((goal) => {
        res.status(200).send({ goal });
      })
      .catch(next);
  }
};

const deleteGoal = (req, res, next) => {
  const { goal_id } = req.params;

  if (!Number.isInteger(parseInt(goal_id))) {
    next({ status: 400, message: "Bad request" });
  } else {
    return checkGoalExists(goal_id)
      .then((doesGoalExist: Boolean) => {
        if (!doesGoalExist) {
          return Promise.reject({ status: 404, message: "Goal not found" });
        }
        return deleteGoalFrom(goal_id);
      })
      .then(() => {
        res.status(204).send();
      })
      .catch(next);
  }
};

const getGoalByGoalId = (req, res, next) => {
  const { goal_id } = req.params;

  if (!Number.isInteger(parseInt(goal_id))) {
    next({ status: 400, message: "Bad request" });
  } else {
    return selectGoalByGoalId(goal_id)
      .then((goal) => {
        res.status(200).send({ goal });
      })
      .catch(next);
  }
};

const patchGoalDetails = (req, res, next) => {};

const patchGoalProgress = (req, res, next) => {
  const { goal_id } = req.params;
  const { date, value } = req.body;

  if (!date || !value) {
    next({ status: 400, message: "Bad request" });
  } else if (isNaN(parseInt(value)) || !Number.isInteger(parseInt(goal_id))) {
    next({ status: 400, message: "Bad request" });
  } else if (new Date(date).toString() === "Invalid Date") {
    next({ status: 400, message: "Bad request" });
  } else {
    return selectGoalByGoalId(goal_id)
      .then((goal: Goal) => {
        if (goal.type === "boolean") {
          return Promise.reject({
            status: 400,
            message: "Progress cannot be added to 'boolean' type goal",
          });
        }
        if (
          new Date(date) < new Date(goal.start_date) ||
          new Date(date) > new Date(goal.end_date)
        ) {
          return Promise.reject({
            status: 400,
            message: "Cannot add progress outside of date range of goal",
          });
        }

        return updateGoalProgress(
          goal_id,
          date,
          value,
          goal.progress,
          goal.target_value
        );
      })
      .then((goal) => {
        res.status(200).send({ goal });
      })
      .catch(next);
  }
};

const getGoalsByUser = (req, res, next) => {
  const { username } = req.params;
  return checkUserExists(username)
    .then((doesUserExist) => {
      if (!doesUserExist) {
        return Promise.reject({ status: 404, message: "User not found" });
      }
      return selectGoalsByUser(username);
    })
    .then((goals) => {
      res.status(200).send({ goals });
    })
    .catch(next);
};

export {
  postGoal,
  deleteGoal,
  getGoalByGoalId,
  patchGoalDetails,
  patchGoalProgress,
  getGoalsByUser,
};
