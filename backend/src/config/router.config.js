const router = require("express").Router();
const userRouter = require("../modules/user/user.router");
const propertyRouter = require("../modules/property/property.router");
const favouriteRouter = require("../modules/favourites/favourite.router");

router.use("/auth", userRouter);
router.use("/properties", propertyRouter);
router.use("/favourites", favouriteRouter);

module.exports = router;