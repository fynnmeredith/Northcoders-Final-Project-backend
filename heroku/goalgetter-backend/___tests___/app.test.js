"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var connection_1 = require("../db/connection");
var testData = __importStar(require("../db/data/test-data/index"));
var seed_1 = require("../db/seeds/seed");
beforeEach(function () { return seed_1.seed(testData); });
describe("", function () {
    describe("seed works correctly", function () {
        test("subgoals table correctly seeded", function () {
            return connection_1.db.query("SELECT * FROM subgoals;").then(function (res) {
                expect(res.rows.length).toBe(13);
                res.rows.forEach(function (subgoal) {
                    expect(subgoal).toEqual(expect.objectContaining({
                        subgoal_id: expect.any(Number),
                        goal_id: expect.any(Number),
                        objective: expect.any(String),
                        end_date: expect.any(Date),
                        type: expect.any(String),
                        status: expect.any(String),
                        owner: expect.any(String)
                    }));
                });
            });
        });
        test("goals table correctly seeded", function () {
            return connection_1.db.query("SELECT * FROM goals;").then(function (res) {
                expect(res.rows.length).toBe(12);
                res.rows.forEach(function (goal) {
                    expect(goal).toEqual(expect.objectContaining({
                        goal_id: expect.any(Number),
                        objective: expect.any(String),
                        description: expect.any(String),
                        end_date: expect.any(Date),
                        type: expect.any(String),
                        status: expect.any(String),
                        owner: expect.any(String)
                    }));
                });
            });
        });
        test("users table correctly seeded", function () {
            return connection_1.db.query("SELECT * FROM users;").then(function (res) {
                expect(res.rows.length).toBe(8);
                res.rows.forEach(function (user) {
                    expect(user).toEqual(expect.objectContaining({
                        username: expect.any(String),
                        profile: expect.any(String)
                    }));
                });
            });
        });
        test("posts table correctly seeded", function () {
            return connection_1.db.query("SELECT * FROM posts;").then(function (res) {
                expect(res.rows.length).toBe(5);
                res.rows.forEach(function (post) {
                    expect(post).toEqual(expect.objectContaining({
                        post_id: expect.any(Number),
                        associated_data_type: expect.any(String),
                        associated_id: expect.any(Number),
                        owner: expect.any(String),
                        datetime: expect.any(Date)
                    }));
                });
            });
        });
        test("comments table correctly seeded", function () {
            return connection_1.db.query("SELECT * FROM comments;").then(function (res) {
                expect(res.rows.length).toBe(5);
                res.rows.forEach(function (comment) {
                    expect(comment).toEqual(expect.objectContaining({
                        comment_id: expect.any(Number),
                        post_id: expect.any(Number),
                        owner: expect.any(String),
                        message: expect.any(String),
                        datetime: expect.any(Date)
                    }));
                });
            });
        });
        test("reactions table correctly seeded", function () {
            return connection_1.db.query("SELECT * FROM reactions;").then(function (res) {
                expect(res.rows.length).toBe(5);
                res.rows.forEach(function (reaction) {
                    expect(reaction).toEqual(expect.objectContaining({
                        reaction_id: expect.any(Number),
                        post_id: expect.any(Number),
                        owner: expect.any(String),
                        reaction: expect.any(String)
                    }));
                });
            });
        });
        test("friendships table correctly seeded", function () {
            return connection_1.db.query("SELECT * FROM friendships;").then(function (res) {
                expect(res.rows.length).toBe(10);
                res.rows.forEach(function (friendship) {
                    expect(friendship).toEqual(expect.objectContaining({
                        friendship_id: expect.any(Number),
                        user_1: expect.any(String),
                        user_2: expect.any(String)
                    }));
                });
            });
        });
    });
});
