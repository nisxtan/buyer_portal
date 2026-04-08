const express = require("express");
const cors = require("cors");
const AppDataSource = require("./database");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("AppDataSource", AppDataSource);

module.exports = { app, AppDataSource };