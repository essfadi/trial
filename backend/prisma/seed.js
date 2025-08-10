const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  await prisma.restaurant.createMany({
    data: [
      {
        name: "Pizza Pino",
        status: "Closed",
        logo_url: "https://i.imgur.com/J5n248v.png",
      },
      {
        name: "Bonkin Donuts",
        status: "Open",
        logo_url: "https://i.imgur.com/bC31GAR.png",
      },
      {
        name: "Sweet Treats",
        status: "Open",
        logo_url: "https://i.imgur.com/wSflYfA.png",
      },
      {
        name: "Daily Needs",
        status: "Open",
        logo_url: "https://i.imgur.com/k2d4Ff6.png",
      },
      {
        name: "KFC",
        status: "Open",
        logo_url: "https://i.imgur.com/P12sV0r.png",
      },
      {
        name: "Indian Tadka",
        status: "Open",
        logo_url: "https://i.imgur.com/o8PSb8b.png",
      },
      {
        name: "Taco Bell",
        status: "Open",
        logo_url: "https://i.imgur.com/K5aFf7r.png",
      },
    ],
    skipDuplicates: true,
  });

  const restaurants = await prisma.restaurant.findMany();

  const getRestaurantId = (name) => {
    const restaurant = restaurants.find((r) => r.name === name);
    if (!restaurant)
      throw new Error(`Restaurant with name "${name}" not found.`);
    return restaurant.id;
  };

  console.log("Restaurants created/verified.");

  await prisma.food.createMany({
    data: [
      {
        name: "Bow Lasagna",
        price: 2.99,
        rating: 4.6,
        image_url:
          "https://images.unsplash.com/photo-1574894709920-31b29d1dc559",
        restaurant_id: getRestaurantId("Pizza Pino"),
      },
      {
        name: "Mixed Avocado Sm",
        price: 5.99,
        rating: 4.0,
        image_url:
          "https://images.unsplash.com/photo-1600788908316-14c1ba1dee6b",
        restaurant_id: getRestaurantId("Pizza Pino"),
      },
      {
        name: "Pancake",
        price: 3.99,
        rating: 5.0,
        image_url:
          "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
        restaurant_id: getRestaurantId("Bonkin Donuts"),
      },
      {
        name: "Cupcake",
        price: 1.99,
        rating: 4.8,
        image_url:
          "https://images.unsplash.com/photo-1587668178277-2952e1f904ce",
        restaurant_id: getRestaurantId("Sweet Treats"),
      },
      {
        name: "Creamy Stake",
        price: 12.99,
        rating: 4.5,
        image_url: "https://images.unsplash.com/photo-1551028150-64b9f398f678",
        restaurant_id: getRestaurantId("Daily Needs"),
      },
      {
        name: "Stake with Potatos",
        price: 15.99,
        rating: 5.0,
        image_url:
          "https://images.unsplash.com/photo-1600891964092-4316c288032e",
        restaurant_id: getRestaurantId("KFC"),
      },
      {
        name: "Indian Spicy Soup",
        price: 9.99,
        rating: 4.5,
        image_url: "https://images.unsplash.com/photo-1547592180-85f173990554",
        restaurant_id: getRestaurantId("Indian Tadka"),
      },
      {
        name: "Stake Omlet",
        price: 11.99,
        rating: 4.9,
        image_url:
          "https://images.unsplash.com/photo-1482049016688-2d3e1b311543",
        restaurant_id: getRestaurantId("Taco Bell"),
      },
    ],
    skipDuplicates: true,
  });

  console.log("Foods created.");
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
