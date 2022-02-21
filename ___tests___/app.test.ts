import { db } from "../db/connection";
import * as testData from "../db/data/test-data/index";
import { seed } from "../db/seeds/seed";
import { app } from "../app";
import * as request from "supertest";
import {} from "ts-jest";

beforeEach(() => seed(testData));

describe("", () => {
  describe("seed works correctly", () => {
    test("subgoal table correctly seeded", () => {
      return db.query(`SELECT * FROM subgoals;`).then((res) => {
        console.log(res.rows);
        expect(res.rows.length).toBe(8);

        res.rows.forEach((subgoal) => {
          expect(subgoal).toEqual(
            expect.objectContaining({
              subgoal_id: expect.any(Number),
              goal_id: expect.any(Number),
              objective: expect.any(String),
              end_date: expect.any(Date),
              type: expect.any(String),
              status: expect.any(String),
              owner: expect.any(String),
            })
          );
        });
      });
    });
  });
});

export {};
