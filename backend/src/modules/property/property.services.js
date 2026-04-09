const { ILike } = require("typeorm");

const getAllProperties = async (AppDataSource, page = 1, limit = 6, search = "") => {
    const propertyRepository = AppDataSource.getRepository("Property");
    const [properties, totalCount] = await propertyRepository.findAndCount({
        where: search ? [
            { title: ILike(`%${search}%`) },
            { location: ILike(`%${search}%`) }
        ] : {},
        skip: (page - 1) * limit,
        take: limit,
        order: { created_at: "DESC" }
    });
    return { properties, totalCount };
};

const getPropertyById = async (AppDataSource, id) => {
    const propertyRepository = AppDataSource.getRepository("Property");
    const property = await propertyRepository.findOneBy({ id });
    if (!property) throw new Error("Property not found");
    return property;
};

module.exports = { getAllProperties, getPropertyById };