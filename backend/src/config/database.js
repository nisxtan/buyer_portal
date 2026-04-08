const { DataSource } = require("typeorm");
const config = require("./config");
const User = require("../entity/User");
const Property = require("../entity/Property");
const Favourite = require("../entity/Favourites");

const AppDataSource = new DataSource({
    type: "postgres",
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Property, Favourite],
});

module.exports = AppDataSource;