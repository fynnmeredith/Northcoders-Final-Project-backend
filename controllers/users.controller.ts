import {selectUsers, insertUser} from '../models/users.model'

export const getUsers = (req,res,next) => {
    selectUsers()
    .then((users)=>{
        res.status(200).send({users:users})
    })
}

export const postUser = (req,res,next) => {

    const {username, profile}=(req.body)

    insertUser(username,profile)
    .then((user)=>{
        res.status(200).send({user:user})
    })
}

