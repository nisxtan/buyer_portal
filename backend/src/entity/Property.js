const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Property",
    tableName: "properties",
    columns: {
        id: { primary: true, type: "uuid", generated: "uuid" },
        title: { type: "varchar", nullable: false },
        location: { type: "varchar", nullable: false },
        price: { type: "decimal", precision: 12, scale: 2, nullable: false },
        description: { type: "text", nullable: true },
        imageUrl: { type: "varchar", nullable: true },
        created_at: { type: "timestamp", createDate: true },
        updated_at: { type: "timestamp", updateDate: true },
    },
    relations: {
        favourites: {
            type: "one-to-many",
            target: "Favourite",
            inverseSide: "property",
        },
    },
});