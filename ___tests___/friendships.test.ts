import * as testData from "../db/data/test-data/index";
import { seed } from "../db/seeds/seed";
import { app } from "../app";
import request from "supertest";
import {} from "ts-jest";
import { checkFriendshipExists } from "../utils/checkExists";

beforeEach(() => seed(testData));

describe("/api/friendships", () => {
  describe("POST", () => {
    test("successfully creates friendship if both users exist and they aren't already friends", () => {
      return request(app)
        .post("/api/friendships")
        .send({ user_1: "martina", user_2: "susan" })
        .expect(200)
        .then((res) => {
          expect(res.body.friendship).toEqual({
            friendship_id: 11,
            user_1: "martina",
            user_2: "susan",
          });
        });
    });
    test("returns error if post object does not have user_1 property", () => {
      return request(app)
        .post("/api/friendships")
        .send({ user_2: "susan" })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error if post object does not have user_2 property", () => {
      return request(app)
        .post("/api/friendships")
        .send({ user_1: "martina" })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error if user_1 does not exist", () => {
      return request(app)
        .post("/api/friendships")
        .send({ user_1: "simon", user_2: "susan" })
        .expect(404)
        .then((res) => {
          expect(res.body.message).toBe("User 1 not found");
        });
    });
    test("returns error if user_2 does not exist", () => {
      return request(app)
        .post("/api/friendships")
        .send({ user_1: "martina", user_2: "simon" })
        .expect(404)
        .then((res) => {
          expect(res.body.message).toBe("User 2 not found");
        });
    });
    test("returns error if user_1 and user_2 are the same user", () => {
      return request(app)
        .post("/api/friendships")
        .send({ user_1: "susan", user_2: "susan" })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("User cannot befriend themselves");
        });
    });
    test("returns error if user_1 and user_2 are already friends, with user_1/2 order retained", () => {
      return request(app)
        .post("/api/friendships")
        .send({ user_1: "betty", user_2: "dmitri" })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Users are already friends");
        });
    });
    test("returns error if user_1 and user_2 are already friends, with user_1/2 order reversed", () => {
      return request(app)
        .post("/api/friendships")
        .send({ user_1: "dmitri", user_2: "betty" })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Users are already friends");
        });
    });
  });
});

describe("/api/friendships/:friendship_id", () => {
  describe("DELETE", () => {
    test("successfully deletes friends if friendship_id is valid", () => {
      return request(app)
        .delete("/api/friendships/4")
        .expect(204)
        .then(() => {
          return checkFriendshipExists(4);
        })
        .then((doesFriendshipExist) => {
          expect(doesFriendshipExist).toBe(false);
        });
    });
    test("returns error if friendship_id is invalid", () => {
      return request(app)
        .delete("/api/friendships/four")
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error if friendship does not exist", () => {
      return request(app)
        .delete("/api/friendships/9999")
        .expect(404)
        .then((res) => {
          expect(res.body.message).toBe("Friendship not found");
        });
    });
  });
});

describe("/api/users/:username/friendships", () => {
  describe("GET", () => {
    test("successfully retrieves friendships of user where user is user_1 of friendship", () => {
      return request(app)
        .get("/api/users/betty/friendships")
        .expect(200)
        .then((res) => {
          expect(res.body.friendships.length).toBe(2);
          res.body.friendships.forEach((friendship) => {
            expect(friendship).toEqual(
              expect.objectContaining({
                friendship_id: expect.any(Number),
                user_1: expect.any(String),
                user_2: expect.any(String),
              })
            );

            expect(
              friendship.user_1 === "betty" || friendship.user_2 === "betty"
            ).toBeTruthy();
          });
        });
    });
    test("successfully retrieves friendships of user where user is user_1 or user_2 of friendship", () => {
      return request(app)
        .get("/api/users/jeff/friendships")
        .expect(200)
        .then((res) => {
          expect(res.body.friendships.length).toBe(4);
          res.body.friendships.forEach((friendship) => {
            expect(friendship).toEqual(
              expect.objectContaining({
                friendship_id: expect.any(Number),
                user_1: expect.any(String),
                user_2: expect.any(String),
              })
            );

            expect(
              friendship.user_1 === "jeff" || friendship.user_2 === "jeff"
            ).toBeTruthy();
          });
        });
    });
    test("returns error if user does not exist", () => {
      return request(app)
        .get("/api/users/simon/friendships")
        .expect(404)
        .then((res) => {
          expect(res.body.message).toBe("User not found");
        });
    });
    test("successfully retrieves empty array if user has no friends", () => {
      return request(app)
        .get("/api/users/martina/friendships")
        .expect(200)
        .then((res) => {
          expect(res.body.friendships).toEqual([]);
        });
    });
  });
});

export {};
