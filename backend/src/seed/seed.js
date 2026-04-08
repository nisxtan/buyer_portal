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

    // Clear existing for a clean sweep of real images
    await AppDataSource.query('TRUNCATE TABLE "favourites" CASCADE');
    await AppDataSource.query('TRUNCATE TABLE "properties" CASCADE');
    console.log("Existing properties and favourites cleared via CASCADE.");

    const properties = [
        {
            title: "Modern Minimalist Villa",
            location: "Pokhara, Kaski",
            price: 120000000,
            description: "Spacious modern villa with a sleek minimalist design and breathtaking mountain views.",
            imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Luxury Hillside Retreat",
            location: "Nagarkot, Bhaktapur",
            price: 85000000,
            description: "An elegant hillside retreat offering ultimate privacy and stunning sunrise vistas.",
            imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Chic Urban Apartment",
            location: "Jhamsikhel, Lalitpur",
            price: 45000000,
            description: "Modern, centrally located apartment with premium finishes and city skyline views.",
            imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Classic Suburban Home",
            location: "Budhanilkantha, Kathmandu",
            price: 72000000,
            description: "A beautiful, family-friendly home in a quiet neighborhood with a large garden.",
            imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Luxury Lakeside Villa",
            location: "Fewa Lake, Pokhara",
            price: 95000000,
            description: "Exquisite lakeside living with a private dock and premium interior design.",
            imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Cozy Alp Cabin",
            location: "Solukhumbu",
            price: 32000000,
            description: "A charming wooden cabin designed for comfort in the heart of the mountains.",
            imageUrl: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Contemporary Glass Mansion",
            location: "Bhaisepati, Lalitpur",
            price: 155000000,
            description: "State-of-the-art glass architecture with an infinity pool and smart home features.",
            imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Modern Poolside Estate",
            location: "Bishnumati, Kathmandu",
            price: 110000000,
            description: "Grand estate featuring a secondary guest house and extensive leisure facilities.",
            imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Rustic Forest Cottage",
            location: "Godawari, Lalitpur",
            price: 48000000,
            description: "Peaceful forest living with high vaulted ceilings and a cozy fireplace.",
            imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Elegent Penthouse Suite",
            location: "Naxal, Kathmandu",
            price: 68000000,
            description: "Premium penthouse living with a private terrace and 360-degree views.",
            imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Grand Colonial Residence",
            location: "Baluwatar, Kathmandu",
            price: 185000000,
            description: "Historic charm meets modern luxury in this beautifully restored colonial home.",
            imageUrl: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Modernist Waterfront Haven",
            location: "Rupa Lake, Kaski",
            price: 52000000,
            description: "Sleek architectural lines situated right on the water's edge for serene living.",
            imageUrl: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Minimalist Desert Oasis",
            location: "Mustang, Nepal",
            price: 38000000,
            description: "A unique minimalist design that perfectly complements the rugged landscape.",
            imageUrl: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Sophisticated Riverside Villa",
            location: "Bagmati, Kathmandu",
            price: 79000000,
            description: "Premium riverside villa with landscaped gardens and automated security.",
            imageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Classic Bricked Estate",
            location: "Patan, Lalitpur",
            price: 62000000,
            description: "Traditional brickwork exterior with a fully renovated modern interior.",
            imageUrl: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Contemporary Twin Duplex",
            location: "Sanepa, Lalitpur",
            price: 92000000,
            description: "Luxury twin duplex perfect for multi-generational families or rental income.",
            imageUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Classic Estate Home",
            location: "Chitwan, Nepal",
            price: 55000000,
            description: "Spacious estate with a large courtyard and traditional features.",
            imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Modern Industrial Loft",
            location: "Baneshwor, Kathmandu",
            price: 35000000,
            description: "Exposed brick and high ceilings in this trendy industrial-style loft.",
            imageUrl: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Sustainable Eco-House",
            location: "Solukhumbu, Nepal",
            price: 28000000,
            description: "Self-sufficient solar-powered home built with local sustainable materials.",
            imageUrl: "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Suburban Family Haven",
            location: "Lalitpur City",
            price: 68000000,
            description: "Well-built home with 5 bedrooms and a safe playground for kids.",
            imageUrl: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Mountain Shadow Cabin",
            location: "Tukuche, Mustang",
            price: 24000000,
            description: "A quiet getaway tucked away under the shadows of high peaks.",
            imageUrl: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Panoramic Hillside Plot",
            location: "Sarangkot, Pokhara",
            price: 15000000,
            description: "Premium land plot with 180-degree views of the Annapurna range.",
            imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Modernist Architecture Gem",
            location: "Khumaltar, Lalitpur",
            price: 89000000,
            description: "Award-winning architectural design with open plan living area.",
            imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Scandinavian Style Flat",
            location: "Sanepa, Lalitpur",
            price: 19000000,
            description: "Bright, airy flat with functional Scandinavian furniture and lighting.",
            imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Private Library Studio",
            location: "Lazimpat, Kathmandu",
            price: 22000000,
            description: "A scholar's dream featuring walls of books and a quiet balcony.",
            imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Contemporary Dusk Villa",
            location: "Baluwatar, Kathmandu",
            price: 130000000,
            description: "Beautifully lit villa that shines during the golden hour and dusk.",
            imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Boutique City Apartment",
            location: "Durbarmarg, Kathmandu",
            price: 59000000,
            description: "Luxury living in the heart of the city's fashion district.",
            imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Garden Estate",
            location: "Godawari, Lalitpur",
            price: 105000000,
            description: "Extensive private gardens with local flora and a small stream.",
            imageUrl: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Spacious Garden Home",
            location: "Tokha, Kathmandu",
            price: 49000000,
            description: "Traditional family home with a modern kitchen and garden.",
            imageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Annapurna View Cabin",
            location: "Dhampus, Pokhara",
            price: 18000000,
            description: "Simple yet cozy cabin with the best morning mountain views.",
            imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Lakeside Sun Terrace",
            location: "Lakeside, Pokhara",
            price: 36000000,
            description: "Apartment featuring a massive sun terrace overlooking the lake.",
            imageUrl: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80"
        }
    ];

    for (const prop of properties) {
        await propertyRepository.save(propertyRepository.create(prop));
        console.log(`Seeded: ${prop.title}`);
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