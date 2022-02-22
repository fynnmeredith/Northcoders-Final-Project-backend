import { db } from "../db/connection";
import { ProgressPoint } from "../types";

const insertGoal = (
  objective: string,
  description: string | undefined,
  start_date: Date,
  end_date: Date,
  owner: string,
  target_value: number | undefined,
  unit: string | undefined
) => {
  const status = "active";
  let type = "boolean";
  let progress;
  if (target_value) {
    type = "progress";
    progress = JSON.stringify([[]]);
  }
  const query = `INSERT INTO goals
      (objective, description, start_date, end_date, type, status, owner, target_value, unit, progress)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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

const deleteGoalFrom = (goal_id: number) => {
  return db.query(
    `DELETE FROM goals
      WHERE goal_id = $1;`,
    [goal_id]
  );
};

const selectGoalByGoalId = (goal_id: number) => {
  return db
    .query(
      `SELECT * FROM goals
        WHERE goal_id = $1;`,
      [goal_id]
    )
    .then((res) => {
      if (res.rows.length === 0) {
        throw { status: 404, message: "Goal not found" };
      }
      return res.rows[0];
    });
};

const updateGoalDetails = () => {};

const updateGoalProgress = (
  goal_id: number,
  date: Date,
  value: number,
  oldProgress: ProgressPoint[],
  targetValue: number
) => {
  const latestValue = oldProgress[oldProgress.length - 1][1];
  const newValue = latestValue + value;
  const newProgress = oldProgress.map((progressPoint) => {
    return [...progressPoint];
  });
  newProgress.push([new Date(date), newValue]);
  const newProgressJson = JSON.stringify(newProgress);

  let newStatus = "active";
  if (newValue > targetValue) {
    newStatus = "completed";
  }

  return db
    .query(
      `UPDATE goals
      SET progress = $1,
      status = $2
      WHERE goal_id = $3
      RETURNING *;`,
      [newProgressJson, newStatus, goal_id]
    )
    .then((res) => {
      return res.rows[0];
    });
};

const selectGoalsByUser = (username: string) => {
  return db
    .query(
      `SELECT * FROM goals
      WHERE owner = $1`,
      [username]
    )
    .then((res) => {
      return res.rows;
    });
};

export {
  insertGoal,
  deleteGoalFrom,
  selectGoalByGoalId,
  updateGoalDetails,
  updateGoalProgress,
  selectGoalsByUser,
};
