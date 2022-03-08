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
          datetime: "2022-02-23T15:24:00.000Z",
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
export {};
