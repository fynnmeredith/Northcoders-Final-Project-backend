"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var api_routers_1 = require("./routers/api.routers");
var app = express_1["default"]();
exports.app = app;
app.use(express_1["default"].json());
app.use(cors_1["default"]());
app.use(function (req, res, next) {
    if (req.body.start_date) {
        req.body.start_date = new Date(req.body.start_date);
    }
    if (req.body.end_date) {
        req.body.end_date = new Date(req.body.end_date);
    }
    if (req.body.date) {
        req.body.date = new Date(req.body.date);
    }
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
    res.status(500).send({ message: "Something went wrong" });
});
