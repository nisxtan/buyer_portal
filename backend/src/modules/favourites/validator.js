const addFavouriteSchema = {
    propertyId: {
        required: true,
        pattern: /^\d+$/,
        message: "Valid property ID is required"
    }
};

module.exports = { addFavouriteSchema };