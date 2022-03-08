import { db } from "../db/connection";

export const insertPost = (
  associated_data_type,
  associated_id,
  owner,
  datetime,
  message,
  progress_point
) => {
  return db
    .query(
      `INSERT INTO posts (associated_data_type,associated_id,owner,datetime,message, progress_point) VALUES ($1,$2,$3,$4,$5, $6) RETURNING *;`,
      [
        associated_data_type,
        associated_id,
        owner,
        datetime,
        message,
        progress_point,
      ]
    )
    .then((res) => {
      return res.rows;
    });
};

export const selectPostsByUser = (owner) => {
  return db
    .query(`SELECT * FROM posts WHERE owner=($1) ORDER BY datetime DESC;`, [
      owner,
    ])
    .then((res) => {
      return res.rows;
    });
};
