import e from "cors";
import {
  insertGoal,
  deleteGoalFrom,
  selectGoalByGoalId,
  updateGoalDetails,
  updateGoalProgress,
  selectGoalsByUser,
} from "../models/goals.model";

const postGoal = (req, res, next) => {};

const deleteGoal = (req, res, next) => {};

const getGoalByGoalId = (req, res, next) => {
  const goal_id = req.params.goal_id;

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

const patchGoalProgress = (req, res, next) => {};

const getGoalsByUser = (req, res, next) => {};

export {
  postGoal,
  deleteGoal,
  getGoalByGoalId,
  patchGoalDetails,
  patchGoalProgress,
  getGoalsByUser,
};