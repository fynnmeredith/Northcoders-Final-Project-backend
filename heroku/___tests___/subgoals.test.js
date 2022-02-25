"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var testData = __importStar(require("../db/data/test-data/index"));
var seed_1 = require("../db/seeds/seed");
var app_1 = require("../app");
var supertest_1 = __importDefault(require("supertest"));
beforeEach(function () { return (0, seed_1.seed)(testData); });
describe("/api/goals/:goal_id/subgoals", function () {
    describe("POST", function () {
        test("successfully posts subgoal when valid body is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/goals/2/subgoals")
                .send({
                objective: "Write 3000 words",
                start_date: new Date(2022, 1, 21),
                end_date: new Date(2022, 1, 24),
                owner: "jeff",
                target_value: 3000,
                unit: "words"
            })
                .expect(200)
                .then(function (res) {
                var expectedSubgoal = {
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
                    finish_date: null
                };
                expect(res.body.subgoal).toEqual(expectedSubgoal);
            });
        });
        test("returns error when a non-existent user is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/goals/2/subgoals")
                .send({
                objective: "Write prologue",
                end_date: new Date(2022, 1, 24),
                owner: "simon"
            })
                .expect(404)
                .then(function (res) {
                expect(res.body.message).toBe("User not found");
            });
        });
        test("returns error when a no user is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/goals/2/subgoals")
                .send({
                objective: "Write prologue",
                end_date: new Date(2022, 1, 24)
            })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when a no objective is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/goals/2/subgoals")
                .send({
                end_date: new Date(2022, 1, 24),
                owner: "jeff"
            })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when a no end date is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/goals/2/subgoals")
                .send({
                objective: "Write prologue",
                owner: "jeff"
            })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when invalid start date is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/goals/2/subgoals")
                .send({
                objective: "Write prologue",
                start_date: "today",
                end_date: new Date(2022, 1, 24),
                owner: "jeff"
            })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when invalid end date is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/goals/2/subgoals")
                .send({
                objective: "Write prologue",
                end_date: "today",
                owner: "jeff"
            })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when invalid target value is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/goals/2/subgoals")
                .send({
                objective: "Write 3000 words",
                start_date: new Date(2022, 1, 21),
                end_date: new Date(2022, 1, 24),
                owner: "jeff",
                target_value: "many",
                unit: "words"
            })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when unit is entered without target value", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/goals/2/subgoals")
                .send({
                objective: "Write 3000 words",
                start_date: new Date(2022, 1, 21),
                end_date: new Date(2022, 1, 24),
                owner: "jeff",
                unit: "words"
            })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when target value is entered without start date", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/goals/2/subgoals")
                .send({
                objective: "Write 3000 words",
                end_date: new Date(2022, 1, 24),
                owner: "jeff",
                target_value: "3000",
                unit: "words"
            })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when start date is entered without target value", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/goals/2/subgoals")
                .send({
                objective: "Write 3000 words",
                start_date: new Date(2022, 1, 21),
                end_date: new Date(2022, 1, 24),
                owner: "jeff"
            })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("successfully posts goal when neither unit or target value are specified", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/goals/2/subgoals")
                .send({
                objective: "Write prologue",
                end_date: new Date(2022, 1, 24),
                owner: "jeff"
            })
                .expect(200)
                .then(function (res) {
                var expectedSubgoal = {
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
                    finish_date: null
                };
                expect(res.body.subgoal).toEqual(expectedSubgoal);
            });
        });
        test("returns error when a invalid goal_id is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/goals/two/subgoals")
                .send({
                objective: "Write prologue",
                end_date: new Date(2022, 1, 24),
                owner: "jeff"
            })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when a non-existent goal_id is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .post("/api/goals/9999/subgoals")
                .send({
                objective: "Write prologue",
                end_date: new Date(2022, 1, 24),
                owner: "jeff"
            })
                .expect(404)
                .then(function (res) {
                expect(res.body.message).toBe("Goal not found");
            });
        });
    });
    describe("GET", function () {
        test("retrieves subgoals for user when a valid goal_id is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/goals/1/subgoals")
                .expect(200)
                .then(function (res) {
                var subgoals = res.body.subgoals;
                expect(subgoals.length).toBe(4);
                subgoals.forEach(function (subgoal) {
                    expect(subgoal.goal_id).toBe(1);
                    expect(new Date(subgoal.end_date)).not.toBe("Invalid Date");
                    expect(subgoal).toEqual(expect.objectContaining({
                        subgoal_id: expect.any(Number),
                        objective: expect.any(String),
                        type: expect.any(String),
                        status: expect.any(String),
                        owner: expect.any(String)
                    }));
                });
            });
        });
        test("returns empty object when no subgoals exist for a goal", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/goals/5/subgoals")
                .expect(200)
                .then(function (res) {
                expect(res.body.subgoals).toEqual([]);
            });
        });
        test("returns error when invalid goal is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/goals/one/subgoals")
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toEqual("Bad request");
            });
        });
        test("returns error when non-existent goal is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/goals/9999/subgoals")
                .expect(404)
                .then(function (res) {
                expect(res.body.message).toEqual("Goal not found");
            });
        });
    });
});
describe("/api/subgoals/:subgoal_id", function () {
    describe("GET", function () {
        test("successfully retrieves subgoal when valid subgoal id is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/subgoals/8")
                .expect(200)
                .then(function (res) {
                var subgoal = res.body.subgoal;
                var expectedGoal = {
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
                    finish_date: null
                };
                expect(subgoal).toEqual(expectedGoal);
            });
        });
        test("returns error when invalid subgoal_id is input", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/subgoals/eight")
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when non-existent subgoal_id is input", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/subgoals/9999")
                .expect(404)
                .then(function (res) {
                expect(res.body.message).toBe("Subgoal not found");
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
// describe("/api/subgoals/:subgoal_id/details", () => {
//   describe("PATCH", () => {
//     test("patches successfully when valid subgoal_id and complete patch object are entered", () => {});
//     test("patches successfully when valid subgoal_id and minimal patch object are entered", () => {});
//     test("returns error when invalid subgoal_id is entered", () => {});
//     test("returns error when non-existent subgoal_id is entered", () => {});
//     test("returns error when patch object doesn't any valid keys", () => {});
//     test("returns error when objective value is an empty string", () => {});
//     test("returns error when start date is not a valid date", () => {});
//     test("returns error when end date is not a valid date", () => {});
//     test("returns error when start date is set after end date", () => {});
//     test("returns error when end date is set before start date", () => {});
//     test("patches successfully when both start date and end date are changed to be an entirely different range to previously", () => {});
//     test("returns error if target value is not a number", () => {});
//   });
// });
describe("/api/subgoals/:subgoal_id/status", function () {
    describe("PATCH", function () {
        test("patches successfully when valid subgoal_id and patch object are entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .patch("/api/subgoals/7/status")
                .send({ status: "completed", date: new Date(2022, 1, 23) })
                .expect(200)
                .then(function (res) {
                expect(res.body.subgoal.subgoal_id).toBe(7);
                expect(res.body.subgoal.status).toBe("completed");
                expect(res.body.subgoal.finish_date).toBe("2022-02-23T00:00:00.000Z");
            });
        });
        test("returns error when invalid subgoal_id is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .patch("/api/subgoals/seven/status")
                .send({ status: "completed", date: new Date(2022, 1, 23) })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when non-existent subgoal_id is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .patch("/api/subgoals/9999/status")
                .send({ status: "completed", date: new Date(2022, 1, 23) })
                .expect(404)
                .then(function (res) {
                expect(res.body.message).toBe("Subgoal not found");
            });
        });
        test("returns error when patch object doesn't have status key", function () {
            return (0, supertest_1["default"])(app_1.app)
                .patch("/api/subgoals/7/status")
                .send({ date: new Date(2022, 1, 23) })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when patch object status has invalid value", function () {
            return (0, supertest_1["default"])(app_1.app)
                .patch("/api/subgoals/7/status")
                .send({ status: "todo", date: new Date(2022, 1, 23) })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when patch object doesn't have date key when patching to completed", function () {
            return (0, supertest_1["default"])(app_1.app)
                .patch("/api/subgoals/7/status")
                .send({ status: "completed" })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when patch object status has invalid date when patching to completed", function () {
            return (0, supertest_1["default"])(app_1.app)
                .patch("/api/subgoals/7/status")
                .send({ status: "completed", date: "today" })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("patches successfully when valid goal_id and patch object are entered without date key when patching to active", function () {
            return (0, supertest_1["default"])(app_1.app)
                .patch("/api/subgoals/5/status")
                .send({ status: "active" })
                .expect(200)
                .then(function (res) {
                expect(res.body.subgoal.subgoal_id).toBe(5);
                expect(res.body.subgoal.status).toBe("active");
                expect(res.body.subgoal.finish_date).toBe(null);
            });
        });
    });
});
describe("/api/subgoals/:subgoal_id/progress", function () {
    describe("PATCH", function () {
        test("patches successfully when valid subgoal_id and patch object are entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .patch("/api/subgoals/2/progress")
                .send({ date: new Date(2022, 1, 19), value: 10 })
                .expect(200)
                .then(function (res) {
                expect(res.body.subgoal.progress).toEqual([
                    ["2022-02-15T00:00:00.000Z", 10],
                    ["2022-02-17T00:00:00.000Z", 20],
                    ["2022-02-19T00:00:00.000Z", 30],
                ]);
            });
        });
        test("returns error when invalid subgoal_id is input", function () {
            return (0, supertest_1["default"])(app_1.app)
                .patch("/api/subgoals/two/progress")
                .send({ date: new Date(2022, 1, 19), value: 10 })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when non-existent subgoal_id is input", function () {
            return (0, supertest_1["default"])(app_1.app)
                .patch("/api/subgoals/9999/progress")
                .send({ date: new Date(2022, 1, 19), value: 10 })
                .expect(404)
                .then(function (res) {
                expect(res.body.message).toBe("Subgoal not found");
            });
        });
        test("returns error when patch object does not have date property", function () {
            return (0, supertest_1["default"])(app_1.app)
                .patch("/api/subgoals/2/progress")
                .send({ value: 10 })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when patch object does not have value property", function () {
            return (0, supertest_1["default"])(app_1.app)
                .patch("/api/subgoals/2/progress")
                .send({ date: new Date(2022, 1, 19) })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when date property is not a valid date", function () {
            return (0, supertest_1["default"])(app_1.app)
                .patch("/api/subgoals/2/progress")
                .send({ date: "today", value: 10 })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when value property is not a number", function () {
            return (0, supertest_1["default"])(app_1.app)
                .patch("/api/subgoals/2/progress")
                .send({ date: new Date(2022, 1, 19), value: "ten" })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when subgoal trying to be patched is not `progress`-type", function () {
            return (0, supertest_1["default"])(app_1.app)
                .patch("/api/subgoals/8/progress")
                .send({ date: new Date(2022, 1, 22), value: 10 })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Progress cannot be added to 'boolean' type subgoal");
            });
        });
        test("returns error when date is before start date of subgoal", function () {
            return (0, supertest_1["default"])(app_1.app)
                .patch("/api/subgoals/2/progress")
                .send({ date: new Date(2022, 1, 1), value: 10 })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Cannot add progress outside of date range of subgoal");
            });
        });
        test("returns error when date is after end date of subgoal", function () {
            return (0, supertest_1["default"])(app_1.app)
                .patch("/api/subgoals/2/progress")
                .send({ date: new Date(2022, 3, 1), value: 10 })
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Cannot add progress outside of date range of subgoal");
            });
        });
    });
});
describe("/api/users/:username/subgoals", function () {
    describe("GET", function () {
        test("retrieves subgoals for user when a valid user is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/users/mary/subgoals")
                .expect(200)
                .then(function (res) {
                var subgoals = res.body.subgoals;
                expect(subgoals.length).toBe(4);
                subgoals.forEach(function (goal) {
                    expect(goal.owner).toBe("mary");
                    expect(new Date(goal.end_date)).not.toBe("Invalid Date");
                    expect(goal).toEqual(expect.objectContaining({
                        subgoal_id: expect.any(Number),
                        goal_id: expect.any(Number),
                        objective: expect.any(String),
                        type: expect.any(String),
                        status: expect.any(String)
                    }));
                });
            });
        });
        test("returns empty object when no subgoals exist for a user", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/users/martina/subgoals")
                .expect(200)
                .then(function (res) {
                expect(res.body.subgoals).toEqual([]);
            });
        });
        test("returns error when non-existent user is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/users/simon/subgoals")
                .expect(404)
                .then(function (res) {
                expect(res.body.message).toEqual("User not found");
            });
        });
        test("accepts from_date query and only shows subgoals after that date", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/users/mary/subgoals?from_date=2022-03-07")
                .expect(200)
                .then(function (res) {
                expect(res.body.subgoals.length).toBe(2);
                res.body.subgoals.forEach(function (subgoal) {
                    expect(new Date(subgoal.end_date).getTime()).toBeGreaterThanOrEqual(new Date(2022, 2, 7).getTime());
                });
            });
        });
        test("accepts to_date query and only shows goals before that date", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/users/mary/subgoals?to_date=2022-03-06")
                .expect(200)
                .then(function (res) {
                expect(res.body.subgoals.length).toBe(2);
                res.body.subgoals.forEach(function (subgoal) {
                    expect(new Date(subgoal.start_date).getTime()).toBeLessThanOrEqual(new Date(2022, 2, 6).getTime());
                });
            });
        });
        test("accepts both to_date and from_date queries simultaneously", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/users/mary/subgoals?from_date=2022-02-07&to_date=2022-03-06")
                .expect(200)
                .then(function (res) {
                expect(res.body.subgoals.length).toBe(1);
                res.body.subgoals.forEach(function (subgoal) {
                    expect(new Date(subgoal.start_date).getTime()).toBeLessThanOrEqual(new Date(2022, 2, 6).getTime());
                    expect(new Date(subgoal.end_date).getTime()).toBeGreaterThanOrEqual(new Date(2022, 1, 7).getTime());
                });
            });
        });
        test("if subgoal partly clips with beginning of range, it is still included", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/users/mary/subgoals?from_date=2022-03-06")
                .expect(200)
                .then(function (res) {
                expect(res.body.subgoals.length).toBe(3);
                res.body.subgoals.forEach(function (subgoal) {
                    expect(new Date(subgoal.end_date).getTime()).toBeGreaterThanOrEqual(new Date(2022, 2, 6).getTime());
                });
            });
        });
        test("if subgoal partly clips with end of range, it is still included", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/users/mary/subgoals?to_date=2022-03-07")
                .expect(200)
                .then(function (res) {
                expect(res.body.subgoals.length).toBe(3);
                res.body.subgoals.forEach(function (subgoal) {
                    expect(new Date(subgoal.start_date).getTime()).toBeLessThanOrEqual(new Date(2022, 2, 7).getTime());
                });
            });
        });
        test("returns empty array if there are no subgoals within range set", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/users/mary/subgoals?from_date=2022-09-29")
                .expect(200)
                .then(function (res) {
                expect(res.body.subgoals).toEqual([]);
            });
        });
        test("returns error if to_date is before from_date", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/users/mary/subgoals?from_date=2022-03-29&to_date=2022-03-28")
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("to_date must be equal to or later than from_date");
            });
        });
        test("does not return error if to_date is equal to from_date", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/users/mary/subgoals?from_date=2022-03-27&to_date=2022-03-27")
                .expect(200)
                .then(function (res) {
                expect(res.body.subgoals.length).toBe(1);
                expect(res.body.subgoals[0].subgoal_id).toBe(11);
            });
        });
        test("returns error if from_date is not in YYYY-MM-DD form", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/users/mary/subgoals?from_date=today")
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error if to_date is not in YYYY-MM-DD form", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/users/mary/subgoals?to_date=today")
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("functions correctly when dealing with boolean-type goals", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/users/jeff/subgoals?from_date=2022-02-21&to_date=2022-02-29")
                .expect(200)
                .then(function (res) {
                expect(res.body.subgoals.length).toBe(4);
                res.body.subgoals.forEach(function (subgoal) {
                    expect(new Date(subgoal.end_date).getTime()).toBeGreaterThanOrEqual(new Date(2022, 1, 21).getTime());
                    if (subgoal.type === "progress") {
                        expect(new Date(subgoal.start_date).getTime()).toBeLessThanOrEqual(new Date(2022, 1, 29).getTime());
                    }
                    else {
                        expect(new Date(subgoal.end_date).getTime()).toBeLessThanOrEqual(new Date(2022, 1, 29).getTime());
                    }
                });
            });
        });
    });
});
