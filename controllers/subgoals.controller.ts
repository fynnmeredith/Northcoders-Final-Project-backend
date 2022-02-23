import e from "cors";
import {
  insertSubgoal,
  deleteSubgoalFrom,
  selectSubgoalBySubgoalId,
  updateSubgoalDetails,
  updateSubgoalStatus,
  updateSubgoalProgress,
  selectSubgoalsByGoalId,
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

const deleteSubgoal = (req, res, next) => {
  const { subgoal_id } = req.params;

  if (!Number.isInteger(parseInt(subgoal_id))) {
    next({ status: 400, message: "Bad request" });
  } else {
    return checkSubgoalExists(subgoal_id)
      .then((doesSubgoalExist: Boolean) => {
        if (!doesSubgoalExist) {
          return Promise.reject({ status: 404, message: "Subgoal not found" });
        }
        return deleteSubgoalFrom(subgoal_id);
      })
      .then(() => {
        res.status(204).send();
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

const patchSubgoalDetails = (req, res, next) => {};

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

export {
  postSubgoal,
  getSubgoalsByGoalId,
  deleteSubgoal,
  getSubgoalBySubgoalId,
  patchSubgoalDetails,
  patchSubgoalStatus,
  patchSubgoalProgress,
};
