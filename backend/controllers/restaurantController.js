const prisma = require("../lib/prisma");

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.createRestaurant = async (req, res) => {
  const { name, logo_url, status } = req.body;
  if (!name) {
    return res.status(400).json({ msg: "Please include a name" });
  }
  try {
    const newRestaurant = await prisma.restaurant.create({
      data: { name, logo_url, status },
    });
    res.status(201).json(newRestaurant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, logo_url, status } = req.body;
  try {
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: parseInt(id) },
      data: { name, logo_url, status },
    });
    res.json(updatedRestaurant);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: "Restaurant not found" });
  }
};

exports.deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.restaurant.delete({
      where: { id: parseInt(id) },
    });
    res.json({ msg: "Restaurant deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: "Restaurant not found" });
  }
};
