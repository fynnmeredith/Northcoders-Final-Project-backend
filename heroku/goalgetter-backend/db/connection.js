"use strict";
exports.__esModule = true;
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
    path: __dirname + "/../.env." + ENV
});
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("PGDATABASE or DATABASE_URL not set");
}
var db = new pg_1.Pool(config);
exports.db = db;
