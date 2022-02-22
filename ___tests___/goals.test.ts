import { db } from "../db/connection";
import * as testData from "../db/data/test-data/index";
import { seed } from "../db/seeds/seed";
import { app } from "../app";
import request from "supertest";
import {} from "ts-jest";

beforeEach(() => seed(testData));

describe("/api/goals", () => {
  describe("POST", () => {
    test("", () => {});
  });
});

describe("/api/goals/:goal_id", () => {
  describe("GET", () => {
    test("successfully retrieves goal when valid goal id is entered", () => {
      return request(app)
        .get("/api/goals/3")
        .expect(200)
        .then((res) => {
          const { goal } = res.body;
          const expectedGoal = {
            goal_id: 3,
            objective: "Save £800",
            description: "Save for holiday",
            start_date: "2022-01-07T00:00:00.000Z",
            end_date: "2022-05-05T23:00:00.000Z",
            type: "progress",
            status: "active",
            owner: "mary",
            target_value: "800",
            unit: "£",
            progress: [["2022-01-29T00:00:00.000Z", 200]],
            finish_date: null,
          };
          expect(goal).toEqual(expectedGoal);
        });
    });

    test("returns error when invalid goal_id is input", () => {
      return request(app)
        .get("/api/goals/three")
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("returns error when non-existent goal_id is input", () => {
      return request(app)
        .get("/api/goals/9999")
        .expect(404)
        .then((res) => {
          expect(res.body.message).toBe("Goal not found");
        });
    });
  });
  describe("DELETE", () => {
    test("", () => {});
  });
});

describe("/api/goals/:goal_id/details", () => {
  describe("PATCH", () => {
    test("", () => {});
  });
});

describe("/api/goals/:goal_id/progress", () => {
  describe("PATCH", () => {
    test("", () => {});
  });
});

describe("/api/users/:username/goals", () => {
  describe("GET", () => {
    test("", () => {});
  });
});

export {};
