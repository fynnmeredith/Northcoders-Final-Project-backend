import { db } from "../db/connection";
import * as testData from "../db/data/test-data/index";
import { seed } from "../db/seeds/seed";
import { app } from "../app";
import request from "supertest";
import {} from "ts-jest";
import { checkReactionExists } from "../utils/checkExists";

beforeEach(() => seed(testData));

describe("/api/posts/:post_id/reactions", () => {
  describe("POST", () => {
    test("successfully creates reaction if post_id and owner exist, reaction is valid, and user has not already reacted to post", () => {});
    test("returns error if post object does not have owner property", () => {});
    test("returns error if post object does not have reaction property", () => {});
    test("returns error if post_id is invalid", () => {});
    test("returns error if post does not exist", () => {});
    test("returns error if owner not exist", () => {});
    test("returns error if user has already reacted to post", () => {});
  });
  describe("GET", () => {
    test("successfully retrieves reactions of post when post_id is valid", () => {});
    test("returns error if post_id is invalid", () => {});
    test("returns error if post does not exist", () => {});
    test("successfully retrieves empty array if post has not reactions", () => {});
  });
});

describe("/api/reactions/:reaction_id", () => {
  describe("DELETE", () => {
    test("successfully deletes reaction if reaction_id is valid", () => {});
    test("returns error if reaction_id is invalid", () => {});
    test("returns error if reaction does not exist", () => {});
  });
});

export {};
