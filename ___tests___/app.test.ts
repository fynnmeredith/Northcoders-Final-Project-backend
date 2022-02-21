import { db } from '../db/connection'
import * as testData from '../db/data/test-data/index'
import { seed } from '../db/seeds/seed'
import { app } from '../app'
import * as request from 'supertest'
import {} from 'ts-jest'
import exp from 'constants'

beforeEach(() => seed(testData))

describe('', () => {

    describe('seed works correctly', () => {

        test('subgoals table correctly seeded', () => {
    
            return db.query(`SELECT * FROM subgoals;`)
                .then((res) => {

                    console.log(res.rows)
    
                    expect(res.rows.length).toBe(8)
    
                    res.rows.forEach((subgoal) => {
    
                        expect(subgoal).toEqual(
                        expect.objectContaining({
    
                            subgoal_id: expect.any(Number),
                            goal_id: expect.any(Number),
                            objective: expect.any(String),
                            end_date: expect.any(Date),
                            type: expect.any(String), 
                            status: expect.any(String), 
                            owner: expect.any(String)

                        })
                        )
    
                    })
    
                })
    
        })
    
        test('goals table correctly seeded', () => {
    
            return db.query(`SELECT * FROM goals;`)
                .then((res) => {

                    console.log(res.rows)
    
                    expect(res.rows.length).toBe(7)
    
                    res.rows.forEach((goal) => {
    
                        expect(goal).toEqual(
                        expect.objectContaining({
    
                            goal_id: expect.any(Number),
                            objective: expect.any(String),
                            description: expect.any(String),
                            end_date: expect.any(Date),
                            type: expect.any(String),
                            status: expect.any(String),
                            owner: expect.any(String)

                        })
                        )
    
                    })
    
                })
    
        })

        test('users table correctly seeded', () => {
    
            return db.query(`SELECT * FROM users;`)
                .then((res) => {

                    console.log(res.rows)
    
                    expect(res.rows.length).toBe(8)
    
                    res.rows.forEach((user) => {
    
                        expect(user).toEqual(
                        expect.objectContaining({
    
                            username: expect.any(String),
                            profile: expect.any(String),

                        })
                        )
    
                    })
    
                })
    
        })

        test('posts table correctly seeded', () => {
    
            return db.query(`SELECT * FROM posts;`)
                .then((res) => {

                    console.log(res.rows)
    
                    expect(res.rows.length).toBe(5)
    
                    res.rows.forEach((post) => {
    
                        expect(post).toEqual(
                        expect.objectContaining({
    
                            post_id: expect.any(Number),
                            associated_data_type: expect.any(String),
                            associated_id: expect.any(Number),
                            owner: expect.any(String),
                            datetime: expect.any(Date),

                        })
                        )
    
                    })
    
                })
    
        })

        test('comments table correctly seeded', () => {
    
            return db.query(`SELECT * FROM comments;`)
                .then((res) => {

                    console.log(res.rows)
    
                    expect(res.rows.length).toBe(8)
    
                    res.rows.forEach((comment) => {
    
                        expect(comment).toEqual(
                        expect.objectContaining({
    
                            comment_id: expect.any(Number),
                            post_id: expect.any(Number),
                            owner: expect.any(String),
                            messgae: expect.any(String),
                            datetime: expect.any(Date),

                        })
                        )
    
                    })
    
                })
    
        })

        test('reactions table correctly seeded', () => {
    
            return db.query(`SELECT * FROM reactions;`)
                .then((res) => {

                    console.log(res.rows)
    
                    expect(res.rows.length).toBe(5)
    
                    res.rows.forEach((reaction) => {
    
                        expect(reaction).toEqual(
                        expect.objectContaining({
    
                            reaction_id: expect.any(Number),
                            post_id: expect.any(Number),
                            owner: expect.any(String),
                            reaction: expect.any(String)

                        })
                        )
    
                    })
    
                })
    
        })

        test('friendships table correctly seeded', () => {
    
            return db.query(`SELECT * FROM friendships;`)
                .then((res) => {

                    console.log(res.rows)
    
                    expect(res.rows.length).toBe(10)
    
                    res.rows.forEach((friendship) => {
    
                        expect(friendship).toEqual(
                        expect.objectContaining({
    
                            user_1: expect.any(Number),
                            user_2: expect.any(Number)

                        })
                        )
    
                    })
    
                })
    
        })

    })

})

export {}
