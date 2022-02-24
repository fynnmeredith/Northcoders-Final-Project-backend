import { db } from "../db/connection";

const checkGoalExists = (goal_id) => {
  return db
    .query(
      `SELECT * FROM goals
    WHERE goal_id = $1;`,
      [goal_id]
    )
    .then((res) => {
      return res.rows.length === 1;
    });
};

const checkUserExists = (username) => {
  return db
    .query(
      `SELECT * FROM users
    WHERE username = $1;`,
      [username]
    )
    .then((res) => {
      return res.rows.length === 1;
    });
};

const checkSubgoalExists = (subgoal_id) => {
  return db
    .query(
      `SELECT * FROM subgoals
  WHERE subgoal_id = $1;`,
      [subgoal_id]
    )
    .then((res) => {
      return res.rows.length === 1;
    });
};

const checkFriendshipExists = (friendship_id) => {
  return db
    .query(
      `SELECT * FROM friendships
  WHERE friendship_id = $1;`,
      [friendship_id]
    )
    .then((res) => {
      return res.rows.length === 1;
    });
};

const checkReactionExists = (reaction_id) => {
  return db
    .query(
      `SELECT * FROM friendships
  WHERE friendship_id = $1;`,
      [reaction_id]
    )
    .then((res) => {
      return res.rows.length === 1;
    });
};

const checkIfUsersAreFriends = (user_1, user_2) => {
  const user1FriendshipPromise = db.query(
    `SELECT * FROM friendships
      WHERE user_1 = $1
      AND user_2 = $2;`,
    [user_1, user_2]
  );
  const user2FriendshipPromise = db.query(
    `SELECT * FROM friendships
      WHERE user_1 = $1
      AND user_2 = $2;`,
    [user_2, user_1]
  );
  return Promise.all([user1FriendshipPromise, user2FriendshipPromise]).then(
    ([user1Res, user2Res]) => {
      return user1Res.rows.length + user2Res.rows.length > 0;
    }
  );
};

export {
  checkGoalExists,
  checkUserExists,
  checkSubgoalExists,
  checkFriendshipExists,
  checkReactionExists,
  checkIfUsersAreFriends,
};
