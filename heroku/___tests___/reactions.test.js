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
var checkExists_1 = require("../utils/checkExists");
beforeEach(function () { return (0, seed_1.seed)(testData); });
describe("/api/posts/:post_id/reactions", function () {
    describe("POST", function () {
        test("successfully creates reaction if post_id and owner exist, reaction is valid, and user has not already reacted to post", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/posts/5/reactions")
                .send({ owner: "betty", reaction: "I'm proud of you" })
                .expect(200)
                .then(function (res) { });
        });
        test("returns error if post object does not have owner property", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/posts/5/reactions")
                .send({ reaction: "I'm proud of you" })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error if post object does not have reaction property", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/posts/5/reactions")
                .send({ owner: "betty" })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error if post_id is invalid", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/posts/five/reactions")
                .send({ owner: "betty", reaction: "I'm proud of you" })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error if post does not exist", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/posts/9999/reactions")
                .send({ owner: "betty", reaction: "I'm proud of you" })
                .expect(404)
                .then(function (res) {
                expect(res.body.message).toBe("Post not found");
            });
        });
        test("returns error if owner not exist", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/posts/5/reactions")
                .send({ owner: "simon", reaction: "I'm proud of you" })
                .expect(404)
                .then(function (res) {
                expect(res.body.message).toBe("User not found");
            });
        });
        test("returns error if user has already reacted to post", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/posts/5/reactions")
                .send({ owner: "stuart", reaction: "I'm proud of you" })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Cannot react to post user has already reacted to");
            });
        });
        test("returns error if reaction is invalid", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/posts/5/reactions")
                .send({ owner: "betty", reaction: "Boooo" })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Reaction not valid");
            });
        });
    });
    describe("GET", function () {
        test("successfully retrieves reactions of post when post_id is valid", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/posts/1/reactions")
                .expect(200)
                .then(function (res) { });
        });
        test("returns error if post_id is invalid", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/posts/one/reactions")
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error if post does not exist", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/posts/9999/reactions")
                .expect(404)
                .then(function (res) {
                expect(res.body.message).toBe("Post not found");
            });
        });
        test("successfully retrieves empty array if post has not reactions", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/posts/2/reactions")
                .expect(200)
                .then(function (res) {
                expect(res.body.reactions).toEqual([]);
            });
        });
    });
});
describe("/api/reactions/:reaction_id", function () {
    describe("DELETE", function () {
        test("successfully deletes reaction if reaction_id is valid", function () {
            return (0, supertest_1["default"])(app_1.app)["delete"]("/api/reactions/3")
                .expect(204)
                .then(function () {
                return (0, checkExists_1.checkReactionExists)(3);
            })
                .then(function (doesReactionExist) {
                expect(doesReactionExist).toBe(false);
            });
        });
        test("returns error if reaction_id is invalid", function () {
            return (0, supertest_1["default"])(app_1.app)["delete"]("/api/reactions/three")
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error if reaction does not exist", function () {
            return (0, supertest_1["default"])(app_1.app)["delete"]("/api/reactions/9999")
                .expect(404)
                .then(function (res) {
                expect(res.body.message).toBe("Reaction not found");
            });
        });
    });
});
