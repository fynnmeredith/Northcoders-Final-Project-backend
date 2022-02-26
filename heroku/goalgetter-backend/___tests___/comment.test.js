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
describe("/api/comments Post new comment", function () {
    test("successfully posts a new social media comment when valid body is entered", function () { });
});
// return request(app)
//       .post("/api/post")
//       .send({
//         associated_data_type: "goal",
//         associated_id: "1",
//         owner: "jeff",
//         datetime: new Date(),
//         message: "jeff test post, im so happy to be running",
//       })
//       .expect(200)
//       .then((res) => {
//         expect(res.body.post).toBeInstanceOf(Object);
//         expect(res.body.post).toMatchObject({
//           associated_data_type: expect.any(String),
//           associated_id: expect.any(String),
//           owner: expect.any(String),
//           datetime: expect.any(String),
//           message: expect.any(String),
//         });
//       });
describe("/api/comments gets all comments for a post", function () {
    test("successfully gets comments when valid id is entered", function () {
        return supertest_1["default"](app_1.app)
            .get("/api/posts/1/comments")
            .expect(200)
            .then(function (res) {
            console.log(res.body);
            expect(res.body.comments).toBeInstanceOf(Array);
            res.body.comments.forEach(function (comment) {
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    post_id: expect.any(Number),
                    owner: expect.any(String),
                    message: expect.any(String),
                    datetime: expect.any(String)
                });
            });
        });
    });
    test("responds with an error when an invalid post id is entered", function () {
        return supertest_1["default"](app_1.app)
            .get("/api/posts/900/comments")
            .expect(400)
            .then(function (res) {
            console.log(res);
            expect(res.body.message).toBe("Bad request");
        });
    });
});
describe("/api/comments Post new comment", function () {
    test("successfully posts a new social media comment when valid body is entered", function () {
        return supertest_1["default"](app_1.app)
            .post("/api/posts/1/comments")
            .send({
            message: "Keep it up your smashing it",
            owner: "jeff",
            datetime: new Date(2022, 11, 11, 12, 12, 12)
        })
            .expect(200)
            .then(function (res) {
            expect(res.body.comment[0]).toBeInstanceOf(Object);
            expect(res.body.comment[0]).toMatchObject({
                message: "Keep it up your smashing it",
                owner: "jeff",
                datetime: "2022-12-11T12:12:12.000Z"
            });
        });
    });
    test("post comment with a missing required key is handed an error", function () {
        return supertest_1["default"](app_1.app)
            .post("/api/posts/1/comments")
            .send({
            message: "Keep it up your smashing it",
            datetime: new Date(2022, 11, 11, 12, 12, 12)
        })
            .expect(400)
            .then(function (res) {
            console.log(res);
            expect(res.body.message).toBe("Bad request");
        });
    });
    test("post comment with a missing required key is handed an error", function () {
        return supertest_1["default"](app_1.app)
            .post("/api/posts/1/comments")
            .send({
            message: "Keep it up your smashing it",
            owner: "fakeuser",
            datetime: new Date(2022, 11, 11, 12, 12, 12)
        })
            .expect(400)
            .then(function (res) {
            expect(res.body.message).toBe("Bad request");
        });
    });
});
describe("/api/comments deletes a comment", function () {
    test("successfully deletes a comment when a valid id is entered", function () {
        return supertest_1["default"](app_1.app)["delete"]("/api/comments/1")
            .expect(200)
            .then(function (res) {
            console.log(res.body);
            expect(res.body.comment[0]).toBeInstanceOf(Object);
            expect(res.body.comment[0]).toMatchObject({
                comment_id: expect.any(Number),
                post_id: expect.any(Number),
                owner: expect.any(String),
                message: expect.any(String),
                datetime: expect.any(String)
            });
        });
    });
    test("unsuccessfully deletes a comment when an invalid comment id is entered, returns an error", function () {
        return supertest_1["default"](app_1.app)["delete"]("/api/comments/900")
            .expect(400)
            .then(function (res) {
            expect(res.body.message).toBe("Bad request");
        });
    });
});
