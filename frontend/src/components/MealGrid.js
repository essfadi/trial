import React from "react";
import MealCard from "./MealCard";
import Button from "./ui/Button";

const MealGrid = ({
  meals,
  loading,
  onEdit,
  onDelete,
  onLoadMore,
  hasMore,
  isMoreLoading,
}) => {
  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading meals...
      </div>
    );
  }

  if (!meals || meals.length === 0) {
    return (
      <div className="text-center py-20 text-xl text-gray-500">
        No meals found. Try adding one!
      </div>
    );
  }

  return (
    <section id="restaurants" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Meals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {meals.map((meal) => (
            <MealCard
              key={`${meal.id}-${meal.name}`}
              meal={meal}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-12">
            <Button
              onClick={onLoadMore}
              variant="primary"
              disabled={isMoreLoading}
            >
              {isMoreLoading ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MealGrid;
