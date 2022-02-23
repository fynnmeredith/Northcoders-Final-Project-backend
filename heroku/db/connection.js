"use strict";
exports.__esModule = true;
exports.db = void 0;
var pg_1 = require("pg");
var ENV = process.env.NODE_ENV || "development";
var config = ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
    : {};
require("dotenv").config({
    path: "".concat(__dirname, "/../.env.").concat(ENV)
});
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("PGDATABASE or DATABASE_URL not set");
}
var db = new pg_1.Pool(config);
exports.db = db;
