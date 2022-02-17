import { db } from "../connection"
import * as format from "pg-format"
import { formatSubgoals } from '../../utils/format'

const seed = (data) => {

  const { subgoalData } = data
  
  return db
    .query(`DROP TABLE IF EXISTS subgoals;`)
    .then(() => {
      return db.query(`
      CREATE TABLE subgoals (
        subgoal_id SERIAL PRIMARY KEY,
        goal_id INTEGER NOT NULL,
        objective VARCHAR(100) NOT NULL,
        type VARCHAR(15) NOT NULL,
        status VARCHAR(15) NOT NULL,
        owner VARCHAR(25) NOT NULL,
        target_value DECIMAL,
        unit VARCHAR(15)
      );`)
    })
    .then(() => {
      const query = format.default(
        `INSERT INTO subgoals
          (goal_id, objective, type, status, owner, target_value, unit)
          VALUES
          %L;`,
        formatSubgoals(subgoalData)
      );

      return db.query(query);
    })
    
};

export { seed }