import { db } from "../connection"
import format from "pg-format"
import { formatUsers, formatGoals, formatSubgoals } from '../../utils/format'

const seed = (data) => {

  const { userData, goalData, subgoalData } = data
  
  return db
    .query('DROP TABLE IF EXISTS subgoals;')
    .then(() => {
      return db.query('DROP TABLE IF EXISTS goals;')})
    .then(() => {
      return db.query('DROP TABLE IF EXISTS users;')})
    .then(() => {
      return db.query(`
      CREATE TABLE users (
        username VARCHAR(25) PRIMARY KEY,
        profile VARCHAR(300)
      );`)
    })
    .then(() => {
      return db.query(`
      CREATE TABLE goals (
        goal_id SERIAL PRIMARY KEY,
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
        REFERENCES users(username)
      );`)
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
      );`)
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
          (objective, start_date, end_date, type, status, owner, target_value, unit, progress, finish_date)
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
    
};

export { seed }