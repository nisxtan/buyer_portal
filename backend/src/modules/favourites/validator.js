const addFavouriteSchema = {
    propertyId: {
        required: true,
        pattern: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
        message: "Valid property ID is required"
    }
};

module.exports = { addFavouriteSchema };