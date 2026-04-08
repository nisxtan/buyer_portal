require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const { DataSource } = require("typeorm");
const config = require("../config/config");  // Changed from ./config/config to ../config/config
const Property = require("../entity/Property");
const User = require("../entity/User");
const Favourite = require("../entity/Favourites");

const AppDataSource = new DataSource({
    type: "postgres",
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Property, User, Favourite],
});

const seedProperties = async () => {
    const propertyRepository = AppDataSource.getRepository("Property");

    const properties = [
        {
            title: "Modern Apartment in Lazimpat",
            location: "Lazimpat, Kathmandu",
            price: 45000000,
            description: "Beautiful 3-bedroom apartment with city view",
            imageUrl: "https://via.placeholder.com/400x300"
        },
        {
            title: "Family Home in Baluwatar",
            location: "Baluwatar, Kathmandu",
            price: 85000000,
            description: "Spacious 4-bedroom house with garden",
            imageUrl: "https://via.placeholder.com/400x300"
        },
        {
            title: "Luxury Penthouse in Jhamsikhel",
            location: "Jhamsikhel, Lalitpur",
            price: 120000000,
            description: "Stunning penthouse with rooftop terrace",
            imageUrl: "https://via.placeholder.com/400x300"
        },
        {
            title: "Studio Apartment in New Baneshwor",
            location: "New Baneshwor, Kathmandu",
            price: 25000000,
            description: "Perfect for young professionals",
            imageUrl: "https://via.placeholder.com/400x300"
        },
        {
            title: "Lake View Villa in Pokhara",
            location: "Lakeside, Pokhara",
            price: 95000000,
            description: "Beautiful villa with Fewa Lake view",
            imageUrl: "https://via.placeholder.com/400x300"
        }
    ];

    for (const prop of properties) {
        const existing = await propertyRepository.findOne({ where: { title: prop.title } });
        if (!existing) {
            await propertyRepository.save(propertyRepository.create(prop));
            console.log(`Seeded: ${prop.title}`);
        }
    }

    console.log("Seeding completed!");
    process.exit(0);
};

AppDataSource.initialize()
    .then(async () => {
        console.log("Database connected for seeding");
        await seedProperties();
    })
    .catch((err) => {
        console.error("DB connection error:", err);
        process.exit(1);
    });