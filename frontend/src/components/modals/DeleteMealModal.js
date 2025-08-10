import React from "react";
import Button from "../ui/Button";

const DeleteMealModal = ({ meal, onConfirm, onCancel }) => {
  if (!meal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Delete Meal</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "{meal.name}"? This action cannot be
          reversed.
        </p>
        <div className="flex justify-center space-x-4">
          <Button onClick={onCancel} variant="secondary">
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="danger">
            Yes, Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMealModal;
