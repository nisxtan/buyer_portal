const express = require("express");
const cors = require("cors");
const AppDataSource = require("./database");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");
        app.set("AppDataSource", AppDataSource);
    })
    .catch((err) => {
        console.error("DB connection error:", err);
        process.exit(1);
    });

module.exports = app;