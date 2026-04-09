const favouriteRouter = require("express").Router();
const validateBody = require("../../middleware/validateBody");
const favouriteController = require("./favourite.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const { addFavouriteSchema } = require("./validator");

favouriteRouter.use(authMiddleware);

favouriteRouter.get("/", favouriteController.getFavourites);

favouriteRouter.post(
    "/",
    validateBody(addFavouriteSchema),
    favouriteController.addFavourite
);

favouriteRouter.delete("/:propertyId", favouriteController.removeFavourite);

module.exports = favouriteRouter;