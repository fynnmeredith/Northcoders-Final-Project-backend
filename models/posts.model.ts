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
      console.log(res.rows);
      return res.rows;
    });
};

// TBC
export const removePost = (post_id) => {
  return db
    .query(`DELETE FROM posts WHERE post_id=($1) RETURNING *;`, [post_id])
    .then((res) => {
      console.log(res);
      return res;
    });
};

export const selectPostsByUser = (owner) => {
  return db
    .query(`SELECT * FROM posts WHERE owner=($1) ORDER BY datetime DESC;`, [
      owner,
    ])
    .then((res) => {
      console.log("MODEL CHECKPOINT", res.rows);
      return res.rows;
    });
};

// TBC
export const selectPostsByUserFriends = () => {
  return db.query(``).then((res) => {
    return res;
  });
};
