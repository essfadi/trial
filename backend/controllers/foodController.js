const prisma = require("../lib/prisma");

// Get all food items, with optional search and pagination
exports.getAllFoods = async (req, res) => {
  const { name, page = 1, limit = 8 } = req.query;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  try {
    const whereClause = {
      name: {
        contains: name || "",
        mode: "insensitive",
      },
    };

    const [foods, total] = await Promise.all([
      prisma.food.findMany({
        where: whereClause,
        include: { restaurant: true },
        skip: skip,
        take: limitNum,
        orderBy: { id: "asc" },
      }),
      prisma.food.count({ where: whereClause }),
    ]);

    res.json({
      data: foods,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.createFood = async (req, res) => {
  const { name, rating, image_url, restaurant_id, price } = req.body;
  if (!name || rating === undefined || price === undefined) {
    return res
      .status(400)
      .json({ msg: "Name, rating, and price are required" });
  }
  try {
    const newFood = await prisma.food.create({
      data: {
        name,
        price: parseFloat(price),
        rating: parseFloat(rating),
        image_url,
        restaurant_id: restaurant_id ? parseInt(restaurant_id) : null,
      },
    });
    res.status(201).json(newFood);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateFood = async (req, res) => {
  const { id } = req.params;
  const { name, rating, image_url, restaurant_id, price } = req.body;
  try {
    const updatedFood = await prisma.food.update({
      where: { id: parseInt(id) },
      data: {
        name,
        price: parseFloat(price),
        rating: parseFloat(rating),
        image_url,
        restaurant_id: restaurant_id ? parseInt(restaurant_id) : null,
      },
    });
    res.json(updatedFood);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: "Food item not found" });
  }
};

exports.deleteFood = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.food.delete({
      where: { id: parseInt(id) },
    });
    res.json({ msg: "Food item deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: "Food item not found" });
  }
};
