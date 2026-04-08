const getFavourites = async (AppDataSource, userId) => {
    const favouriteRepository = AppDataSource.getRepository("Favourite");
    
    const favourites = await favouriteRepository.find({
        where: { user: { id: userId } },
        relations: ["property"],
        order: { created_at: "DESC" }
    });
    
    return favourites.map(fav => fav.property);
};

const addFavourite = async (AppDataSource, userId, propertyId) => {
    const favouriteRepository = AppDataSource.getRepository("Favourite");
    const propertyRepository = AppDataSource.getRepository("Property");
    
    const property = await propertyRepository.findOne({ where: { id: propertyId } });
    if (!property) {
        throw { message: "Property not found", code: 404 };
    }
    
    const existing = await favouriteRepository.findOne({
        where: { user: { id: userId }, property: { id: propertyId } }
    });
    
    if (existing) {
        throw { message: "Property already in favourites", code: 400 };
    }
    
    const favourite = favouriteRepository.create({
        user: { id: userId },
        property: { id: propertyId }
    });
    
    await favouriteRepository.save(favourite);
    return property;
};

const removeFavourite = async (AppDataSource, userId, propertyId) => {
    const favouriteRepository = AppDataSource.getRepository("Favourite");
    
    const favourite = await favouriteRepository.findOne({
        where: { user: { id: userId }, property: { id: propertyId } }
    });
    
    if (!favourite) {
        throw { message: "Favourite not found", code: 404 };
    }
    
    await favouriteRepository.remove(favourite);
    return { message: "Removed from favourites" };
};

module.exports = { getFavourites, addFavourite, removeFavourite };