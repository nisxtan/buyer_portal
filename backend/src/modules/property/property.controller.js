const propertyService = require("./property.services");

const getAllProperties = async (req, res, next) => {
    try {
        const AppDataSource = req.app.get("AppDataSource");
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const search = req.query.search || "";
        const { properties, totalCount } = await propertyService.getAllProperties(AppDataSource, page, limit, search);

        res.status(200).json({
            message: "Properties fetched successfully",
            success: true,
            data: properties,
            meta: {
                totalCount,
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit)
            }
        });
    } catch (err) {
        next(err);
    }
};

const getPropertyById = async (req, res, next) => {
    try {
        const AppDataSource = req.app.get("AppDataSource");
        const { id } = req.params;
        const property = await propertyService.getPropertyById(AppDataSource, id);

        res.status(200).json({
            message: "Property fetched successfully",
            success: true,
            data: property
        });
    } catch (err) {
        if (err.message === "Property not found") {
            return res.status(404).json({ success: false, message: "Property not found" });
        }
        next(err);
    }
};

module.exports = { getAllProperties, getPropertyById };