const getAllProperties = async (AppDataSource) => {
    const propertyRepository = AppDataSource.getRepository("Property");
    return await propertyRepository.find();
};

module.exports = { getAllProperties };