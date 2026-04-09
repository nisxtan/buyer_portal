const userRouter = require("express").Router();
const validateBody = require("../../middleware/validateBody");
const userController = require("./user.controller");
const { registerSchema, loginSchema } = require("./validator");
const authMiddleware = require("../../middleware/auth.middleware");

// Register route
userRouter.post(
    "/register",
    validateBody(registerSchema),
    userController.register
);

// Login route
userRouter.post(
    "/login",
    validateBody(loginSchema),
    userController.login
);

// Refresh token route
userRouter.post("/refresh-token", userController.refreshToken);

// Profile route
userRouter.get("/profile", authMiddleware, userController.getProfile);

module.exports = userRouter;