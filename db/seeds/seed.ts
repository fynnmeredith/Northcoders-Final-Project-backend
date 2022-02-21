import { db } from "../connection"
import format from "pg-format"
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
        start_date DATE,
        end_date DATE NOT NULL,
        type VARCHAR(15) NOT NULL,
        status VARCHAR(15) NOT NULL,
        owner VARCHAR(25) NOT NULL,
        target_value DECIMAL,
        unit VARCHAR(15),
        progress JSONB
      );`)
    })
    .then(() => {
      const query = format(
        `INSERT INTO subgoals
          (goal_id, objective, start_date, end_date, type, status, owner, target_value, unit, progress)
          VALUES
          %L;`,
        formatSubgoals(subgoalData)
      );
      console.log(query)
      return db.query(query);
    })
    
};

export { seed }