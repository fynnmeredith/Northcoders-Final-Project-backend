import * as testData from "../db/data/test-data/index";
import { seed } from "../db/seeds/seed";
import { app } from "../app";
import request from "supertest";
import {} from "ts-jest";

beforeEach(() => seed(testData));

describe("/api/comments Post new comment", () => {
  test("successfully posts a new social media comment when valid body is entered", () => {});
});

export {};

describe("/api/comments gets all comments for a post", () => {
  test("successfully gets comments when valid id is entered", () => {
    return request(app)
      .get("/api/posts/1/comments")
      .expect(200)
      .then((res) => {
        expect(res.body.comments).toBeInstanceOf(Array);
        res.body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            post_id: expect.any(Number),
            owner: expect.any(String),
            message: expect.any(String),
            datetime: expect.any(String),
          });
        });
      });
  });
  test("responds with an error when an invalid post id is entered", () => {
    return request(app)
      .get("/api/posts/900/comments")
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad request");
      });
  });
});

describe("/api/comments Post new comment", () => {
  test("successfully posts a new social media comment when valid body is entered", () => {
    return request(app)
      .post("/api/posts/1/comments")
      .send({
        message: "Keep it up your smashing it",
        owner: "jeff",
        datetime: new Date(2022, 11, 11, 12, 12, 12),
      })
      .expect(200)
      .then((res) => {
        expect(res.body.comment[0]).toBeInstanceOf(Object);
        expect(res.body.comment[0]).toMatchObject({
          message: "Keep it up your smashing it",
          owner: "jeff",
          datetime: "2022-12-11T12:12:12.000Z",
        });
      });
  });
  test("post comment with a missing required key is handed an error", () => {
    return request(app)
      .post("/api/posts/1/comments")
      .send({
        message: "Keep it up your smashing it",
        datetime: new Date(2022, 11, 11, 12, 12, 12),
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad request");
      });
  });
  test("post comment with a missing required key is handed an error", () => {
    return request(app)
      .post("/api/posts/1/comments")
      .send({
        message: "Keep it up your smashing it",
        owner: "fakeuser",
        datetime: new Date(2022, 11, 11, 12, 12, 12),
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad request");
      });
  });
});

describe("/api/comments deletes a comment", () => {
  test("successfully deletes a comment when a valid id is entered", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(200)
      .then((res) => {
        expect(res.body.comment[0]).toBeInstanceOf(Object);
        expect(res.body.comment[0]).toMatchObject({
          comment_id: expect.any(Number),
          post_id: expect.any(Number),
          owner: expect.any(String),
          message: expect.any(String),
          datetime: expect.any(String),
        });
      });
  });
  test("unsuccessfully deletes a comment when an invalid comment id is entered, returns an error", () => {
    return request(app)
      .delete("/api/comments/900")
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad request");
      });
  });
});

export {};
