import {
  insertSubgoal,
  selectSubgoalBySubgoalId,
  updateSubgoalStatus,
  updateSubgoalProgress,
  selectSubgoalsByGoalId,
  selectSubgoalsByUser,
} from "../models/subgoals.model";
import {
  checkGoalExists,
  checkUserExists,
  checkSubgoalExists,
} from "../utils/checkExists";
import { Subgoal } from "../types";

const postSubgoal = (req, res, next) => {
  const { objective, start_date, end_date, owner, target_value, unit } =
    req.body;

  const { goal_id } = req.params;

  if (!objective || !end_date || !owner) {
    next({ status: 400, message: "Bad request" });
  } else if (target_value && typeof target_value !== "number") {
    next({ status: 400, message: "Bad request" });
  } else if (!target_value && unit) {
    next({ status: 400, message: "Bad request" });
  } else if (!target_value && start_date) {
    next({ status: 400, message: "Bad request" });
  } else if (!start_date && target_value) {
    next({ status: 400, message: "Bad request" });
  } else if (!Number.isInteger(parseInt(goal_id))) {
    next({ status: 400, message: "Bad request" });
  } else if (
    (start_date && new Date(start_date).toString() === "Invalid Date") ||
    new Date(end_date).toString() === "Invalid Date"
  ) {
    next({ status: 400, message: "Bad request" });
  } else {
    return checkUserExists(owner)
      .then((doesUserExist: boolean) => {
        if (!doesUserExist) {
          return Promise.reject({ status: 404, message: "User not found" });
        }
        return checkGoalExists(goal_id);
      })
      .then((doesGoalExist: boolean) => {
        if (!doesGoalExist) {
          return Promise.reject({ status: 404, message: "Goal not found" });
        }
        return insertSubgoal(
          goal_id,
          objective,
          start_date,
          end_date,
          owner,
          target_value,
          unit
        );
      })
      .then((subgoal: Subgoal) => {
        res.status(200).send({ subgoal });
      })
      .catch(next);
  }
};

const getSubgoalBySubgoalId = (req, res, next) => {
  const { subgoal_id } = req.params;

  if (!Number.isInteger(parseInt(subgoal_id))) {
    next({ status: 400, message: "Bad request" });
  } else {
    return selectSubgoalBySubgoalId(subgoal_id)
      .then((subgoal: Subgoal) => {
        res.status(200).send({ subgoal });
      })
      .catch(next);
  }
};

const patchSubgoalStatus = (req, res, next) => {
  const { subgoal_id } = req.params;
  const { status, date } = req.body;

  if (!Number.isInteger(parseInt(subgoal_id))) {
    next({ status: 400, message: "Bad request" });
  } else if (status !== "completed" && status !== "active") {
    next({ status: 400, message: "Bad request" });
  } else if (
    status === "completed" &&
    new Date(date).toString() === "Invalid Date"
  ) {
    next({ status: 400, message: "Bad request" });
  } else {
    return checkSubgoalExists(subgoal_id)
      .then((doesSubgoalExist: Boolean) => {
        if (!doesSubgoalExist) {
          return Promise.reject({ status: 404, message: "Subgoal not found" });
        }
        return updateSubgoalStatus(subgoal_id, status, date);
      })
      .then((subgoal: Subgoal) => {
        res.status(200).send({ subgoal });
      })
      .catch(next);
  }
};

const patchSubgoalProgress = (req, res, next) => {
  const { subgoal_id } = req.params;
  const { date, value } = req.body;

  if (!date || !value) {
    next({ status: 400, message: "Bad request" });
  } else if (
    isNaN(parseInt(value)) ||
    !Number.isInteger(parseInt(subgoal_id))
  ) {
    next({ status: 400, message: "Bad request" });
  } else if (new Date(date).toString() === "Invalid Date") {
    next({ status: 400, message: "Bad request" });
  } else {
    return selectSubgoalBySubgoalId(subgoal_id)
      .then((subgoal: Subgoal) => {
        if (subgoal.type === "boolean") {
          return Promise.reject({
            status: 400,
            message: "Progress cannot be added to 'boolean' type subgoal",
          });
        }
        if (
          new Date(date) < new Date(subgoal.start_date) ||
          new Date(date) > new Date(subgoal.end_date)
        ) {
          return Promise.reject({
            status: 400,
            message: "Cannot add progress outside of date range of subgoal",
          });
        }

        return updateSubgoalProgress(
          subgoal_id,
          date,
          value,
          subgoal.progress,
          subgoal.target_value
        );
      })
      .then((subgoal: Subgoal) => {
        res.status(200).send({ subgoal });
      })
      .catch(next);
  }
};

const getSubgoalsByGoalId = (req, res, next) => {
  const { goal_id } = req.params;
  if (!Number.isInteger(parseInt(goal_id))) {
    next({ status: 400, message: "Bad request" });
  } else {
    return checkGoalExists(goal_id)
      .then((doesGoalExist) => {
        if (!doesGoalExist) {
          return Promise.reject({ status: 404, message: "Goal not found" });
        }
        return selectSubgoalsByGoalId(goal_id);
      })
      .then((subgoals: Subgoal[]) => {
        res.status(200).send({ subgoals });
      })
      .catch(next);
  }
};

const getSubgoalsByUser = (req, res, next) => {
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
          return selectSubgoalsByUser(
            username,
            formattedFromDate,
            formattedToDate
          );
        })
        .then((subgoals: Subgoal[]) => {
          res.status(200).send({ subgoals });
        })
        .catch(next);
    }
  }
};

export {
  postSubgoal,
  getSubgoalsByGoalId,
  getSubgoalBySubgoalId,
  patchSubgoalStatus,
  patchSubgoalProgress,
  getSubgoalsByUser,
};
