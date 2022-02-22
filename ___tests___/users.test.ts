import { db } from "../db/connection";
import * as testData from "../db/data/test-data/index";
import { seed } from "../db/seeds/seed";
import { app } from "../app";
import request from "supertest";
import {} from "ts-jest";

beforeEach(() => seed(testData));

describe("/api/users", () => {
  describe("Get all users", () => {
    test("Basic Functionality", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((res) => {
          expect(res.body.users).toBeInstanceOf(Array);
          expect(res.body.users).toHaveLength(8);
          res.body.users.forEach((user) => {
            expect(user).toMatchObject({
              username: expect.any(String),
              profile: expect.any(String),
            });
          });
        });
    });
  });
});

describe("/api/users", () => {
  describe("POST USER", () => {
    test("Post new user works", () => {
      return request(app)
        .post("/api/users")
        .send({ username: "test", profile: "string url" })
        .expect(200)
        .then((res) => {
          expect(res.body.user[0]).toBeInstanceOf(Object);
          expect(res.body.user[0]).toMatchObject({
            username: expect.any(String),
            profile: expect.any(String),
          });
        });
    });
    test("Post new user that exists throws error message", () => {
      return request(app)
        .post("/api/users")
        .send({ username: "jeff", profile: "fail test" })
        .expect(406)
        .then((res) => {
          console.log(res);
          expect(res.body.message).toBe("Username already taken");
        });
    });
    test("Post new user, thrown error if username is blank", () => {
      return request(app)
        .post("/api/users")
        .send({ username: "", profile: "failedtest" })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe(
            "Bad request, please submit a username"
          );
        });
    });
    //Removed frome scope
    test.skip("Post new user, thrown error if username is too long", () => {
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
    test.skip("Post new user, throw error if profile url is invalid", () => {
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
});

//TBC IF PROFILE IMG URL IS STORED VIA AUTHENTICATION
describe.only("Patch /api/users", () => {
  test("Post user profile works", () => {
    return request(app)
      .patch("/api/users")
      .send({ username: "jeff", profile: "stringurl" })
      .expect(200)
      .then((res) => {
        console.log("TEST POINT", res);
        expect(res.body.user[0]).toBeInstanceOf(Object);
        expect(res.body.user[0]).toMatchObject({
          profile: expect.any(String),
        });
      });
  });
  test("Post user profile request with missing username throws error", () => {
    return request(app)
      .patch("/api/users")
      .send({ username: "", profile: "test profile change" })
      .expect(400)
      .then((res) => {
        console.log(res);
        expect(res.body.message).toBe("Bad request");
      });
  });
  test("Post user profile request with missing profile key throws error", () => {
    return request(app)
      .patch("/api/users")
      .send({ username: "jeff" })
      .expect(400)
      .then((res) => {
        expect(res.body.user[0]).toBeInstanceOf(Object);
        expect(res.body.user[0]).toMatchObject({
          username: expect.any(String),
          profile: expect.any(String),
        });
      });
  });
});

describe("/api/users", () => {
  describe("DELETE", () => {
    test("Delete user profile works", () => {
      return request(app)
        .delete("/api/users")
        .send({ username: "jeff" })
        .expect(200)
        .then((res) => {});
    });
    test("Delete user profile request with non-existent user throws error", () => {});
    test("Delete user profile request with missing keys throws error", () => {});
  });
});

describe("/api/users/:username", () => {
  describe("GET user by username", () => {
    test("Get user by username works", () => {});
    test("Get user by username with non-existent username throws error", () => {});
    test("Get user by username request with missing keys throws error", () => {});
  });
});

export {};
