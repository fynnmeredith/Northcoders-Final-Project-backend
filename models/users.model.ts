import { db } from "../db/connection";

export const selectUsers = (searchTerm) => {
  if (!searchTerm) {
    return db
      .query(`SELECT * FROM users;`)
      .then((res) => {
        return res.rows;
      })
      .catch((err) => {
        return err;
      });
  } else {
    return db
      .query(`SELECT * FROM users WHERE username LIKE '%${searchTerm}%';`)
      .then((res) => {
        return res.rows;
      })
      .catch((err) => {
        return err;
      });
  }
};

export const insertUser = (username, profile, avatar_url) => {
  return db
    .query(
      `INSERT INTO users (username,profile,avatar_url) VALUES ($1,$2,$3) RETURNING *`,
      [username, profile, avatar_url]
    )
    .then((res) => {
      return res.rows;
    });
};

export const modifyUser = (username, profile, avatar_url) => {
  return db
    .query(
      `UPDATE users SET profile = ($2), avatar_url=($3) WHERE  username =($1) RETURNING *;`,
      [username, profile, avatar_url]
    )
    .then((res) => {
      return res.rows;
    });
};

export const selectUser = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username=($1)`, [username])
    .then((res) => {
      return res.rows;
    });
};
