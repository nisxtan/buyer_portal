const favouriteService = require("./favourite.services");

const getFavourites = async (req, res, next) => {
    try {
        const AppDataSource = req.app.get("AppDataSource");
        const favourites = await favouriteService.getFavourites(AppDataSource, req.user.id);

        res.status(200).json({
            message: "Favourites fetched successfully",
            success: true,
            data: favourites
        });
    } catch (err) {
        next(err);
    }
};

const addFavourite = async (req, res, next) => {
    try {
        const AppDataSource = req.app.get("AppDataSource");
        const { propertyId } = req.body;

        const property = await favouriteService.addFavourite(AppDataSource, req.user.id, propertyId);

        res.status(201).json({
            message: "Added to favourites",
            success: true,
            data: property
        });
    } catch (err) {
        next(err);
    }
};

const removeFavourite = async (req, res, next) => {
    try {
        const AppDataSource = req.app.get("AppDataSource");
        const { propertyId } = req.params;

        const result = await favouriteService.removeFavourite(AppDataSource, req.user.id, propertyId);

        res.status(200).json({
            message: result.message,
            success: true
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { getFavourites, addFavourite, removeFavourite };