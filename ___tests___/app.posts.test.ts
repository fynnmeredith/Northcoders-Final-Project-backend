import { db } from "../db/connection";
import * as testData from "../db/data/test-data/index";
import { seed } from "../db/seeds/seed";
import { app } from "../app";
import * as request from "supertest";
import {} from "ts-jest";

beforeEach(() => seed(testData));

describe("Post social media post", () => {
  test("Post social media post returns expected object data type", () => {
    return request(app)
      .post("api/post")
      .send({
        post_id: 71,
        associated_data_type: "Goal",
        associated_id: 3,
        owner: "Jeff",
        datetime: new Date(),
        message: "Jeff Post social media post test",
      })
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

  test("Post social media error, non-existent goal/subgoal id", () => {
    return request(app)
      .post("api/post")
      .send({
        post_id: 72,
        associated_data_type: "Goal",
        associated_id: 666,
        owner: "Jeff",
        datetime: new Date(),
        message: "Jeff Post social media post test",
      })
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Goal/Post ID Not Found");
      });
  });

  test("Post social media error, non-existent user", () => {
    return request(app)
      .post("api/post")
      .send({
        post_id: 72,
        associated_data_type: "Goal",
        associated_id: 2,
        owner: "Farquad",
        datetime: new Date(),
        message: "Farquad Post social media post test",
      })
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("User Not Found");
      });
  });

  test("Post social media error, data type not of goal/subgoal type", () => {
    return request(app)
      .post("api/post")
      .send({
        post_id: 72,
        associated_data_type: "Running",
        associated_id: 2,
        owner: "Jeff",
        datetime: new Date(),
        message: "Jeff Post social media post test",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid goal type");
      });
  });
});

describe("Delete social media post", () => {
  test("Delete post works and returns deleted post data", () => {
    return request(app)
      .delete("api/post/1")
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
      .delete("api/post/666")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Post not found");
      });
  });
});

describe("Get social media post by user, sort by date-time", () => {
  describe("", () => {
    test("", () => {});
  });
});

describe("Get social media post by friends, sort by date-time", () => {
  describe("", () => {
    test("", () => {});
  });
});

export {};
