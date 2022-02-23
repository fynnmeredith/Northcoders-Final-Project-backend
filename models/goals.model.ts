import { db } from "../db/connection";
import { ProgressPoint } from "../types";
import { formatDate } from "../utils/format";

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
    formatDate(start_date),
    formatDate(end_date),
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

const updateGoalStatus = (
  goal_id: number,
  status: string,
  finish_date: Date | undefined
) => {
  return db
    .query(
      `UPDATE goals
  SET status = $1,
  finish_date = $2
  WHERE goal_id = $3
  RETURNING *;`,
      [status, finish_date, goal_id]
    )
    .then((res) => {
      return res.rows[0];
    });
};

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

  return db
    .query(
      `UPDATE goals
      SET progress = $1
      WHERE goal_id = $2
      RETURNING *;`,
      [newProgressJson, goal_id]
    )
    .then((res) => {
      return res.rows[0];
    });
};

const selectGoalsByUser = (
  username: string,
  fromDate: Date | undefined,
  toDate: Date | undefined
) => {
  let dateLine: string | undefined;
  if (fromDate && !toDate) {
    dateLine = ` AND end_date >= '${formatDate(fromDate)}'::date`;
  } else if (toDate && !fromDate) {
    dateLine = ` AND start_date <= '${formatDate(toDate)}'::date`;
  } else if (toDate && fromDate) {
    dateLine = ` AND end_date >= '${formatDate(
      fromDate
    )}'::date AND start_date <= '${formatDate(toDate)}'::date`;
  }
  return db
    .query(
      `SELECT * FROM goals
      WHERE owner = $1
      ${dateLine ? dateLine : ""};`,
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
  updateGoalStatus,
  updateGoalProgress,
  selectGoalsByUser,
};
