import { db } from "../db/connection";
import * as testData from "../db/data/test-data/index";
import { seed } from "../db/seeds/seed";
import { app } from "../app";
import request from "supertest";
import {} from "ts-jest";

beforeEach(() => seed(testData));

describe("/api/posts POST POST", () => {
  test("successfully posts a new social media post when valid body is entered", () => {
    return request(app)
      .post("/api/post")
      .send({
        associated_data_type: "goal",
        associated_id: "1",
        owner: "jeff",
        datetime: new Date(),
        message: "jeff test post, im so happy to be running",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.post).toBeInstanceOf(Object);
        expect(res.body.post).toMatchObject({
          associated_data_type: expect.any(String),
          associated_id: expect.any(String),
          owner: expect.any(String),
          datetime: expect.any(String),
          message: expect.any(String),
        });
      });
  });
});

export {};
