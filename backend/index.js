require("dotenv").config({
    path: require("path").resolve(__dirname, ".env"),
    quiet: true,
    debug: false
});
const http = require("http");
const { app, AppDataSource } = require("./src/config/express.config");
const router = require("./src/config/router.config");
const config = require("./src/config/config");
const errorHandler = require("./src/middleware/error.middleware");

app.use("/api/v1", router);

app.use(errorHandler);

const httpServer = http.createServer(app);

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully");

        httpServer.listen(config.PORT, config.HOST, (err) => {
            if (!err) {
                console.log(`Server running on port: ${config.PORT}`);
                console.log(`URL: http://${config.HOST}:${config.PORT}`);
            }
        });
    })
    .catch((err) => {
        console.error("DB connection error:", err);
        process.exit(1);
    });