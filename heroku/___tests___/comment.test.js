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
describe("/api/comments Post new comment", function () {
    test("successfully posts a new social media comment when valid body is entered", function () { });
});
// return request(app)
//       .post("/api/post")
//       .send({
//         associated_data_type: "goal",
//         associated_id: "1",
//         owner: "jeff",
//         datetime: new Date(),
//         message: "jeff test post, im so happy to be running",
//       })
//       .expect(200)
//       .then((res) => {
//         expect(res.body.post).toBeInstanceOf(Object);
//         expect(res.body.post).toMatchObject({
//           associated_data_type: expect.any(String),
//           associated_id: expect.any(String),
//           owner: expect.any(String),
//           datetime: expect.any(String),
//           message: expect.any(String),
//         });
//       });
