import {
  insertGoal,
  selectGoalByGoalId,
  updateGoalStatus,
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
      .then((goal: Goal) => {
        res.status(200).send({ goal });
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
      .then((goal: Goal) => {
        res.status(200).send({ goal });
      })
      .catch(next);
  }
};

const patchGoalDetails = (req, res, next) => {};

const patchGoalStatus = (req, res, next) => {
  const { goal_id } = req.params;
  const { status, date } = req.body;

  if (!Number.isInteger(parseInt(goal_id))) {
    next({ status: 400, message: "Bad request" });
  } else if (status !== "completed" && status !== "active") {
    next({ status: 400, message: "Bad request" });
  } else if (
    status === "completed" &&
    new Date(date).toString() === "Invalid Date"
  ) {
    next({ status: 400, message: "Bad request" });
  } else {
    return checkGoalExists(goal_id)
      .then((doesGoalExist: Boolean) => {
        if (!doesGoalExist) {
          return Promise.reject({ status: 404, message: "Goal not found" });
        }
        return updateGoalStatus(goal_id, status, date);
      })
      .then((goal: Goal) => {
        res.status(200).send({ goal });
      })
      .catch(next);
  }
};

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
      .then((goal: Goal) => {
        res.status(200).send({ goal });
      })
      .catch(next);
  }
};

const getGoalsByUser = (req, res, next) => {
  const { username } = req.params;
  const { from_date, to_date } = req.query;

  if (from_date && !/\d{4}-\d{2}-\d{2}/.test(from_date)) {
    next({ status: 400, message: "Bad request" });
  } else if (to_date && !/\d{4}-\d{2}-\d{2}/.test(to_date)) {
    next({ status: 400, message: "Bad request" });
  } else {
    let formattedFromDate: Date | undefined;
    let formattedToDate: Date | undefined;

    if (from_date) {
      const fromDateYear = parseInt(from_date.substring(0, 4));
      let fromDateMonth = parseInt(from_date.substring(5, 7)) - 1;
      let fromDateDate = parseInt(from_date.substring(8, 10));

      formattedFromDate = new Date(fromDateYear, fromDateMonth, fromDateDate);
    }

    if (to_date) {
      const toDateYear = parseInt(to_date.substring(0, 4));
      let toDateMonth = parseInt(to_date.substring(5, 7)) - 1;
      let toDateDate = parseInt(to_date.substring(8, 10));

      formattedToDate = new Date(toDateYear, toDateMonth, toDateDate);
    }

    if (
      formattedToDate &&
      formattedFromDate &&
      formattedToDate.getTime() < formattedFromDate.getTime()
    ) {
      next({
        status: 400,
        message: "to_date must be equal to or later than from_date",
      });
    } else if (
      (formattedFromDate && formattedFromDate.toString() === "Invalid Date") ||
      (formattedToDate && formattedToDate.toString() === "Invalid Date")
    ) {
      next({ status: 400, message: "Bad request" });
    } else {
      return checkUserExists(username)
        .then((doesUserExist) => {
          if (!doesUserExist) {
            return Promise.reject({ status: 404, message: "User not found" });
          }
          return selectGoalsByUser(
            username,
            formattedFromDate,
            formattedToDate
          );
        })
        .then((goals: Goal[]) => {
          res.status(200).send({ goals });
        })
        .catch(next);
    }
  }
};

export {
  postGoal,
  getGoalByGoalId,
  patchGoalStatus,
  patchGoalProgress,
  getGoalsByUser,
};
