# 🍽️ Soulful Meals – MERN Stack Food Ordering Web App

A responsive full-stack food ordering application built using the **MERN Stack**, modernized with **Tailwind CSS v4**, **Vite**, and optimized backend architecture. Users can browse food items by category, manage their cart, place orders, and view their order history.

---

## 🚀 Tech Stack

### **Frontend**
- React (Vite)
- Tailwind CSS v4
- React Router DOM
- Context API + useReducer
- Swiper.js (Hero Slider)
- Prettier + prettier-plugin-tailwindcss

### **Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing
- express-validator for form validation
- CORS 

---

## 🏗️ Project Structure


```
root/
 ├── client/   → React Frontend
 └── server/   → Node/Express Backend
```

---

## 🔧 Key Improvements (Migration Summary)

### ✔️ TailwindCSS Migration
- Removed Bootstrap completely  
- Added tailwindcss + @tailwindcss/vite  
- Created `src/tailwind.css`  
- Added Prettier plugin for class sorting  
- Refactored **Navbar, Home, Category, Login, Signup, MyOrders, Footer** using Tailwind utility classes  
- Removed all extra `.css` files tied to Bootstrap

### ✔️ Mobile Login Fix
- Enabled CORS using the cors package  
- Added mobile device IP to allowed origins  
- Updated Vite config: `server: { host: true }`  
- Works on mobile via Wi-Fi

### ✔️ UI & Component Updates
- Replaced Bootstrap Carousel → Swiper.js  
- Built custom mobile hamburger menu  
- Refactored Card.jsx & fixed className warning  
- Cleaned App.jsx (removed Bootstrap)

---

## 📂 Important Files

### **Frontend**
- `src/main.jsx` – Tailwind entry import  
- `src/tailwind.css` – Tailwind core  
- `src/components/Navbar.jsx` – Mobile menu + Tailwind  
- `src/pages/Home.jsx` – Swiper slider + search bar  
- `src/pages/Login.jsx` / `Signup.jsx` – Tailwind UI forms  
- `src/pages/MyOrders.jsx` – Responsive grid  

### **Backend**
- `db.js` – MongoDB connection + data preload  
- `routes/` – Auth, DisplayData, OrderData  
- `server/index.js` – Express server + updated CORS  

---

## ✨ Features

### 🔐 Authentication
- User signup & login  
- Secure password hashing  
- JWT-based authentication  

### 🛒 Cart System
- Add/update/remove items  
- Price based on size & quantity  
- Context API + Reducer global store  

### 📦 Ordering
- Place orders  
- View full order history  

### 🍱 Food Menu
- Dynamic categories  
- Search bar  
- Fully responsive layout  

---

## 📥 Installation

### 1️⃣ Clone repo
```bash
git clone <repo-url>
cd Food_website





