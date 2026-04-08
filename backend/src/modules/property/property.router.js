const propertyRouter = require("express").Router();
const propertyController = require("./property.controller");
const authMiddleware = require("../../middleware/auth.middleware");

propertyRouter.get("/", authMiddleware, propertyController.getAllProperties);

module.exports = propertyRouter;