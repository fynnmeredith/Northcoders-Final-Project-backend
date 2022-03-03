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
describe("/api/users GET all users", function () {
    test("Basic Functionality", function () {
        return supertest_1["default"](app_1.app)
            .get("/api/users")
            .expect(200)
            .then(function (res) {
            expect(res.body.users).toBeInstanceOf(Array);
            expect(res.body.users).toHaveLength(8);
            res.body.users.forEach(function (user) {
                expect(user).toMatchObject({
                    username: expect.any(String),
                    profile: expect.any(String)
                });
            });
        });
    });
    test("Search query with t", function () {
        return supertest_1["default"](app_1.app)
            .get("/api/users?search=t")
            .expect(200)
            .then(function (res) {
            expect(res.body.users).toBeInstanceOf(Array);
            expect(res.body.users).toHaveLength(4);
            res.body.users.forEach(function (user) {
                expect(user).toMatchObject({
                    username: expect.any(String),
                    profile: expect.any(String)
                });
            });
        });
    });
    test("Search query with je", function () {
        return supertest_1["default"](app_1.app)
            .get("/api/users?search=je")
            .expect(200)
            .then(function (res) {
            console.log(res.body.users);
            expect(res.body.users).toBeInstanceOf(Array);
            expect(res.body.users).toHaveLength(1);
            expect(res.body.users[0]).toMatchObject({
                username: "jeff",
                profile: "Constant striver"
            });
        });
    });
    test("Search query with t", function () {
        return supertest_1["default"](app_1.app)
            .get("/api/users?search=t")
            .expect(200)
            .then(function (res) {
            expect(res.body.users).toBeInstanceOf(Array);
            expect(res.body.users).toHaveLength(4);
            res.body.users.forEach(function (user) {
                expect(user).toMatchObject({
                    username: expect.any(String),
                    profile: expect.any(String)
                });
            });
        });
    });
    test("Search query with je", function () {
        return supertest_1["default"](app_1.app)
            .get("/api/users?search=")
            .expect(200)
            .then(function (res) {
            expect(res.body.users).toBeInstanceOf(Array);
            expect(res.body.users).toHaveLength(8);
            res.body.users.forEach(function (user) {
                expect(user).toMatchObject({
                    username: expect.any(String),
                    profile: expect.any(String)
                });
            });
        });
    });
});
describe("/api/users POST USER", function () {
    test("Post new user works, without avatar url provided", function () {
        return supertest_1["default"](app_1.app)
            .post("/api/users")
            .send({ username: "test", profile: "string url" })
            .expect(200)
            .then(function (res) {
            expect(res.body.user[0]).toBeInstanceOf(Object);
            expect(res.body.user[0]).toMatchObject({
                username: expect.any(String),
                profile: expect.any(String)
            });
        });
    });
    test("Post new user works, with avatar_url provided", function () {
        return supertest_1["default"](app_1.app)
            .post("/api/users")
            .send({
            username: "test",
            profile: "string url",
            avatar_url: "urltesteryea"
        })
            .expect(200)
            .then(function (res) {
            expect(res.body.user[0]).toBeInstanceOf(Object);
            expect(res.body.user[0]).toMatchObject({
                username: expect.any(String),
                profile: expect.any(String)
            });
        });
    });
    test("Post new user that exists throws error message", function () {
        return supertest_1["default"](app_1.app)
            .post("/api/users")
            .send({ username: "jeff", profile: "fail test" })
            .expect(406)
            .then(function (res) {
            expect(res.body.message).toBe("Username already taken");
        });
    });
    test("Post new user, thrown error if username is blank", function () {
        return supertest_1["default"](app_1.app)
            .post("/api/users")
            .send({ username: "", profile: "failedtest" })
            .expect(400)
            .then(function (res) {
            expect(res.body.message).toBe("Bad request, please submit a username");
        });
    });
    
//TBC IF PROFILE IMG URL IS STORED VIA AUTHENTICATION
describe("/api/users patch user profile works", function () {
    test("patch user profile works, without avatar_url", function () {
        return supertest_1["default"](app_1.app)
            .patch("/api/users")
            .send({ username: "jeff", profile: "stringurl" })
            .expect(200)
            .then(function (res) {
            expect(res.body.user[0]).toBeInstanceOf(Object);
            expect(res.body.user[0]).toMatchObject({
                username: expect.any(String),
                profile: expect.any(String),
                avatar_url: null
            });
        });
    });
    test("patch user profile works, with avatar_url and profile", function () {
        return supertest_1["default"](app_1.app)
            .patch("/api/users")
            .send({
            username: "jeff",
            profile: "stringurl",
            avatar_url: "https://testavatarurl.com"
        })
            .expect(200)
            .then(function (res) {
            expect(res.body.user[0]).toBeInstanceOf(Object);
            expect(res.body.user[0]).toMatchObject({
                username: expect.any(String),
                profile: expect.any(String),
                avatar_url: expect.any(String)
            });
        });
    });
    test("patch user profile works, without profile", function () {
        return supertest_1["default"](app_1.app)
            .patch("/api/users")
            .send({
            username: "jeff",
            avatar_url: "https://testavatarurl.com"
        })
            .expect(200)
            .then(function (res) {
            expect(res.body.user[0]).toBeInstanceOf(Object);
            expect(res.body.user[0]).toMatchObject({
                username: expect.any(String),
                profile: expect.any(String),
                avatar_url: expect.any(String)
            });
        });
    });
    test("patch user profile request with missing username throws error", function () {
        return supertest_1["default"](app_1.app)
            .patch("/api/users")
            .send({ username: "", profile: "test profile change" })
            .expect(400)
            .then(function (res) {
            expect(res.body.message).toBe("Bad request");
        });
    });
    test("patch user profile request with missing profile key throws error", function () {
        return supertest_1["default"](app_1.app)
            .patch("/api/users")
            .send({ username: "newusertest" })
            .expect(400)
            .then(function (res) {
            expect(res.body.message).toBe("Bad request");
        });
    });
});
//out of scope for now
describe.skip("/api/users Delete User", function () {
    test("Delete user profile works", function () {
        return supertest_1["default"](app_1.app)["delete"]("/api/users")
            .send({ username: "jeff" })
            .expect(200)
            .then(function (res) {
            expect(res.body.user[0]).toBeInstanceOf(Object);
            expect(res.body.user[0]).toMatchObject({
                username: expect.any(String),
                profile: expect.any(String)
            });
        });
    });
    test("Delete user profile request with non-existent user throws error", function () { });
    test("Delete user profile request with missing keys throws error", function () { });
});
describe("/api/user/:username", function () {
    describe("GET user by username", function () {
        test("Get user by username works", function () {
            return supertest_1["default"](app_1.app)
                .get("/api/users/jeff")
                .expect(200)
                .then(function (res) {
                expect(res.body.user[0]).toBeInstanceOf(Object);
                expect(res.body.user[0]).toMatchObject({
                    username: "jeff",
                    profile: "Constant striver"
                });
            });
        });
    });
});
