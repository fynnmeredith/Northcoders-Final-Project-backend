import { db } from "../db/connection";

const insertReaction = (user_1: string, user_2: string) => {
  return db
    .query(
      `INSERT INTO friendships
    (user_1, user_2)
    VALUES
    ($1, $2)
    RETURNING *;`,
      [user_1, user_2]
    )
    .then((res) => {
      return res.rows[0];
    });
};

const deleteReactionFrom = (friendship_id: number) => {
  return db.query(
    `DELETE FROM friendships
        WHERE friendship_id = $1;`,
    [friendship_id]
  );
};

const selectReactionsByPost = (username: string) => {
  const user1FriendshipPromise = db.query(
    `SELECT * FROM friendships 
        WHERE user_1 = $1`,
    [username]
  );
  const user2FriendshipPromise = db.query(
    `SELECT * FROM friendships 
        WHERE user_2 = $1`,
    [username]
  );
  return Promise.all([user1FriendshipPromise, user2FriendshipPromise]).then(
    ([user1Res, user2Res]) => {
      const res = [...user1Res.rows, ...user2Res.rows];
      return res;
    }
  );
};

export { insertReaction, deleteReactionFrom, selectReactionsByPost };
