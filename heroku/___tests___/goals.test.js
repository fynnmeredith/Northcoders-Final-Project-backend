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
describe("/api/goals", function () {
    describe("POST", function () {
        test("", function () { });
    });
});
describe("/api/goals/:goal_id", function () {
    describe("GET", function () {
        test("successfully retrieves goal when valid goal id is entered", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/goals/3")
                .expect(200)
                .then(function (res) {
                var goal = res.body.goal;
                var expectedGoal = {
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
                    finish_date: null
                };
                expect(goal).toEqual(expectedGoal);
            });
        });
        test("returns error when invalid goal_id is input", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/goals/three")
                .expect(400)
                .then(function (res) {
                expect(res.body.message).toBe("Bad request");
            });
        });
        test("returns error when non-existent goal_id is input", function () {
            return (0, supertest_1["default"])(app_1.app)
                .get("/api/goals/9999")
                .expect(404)
                .then(function (res) {
                expect(res.body.message).toBe("Goal not found");
            });
        });
    });
    describe("DELETE", function () {
        test("", function () { });
    });
});
describe("/api/goals/:goal_id/details", function () {
    describe("PATCH", function () {
        test("", function () { });
    });
});
describe("/api/goals/:goal_id/progress", function () {
    describe("PATCH", function () {
        test("", function () { });
    });
});
describe("/api/users/:username/goals", function () {
    describe("GET", function () {
        test("", function () { });
    });
});
