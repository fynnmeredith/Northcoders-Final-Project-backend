import * as testData from "../db/data/test-data/index";
import { seed } from "../db/seeds/seed";
import { app } from "../app";
import request from "supertest";
import {} from "ts-jest";

beforeEach(() => seed(testData));

describe("/api/goals/:goal_id/subgoals", () => {
  describe("POST", () => {
    test("successfully posts subgoal when valid body is entered", () => {
      return request(app)
        .post("/api/goals/2/subgoals")
        .send({
          objective: "Write 3000 words",
          start_date: new Date(2022, 1, 21),
          end_date: new Date(2022, 1, 24),
          owner: "jeff",
          target_value: 3000,
          unit: "words",
        })
        .expect(200)
        .then((res) => {
          const expectedSubgoal = {
            subgoal_id: 14,
            goal_id: 2,
            objective: "Write 3000 words",
            start_date: "2022-02-21T00:00:00.000Z",
            end_date: "2022-02-24T00:00:00.000Z",
            type: "progress",
            status: "active",
            owner: "jeff",
            target_value: "3000",
            unit: "words",
            progress: [[]],
            finish_date: null,
          };

          expect(res.body.subgoal).toEqual(expectedSubgoal);
        });
    });

    test("returns error when a non-existent user is entered", () => {
      return request(app)
        .post("/api/goals/2/subgoals")
        .send({
          objective: "Write prologue",
          end_date: new Date(2022, 1, 24),
          owner: "simon",
        })
        .expect(404)
        .then((res) => {
          expect(res.body.message).toBe("User not found");
        });
    });

    test("returns error when a no user is entered", () => {
      return request(app)
        .post("/api/goals/2/subgoals")
        .send({
          objective: "Write prologue",
          end_date: new Date(2022, 1, 24),
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("returns error when a no objective is entered", () => {
      return request(app)
        .post("/api/goals/2/subgoals")
        .send({
          end_date: new Date(2022, 1, 24),
          owner: "jeff",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("returns error when a no end date is entered", () => {
      return request(app)
        .post("/api/goals/2/subgoals")
        .send({
          objective: "Write prologue",
          owner: "jeff",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("returns error when invalid start date is entered", () => {
      return request(app)
        .post("/api/goals/2/subgoals")
        .send({
          objective: "Write prologue",
          start_date: "today",
          end_date: new Date(2022, 1, 24),
          owner: "jeff",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("returns error when invalid end date is entered", () => {
      return request(app)
        .post("/api/goals/2/subgoals")
        .send({
          objective: "Write prologue",
          end_date: "today",
          owner: "jeff",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("returns error when invalid target value is entered", () => {
      return request(app)
        .post("/api/goals/2/subgoals")
        .send({
          objective: "Write 3000 words",
          start_date: new Date(2022, 1, 21),
          end_date: new Date(2022, 1, 24),
          owner: "jeff",
          target_value: "many",
          unit: "words",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("returns error when unit is entered without target value", () => {
      return request(app)
        .post("/api/goals/2/subgoals")
        .send({
          objective: "Write 3000 words",
          start_date: new Date(2022, 1, 21),
          end_date: new Date(2022, 1, 24),
          owner: "jeff",
          unit: "words",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("returns error when target value is entered without start date", () => {
      return request(app)
        .post("/api/goals/2/subgoals")
        .send({
          objective: "Write 3000 words",
          end_date: new Date(2022, 1, 24),
          owner: "jeff",
          target_value: "3000",
          unit: "words",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("returns error when start date is entered without target value", () => {
      return request(app)
        .post("/api/goals/2/subgoals")
        .send({
          objective: "Write 3000 words",
          start_date: new Date(2022, 1, 21),
          end_date: new Date(2022, 1, 24),
          owner: "jeff",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("successfully posts goal when neither unit or target value are specified", () => {
      return request(app)
        .post("/api/goals/2/subgoals")
        .send({
          objective: "Write prologue",
          end_date: new Date(2022, 1, 24),
          owner: "jeff",
        })
        .expect(200)
        .then((res) => {
          const expectedSubgoal = {
            subgoal_id: 14,
            goal_id: 2,
            objective: "Write prologue",
            start_date: null,
            end_date: "2022-02-24T00:00:00.000Z",
            type: "boolean",
            status: "active",
            owner: "jeff",
            target_value: null,
            unit: null,
            progress: null,
            finish_date: null,
          };

          expect(res.body.subgoal).toEqual(expectedSubgoal);
        });
    });

    test("returns error when a invalid goal_id is entered", () => {
      return request(app)
        .post("/api/goals/two/subgoals")
        .send({
          objective: "Write prologue",
          end_date: new Date(2022, 1, 24),
          owner: "jeff",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("returns error when a non-existent goal_id is entered", () => {
      return request(app)
        .post("/api/goals/9999/subgoals")
        .send({
          objective: "Write prologue",
          end_date: new Date(2022, 1, 24),
          owner: "jeff",
        })
        .expect(404)
        .then((res) => {
          expect(res.body.message).toBe("Goal not found");
        });
    });
  });
  describe("GET", () => {
    test("retrieves subgoals for user when a valid goal_id is entered", () => {
      return request(app)
        .get("/api/goals/1/subgoals")
        .expect(200)
        .then((res) => {
          const { subgoals } = res.body;

          expect(subgoals.length).toBe(4);

          subgoals.forEach((subgoal) => {
            expect(subgoal.goal_id).toBe(1);
            expect(new Date(subgoal.end_date)).not.toBe("Invalid Date");
            expect(subgoal).toEqual(
              expect.objectContaining({
                subgoal_id: expect.any(Number),
                objective: expect.any(String),
                type: expect.any(String),
                status: expect.any(String),
                owner: expect.any(String),
              })
            );
          });
        });
    });
    test("returns empty object when no subgoals exist for a goal", () => {
      return request(app)
        .get("/api/goals/5/subgoals")
        .expect(200)
        .then((res) => {
          expect(res.body.subgoals).toEqual([]);
        });
    });
    test("returns error when invalid goal is entered", () => {
      return request(app)
        .get("/api/goals/one/subgoals")
        .expect(400)
        .then((res) => {
          expect(res.body.message).toEqual("Bad request");
        });
    });
    test("returns error when non-existent goal is entered", () => {
      return request(app)
        .get("/api/goals/9999/subgoals")
        .expect(404)
        .then((res) => {
          expect(res.body.message).toEqual("Goal not found");
        });
    });
  });
});

describe("/api/subgoals/:subgoal_id", () => {
  describe("GET", () => {
    test("successfully retrieves subgoal when valid subgoal id is entered", () => {
      return request(app)
        .get("/api/subgoals/8")
        .expect(200)
        .then((res) => {
          const { subgoal } = res.body;
          const expectedGoal = {
            subgoal_id: 8,
            goal_id: 2,
            objective: "Proof-read novella",
            start_date: null,
            end_date: "2022-03-04T00:00:00.000Z",
            type: "boolean",
            status: "active",
            owner: "jeff",
            target_value: null,
            unit: null,
            progress: null,
            finish_date: null,
          };
          expect(subgoal).toEqual(expectedGoal);
        });
    });

    test("returns error when invalid subgoal_id is input", () => {
      return request(app)
        .get("/api/subgoals/eight")
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });

    test("returns error when non-existent subgoal_id is input", () => {
      return request(app)
        .get("/api/subgoals/9999")
        .expect(404)
        .then((res) => {
          expect(res.body.message).toBe("Subgoal not found");
        });
    });
  });

  describe("/api/subgoals/:subgoal_id/status", () => {
    describe("PATCH", () => {
      test("patches successfully when valid subgoal_id and patch object are entered", () => {
        return request(app)
          .patch("/api/subgoals/7/status")
          .send({ status: "completed", date: new Date(2022, 1, 23) })
          .expect(200)
          .then((res) => {
            expect(res.body.subgoal.subgoal_id).toBe(7);
            expect(res.body.subgoal.status).toBe("completed");
            expect(res.body.subgoal.finish_date).toBe(
              "2022-02-23T00:00:00.000Z"
            );
          });
      });
    });
    test("returns error when invalid subgoal_id is entered", () => {
      return request(app)
        .patch("/api/subgoals/seven/status")
        .send({ status: "completed", date: new Date(2022, 1, 23) })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error when non-existent subgoal_id is entered", () => {
      return request(app)
        .patch("/api/subgoals/9999/status")
        .send({ status: "completed", date: new Date(2022, 1, 23) })
        .expect(404)
        .then((res) => {
          expect(res.body.message).toBe("Subgoal not found");
        });
    });
    test("returns error when patch object doesn't have status key", () => {
      return request(app)
        .patch("/api/subgoals/7/status")
        .send({ date: new Date(2022, 1, 23) })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error when patch object status has invalid value", () => {
      return request(app)
        .patch("/api/subgoals/7/status")
        .send({ status: "todo", date: new Date(2022, 1, 23) })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error when patch object doesn't have date key when patching to completed", () => {
      return request(app)
        .patch("/api/subgoals/7/status")
        .send({ status: "completed" })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error when patch object status has invalid date when patching to completed", () => {
      return request(app)
        .patch("/api/subgoals/7/status")
        .send({ status: "completed", date: "today" })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("patches successfully when valid goal_id and patch object are entered without date key when patching to active", () => {
      return request(app)
        .patch("/api/subgoals/5/status")
        .send({ status: "active" })
        .expect(200)
        .then((res) => {
          expect(res.body.subgoal.subgoal_id).toBe(5);
          expect(res.body.subgoal.status).toBe("active");
          expect(res.body.subgoal.finish_date).toBe(null);
        });
    });
  });
});

describe("/api/subgoals/:subgoal_id/progress", () => {
  describe("PATCH", () => {
    test("patches successfully when valid subgoal_id and patch object are entered", () => {
      return request(app)
        .patch("/api/subgoals/2/progress")
        .send({ date: new Date(2022, 1, 19), value: 10 })
        .expect(200)
        .then((res) => {
          expect(res.body.subgoal.progress).toEqual([
            ["2022-02-15T00:00:00.000Z", 10],
            ["2022-02-17T00:00:00.000Z", 20],
            ["2022-02-19T00:00:00.000Z", 30],
          ]);
        });
    });
    test("returns error when invalid subgoal_id is input", () => {
      return request(app)
        .patch("/api/subgoals/two/progress")
        .send({ date: new Date(2022, 1, 19), value: 10 })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error when non-existent subgoal_id is input", () => {
      return request(app)
        .patch("/api/subgoals/9999/progress")
        .send({ date: new Date(2022, 1, 19), value: 10 })
        .expect(404)
        .then((res) => {
          expect(res.body.message).toBe("Subgoal not found");
        });
    });
    test("returns error when patch object does not have date property", () => {
      return request(app)
        .patch("/api/subgoals/2/progress")
        .send({ value: 10 })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error when patch object does not have value property", () => {
      return request(app)
        .patch("/api/subgoals/2/progress")
        .send({ date: new Date(2022, 1, 19) })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error when date property is not a valid date", () => {
      return request(app)
        .patch("/api/subgoals/2/progress")
        .send({ date: "today", value: 10 })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error when value property is not a number", () => {
      return request(app)
        .patch("/api/subgoals/2/progress")
        .send({ date: new Date(2022, 1, 19), value: "ten" })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error when subgoal trying to be patched is not `progress`-type", () => {
      return request(app)
        .patch("/api/subgoals/8/progress")
        .send({ date: new Date(2022, 1, 22), value: 10 })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe(
            "Progress cannot be added to 'boolean' type subgoal"
          );
        });
    });
    test("returns error when date is before start date of subgoal", () => {
      return request(app)
        .patch("/api/subgoals/2/progress")
        .send({ date: new Date(2022, 1, 1), value: 10 })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe(
            "Cannot add progress outside of date range of subgoal"
          );
        });
    });
    test("returns error when date is after end date of subgoal", () => {
      return request(app)
        .patch("/api/subgoals/2/progress")
        .send({ date: new Date(2022, 3, 1), value: 10 })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe(
            "Cannot add progress outside of date range of subgoal"
          );
        });
    });
  });
});

describe("/api/users/:username/subgoals", () => {
  describe("GET", () => {
    test("retrieves subgoals for user when a valid user is entered", () => {
      return request(app)
        .get("/api/users/mary/subgoals")
        .expect(200)
        .then((res) => {
          const { subgoals } = res.body;

          expect(subgoals.length).toBe(4);

          subgoals.forEach((goal) => {
            expect(goal.owner).toBe("mary");
            expect(new Date(goal.end_date)).not.toBe("Invalid Date");
            expect(goal).toEqual(
              expect.objectContaining({
                subgoal_id: expect.any(Number),
                goal_id: expect.any(Number),
                objective: expect.any(String),
                type: expect.any(String),
                status: expect.any(String),
              })
            );
          });
        });
    });
    test("returns empty object when no subgoals exist for a user", () => {
      return request(app)
        .get("/api/users/martina/subgoals")
        .expect(200)
        .then((res) => {
          expect(res.body.subgoals).toEqual([]);
        });
    });
    test("returns error when non-existent user is entered", () => {
      return request(app)
        .get("/api/users/simon/subgoals")
        .expect(404)
        .then((res) => {
          expect(res.body.message).toEqual("User not found");
        });
    });
    test("accepts from_date query and only shows subgoals after that date", () => {
      return request(app)
        .get("/api/users/mary/subgoals?from_date=2022-03-07")
        .expect(200)
        .then((res) => {
          expect(res.body.subgoals.length).toBe(2);
          res.body.subgoals.forEach((subgoal) => {
            expect(new Date(subgoal.end_date).getTime()).toBeGreaterThanOrEqual(
              new Date(2022, 2, 7).getTime()
            );
          });
        });
    });
    test("accepts to_date query and only shows goals before that date", () => {
      return request(app)
        .get("/api/users/mary/subgoals?to_date=2022-03-06")
        .expect(200)
        .then((res) => {
          expect(res.body.subgoals.length).toBe(2);
          res.body.subgoals.forEach((subgoal) => {
            expect(new Date(subgoal.start_date).getTime()).toBeLessThanOrEqual(
              new Date(2022, 2, 6).getTime()
            );
          });
        });
    });
    test("accepts both to_date and from_date queries simultaneously", () => {
      return request(app)
        .get("/api/users/mary/subgoals?from_date=2022-02-07&to_date=2022-03-06")
        .expect(200)
        .then((res) => {
          expect(res.body.subgoals.length).toBe(1);
          res.body.subgoals.forEach((subgoal) => {
            expect(new Date(subgoal.start_date).getTime()).toBeLessThanOrEqual(
              new Date(2022, 2, 6).getTime()
            );
            expect(new Date(subgoal.end_date).getTime()).toBeGreaterThanOrEqual(
              new Date(2022, 1, 7).getTime()
            );
          });
        });
    });
    test("if subgoal partly clips with beginning of range, it is still included", () => {
      return request(app)
        .get("/api/users/mary/subgoals?from_date=2022-03-06")
        .expect(200)
        .then((res) => {
          expect(res.body.subgoals.length).toBe(3);
          res.body.subgoals.forEach((subgoal) => {
            expect(new Date(subgoal.end_date).getTime()).toBeGreaterThanOrEqual(
              new Date(2022, 2, 6).getTime()
            );
          });
        });
    });
    test("if subgoal partly clips with end of range, it is still included", () => {
      return request(app)
        .get("/api/users/mary/subgoals?to_date=2022-03-07")
        .expect(200)
        .then((res) => {
          expect(res.body.subgoals.length).toBe(3);
          res.body.subgoals.forEach((subgoal) => {
            expect(new Date(subgoal.start_date).getTime()).toBeLessThanOrEqual(
              new Date(2022, 2, 7).getTime()
            );
          });
        });
    });
    test("returns empty array if there are no subgoals within range set", () => {
      return request(app)
        .get("/api/users/mary/subgoals?from_date=2022-09-29")
        .expect(200)
        .then((res) => {
          expect(res.body.subgoals).toEqual([]);
        });
    });
    test("returns error if to_date is before from_date", () => {
      return request(app)
        .get("/api/users/mary/subgoals?from_date=2022-03-29&to_date=2022-03-28")
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe(
            "to_date must be equal to or later than from_date"
          );
        });
    });
    test("does not return error if to_date is equal to from_date", () => {
      return request(app)
        .get("/api/users/mary/subgoals?from_date=2022-03-27&to_date=2022-03-27")
        .expect(200)
        .then((res) => {
          expect(res.body.subgoals.length).toBe(1);
          expect(res.body.subgoals[0].subgoal_id).toBe(11);
        });
    });
    test("returns error if from_date is not in YYYY-MM-DD form", () => {
      return request(app)
        .get("/api/users/mary/subgoals?from_date=today")
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("returns error if to_date is not in YYYY-MM-DD form", () => {
      return request(app)
        .get("/api/users/mary/subgoals?to_date=today")
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe("Bad request");
        });
    });
    test("functions correctly when dealing with boolean-type goals", () => {
      return request(app)
        .get("/api/users/jeff/subgoals?from_date=2022-02-21&to_date=2022-02-29")
        .expect(200)
        .then((res) => {
          expect(res.body.subgoals.length).toBe(4);
          res.body.subgoals.forEach((subgoal) => {
            expect(new Date(subgoal.end_date).getTime()).toBeGreaterThanOrEqual(
              new Date(2022, 1, 21).getTime()
            );
            if (subgoal.type === "progress") {
              expect(
                new Date(subgoal.start_date).getTime()
              ).toBeLessThanOrEqual(new Date(2022, 1, 29).getTime());
            } else {
              expect(new Date(subgoal.end_date).getTime()).toBeLessThanOrEqual(
                new Date(2022, 1, 29).getTime()
              );
            }
          });
        });
    });
  });
});

export {};
