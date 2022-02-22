import { db } from "../db/connection";

export const selectUsers = () => {
  return db
    .query(`SELECT * FROM users;`)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      return err;
    });
};

export const insertUser = (username, profile) => {
  return db
    .query(`INSERT INTO users (username,profile) VALUES ($1,$2) RETURNING *`, [
      username,
      profile,
    ])
    .then((res) => {
      // console.log(res.rows);
      return res.rows;
    });
};

export const modifyUser = (username, profile) => {
  return db
    .query(
      `UPDATE users SET profile = ($2) WHERE  username =($1) RETURNING *;`,
      [username, profile]
    )
    .then((res) => {
      return res.rows;
    });
};

export const deleteUserModel = (username) => {
  return db
    .query(`DELETE FROM users WHERE username=($1) RETURNING *;`, [username])
    .then((res) => {
      return res.rows;
    });
};
