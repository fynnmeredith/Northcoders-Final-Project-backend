import * as testData from "../db/data/test-data/index";
import { seed } from "../db/seeds/seed";
import { app } from "../app";
import request from "supertest";
import {} from "ts-jest";

beforeEach(() => seed(testData));

describe("/api/users GET all users", () => {
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
  test("Search query with t", () => {
    return request(app)
      .get("/api/users?search=t")
      .expect(200)
      .then((res) => {
        expect(res.body.users).toBeInstanceOf(Array);
        expect(res.body.users).toHaveLength(4);
        res.body.users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            profile: expect.any(String),
          });
        });
      });
  });
  test("Search query with je", () => {
    return request(app)
      .get("/api/users?search=je")
      .expect(200)
      .then((res) => {
        expect(res.body.users).toBeInstanceOf(Array);
        expect(res.body.users).toHaveLength(1);
        expect(res.body.users[0]).toMatchObject({
          username: "jeff",
          profile: "Constant striver",
        });
      });
  });
  test("Search query with t", () => {
    return request(app)
      .get("/api/users?search=t")
      .expect(200)
      .then((res) => {
        expect(res.body.users).toBeInstanceOf(Array);
        expect(res.body.users).toHaveLength(4);
        res.body.users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            profile: expect.any(String),
          });
        });
      });
  });
  test("Search query with empty string", () => {
    return request(app)
      .get("/api/users?search=")
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

describe("/api/users POST USER", () => {
  test("Post new user works, without avatar url provided", () => {
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
  test("Post new user works, with avatar_url provided", () => {
    return request(app)
      .post("/api/users")
      .send({
        username: "test",
        profile: "string url",
        avatar_url: "urltesteryea",
      })
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
        expect(res.body.message).toBe("Username already taken");
      });
  });
  test("Post new user, thrown error if username is blank", () => {
    return request(app)
      .post("/api/users")
      .send({ username: "", profile: "failedtest" })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad request, please submit a username");
      });
  });
});

describe("/api/users patch user profile works", () => {
  test("patch user profile works, without avatar_url", () => {
    return request(app)
      .patch("/api/users")
      .send({ username: "jeff", profile: "stringurl" })
      .expect(200)
      .then((res) => {
        expect(res.body.user[0]).toBeInstanceOf(Object);
        expect(res.body.user[0]).toMatchObject({
          username: expect.any(String),
          profile: expect.any(String),
          avatar_url: null,
        });
      });
  });
  test("patch user profile works, with avatar_url and profile", () => {
    return request(app)
      .patch("/api/users")
      .send({
        username: "jeff",
        profile: "stringurl",
        avatar_url: "https://testavatarurl.com",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.user[0]).toBeInstanceOf(Object);
        expect(res.body.user[0]).toMatchObject({
          username: expect.any(String),
          profile: expect.any(String),
          avatar_url: expect.any(String),
        });
      });
  });
  test("patch user profile works, without profile", () => {
    return request(app)
      .patch("/api/users")
      .send({
        username: "jeff",
        avatar_url: "https://testavatarurl.com",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.user[0]).toBeInstanceOf(Object);
        expect(res.body.user[0]).toMatchObject({
          username: expect.any(String),
          profile: expect.any(String),
          avatar_url: expect.any(String),
        });
      });
  });
  test("patch user profile request with missing username throws error", () => {
    return request(app)
      .patch("/api/users")
      .send({ username: "", profile: "test profile change" })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad request");
      });
  });
  test("patch user profile request with missing profile key throws error", () => {
    return request(app)
      .patch("/api/users")
      .send({ username: "newusertest" })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad request");
      });
  });
});

export {};
