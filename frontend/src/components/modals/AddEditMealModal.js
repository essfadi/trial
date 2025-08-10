import React, { useState, useEffect } from "react";
import Button from "../ui/Button";

const AddEditMealModal = ({ meal, restaurants, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    image_url: "",
    price: "",
    restaurant_name: "",
    restaurant_logo: "",
    restaurant_status: "Open",
  });

  const isEditMode = !!meal;

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        name: meal.name || "",
        rating: meal.rating || "",
        image_url: meal.image_url || "",
        price: meal.price || "",
        restaurant_name: meal.restaurant?.name || "",
        restaurant_logo: meal.restaurant?.logo_url || "",
        restaurant_status: meal.restaurant?.status || "Open",
      });
    }
  }, [meal, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRestaurantSelect = (e) => {
    const selectedRestaurant = restaurants.find(
      (r) => r.name === e.target.value
    );
    if (selectedRestaurant) {
      setFormData({
        ...formData,
        restaurant_name: selectedRestaurant.name,
        restaurant_logo: selectedRestaurant.logo_url || "",
        restaurant_status: selectedRestaurant.status,
      });
    } else {
      setFormData({ ...formData, restaurant_name: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isEditMode ? "Edit Meal" : "Add a Meal"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Food name"
            className="w-full p-3 border rounded"
            required
          />
          <div className="flex space-x-4">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price (e.g., 9.99)"
              className="w-1/2 p-3 border rounded"
              step="0.01"
              min="0"
              required
            />
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Rating (0-5)"
              className="w-1/2 p-3 border rounded"
              step="0.1"
              min="0"
              max="5"
              required
            />
          </div>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="Food image (link)"
            className="w-full p-3 border rounded"
          />

          <h3 className="text-lg font-semibold pt-2 border-t mt-4">
            Restaurant Info
          </h3>

          <input
            list="restaurants"
            name="restaurant_name"
            value={formData.restaurant_name}
            onChange={handleRestaurantSelect}
            placeholder="Restaurant name (select or type new)"
            className="w-full p-3 border rounded"
            required
          />
          <datalist id="restaurants">
            {restaurants.map((r) => (
              <option key={r.id} value={r.name} />
            ))}
          </datalist>

          <input
            type="text"
            name="restaurant_logo"
            value={formData.restaurant_logo}
            onChange={handleChange}
            placeholder="Restaurant logo (link)"
            className="w-full p-3 border rounded"
          />
          <select
            name="restaurant_status"
            value={formData.restaurant_status}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-white"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>

          <div className="mt-8 flex justify-end space-x-4">
            <Button onClick={onClose} variant="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEditMode ? "Save Changes" : "Add Meal"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditMealModal;
