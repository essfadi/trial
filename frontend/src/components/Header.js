import React from "react";
import Button from "./ui/Button";

const Header = ({ onAddMeal }) => (
  <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center py-4">
        <div className="text-2xl font-bold text-gray-800">FoodWagen</div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-gray-600 hover:text-brand-orange">
            Home
          </a>
          <a
            href="#restaurants"
            className="text-gray-600 hover:text-brand-orange"
          >
            Restaurants
          </a>
          <a href="#about" className="text-gray-600 hover:text-brand-orange">
            About Us
          </a>
        </nav>
        <Button onClick={onAddMeal} variant="primary">
          Add Meal
        </Button>
      </div>
    </div>
  </header>
);

export default Header;
