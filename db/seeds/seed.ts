import { db } from "../connection";
import format from "pg-format";
import {
  formatUsers,
  formatGoals,
  formatSubgoals,
  formatPosts,
  formatComments,
  formatReactions,
  formatFriendships,
} from "../../utils/format";

const seed = (data) => {
  const {
    userData,
    goalData,
    subgoalData,
    postData,
    commentData,
    reactionData,
    friendshipData,
  } = data;

  return db
    .query("DROP TABLE IF EXISTS friendships;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS reactions;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS comments;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS posts;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS subgoals;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS goals;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users;");
    })
    .then(() => {
      return db.query(`
      CREATE TABLE users (
        username VARCHAR(25) PRIMARY KEY,
        profile VARCHAR(300)
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE goals (
        goal_id SERIAL PRIMARY KEY,
        objective VARCHAR(200) NOT NULL,
        description VARCHAR(500) NOT NULL,
        start_date DATE,
        end_date DATE NOT NULL,
        type VARCHAR(15) NOT NULL,
        status VARCHAR(15) NOT NULL,
        owner VARCHAR(25) NOT NULL,
        target_value DECIMAL,
        unit VARCHAR(15),
        progress JSONB,
        finish_date DATE,
        FOREIGN KEY (owner)
        REFERENCES users(username)
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE subgoals (
        subgoal_id SERIAL PRIMARY KEY,
        goal_id INTEGER NOT NULL,
        objective VARCHAR(200) NOT NULL,
        start_date DATE,
        end_date DATE NOT NULL,
        type VARCHAR(15) NOT NULL,
        status VARCHAR(15) NOT NULL,
        owner VARCHAR(25) NOT NULL,
        target_value DECIMAL,
        unit VARCHAR(15),
        progress JSONB,
        finish_date DATE,
        FOREIGN KEY (owner)
        REFERENCES users(username),
        FOREIGN KEY (goal_id)
        REFERENCES goals(goal_id)
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE posts (
        post_id SERIAL PRIMARY KEY,
        associated_data_type VARCHAR(10) NOT NULL,
        associated_id INTEGER NOT NULL,
        owner VARCHAR(25) NOT NULL,
        datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        message VARCHAR(2000),
        FOREIGN KEY (owner)
        REFERENCES users(username)
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        post_id INTEGER NOT NULL,
        owner VARCHAR(25) NOT NULL,
        message VARCHAR(1000) NOT NULL,
        datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id)
        REFERENCES posts(post_id),
        FOREIGN KEY (owner)
        REFERENCES users(username)
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE reactions (
        reaction_id SERIAL PRIMARY KEY,
        post_id INTEGER NOT NULL,
        owner VARCHAR(25) NOT NULL,
        reaction VARCHAR(15) NOT NULL,
        FOREIGN KEY (post_id)
        REFERENCES posts(post_id),
        FOREIGN KEY (owner)
        REFERENCES users(username)
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE friendships (
        friendship_id SERIAL PRIMARY KEY,
        user_1 VARCHAR(25) NOT NULL,
        user_2 VARCHAR(25) NOT NULL
      );`);
    })
    .then(() => {
      const query = format(
        `INSERT INTO users
          (username, profile)
          VALUES
          %L;`,
        formatUsers(userData)
      );
      return db.query(query);
    })
    .then(() => {
      const query = format(
        `INSERT INTO goals
          (objective, description, start_date, end_date, type, status, owner, target_value, unit, progress, finish_date)
          VALUES
          %L;`,
        formatGoals(goalData)
      );
      return db.query(query);
    })
    .then(() => {
      const query = format(
        `INSERT INTO subgoals
          (goal_id, objective, start_date, end_date, type, status, owner, target_value, unit, progress, finish_date)
          VALUES
          %L;`,
        formatSubgoals(subgoalData)
      );
      return db.query(query);
    })
    .then(() => {
      const query = format(
        `INSERT INTO posts
          (associated_data_type, associated_id, owner, datetime, message)
          VALUES
          %L;`,
        formatPosts(postData)
      );
      return db.query(query);
    })
    .then(() => {
      const query = format(
        `INSERT INTO comments
          (post_id, owner, message, datetime)
          VALUES
          %L;`,
        formatComments(commentData)
      );
      return db.query(query);
    })
    .then(() => {
      const query = format(
        `INSERT INTO reactions
          (post_id, owner, reaction)
          VALUES
          %L;`,
        formatReactions(reactionData)
      );
      return db.query(query);
    })
    .then(() => {
      const query = format(
        `INSERT INTO friendships
          (user_1, user_2)
          VALUES
          %L;`,
        formatFriendships(friendshipData)
      );
      return db.query(query);
    });
};

export { seed };
