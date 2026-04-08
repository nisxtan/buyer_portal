const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Favourite",
    tableName: "favourites",
    columns: {
        id: { primary: true, type: "int", generated: "increment" },
        userId: { type: "int", nullable: false },
        propertyId: { type: "int", nullable: false },
        created_at: { type: "timestamp", createDate: true },
    },
    relations: {
        user: {
            type: "many-to-one",
            target: "User",
            joinColumn: { name: "userId" },
            nullable: false,
            onDelete: "CASCADE",
        },
        property: {
            type: "many-to-one",
            target: "Property",
            joinColumn: { name: "propertyId" },
            nullable: false,
            onDelete: "CASCADE",
        },
    },
    uniques: [
        {
            name: "UNIQUE_USER_PROPERTY",
            columns: ["userId", "propertyId"],
        },
    ],
});