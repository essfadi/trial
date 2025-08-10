const express = require("express");
const router = express.Router();
const {
  getAllFoods,
  createFood,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");

router.get("/", getAllFoods);
router.post("/", createFood);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

module.exports = router;
