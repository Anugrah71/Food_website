# Soulful Meals – MERN Stack Food Ordering Website

## 📌 Project Overview

Soulful Meals is a full‑stack food ordering web application built using the **MERN Stack (MongoDB, Express, React, Node.js)**. It allows users to browse food items by category, add meals to their cart, place orders, and view order history. The project is designed as a complete prototype of a modern food‑delivery system.

---

## 🚀 Tech Stack

### **Frontend (Client)**

* React (Vite)
* React Router DOM
* Bootstrap 5 + Custom CSS
* Context API + useReducer for global cart management

### **Backend (Server)**

* Node.js + Express
* MongoDB + Mongoose
* JWT Authentication
* bcryptjs for password hashing
* express-validator for validation
* CORS enabled

---

## 🏗️ System Architecture

```
root/
 ├── client/   → React Frontend
 └── server/   → Node/Express Backend
```

### **Backend Highlights**

* Connects to MongoDB Atlas.
* On startup, loads `food_items` and `food_Category` from DB into global variables for fast access.
* Provides REST APIs for:

  * User Signup & Login
  * Food Data fetching
  * Order placement & retrieving order history

### **Frontend Highlights**

* Home page with carousel + search + category‑wise food listing
* Authentication pages (Login, Signup)
* Dynamic Navbar with cart badge and logout
* Cart modal using React Portal
* Order history page

---

## 📂 Key Folders & Files

### **Client (React)**

* `pages/` → Home, Login, Signup, Cart, MyOrders
* `components/` → Navbar, Card, Modal, Footer
* `ContextReducer.jsx` → Global cart store (ADD, REMOVE, UPDATE, DROP)

### **Server (Express)**

* `routes/` → CreateUser, DisplayData, OrderData
* `db.js` → MongoDB connection + global data caching
* `models/` → User, Orders

---

## ✨ Features

### 🔐 **Authentication**

* User registration with hashed passwords
* Login using JWT
* Tokens stored in localStorage

### 🍽️ **Food Menu**

* Fetches items & categories dynamically from backend
* Search functionality
* Filter by category

### 🛒 **Shopping Cart**

* Add items with size + quantity
* Calculates price based on selected options
* Update or remove items
* Global persistence using Context API

### 📦 **Order System**

* Checkout creates an order entry in DB
* Users can view all past orders in reverse order

---

## 🖼️ Assets

* Multiple food images (pizza, burger, biryani, sandwich, etc.)
* SVG icons (React, Vite logos)

---

## 📥 Installation & Setup

### **1. Clone the repository**

```
git clone <repo-url>
cd soulful-meals
```

### **2. Install client dependencies**

```
cd client
npm install
```

### **3. Install server dependencies**

```
cd ../server
npm install
```

### **4. Create environment variables**

Create a `.env` file inside **server/**:

```
MONGO_URL=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

### **5. Run the backend**

```
cd server
npm start
```

### **6. Run the frontend**

```
cd client
npm run dev
```

---

## 📌 API Endpoints Overview

| Method | Endpoint        | Description                           |
| ------ | --------------- | ------------------------------------- |
| POST   | /api/createuser | Register new user                     |
| POST   | /api/loginusers | Login and get JWT                     |
| POST   | /api/foodData   | Fetch food items & categories         |
| POST   | /api/orderData  | Place new order / Fetch order history |

---

## 🧩 Future Improvements

* Admin dashboard
* Live order tracking
* Online payments
* Wishlist & favourites
* Improved UI animations

---

## 📄 License

This project is free to use for learning or portfolio purposes.

---

## 🙌 Contributing

Pull requests are welcome! Feel free to improve UI, UX, performance, or add features.
