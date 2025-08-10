import React, { useState } from "react";
import { StarIcon, DotsVerticalIcon } from "./ui/Icons";

const MealCard = ({ meal, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { name, image_url, rating, restaurant, price } = meal;
  const isOpen = restaurant?.status?.toLowerCase() === "open";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 relative">
      <img
        className="h-48 w-full object-cover"
        src={image_url || "https://via.placeholder.com/300"}
        alt={name}
      />
      <div className="absolute top-2 left-2 bg-white/90 text-gray-800 font-bold px-3 py-1 rounded-full text-sm">
        ${price}
      </div>

      <div className="absolute top-2 right-2">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1.5 rounded-full bg-white/70 hover:bg-white transition-colors"
        >
          <DotsVerticalIcon className="h-5 w-5 text-gray-600" />
        </button>
        {menuOpen && (
          <div
            className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10"
            onMouseLeave={() => setMenuOpen(false)}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onEdit(meal);
                setMenuOpen(false);
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Edit
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onDelete(meal);
                setMenuOpen(false);
              }}
              className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Delete
            </a>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-3">
          <img
            className="h-8 w-8 rounded-full object-cover"
            src={restaurant?.logo_url || "https://via.placeholder.com/50"}
            alt={restaurant?.name}
          />
          <div>
            <div className="font-bold text-lg leading-tight">{name}</div>
            <div className="flex items-center mt-1">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <span className="ml-1 text-sm text-gray-600 font-semibold">
                {rating}
              </span>
            </div>
          </div>
        </div>
        <div
          className={`mt-3 inline-block px-3 py-1 text-xs font-semibold rounded-full ${
            isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isOpen ? "Open Now" : "Closed"}
        </div>
      </div>
    </div>
  );
};

export default MealCard;
