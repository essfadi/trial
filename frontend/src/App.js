import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MealGrid from "./components/MealGrid";
import Footer from "./components/Footer";
import AddEditMealModal from "./components/modals/AddEditMealModal";
import DeleteMealModal from "./components/modals/DeleteMealModal";

const API_BASE_URL = "http://localhost:5000/api";

function App() {
  const [meals, setMeals] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const fetchData = useCallback(
    async (currentSearchTerm, isLoadMore = false) => {
      setLoading(true);
      try {
        const currentPage = isLoadMore ? page + 1 : 1;
        const params = { name: currentSearchTerm, page: currentPage, limit: 8 };

        const mealsResponse = await axios.get(`${API_BASE_URL}/foods`, {
          params,
        });

        if (!isLoadMore) {
          const restaurantsResponse = await axios.get(
            `${API_BASE_URL}/restaurants`
          );
          setRestaurants(restaurantsResponse.data);
        }

        const newMeals = mealsResponse.data.data;
        setMeals((prevMeals) =>
          isLoadMore ? [...prevMeals, ...newMeals] : newMeals
        );
        setPagination(mealsResponse.data.pagination);
        setPage(currentPage);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [page]
  );

  useEffect(() => {
    fetchData(searchTerm, false);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
    fetchData(term, false);
  };

  const handleLoadMore = () => {
    fetchData(searchTerm, true);
  };

  const handleAddMealClick = () => {
    setSelectedMeal(null);
    setAddEditModalOpen(true);
  };

  const handleEditMealClick = (meal) => {
    setSelectedMeal(meal);
    setAddEditModalOpen(true);
  };

  const handleDeleteMealClick = (meal) => {
    setSelectedMeal(meal);
    setDeleteModalOpen(true);
  };

  const handleSaveMeal = async (formData) => {
    try {
      let restaurantId;
      const existingRestaurant = restaurants.find(
        (r) => r.name.toLowerCase() === formData.restaurant_name.toLowerCase()
      );

      if (existingRestaurant) {
        restaurantId = existingRestaurant.id;
      } else {
        const newRestaurantResponse = await axios.post(
          `${API_BASE_URL}/restaurants`,
          {
            name: formData.restaurant_name,
            logo_url: formData.restaurant_logo,
            status: formData.restaurant_status,
          }
        );
        restaurantId = newRestaurantResponse.data.id;
      }

      const foodPayload = {
        name: formData.name,
        rating: parseFloat(formData.rating),
        image_url: formData.image_url,
        price: parseFloat(formData.price),
        restaurant_id: restaurantId,
      };

      if (selectedMeal?.id) {
        await axios.put(
          `${API_BASE_URL}/foods/${selectedMeal.id}`,
          foodPayload
        );
      } else {
        await axios.post(`${API_BASE_URL}/foods`, foodPayload);
      }

      setAddEditModalOpen(false);
      fetchData(searchTerm, false);
    } catch (error) {
      console.error("Error saving meal:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedMeal) return;
    try {
      await axios.delete(`${API_BASE_URL}/foods/${selectedMeal.id}`);
      setDeleteModalOpen(false);
      fetchData(searchTerm, false);
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  return (
    <div className="bg-gray-50">
      <Header onAddMeal={handleAddMealClick} />
      <main>
        <Hero onSearch={handleSearch} />
        <MealGrid
          meals={meals}
          loading={loading && page === 1} // Only show main loader on first load
          onEdit={handleEditMealClick}
          onDelete={handleDeleteMealClick}
          onLoadMore={handleLoadMore}
          hasMore={pagination && page < pagination.totalPages}
          isMoreLoading={loading && page > 1} // For "Load More" button state
        />
      </main>
      <Footer />

      {isAddEditModalOpen && (
        <AddEditMealModal
          meal={selectedMeal}
          restaurants={restaurants}
          onSave={handleSaveMeal}
          onClose={() => setAddEditModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMealModal
          meal={selectedMeal}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
