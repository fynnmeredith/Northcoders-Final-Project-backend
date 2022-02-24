import { db } from "../db/connection";
import * as testData from "../db/data/test-data/index";
import { seed } from "../db/seeds/seed";
import { app } from "../app";
import request from "supertest";
import {} from "ts-jest";

beforeEach(() => seed(testData));

describe("Post social media post", () => {
  test("Post social media post returns expected object data type", () => {
    return request(app)
      .post("/api/posts")
      .send({
        associated_data_type: "goal",
        associated_id: 3,
        owner: "jeff",
        datetime: new Date(2022, 1, 23, 15, 24, 0),
        message: "Jeff Post social media post test",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.post[0]).toBeInstanceOf(Object);
        expect(res.body.post[0]).toMatchObject({
          associated_data_type: "goal",
          associated_id: 3,
          owner: "jeff",
          datetime: new Date(2022, 1, 23, 15, 24, 0),
          message: "Jeff Post social media post test",
        });
      });
  });

  test("Post social media error, non-existent goal id", () => {
    return request(app)
      .post("/api/posts")
      .send({
        associated_data_type: "goal",
        associated_id: 666,
        owner: "jeff",
        datetime: new Date(),
        message: "Jeff Post social media post test",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad request");
      });
  });

  test("Post social media error, non-existent subgoal id", () => {
    return request(app)
      .post("/api/posts")
      .send({
        associated_data_type: "subgoal",
        associated_id: 666,
        owner: "jeff",
        datetime: new Date(),
        message: "Jeff Post social media post test",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad request");
      });
  });

  test("Post social media error, non-existent user", () => {
    return request(app)
      .post("/api/posts")
      .send({
        associated_data_type: "goal",
        associated_id: 2,
        owner: "Farquad",
        datetime: new Date(),
        message: "Farquad Post social media post test",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad request");
      });
  });

  test("Post social media error, data type not of goal/subgoal type", () => {
    return request(app)
      .post("/api/posts")
      .send({
        associated_data_type: "running",
        associated_id: 2,
        owner: "Jeff",
        datetime: new Date(),
        message: "Jeff Post social media post test",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad request");
      });
  });
  test("Post social media error, request body missing required keys", () => {
    return request(app)
      .post("/api/posts")
      .send({
        associated_data_type: "goal",
        associated_id: 2,
        message: "Test social media message",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad request");
      });
  });
});

// TBC
describe.skip("Delete social media post", () => {
  test("Delete post works and returns deleted post data", () => {
    return request(app)
      .delete("/api/posts/1")
      .expect(200)
      .then((res) => {
        expect(res.body.post).toBeInstanceOf(Object);
        expect(res.body.post).toMatchObject({
          post_id: 71,
          associated_data_type: expect.any(Number),
          associated_id: expect.any(Number),
          owner: expect.any(Number),
          datetime: expect.any(Date),
          message: expect.any(Number),
        });
      });
  });

  test("Delete post of a non existing post ID returns an error message", () => {
    return request(app)
      .delete("/api/posts/666")
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Post not found");
      });
  });
});

describe("Get social media post by user, sort by date-time", () => {
  test.only("Get social media posts by user works", () => {
    return request(app)
      .get("/api/posts/jeff")
      .expect(200)
      .then((res) => {
        console.log(res.body.posts);
        expect(res.body.posts).toBeInstanceOf(Array);
        res.body.posts.forEach((post) => {
          expect(post).toBeInstanceOf(Object);
          expect(post).toMatchObject({
            associated_data_type: expect.any(String),
            associated_id: expect.any(Number),
            owner: expect.any(String),
            datetime: expect.any(String),
            message: expect.any(String),
          });
        });
      });
  });
  test("Get social media post throws error for non existent user", () => {
    return request(app)
      .get("/api/posts/farquad")
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad request");
      });
  });
});

// TBC
describe.skip("Get social media post by friends, sort by date-time", () => {
  test("", () => {
    return request(app)
      .get("/api/posts/friendsPosts/jeff")
      .expect(200)
      .then((res) => {
        expect(res.body.posts).toBeInstanceOf(Array);
        res.body.posts.forEach((post) => {
          expect(post).toBeInstanceOf(Object);
          expect(post).toMatchObject({
            associated_data_type: expect.any(Number),
            associated_id: expect.any(Number),
            owner: expect.any(Number),
            datetime: expect.any(String),
            message: expect.any(Number),
          });
        });
      });
  });
});

export {};
