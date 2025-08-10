# Food Management System - A2SV Eskalate Technical Assessment

This project is a full-stack web application for managing food and restaurant items, built for the A2SV Eskalate technical interview.

**Chosen Path: Path A**. This submission focuses on a robust and well-structured backend API, with a rich, fully functional frontend built with React and Tailwind CSS to demonstrate all backend features.

---

## 🎥 Video Prototype

A live demonstration of the final application's features and functionality can be viewed here:

**[View a video of the final prototype.](https://share.zight.com/P8uqbj7Y)**

---

## ✨ Features

This application implements a complete end-to-end user experience for managing meals.

### **Backend & API**

- **Full CRUD for Foods:** Create, Read, Update, and Delete food items.
- **Full CRUD for Restaurants:** Create, Read, Update, and Delete restaurant entries.
- **Search Functionality:** The API supports searching for food items by name via a query parameter (`GET /api/foods?name=...`).
- **API-based Pagination:** The `GET /api/foods` endpoint is paginated to efficiently handle large datasets, accepting `page` and `limit` parameters.
- **Database Seeding:** A seed script is included to populate the database with initial, realistic data for development and testing.

### **Frontend & User Interface**

- **Dynamic Meal Grid:** Displays all food items fetched from the backend in a responsive, card-based layout.
- **Live Search:** A functional search bar allows users to filter meals in real-time.
- **"Load More" Pagination:** Users can load more food items without a full page refresh, providing a smooth Browse experience.
- **Interactive Modals:**
  - **Create/Edit Meals:** A single, reusable modal for both adding new meals and editing existing ones. The form correctly handles creating new restaurants or linking to existing ones.
  - **Delete Confirmation:** A confirmation modal prevents accidental deletion of items.
- **Component-Based Architecture:** The UI is built with reusable and well-structured React components.

---

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js, **Prisma**
- **Frontend**: React.js, **Tailwind CSS**, Axios
- **Database**: PostgreSQL
- **Stack**: PERN (PostgreSQL, Express, React, Node)

---

## 🚀 Setup and Installation

Follow these steps to get the project running on your local machine.

### **Prerequisites**

- Node.js and npm (or yarn)
- PostgreSQL running on your machine

### **1. Backend Setup**

```bash
# Clone the repository
git clone <your-repo-link>
cd food-management-app/backend

# Install dependencies
npm install

# Create a .env file in the /backend directory for your
# database connection URL.
# Example:
# DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# 1. Apply database schema changes
npx prisma migrate dev

# 2. Seed the database with initial data
npx prisma db seed

# 3. Run the backend server
npm run dev
```

The API will be running on `http://localhost:5000`.

### **2. Frontend Setup**

```bash
# Open a new terminal and navigate to the frontend directory
cd food-management-app/frontend

# Install dependencies
npm install

# Run the React development server
npm start
```

The application will be available at `http://localhost:3000`.

---

## Endpoints

All endpoints are prefixed with `/api`.

### **Food Endpoints**

- `GET /foods`: Get all food items (supports pagination).
- `GET /foods?name=[term]`: Search for food items by name.
- `POST /foods`: Add a new food item.
- `PUT /foods/:id`: Update a food item.
- `DELETE /foods/:id`: Delete a food item.

### **Restaurant Endpoints**

- `GET /restaurants`: Get all restaurants.
- `POST /restaurants`: Add a new restaurant.
- `PUT /restaurants/:id`: Update a restaurant.
- `DELETE /restaurants/:id`: Delete a restaurant.
