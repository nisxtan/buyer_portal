const favouriteRouter = require("express").Router();
const validateBody = require("../../middleware/validateBody");
const favouriteController = require("./favourite.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const { addFavouriteSchema } = require("./validator");

favouriteRouter.use(authMiddleware);

// Get all favourites
favouriteRouter.get("/", favouriteController.getFavourites);

// Add favourite
favouriteRouter.post(
    "/",
    validateBody(addFavouriteSchema),
    favouriteController.addFavourite
);

// Remove favourite
favouriteRouter.delete("/:propertyId", favouriteController.removeFavourite);

module.exports = favouriteRouter;