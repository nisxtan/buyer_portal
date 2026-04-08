const propertyRouter = require("express").Router();
const propertyController = require("./property.controller");
const authMiddleware = require("../../middleware/auth.middleware");

propertyRouter.get("/", authMiddleware, propertyController.getAllProperties);
propertyRouter.get("/:id", authMiddleware, propertyController.getPropertyById);

module.exports = propertyRouter;