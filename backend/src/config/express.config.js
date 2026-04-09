const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AppDataSource = require("./database");

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("AppDataSource", AppDataSource);

module.exports = { app, AppDataSource };