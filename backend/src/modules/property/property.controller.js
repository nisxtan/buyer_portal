const propertyService = require("./property.services");

const getAllProperties = async (req, res, next) => {
    try {
        const AppDataSource = req.app.get("AppDataSource");
        const properties = await propertyService.getAllProperties(AppDataSource);

        res.status(200).json({
            message: "Properties fetched successfully",
            success: true,
            data: properties
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { getAllProperties };