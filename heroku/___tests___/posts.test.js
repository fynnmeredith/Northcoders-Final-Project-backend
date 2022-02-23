"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
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
beforeEach(function () { return (0, seed_1.seed)(testData); });
describe("Post social media post", function () {
    test("Post social media post returns expected object data type", function () {
        return (0, supertest_1["default"])(app_1.app)
            .post("api/post")
            .send({
            post_id: 71,
            associated_data_type: "Goal",
            associated_id: 3,
            owner: "Jeff",
            datetime: new Date(),
            message: "Jeff Post social media post test"
        })
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
    test("Post social media error, non-existent goal/subgoal id", function () {
        return (0, supertest_1["default"])(app_1.app)
            .post("api/post")
            .send({
            post_id: 72,
            associated_data_type: "Goal",
            associated_id: 666,
            owner: "Jeff",
            datetime: new Date(),
            message: "Jeff Post social media post test"
        })
            .expect(404)
            .then(function (res) {
            expect(res.body.msg).toBe("Goal/Post ID Not Found");
        });
    });
    test("Post social media error, non-existent user", function () {
        return (0, supertest_1["default"])(app_1.app)
            .post("api/post")
            .send({
            post_id: 72,
            associated_data_type: "Goal",
            associated_id: 2,
            owner: "Farquad",
            datetime: new Date(),
            message: "Farquad Post social media post test"
        })
            .expect(404)
            .then(function (res) {
            expect(res.body.msg).toBe("User Not Found");
        });
    });
    test("Post social media error, data type not of goal/subgoal type", function () {
        return (0, supertest_1["default"])(app_1.app)
            .post("api/post")
            .send({
            post_id: 72,
            associated_data_type: "Running",
            associated_id: 2,
            owner: "Jeff",
            datetime: new Date(),
            message: "Jeff Post social media post test"
        })
            .expect(400)
            .then(function (res) {
            expect(res.body.msg).toBe("Invalid goal type");
        });
    });
});
describe("Delete social media post", function () {
    test("Delete post works and returns deleted post data", function () {
        return (0, supertest_1["default"])(app_1.app)["delete"]("api/post/1")
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
        return (0, supertest_1["default"])(app_1.app)["delete"]("api/post/666")
            .expect(404)
            .then(function (res) {
            expect(res.body.msg).toBe("Post not found");
        });
    });
});
describe("Get social media post by user, sort by date-time", function () {
    describe("", function () {
        test("", function () { });
    });
});
describe("Get social media post by friends, sort by date-time", function () {
    describe("", function () {
        test("", function () { });
    });
});
