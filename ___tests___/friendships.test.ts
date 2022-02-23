import { db } from "../db/connection";
import * as testData from "../db/data/test-data/index";
import { seed } from "../db/seeds/seed";
import { app } from "../app";
import request from "supertest";
import {} from "ts-jest";
import { checkFriendshipExists } from "../utils/checkExists";

beforeEach(() => seed(testData));

describe("/api/friendships", () => {
  describe("POST", () => {
    test("successfully creates friendship if both users exist and they aren't already friends", () => {});
    test("returns error if post object does not have user_1 property", () => {});
    test("returns error if post object does not have user_2 property", () => {});
    test("returns error if user_1 does not exist", () => {});
    test("returns error if user_2 does not exist", () => {});
    test("returns error if user_1 and user_2 are the same user", () => {});
    test("returns error if user_1 and user_2 are already friends", () => {});
  });
});

describe("/api/friendships/:friendship_id", () => {
  describe("DELETE", () => {
    test("successfully deletes friends if friendship_id is valid", () => {});
    test("returns error if friendship_id is invalid", () => {});
    test("returns error if friendship does not exist", () => {});
  });
});

describe("/api/users/:username/friendships", () => {
  describe("GET", () => {
    test("successfully retrieves friendships of user where user is user_1 of friendship", () => {});
    test("successfully retrieves friendships of user where user is user_1 or user_2 of friendship", () => {});
    test("returns error if user does not exist", () => {});
    test("successfully retrieves empty array if user has no friends", () => {});
  });
});

export {};
