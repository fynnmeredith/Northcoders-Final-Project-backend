import { db } from "../db/connection";

const insertReaction = (post_id: number, owner: string, reaction: string) => {
  return db
    .query(
      `INSERT INTO reactions
    (post_id, owner, reaction)
    VALUES
    ($1, $2, $3)
    RETURNING *;`,
      [post_id, owner, reaction]
    )
    .then((res) => {
      return res.rows[0];
    });
};

const deleteReactionFrom = (reaction_id: number) => {
  return db.query(
    `DELETE FROM reactions
        WHERE reaction_id = $1;`,
    [reaction_id]
  );
};

const selectReactionsByPost = (post_id: number) => {
  return db
    .query(
      `SELECT * FROM reactions 
        WHERE post_id = $1`,
      [post_id]
    )
    .then((res) => {
      return res.rows;
    });
};

export { insertReaction, deleteReactionFrom, selectReactionsByPost };
