import * as testData from "../db/data/test-data/index";
import { seed } from "../db/seeds/seed";
import { app } from "../app";
import request from "supertest";
import {} from "ts-jest";
import { checkReactionExists } from "../utils/checkExists";

beforeEach(() => seed(testData));

describe("/api/posts/:post_id/reactions", () => {
  describe("POST", () => {
    test("successfully creates reaction if post_id and owner exist, reaction is valid, and user has not already reacted to post", () => {
      return request(app)
        .post("/api/posts/5/reactions")
        .send({ owner: "betty", reaction: "I'm proud of you" })
        .expect(200)
        .then((res) => {});
    });
    test("returns error if post object does not have owner property", () => {
      return request(app)
        .post("/api/posts/5/reactions")
        .send({ reaction: "I'm proud of you" })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error if post object does not have reaction property", () => {
      return request(app)
        .post("/api/posts/5/reactions")
        .send({ owner: "betty" })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error if post_id is invalid", () => {
      return request(app)
        .post("/api/posts/five/reactions")
        .send({ owner: "betty", reaction: "I'm proud of you" })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error if post does not exist", () => {
      return request(app)
        .post("/api/posts/9999/reactions")
        .send({ owner: "betty", reaction: "I'm proud of you" })
        .expect(404)
        .then((res) => {
          expect(res.body.message).toBe("Post not found");
        });
    });
    test("returns error if owner not exist", () => {
      return request(app)
        .post("/api/posts/5/reactions")
        .send({ owner: "simon", reaction: "I'm proud of you" })
        .expect(404)
        .then((res) => {
          expect(res.body.message).toBe("User not found");
        });
    });
    test("returns error if user has already reacted to post", () => {
      return request(app)
        .post("/api/posts/5/reactions")
        .send({ owner: "stuart", reaction: "I'm proud of you" })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe(
            "Cannot react to post user has already reacted to"
          );
        });
    });
    test("returns error if reaction is invalid", () => {
      return request(app)
        .post("/api/posts/5/reactions")
        .send({ owner: "betty", reaction: "Boooo" })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Reaction not valid");
        });
    });
  });
  describe("GET", () => {
    test("successfully retrieves reactions of post when post_id is valid", () => {
      return request(app)
        .get("/api/posts/1/reactions")
        .expect(200)
        .then((res) => {});
    });
    test("returns error if post_id is invalid", () => {
      return request(app)
        .get("/api/posts/one/reactions")
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error if post does not exist", () => {
      return request(app)
        .get("/api/posts/9999/reactions")
        .expect(404)
        .then((res) => {
          expect(res.body.message).toBe("Post not found");
        });
    });
    test("successfully retrieves empty array if post has not reactions", () => {
      return request(app)
        .get("/api/posts/2/reactions")
        .expect(200)
        .then((res) => {
          expect(res.body.reactions).toEqual([]);
        });
    });
  });
});

describe("/api/reactions/:reaction_id", () => {
  describe("DELETE", () => {
    test("successfully deletes reaction if reaction_id is valid", () => {
      return request(app)
        .delete("/api/reactions/3")
        .expect(204)
        .then(() => {
          return checkReactionExists(3);
        })
        .then((doesReactionExist: boolean) => {
          expect(doesReactionExist).toBe(false);
        });
    });
    test("returns error if reaction_id is invalid", () => {
      return request(app)
        .delete("/api/reactions/three")
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error if reaction does not exist", () => {
      return request(app)
        .delete("/api/reactions/9999")
        .expect(404)
        .then((res) => {
          expect(res.body.message).toBe("Reaction not found");
        });
    });
  });
});

export {};
