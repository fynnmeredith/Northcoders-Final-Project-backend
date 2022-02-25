"use strict";
exports.__esModule = true;
var connection_1 = require("../db/connection");
test("obligatory test", function () { });
afterAll(function () { return connection_1.db.end(); });
