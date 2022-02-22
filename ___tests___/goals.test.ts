import { db } from "../db/connection";
import * as testData from "../db/data/test-data/index";
import { seed } from "../db/seeds/seed";
import { app } from "../app";
import request from "supertest";
import {} from "ts-jest";
import { checkGoalExists } from "../utils/checkExists";

beforeEach(() => seed(testData));

describe("/api/goals", () => {
  describe.only("POST", () => {
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
            end_date: "2022-03-21T23:00:00.000Z",
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
            end_date: "2022-03-21T23:00:00.000Z",
            type: "boolean",
            status: "active",
            owner: "jeff",
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
    test("", () => {});
  });
});

describe("/api/users/:username/goals", () => {
  describe("GET", () => {
    test("", () => {});
  });
});

export {};
