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
  const goal_id: Number = req.params.goal_id;
  if (typeof goal_id !== "number") {
    next({ status: 400, message: "Bad request" });
  }
  return selectGoalByGoalId(goal_id)
    .then((goal) => {
      return { goal };
    })
    .catch(next);
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
