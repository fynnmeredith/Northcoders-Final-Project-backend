"use strict";
exports.__esModule = true;
var misc_1 = require("../utils/misc");
describe("Util func check object keys", function () {
    describe("requestKeyCheck", function () {
        test("requestKeyCheck() passes", function () {
            var testObj = { a: 1, b: 2 };
            expect(misc_1.requestKeyCheck(testObj, "a", "b")).toEqual(true);
            expect(misc_1.requestKeyCheck(testObj, "a")).toEqual(true);
        });
        test("requestKeyCheck() fails", function () {
            var testObj = { a: 1, b: 2 };
            expect(misc_1.requestKeyCheck(testObj, "c")).toEqual(false);
        });
        test("requestKeyCheck() fails when insufficient args", function () {
            var testObj = { a: 1, b: 2 };
            expect(misc_1.requestKeyCheck(testObj)).toEqual(false);
        });
    });
});
