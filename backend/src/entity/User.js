const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: { primary: true, type: "int", generated: "increment" },
        name: { type: "varchar", nullable: false },
        email: { type: "varchar", unique: true, nullable: false },
        password: { type: "varchar", nullable: false },
        role: { type: "varchar", default: "buyer" },
        is_active: { type: "boolean", default: true },
        created_at: { type: "timestamp", createDate: true },
        updated_at: { type: "timestamp", updateDate: true },
    },
    relations: {
        favourites: {
            type: "one-to-many",
            target: "Favourite",
            inverseSide: "user",
        },
    },
});