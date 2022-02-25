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
describe("/api/friendships", function () {
    describe("POST", function () {
        test("successfully creates friendship if both users exist and they aren't already friends", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/friendships")
                .send({ user_1: "martina", user_2: "susan" })
                .expect(200)
                .then(function (res) {
                expect(res.body.friendship).toEqual({
                    friendship_id: 11,
                    user_1: "martina",
                    user_2: "susan"
                });
            });
        });
        test("returns error if post object does not have user_1 property", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/friendships")
                .send({ user_2: "susan" })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error if post object does not have user_2 property", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/friendships")
                .send({ user_1: "martina" })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error if user_1 does not exist", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/friendships")
                .send({ user_1: "simon", user_2: "susan" })
                .expect(404)
                .then(function (res) {
                expect(res.body.message).toBe("User 1 not found");
            });
        });
        test("returns error if user_2 does not exist", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/friendships")
                .send({ user_1: "martina", user_2: "simon" })
                .expect(404)
                .then(function (res) {
                expect(res.body.message).toBe("User 2 not found");
            });
        });
        test("returns error if user_1 and user_2 are the same user", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/friendships")
                .send({ user_1: "susan", user_2: "susan" })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("User cannot befriend themselves");
            });
        });
        test("returns error if user_1 and user_2 are already friends, with user_1/2 order retained", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/friendships")
                .send({ user_1: "betty", user_2: "dmitri" })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Users are already friends");
            });
        });
        test("returns error if user_1 and user_2 are already friends, with user_1/2 order reversed", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/friendships")
                .send({ user_1: "dmitri", user_2: "betty" })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Users are already friends");
            });
        });
    });
});
describe("/api/friendships/:friendship_id", function () {
    describe("DELETE", function () {
        test("successfully deletes friends if friendship_id is valid", function () {
            return (0, supertest_1["default"])(app_1.app)["delete"]("/api/friendships/4")
                .expect(204)
                .then(function () {
                return (0, checkExists_1.checkFriendshipExists)(4);
            })
                .then(function (doesFriendshipExist) {
                expect(doesFriendshipExist).toBe(false);
            });
        });
        test("returns error if friendship_id is invalid", function () {
            return (0, supertest_1["default"])(app_1.app)["delete"]("/api/friendships/four")
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error if friendship does not exist", function () {
            return (0, supertest_1["default"])(app_1.app)["delete"]("/api/friendships/9999")
                .expect(404)
                .then(function (res) {
                expect(res.body.message).toBe("Friendship not found");
            });
        });
    });
});
describe("/api/users/:username/friendships", function () {
    describe("GET", function () {
        test("successfully retrieves friendships of user where user is user_1 of friendship", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/users/betty/friendships")
                .expect(200)
                .then(function (res) {
                expect(res.body.friendships.length).toBe(2);
                res.body.friendships.forEach(function (friendship) {
                    expect(friendship).toEqual(expect.objectContaining({
                        friendship_id: expect.any(Number),
                        user_1: expect.any(String),
                        user_2: expect.any(String)
                    }));
                    expect(friendship.user_1 === "betty" || friendship.user_2 === "betty").toBeTruthy();
                });
            });
        });
        test("successfully retrieves friendships of user where user is user_1 or user_2 of friendship", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/users/jeff/friendships")
                .expect(200)
                .then(function (res) {
                expect(res.body.friendships.length).toBe(4);
                res.body.friendships.forEach(function (friendship) {
                    expect(friendship).toEqual(expect.objectContaining({
                        friendship_id: expect.any(Number),
                        user_1: expect.any(String),
                        user_2: expect.any(String)
                    }));
                    expect(friendship.user_1 === "jeff" || friendship.user_2 === "jeff").toBeTruthy();
                });
            });
        });
        test("returns error if user does not exist", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/users/simon/friendships")
                .expect(404)
                .then(function (res) {
                expect(res.body.message).toBe("User not found");
            });
        });
        test("successfully retrieves empty array if user has no friends", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/users/martina/friendships")
                .expect(200)
                .then(function (res) {
                expect(res.body.friendships).toEqual([]);
            });
        });
    });
});
