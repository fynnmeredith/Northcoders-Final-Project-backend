"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var devData = __importStar(require("../data/dev-data/index"));
var seed_1 = require("./seed");
var connection_1 = require("../connection");
var runSeed = function () {
    return seed_1.seed(devData).then(function () { return connection_1.db.end(); });
};
runSeed();
