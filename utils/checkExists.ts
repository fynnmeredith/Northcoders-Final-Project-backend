import { db } from "../db/connection";

const checkGoalExists = (goal_id) => {
  return db
    .query(
      `SELECT * FROM goals
    WHERE goal_id = ${goal_id};`
    )
    .then((res) => {
      return res.rows.length === 1;
    });
};

const checkUserExists = (username) => {
  return db
    .query(
      `SELECT * FROM USERS
    WHERE username = ${username}`
    )
    .then((res) => {
      return res.rows.length === 1;
    });
};

export { checkGoalExists };
