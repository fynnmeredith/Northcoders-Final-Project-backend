import { db } from "../db/connection";
import { ProgressPoint } from "../types";
import { formatDate } from "../utils/format";

const insertSubgoal = (
  goal_id: number,
  objective: string,
  start_date: Date | undefined,
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
  const query = `INSERT INTO subgoals
        (goal_id, objective, start_date, end_date, type, status, owner, target_value, unit, progress)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;
      `;
  const values = [
    goal_id,
    objective,
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

const deleteSubgoalFrom = (subgoal_id: number) => {
  return db.query(
    `DELETE FROM subgoals
      WHERE subgoal_id = $1;`,
    [subgoal_id]
  );
};

const selectSubgoalBySubgoalId = (subgoal_id: number) => {
  return db
    .query(
      `SELECT * FROM subgoals
        WHERE subgoal_id = $1;`,
      [subgoal_id]
    )
    .then((res) => {
      if (res.rows.length === 0) {
        throw { status: 404, message: "Subgoal not found" };
      }
      return res.rows[0];
    });
};

const updateSubgoalDetails = () => {};

const updateSubgoalStatus = (
  subgoal_id: number,
  status: string,
  finish_date: Date | undefined
) => {
  return db
    .query(
      `UPDATE subgoals
  SET status = $1,
  finish_date = $2
  WHERE subgoal_id = $3
  RETURNING *;`,
      [status, finish_date, subgoal_id]
    )
    .then((res) => {
      return res.rows[0];
    });
};

const updateSubgoalProgress = (
  subgoal_id: number,
  date: Date,
  value: number,
  oldProgress: ProgressPoint[],
  targetValue: number
) => {
  let latestValue = 0;
  if (oldProgress.length > 0) {
    latestValue = oldProgress[oldProgress.length - 1][1];
  }
  const newValue = latestValue + value;
  const newProgress = oldProgress.map((progressPoint) => {
    return [...progressPoint];
  });
  newProgress.push([new Date(date), newValue]);
  const newProgressJson = JSON.stringify(newProgress);

  return db
    .query(
      `UPDATE subgoals
      SET progress = $1
      WHERE subgoal_id = $2
      RETURNING *;`,
      [newProgressJson, subgoal_id]
    )
    .then((res) => {
      return res.rows[0];
    });
};

const selectSubgoalsByGoalId = (goal_id: number) => {
  return db
    .query(
      `SELECT * FROM subgoals
      WHERE goal_id = $1;`,
      [goal_id]
    )
    .then((res) => {
      return res.rows;
    });
};

const selectSubgoalsByUser = (
  username: string,
  fromDate: Date | undefined,
  toDate: Date | undefined
) => {
  let dateLineProgress: string | undefined;
  let dateLineBoolean: string | undefined;
  if (fromDate && !toDate) {
    dateLineProgress = ` AND end_date >= '${formatDate(fromDate)}'::date`;
    dateLineBoolean = ` AND end_date >= '${formatDate(fromDate)}'::date`;
  } else if (toDate && !fromDate) {
    dateLineProgress = ` AND start_date <= '${formatDate(toDate)}'::date`;
    dateLineBoolean = ` AND end_date <= '${formatDate(toDate)}'::date`;
  } else if (toDate && fromDate) {
    dateLineProgress = ` AND end_date >= '${formatDate(
      fromDate
    )}'::date AND start_date <= '${formatDate(toDate)}'::date`;
    dateLineBoolean = ` AND end_date >= '${formatDate(
      fromDate
    )}'::date AND end_date <= '${formatDate(toDate)}'::date`;
  }

  const progressQuery = db.query(
    `SELECT * FROM subgoals
      WHERE owner = $1
      AND type = 'progress'
      ${dateLineProgress ? dateLineProgress : ""};`,
    [username]
  );
  const booleanQuery = db.query(
    `SELECT * FROM subgoals
      WHERE owner = $1
      AND type = 'boolean'
      ${dateLineBoolean ? dateLineBoolean : ""};`,
    [username]
  );

  return Promise.all([progressQuery, booleanQuery]).then(
    ([progressResponse, booleanResponse]) => {
      const res = [...progressResponse.rows, ...booleanResponse.rows];
      return res;
    }
  );
};

export {
  insertSubgoal,
  deleteSubgoalFrom,
  selectSubgoalBySubgoalId,
  updateSubgoalDetails,
  updateSubgoalStatus,
  updateSubgoalProgress,
  selectSubgoalsByGoalId,
  selectSubgoalsByUser,
};
