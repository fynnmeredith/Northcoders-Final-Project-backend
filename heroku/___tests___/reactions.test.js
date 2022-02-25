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
exports.__esModule = true;
var testData = __importStar(require("../db/data/test-data/index"));
var seed_1 = require("../db/seeds/seed");
beforeEach(function () { return (0, seed_1.seed)(testData); });
describe("/api/posts/:post_id/reactions", function () {
    describe("POST", function () {
        test("successfully creates reaction if post_id and owner exist, reaction is valid, and user has not already reacted to post", function () { });
        test("returns error if post object does not have owner property", function () { });
        test("returns error if post object does not have reaction property", function () { });
        test("returns error if post_id is invalid", function () { });
        test("returns error if post does not exist", function () { });
        test("returns error if owner not exist", function () { });
        test("returns error if user has already reacted to post", function () { });
    });
    describe("GET", function () {
        test("successfully retrieves reactions of post when post_id is valid", function () { });
        test("returns error if post_id is invalid", function () { });
        test("returns error if post does not exist", function () { });
        test("successfully retrieves empty array if post has not reactions", function () { });
    });
});
describe("/api/reactions/:reaction_id", function () {
    describe("DELETE", function () {
        test("successfully deletes reaction if reaction_id is valid", function () { });
        test("returns error if reaction_id is invalid", function () { });
        test("returns error if reaction does not exist", function () { });
    });
});
