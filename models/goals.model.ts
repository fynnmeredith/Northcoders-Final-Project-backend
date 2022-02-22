import { db } from "../db/connection";

const insertGoal = (
  objective: String,
  description: String | undefined,
  start_date: Date,
  end_date: Date,
  owner: String,
  target_value: Number | undefined,
  unit: String | undefined
) => {
  const status = "active";
  const progress = [[]];
  let type = "boolean";
  if (target_value) {
    type = "progress";
  }
  const query = `INSERT INTO goals
      (objective, description, start_date, end_date, type, status, owner, target_value, unit, progress)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;
  const values = [
    objective,
    description,
    start_date,
    end_date,
    type,
    status,
    owner,
    target_value,
    unit,
    progress,
  ];

  return db.query(query, values).then((res) => {
    return res.rows[0];
  });
};

const deleteGoalFrom = (goal_id: Number) => {
  return db.query(
    `DELETE FROM goals
      WHERE goal_id = ${goal_id};`
  );
};

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
