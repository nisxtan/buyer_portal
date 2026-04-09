require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 5000,
    HOST: process.env.HOST || "127.0.0.1",
    NODE_ENV: process.env.NODE_ENV || "development",

    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 5432,
    DB_USER: process.env.DB_USER || "postgres",
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME || "buyer_portal",

    JWT_SECRET: process.env.JWT_SECRET || "fjkfldsjflfsd5fsd65f4sd5f4s3f",
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "sdfjsdlkfjsdlkfjsdlkfjsdl",
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",



};