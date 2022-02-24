import { db } from "../db/connection";
import * as testData from "../db/data/test-data/index";
import { seed } from "../db/seeds/seed";
import { app } from "../app";
import * as request from "supertest";
import {} from "ts-jest";
import exp from "constants";

import { requestKeyCheck } from "../utils/misc";

describe("Util func check object keys", () => {
  describe("requestKeyCheck", () => {
    test("requestKeyCheck() passes", () => {
      const testObj = { a: 1, b: 2 };
      expect(requestKeyCheck(testObj, "a", "b")).toEqual(true);
      expect(requestKeyCheck(testObj, "a")).toEqual(true);
    });
    test("requestKeyCheck() fails", () => {
      const testObj = { a: 1, b: 2 };
      expect(requestKeyCheck(testObj, "c")).toEqual(false);
    });
    test("requestKeyCheck() fails when insufficient args", () => {
      const testObj = { a: 1, b: 2 };
      expect(requestKeyCheck(testObj)).toEqual(false);
    });
  });
});
