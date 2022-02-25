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
describe("/api/users GET all users", function () {
    test("Basic Functionality", function () {
        return (0, supertest_1["default"])(app_1.app)
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
        return (0, supertest_1["default"])(app_1.app)
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
        return (0, supertest_1["default"])(app_1.app)
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
        return (0, supertest_1["default"])(app_1.app)
            .get("/api/users?search=t")
            .expect(200)
            .then(function (res) {
            console.log(res.body.users);
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
        return (0, supertest_1["default"])(app_1.app)
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
        return (0, supertest_1["default"])(app_1.app)
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
        return (0, supertest_1["default"])(app_1.app)
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
        return (0, supertest_1["default"])(app_1.app)
            .post("/api/users")
            .send({ username: "jeff", profile: "fail test" })
            .expect(406)
            .then(function (res) {
            console.log(res);
            expect(res.body.message).toBe("Username already taken");
        });
    });
    test("Post new user, thrown error if username is blank", function () {
        return (0, supertest_1["default"])(app_1.app)
            .post("/api/users")
            .send({ username: "", profile: "failedtest" })
            .expect(400)
            .then(function (res) {
            expect(res.body.message).toBe("Bad request, please submit a username");
        });
    });
    //Removed frome scope
    test.skip("Post new user, thrown error if username is too long", function () {
        //   return request(app)
        //     .post("/api/users")
        //     .send({ username: "abcdefghijklmnopqrstuvw", profile: "failedtest" })
        //     .expect(406)
        //     .then((res) => {
        //       expect(res.body.message).toBe(
        //         "Bad request, please submit a shorter username"
        //       );
        //     });
    });
    //Removed frome scope
    test.skip("Post new user, throw error if profile url is invalid", function () {
        //   return request(app)
        //     .post("/api/users")
        //     .send({ username: "testusername", profile: "bademail" })
        //     .expect(406)
        //     .then((res) => {
        //       expect(res.body.message).toBe(
        //         "Bad request, please submit a shorter profile url"
        //       );
        //     });
    });
});
//TBC IF PROFILE IMG URL IS STORED VIA AUTHENTICATION
describe("/api/users patch user profile works", function () {
    test("patch user profile works, without avatar_url", function () {
        return (0, supertest_1["default"])(app_1.app)
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
        return (0, supertest_1["default"])(app_1.app)
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
        return (0, supertest_1["default"])(app_1.app)
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
        return (0, supertest_1["default"])(app_1.app)
            .patch("/api/users")
            .send({ username: "", profile: "test profile change" })
            .expect(400)
            .then(function (res) {
            expect(res.body.message).toBe("Bad request");
        });
    });
    test("patch user profile request with missing profile key throws error", function () {
        return (0, supertest_1["default"])(app_1.app)
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
        return (0, supertest_1["default"])(app_1.app)["delete"]("/api/users")
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
            return (0, supertest_1["default"])(app_1.app)
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
