import { db } from "../db/connection";

export const selectComments = (post_id) => {
  return db
    .query(`SELECT * FROM comments WHERE post_id=$1`, [post_id])
    .then((res) => {
      return res.rows;
    });
};

export const insertComment = (post_id, message, owner, datetime) => {
  return db
    .query(
      `INSERT INTO comments (post_id,message,owner,datetime) VALUES ($1,$2,$3,$4) RETURNING *;`,
      [post_id, message, owner, datetime]
    )
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    });
};

export const deleteCommentFromPost = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id=($1) RETURNING *;`, [
      comment_id,
    ])
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    });
};
