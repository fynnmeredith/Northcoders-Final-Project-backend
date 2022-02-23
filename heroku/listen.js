"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var _a = process.env.PORT, PORT = _a === void 0 ? 9090 : _a;
app_1.app.listen(PORT, function (err) {
    if (err)
        throw err;
    console.log("Listening on ".concat(PORT, "..."));
});
