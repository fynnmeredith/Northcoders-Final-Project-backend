import { db } from "../db/connection";

const insertGoal = () => {};

const deleteGoalFrom = () => {};

const selectGoalByGoalId = (goal_id: Number) => {
  return db
    .query(
      `SELECT * FROM goals
    WHERE goal_id = ${goal_id};`
    )
    .then((res) => {
      if (res.rows.length === 0) {
        throw { status: 404, message: "Goal not found" };
      }
      return res.rows[0];
    });
};

const updateGoalDetails = () => {};

const updateGoalProgress = () => {};

const selectGoalsByUser = () => {};

export {
  insertGoal,
  deleteGoalFrom,
  selectGoalByGoalId,
  updateGoalDetails,
  updateGoalProgress,
  selectGoalsByUser,
};
