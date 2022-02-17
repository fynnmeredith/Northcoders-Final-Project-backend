import { db } from "../connection.js"
const format = require("pg-format")

const seed = (data:object) => {

  const { } = data
  
  return db
    .query(`DROP TABLE IF EXISTS users;`)
    .then(() => {
      return db.query(`
      CREATE TABLE users ();`)
    })
    .then(() => {
      const query = format(
        `INSERT INTO users
          ()
          VALUES
          %L;`,
        
      );
      return db.query(query);
    })
    
};

export { seed }