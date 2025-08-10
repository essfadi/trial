import React, { useState } from "react";
import Button from "./ui/Button";

const Hero = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState("Delivery");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <section className="py-16 text-center bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Are you starving?
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Within a few clicks, find meals that are accessible near you
        </p>
        <div className="mt-8 p-4 bg-white rounded-lg shadow-xl max-w-3xl mx-auto">
          <div className="flex border-b mb-4">
            <button
              onClick={() => setActiveTab("Delivery")}
              className={`flex-1 py-2 font-semibold ${
                activeTab === "Delivery"
                  ? "text-brand-orange border-b-2 border-brand-orange"
                  : "text-gray-500"
              }`}
            >
              Delivery
            </button>
            <button
              onClick={() => setActiveTab("Pickup")}
              className={`flex-1 py-2 font-semibold ${
                activeTab === "Pickup"
                  ? "text-brand-orange border-b-2 border-brand-orange"
                  : "text-gray-500"
              }`}
            >
              Pickup
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="What do you like to eat today?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-l-md focus:ring-2 focus:ring-brand-yellow focus:outline-none"
            />
            <Button
              type="submit"
              variant="primary"
              className="rounded-l-none rounded-r-md"
            >
              Find Meal
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
