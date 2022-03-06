"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var testData = __importStar(require("../db/data/test-data/index"));
var seed_1 = require("../db/seeds/seed");
var app_1 = require("../app");
var supertest_1 = __importDefault(require("supertest"));
beforeEach(function () { return seed_1.seed(testData); });
describe("Post social media post", function () {
    test("Post social media post returns expected object data type", function () {
        return supertest_1["default"](app_1.app)
            .post("/api/posts")
            .send({
            associated_data_type: "goal",
            associated_id: 3,
            owner: "jeff",
            datetime: new Date(2022, 1, 23, 15, 24, 0),
            message: "Jeff Post social media post test"
        })
            .expect(200)
            .then(function (res) {
            expect(res.body.post[0]).toBeInstanceOf(Object);
            expect(res.body.post[0]).toMatchObject({
                associated_data_type: "goal",
                associated_id: 3,
                owner: "jeff",
                datetime: "2022-02-23T15:24:00.000Z",
                message: "Jeff Post social media post test"
            });
        });
    });
    test("Post social media error, non-existent goal id", function () {
        return supertest_1["default"](app_1.app)
            .post("/api/posts")
            .send({
            associated_data_type: "goal",
            associated_id: 666,
            owner: "jeff",
            datetime: new Date(),
            message: "Jeff Post social media post test"
        })
            .expect(400)
            .then(function (res) {
            expect(res.body.message).toBe("Bad request");
        });
    });
    test("Post social media error, non-existent subgoal id", function () {
        return supertest_1["default"](app_1.app)
            .post("/api/posts")
            .send({
            associated_data_type: "subgoal",
            associated_id: 666,
            owner: "jeff",
            datetime: new Date(),
            message: "Jeff Post social media post test"
        })
            .expect(400)
            .then(function (res) {
            expect(res.body.message).toBe("Bad request");
        });
    });
    test("Post social media error, non-existent user", function () {
        return supertest_1["default"](app_1.app)
            .post("/api/posts")
            .send({
            associated_data_type: "goal",
            associated_id: 2,
            owner: "Farquad",
            datetime: new Date(),
            message: "Farquad Post social media post test"
        })
            .expect(400)
            .then(function (res) {
            expect(res.body.message).toBe("Bad request");
        });
    });
    test("Post social media error, data type not of goal/subgoal type", function () {
        return supertest_1["default"](app_1.app)
            .post("/api/posts")
            .send({
            associated_data_type: "running",
            associated_id: 2,
            owner: "Jeff",
            datetime: new Date(),
            message: "Jeff Post social media post test"
        })
            .expect(400)
            .then(function (res) {
            expect(res.body.message).toBe("Bad request");
        });
    });
    test("Post social media error, request body missing required keys", function () {
        return supertest_1["default"](app_1.app)
            .post("/api/posts")
            .send({
            associated_data_type: "goal",
            associated_id: 2,
            message: "Test social media message"
        })
            .expect(400)
            .then(function (res) {
            expect(res.body.message).toBe("Bad request");
        });
    });
});
// TBC
describe.skip("Delete social media post", function () {
    test("Delete post works and returns deleted post data", function () {
        return supertest_1["default"](app_1.app)["delete"]("/api/posts/1")
            .expect(200)
            .then(function (res) {
            expect(res.body.post).toBeInstanceOf(Object);
            expect(res.body.post).toMatchObject({
                post_id: 71,
                associated_data_type: expect.any(Number),
                associated_id: expect.any(Number),
                owner: expect.any(Number),
                datetime: expect.any(Date),
                message: expect.any(Number)
            });
        });
    });
    test("Delete post of a non existing post ID returns an error message", function () {
        return supertest_1["default"](app_1.app)["delete"]("/api/posts/666")
            .expect(404)
            .then(function (res) {
            expect(res.body.message).toBe("Post not found");
        });
    });
});
describe("Get social media post by user, sort by date-time", function () {
    test("Get social media posts by user works", function () {
        return supertest_1["default"](app_1.app)
            .get("/api/posts/jeff")
            .expect(200)
            .then(function (res) {
            expect(res.body.posts).toBeInstanceOf(Array);
            res.body.posts.forEach(function (post) {
                expect(post).toBeInstanceOf(Object);
                expect(post).toMatchObject({
                    associated_data_type: expect.any(String),
                    associated_id: expect.any(Number),
                    owner: expect.any(String),
                    datetime: expect.any(String),
                    message: expect.any(String)
                });
            });
        });
    });
    test("Get social media post throws error for non existent user", function () {
        return supertest_1["default"](app_1.app)
            .get("/api/posts/farquad")
            .expect(400)
            .then(function (res) {
            expect(res.body.message).toBe("Bad request");
        });
    });
});
// TBC
describe.skip("Get social media post by friends, sort by date-time", function () {
    test("", function () {
        return supertest_1["default"](app_1.app)
            .get("/api/posts/friendsPosts/jeff")
            .expect(200)
            .then(function (res) {
            expect(res.body.posts).toBeInstanceOf(Array);
            res.body.posts.forEach(function (post) {
                expect(post).toBeInstanceOf(Object);
                expect(post).toMatchObject({
                    associated_data_type: expect.any(Number),
                    associated_id: expect.any(Number),
                    owner: expect.any(Number),
                    datetime: expect.any(String),
                    message: expect.any(Number)
                });
            });
        });
    });
});
