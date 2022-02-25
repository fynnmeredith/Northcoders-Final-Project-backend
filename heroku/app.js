"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var api_routers_1 = require("./routers/api.routers");
var app = (0, express_1["default"])();
exports.app = app;
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
app.use(function (req, res, next) {
    console.log(req.body);
    next();
});
app.use("/api", api_routers_1.apiRouter);
app.all("*", function (req, res) {
    return res.status(404).send({ message: "Endpoint does not exist" });
});
app.use(function (err, req, res, next) {
    if (err.status) {
        res.status(err.status).send({ message: err.message });
    }
    else {
        next(err);
    }
});
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
});
