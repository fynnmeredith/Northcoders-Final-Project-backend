import {db} from"../db/connection"

export const selectUsers = () =>{

    return db.query(`SELECT * FROM users`)
    .then((res)=>{
        return res.rows
    })

}

export const insertUser = (username,profile) => {
    
    return db.query(`INSERT INTO users (username,profile) VALUES ($1,$2) RETURNING *`,[username,profile])
    .then((res)=>{
        return res.rows
    })

}