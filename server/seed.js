import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productModel from './models/productModel.js';
import connectDB from './config/mongodb.js';

dotenv.config();

const dummyProducts = [
    {
        name: "Potato 500g",
        category: "Vegetables",
        subCategory: "Organic",
        price: 25,
        offerPrice: 20,
        image: ["https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=1000&auto=format&fit=crop"],
        description: "Fresh and organic, Rich in carbohydrates, Ideal for curries and fries",
        date: Date.now()
    },
    {
        name: "Tomato 1 kg",
        category: "Vegetables",
        subCategory: "Organic",
        price: 40,
        offerPrice: 35,
        image: ["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1000&auto=format&fit=crop"],
        description: "Juicy and ripe, Rich in Vitamin C, Perfect for salads and sauces, Farm fresh quality",
        date: Date.now()
    },
    {
        name: "Carrot 500g",
        category: "Vegetables",
        subCategory: "Organic",
        price: 30,
        offerPrice: 28,
        image: ["https://images.unsplash.com/photo-1598170845058-32b996a70da9?q=80&w=1000&auto=format&fit=crop"],
        description: "Sweet and crunchy, Good for eyesight, Ideal for juices and salads",
        date: Date.now()
    },
    {
        name: "Spinach 500g",
        category: "Vegetables",
        subCategory: "Organic",
        price: 18,
        offerPrice: 15,
        image: ["https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1000&auto=format&fit=crop"],
        description: "Rich in iron, High in vitamins, Perfect for soups and salads",
        date: Date.now()
    },
    {
        name: "Onion 500g",
        category: "Vegetables",
        subCategory: "Organic",
        price: 22,
        offerPrice: 19,
        image: ["https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=1000&auto=format&fit=crop"],
        description: "Fresh and pungent, Perfect for cooking, A kitchen staple",
        date: Date.now()
    },
    {
        name: "Apple 1 kg",
        category: "Fruits",
        subCategory: "Organic",
        price: 120,
        offerPrice: 110,
        image: ["https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?q=80&w=1000&auto=format&fit=crop"],
        description: "Crisp and juicy, Rich in fiber, Boosts immunity, Perfect for snacking and desserts, Organic and farm fresh",
        date: Date.now()
    },
    {
        name: "Orange 1 kg",
        category: "Fruits",
        subCategory: "Organic",
        price: 80,
        offerPrice: 75,
        image: ["https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=1000&auto=format&fit=crop"],
        description: "Juicy and sweet, Rich in Vitamin C, Perfect for juices and salads",
        date: Date.now()
    },
    {
        name: "Banana 1 kg",
        category: "Fruits",
        subCategory: "Organic",
        price: 50,
        offerPrice: 45,
        image: ["https://images.unsplash.com/photo-1571771894821-ad9902c13a47?q=80&w=1000&auto=format&fit=crop"],
        description: "Sweet and ripe, High in potassium, Great for smoothies and snacking",
        date: Date.now()
    },
    {
        name: "Mango 1 kg",
        category: "Fruits",
        subCategory: "Organic",
        price: 150,
        offerPrice: 140,
        image: ["https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1000&auto=format&fit=crop"],
        description: "Sweet and flavorful, Perfect for smoothies and desserts, Rich in Vitamin A",
        date: Date.now()
    },
    {
        name: "Grapes 500g",
        category: "Fruits",
        subCategory: "Organic",
        price: 70,
        offerPrice: 65,
        image: ["https://images.unsplash.com/photo-1537640538966-79f369143f8c?q=80&w=1000&auto=format&fit=crop"],
        description: "Fresh and juicy, Rich in antioxidants, Perfect for snacking and fruit salads",
        date: Date.now()
    },
    {
        name: "Amul Milk 1L",
        category: "Dairy",
        subCategory: "Fresh",
        price: 60,
        offerPrice: 55,
        image: ["https://images.unsplash.com/photo-1563636619-e91082a11652?q=80&w=1000&auto=format&fit=crop"],
        description: "Pure and fresh, Rich in calcium, Ideal for tea, coffee, and desserts, Trusted brand quality",
        date: Date.now()
    },
    {
        name: "Paneer 200g",
        category: "Dairy",
        subCategory: "Fresh",
        price: 90,
        offerPrice: 85,
        image: ["https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop"],
        description: "Soft and fresh, Rich in protein, Ideal for curries and snacks",
        date: Date.now()
    },
    {
        name: "Eggs 12 pcs",
        category: "Dairy",
        subCategory: "Fresh",
        price: 90,
        offerPrice: 85,
        image: ["https://images.unsplash.com/photo-1587486916761-468305093848?q=80&w=1000&auto=format&fit=crop"],
        description: "Farm fresh, Rich in protein, Ideal for breakfast and baking",
        date: Date.now()
    },
    {
        name: "Cheese 200g",
        category: "Dairy",
        subCategory: "Fresh",
        price: 140,
        offerPrice: 130,
        image: ["https://images.unsplash.com/photo-1486297678162-ad2a19b85f5d?q=80&w=1000&auto=format&fit=crop"],
        description: "Creamy and delicious, Perfect for pizzas and sandwiches, Rich in calcium",
        date: Date.now()
    },
    {
        name: "Coca-Cola 1.5L",
        category: "Drinks",
        subCategory: "Bottled",
        price: 80,
        offerPrice: 75,
        image: ["https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1000&auto=format&fit=crop"],
        description: "Refreshing and fizzy, Perfect for parties and gatherings, Best served chilled",
        date: Date.now()
    },
    {
        name: "Pepsi 1.5L",
        category: "Drinks",
        subCategory: "Bottled",
        price: 78,
        offerPrice: 73,
        image: ["https://images.unsplash.com/photo-1543253687-c931c8e01820?q=80&w=1000&auto=format&fit=crop"],
        description: "Chilled and refreshing, Perfect for celebrations, Best served cold",
        date: Date.now()
    },
    {
        name: "Sprite 1.5L",
        category: "Drinks",
        subCategory: "Bottled",
        price: 79,
        offerPrice: 74,
        image: ["https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?q=80&w=1000&auto=format&fit=crop"],
        description: "Refreshing citrus taste, Perfect for hot days, Best served chilled",
        date: Date.now()
    },
    {
        name: "Fanta 1.5L",
        category: "Drinks",
        subCategory: "Bottled",
        price: 77,
        offerPrice: 72,
        image: ["https://images.unsplash.com/photo-1624517535380-eb53a799c824?q=80&w=1000&auto=format&fit=crop"],
        description: "Sweet and fizzy, Great for parties and gatherings, Best served cold",
        date: Date.now()
    },
    {
        name: "7 Up 1.5L",
        category: "Drinks",
        subCategory: "Bottled",
        price: 76,
        offerPrice: 71,
        image: ["https://images.unsplash.com/photo-1622708304192-3580572e9d97?q=80&w=1000&auto=format&fit=crop"],
        description: "Refreshing lemon-lime flavor, Perfect for refreshing, Best served chilled",
        date: Date.now()
    },
    {
        name: "Basmati Rice 5kg",
        category: "Grains",
        subCategory: "Organic",
        price: 550,
        offerPrice: 520,
        image: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1000&auto=format&fit=crop"],
        description: "Long grain and aromatic, Perfect for biryani and pulao, Premium quality",
        date: Date.now()
    },
    {
        name: "Wheat Flour 5kg",
        category: "Grains",
        subCategory: "Organic",
        price: 250,
        offerPrice: 230,
        image: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop"],
        description: "High-quality whole wheat, Soft and fluffy rotis, Rich in nutrients",
        date: Date.now()
    },
    {
        name: "Brown Bread 400g",
        category: "Bakery",
        subCategory: "Fresh",
        price: 40,
        offerPrice: 35,
        image: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop"],
        description: "Soft and healthy, Made from whole wheat, Ideal for breakfast and sandwiches",
        date: Date.now()
    },
    {
        name: "Chocolate Cake 500g",
        category: "Bakery",
        subCategory: "Fresh",
        price: 350,
        offerPrice: 325,
        image: ["https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop"],
        description: "Rich and moist, Made with premium cocoa, Ideal for celebrations and parties",
        date: Date.now()
    },
    {
        name: "Maggi Noodles 280g",
        category: "Instant",
        subCategory: "Quick",
        price: 55,
        offerPrice: 50,
        image: ["https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1000&auto=format&fit=crop"],
        description: "Instant and easy to cook, Delicious taste, Popular among kids and adults",
        date: Date.now()
    }
];

const seedData = async () => {
    try {
        await connectDB();
        await productModel.deleteMany({});
        console.log('Clearing old inventory...');
        await productModel.insertMany(dummyProducts);
        console.log(`Successfully imported all ${dummyProducts.length} products from assets.js to your live database! 🚀`);
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
