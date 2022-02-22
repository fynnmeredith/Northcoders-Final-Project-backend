import { db } from "../db/connection";
import * as testData from "../db/data/test-data/index";
import { seed } from "../db/seeds/seed";
import { app } from "../app";
import request from "supertest";
import {} from "ts-jest";
import { checkGoalExists } from "../utils/checkExists";

beforeEach(() => seed(testData));

describe("/api/goals", () => {
  describe("POST", () => {
    test("successfully posts goal when valid body is entered", () => {
      return request(app)
        .post("/api/goals")
        .send({
          objective: "Cycle 300km",
          description: "Got to feed the perpeptual cycle of self-improvement",
          start_date: new Date(2022, 1, 22),
          end_date: new Date(2022, 2, 21),
          owner: "jeff",
          target_value: 300,
          unit: "km",
        })
        .expect(200)
        .then((res) => {
          const expectedGoal = {
            goal_id: 8,
            objective: "Cycle 300km",
            description: "Got to feed the perpeptual cycle of self-improvement",
            start_date: "2022-02-22T00:00:00.000Z",
            end_date: "2022-03-21T00:00:00.000Z",
            type: "progress",
            status: "active",
            owner: "jeff",
            target_value: "300",
            unit: "km",
            progress: [[]],
            finish_date: null,
          };

          expect(res.body.goal).toEqual(expectedGoal);
        });
    });

    test("returns error when a non-existent user is entered", () => {
      return request(app)
        .post("/api/goals")
        .send({
          objective: "Cycle 300km",
          description: "Got to feed the perpeptual cycle of self-improvement",
          start_date: new Date(2022, 1, 22),
          end_date: new Date(2022, 2, 21),
          owner: "simon",
          target_value: 300,
          unit: "km",
        })
        .expect(404)
        .then((res) => {
          expect(res.body.message).toBe("User not found");
        });
    });

    test("returns error when a no user is entered", () => {
      return request(app)
        .post("/api/goals")
        .send({
          objective: "Cycle 300km",
          description: "Got to feed the perpeptual cycle of self-improvement",
          start_date: new Date(2022, 1, 22),
          end_date: new Date(2022, 2, 21),
          target_value: 300,
          unit: "km",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("returns error when a no objective is entered", () => {
      return request(app)
        .post("/api/goals")
        .send({
          description: "Got to feed the perpeptual cycle of self-improvement",
          start_date: new Date(2022, 1, 22),
          end_date: new Date(2022, 2, 21),
          owner: "jeff",
          target_value: 300,
          unit: "km",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("returns error when no start date is entered", () => {
      return request(app)
        .post("/api/goals")
        .send({
          objective: "Cycle 300km",
          description: "Got to feed the perpeptual cycle of self-improvement",
          end_date: new Date(2022, 2, 21),
          owner: "jeff",
          target_value: 300,
          unit: "km",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("returns error when a no end date is entered", () => {
      return request(app)
        .post("/api/goals")
        .send({
          objective: "Cycle 300km",
          description: "Got to feed the perpeptual cycle of self-improvement",
          start_date: new Date(2022, 1, 22),
          owner: "jeff",
          target_value: 300,
          unit: "km",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("returns error when invalid start date is entered", () => {
      return request(app)
        .post("/api/goals")
        .send({
          objective: "Cycle 300km",
          description: "Got to feed the perpeptual cycle of self-improvement",
          start_date: "today",
          end_date: new Date(2022, 2, 21),
          owner: "jeff",
          target_value: 300,
          unit: "km",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("returns error when invalid end date is entered", () => {
      return request(app)
        .post("/api/goals")
        .send({
          objective: "Cycle 300km",
          description: "Got to feed the perpeptual cycle of self-improvement",
          start_date: new Date(2022, 1, 22),
          end_date: "tomorrow",
          owner: "jeff",
          target_value: 300,
          unit: "km",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("returns error when invalid target value is entered", () => {
      return request(app)
        .post("/api/goals")
        .send({
          objective: "Cycle 300km",
          description: "Got to feed the perpeptual cycle of self-improvement",
          start_date: new Date(2022, 1, 22),
          end_date: new Date(2022, 2, 21),
          owner: "jeff",
          target_value: "three hundred",
          unit: "km",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("returns error when unit is entered without target value", () => {
      return request(app)
        .post("/api/goals")
        .send({
          objective: "Cycle 300km",
          description: "Got to feed the perpeptual cycle of self-improvement",
          start_date: new Date(2022, 1, 22),
          end_date: new Date(2022, 2, 21),
          owner: "jeff",
          unit: "km",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("successfully posts goal when neither unit or target value are specified", () => {
      return request(app)
        .post("/api/goals")
        .send({
          objective: "Cycle up Ben Nevis",
          description: "Got to feed the perpeptual cycle of self-improvement",
          start_date: new Date(2022, 1, 22),
          end_date: new Date(2022, 2, 21),
          owner: "jeff",
        })
        .expect(200)
        .then((res) => {
          const expectedGoal = {
            goal_id: 8,
            objective: "Cycle up Ben Nevis",
            description: "Got to feed the perpeptual cycle of self-improvement",
            start_date: "2022-02-22T00:00:00.000Z",
            end_date: "2022-03-21T00:00:00.000Z",
            type: "boolean",
            status: "active",
            owner: "jeff",
            progress: null,
            target_value: null,
            unit: null,
            finish_date: null,
          };

          expect(res.body.goal).toEqual(expectedGoal);
        });
    });
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
  // describe("DELETE", () => {
  //   test("successfully deletes goal when valid goal id is entered", () => {
  //     return request(app)
  //       .delete("/api/goals/3")
  //       .expect(204)
  //       .then(() => {
  //         return checkGoalExists(3);
  //       })
  //       .then((doesGoalExist: Boolean) => {
  //         expect(doesGoalExist).toBe(false);
  //       });
  //   });

  //   test("returns error when invalid goal_id is input", () => {
  //     return request(app)
  //       .delete("/api/goals/three")
  //       .expect(400)
  //       .then((res) => {
  //         expect(res.body.message).toBe("Bad request");
  //       });
  //   });

  //   test("returns error when non-existent goal_id is input", () => {
  //     return request(app)
  //       .delete("/api/goals/9999")
  //       .expect(404)
  //       .then((res) => {
  //         expect(res.body.message).toBe("Goal not found");
  //       });
  //   });
  // });
});

describe("/api/goals/:goal_id/details", () => {
  describe("PATCH", () => {
    test("", () => {});
  });
});

describe("/api/goals/:goal_id/progress", () => {
  describe("PATCH", () => {
    test("patches successfully when valid goal_id and patch object are entered", () => {
      return request(app)
        .patch("/api/goals/1/progress")
        .send({ date: new Date(2022, 1, 22), value: 10 })
        .expect(200)
        .then((res) => {
          expect(res.body.goal.progress).toEqual([
            ["2022-02-08T00:00:00.000Z", 10],
            ["2022-02-08T00:00:00.000Z", 20],
            ["2022-02-10T00:00:00.000Z", 30],
            ["2022-02-15T00:00:00.000Z", 40],
            ["2022-02-17T00:00:00.000Z", 50],
            ["2022-02-22T00:00:00.000Z", 60],
          ]);
          expect(res.body.goal.status).toBe("active");
        });
    });
    test("turns status to complete if new progress value exceeds target value", () => {
      return request(app)
        .patch("/api/goals/1/progress")
        .send({ date: new Date(2022, 1, 22), value: 80 })
        .expect(200)
        .then((res) => {
          expect(res.body.goal.status).toBe("completed");
        });
    });
    test("returns error when invalid goal_id is input", () => {
      return request(app)
        .patch("/api/goals/one/progress")
        .send({ date: new Date(2022, 1, 22), value: 10 })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error when non-existent goal_id is input", () => {
      return request(app)
        .patch("/api/goals/9999/progress")
        .send({ date: new Date(2022, 1, 22), value: 10 })
        .expect(404)
        .then((res) => {
          expect(res.body.message).toBe("Goal not found");
        });
    });
    test("returns error when patch object does not have date property", () => {
      return request(app)
        .patch("/api/goals/1/progress")
        .send({ value: 10 })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error when patch object does not have value property", () => {
      return request(app)
        .patch("/api/goals/1/progress")
        .send({ date: new Date(2022, 1, 22) })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error when date property is not a valid date", () => {
      return request(app)
        .patch("/api/goals/1/progress")
        .send({ date: "today", value: 10 })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error when value property is not a number", () => {
      return request(app)
        .patch("/api/goals/1/progress")
        .send({ date: new Date(2022, 1, 22), value: "ten" })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error when goal trying to be patched is not `progress`-type", () => {
      return request(app)
        .patch("/api/goals/2/progress")
        .send({ date: new Date(2022, 1, 22), value: 10 })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe(
            "Progress cannot be added to 'boolean' type goal"
          );
        });
    });
    test("returns error when date is before start date of goal", () => {
      return request(app)
        .patch("/api/goals/1/progress")
        .send({ date: new Date(2022, 1, 1), value: 10 })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe(
            "Cannot add progress outside of date range of goal"
          );
        });
    });
    test("returns error when date is after end date of goal", () => {
      return request(app)
        .patch("/api/goals/1/progress")
        .send({ date: new Date(2022, 3, 1), value: 10 })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe(
            "Cannot add progress outside of date range of goal"
          );
        });
    });
  });
});

describe("/api/users/:username/goals", () => {
  describe("GET", () => {
    test("retrieves goals for user when a valid user is entered", () => {
      return request(app)
        .get("/api/users/jeff/goals")
        .expect(200)
        .then((res) => {
          const { goals } = res.body;

          expect(goals.length).toBe(2);

          goals.forEach((goal) => {
            expect(goal.owner).toBe("jeff");
            expect(new Date(goal.start_date)).not.toBe("Invalid Date");
            expect(new Date(goal.end_date)).not.toBe("Invalid Date");
            expect(goal).toEqual(
              expect.objectContaining({
                goal_id: expect.any(Number),
                objective: expect.any(String),
                description: expect.any(String),
                type: expect.any(String),
                status: expect.any(String),
              })
            );
          });
        });
    });
    test("returns empty object when no goals exist for a user", () => {
      return request(app)
        .get("/api/users/martina/goals")
        .expect(200)
        .then((res) => {
          expect(res.body.goals).toEqual([]);
        });
    });
    test("returns error when non-existent user is entered", () => {
      return request(app)
        .get("/api/users/simon/goals")
        .expect(404)
        .then((res) => {
          expect(res.body.message).toEqual("User not found");
        });
    });
  });
});

export {};
