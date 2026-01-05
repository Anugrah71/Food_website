# Soulful Meals – MERN Stack Food Ordering Web App

A responsive full-stack food ordering application built using the MERN stack, modernized with Tailwind CSS v4, Vite, and an optimized backend architecture.

---

## Description

Soulful Meals is a web-based food ordering platform designed to deliver a smooth and intuitive user experience.

**Purpose:**  
Allow users to browse food items by category, manage a personal cart, and securely place orders.

**Target Audience:**  
Users looking for a fast, responsive interface to order meals and track order history.

---

## Features

### Authentication
- Secure user signup and login
- JWT-based authentication
- Password hashing using bcryptjs

### Cart System
- Global cart state using Context API and `useReducer`
- Add, update, and remove items
- Dynamic price calculation based on size and quantity

### Ordering
- Place new food orders
- View complete order history

### Food Menu
- Dynamic food categories
- Built-in search for quick filtering

### Responsive Design
- Mobile-first layout
- Custom navigation menus
- CORS support for local network testing

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS v4
- React Router DOM
- Context API + useReducer
- Swiper.js (Hero slider)
- Material UI Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs
- express-validator, Joi
- Cloudinary (image management)
- Multer (file uploads)
- cookie-parser

---

## Folder Structure
```text
root/
├── client/ # React frontend (Vite + Tailwind)
└── server/ # Node.js / Express backend (API & database
```
---

## Installation & Setup

### Clone the repository
```bash
git clone https://github.com/Anugrah71/Food_website
cd Food_website
```
Setup frontend
```bash
cd client
npm install
```

Setup backend
```bash
cd ../server
npm install
```
### Environment Variables

Create a `.env` file inside the client/ directory:
```bash
VITE_BACKEND_URL= http://localhost:500 you backend host url
ACCESS_TOKEN_PRIVATE_KEY = "YOUR_LONG_RANDOM_STRING_FOR_ACCESS"
REFRESH_TOKEN_PRIVATE_KEY = "YOUR_EVEN_LONGER_RANDOM_STRING_FOR_REFRESH"
```
Create a `.env` file inside the server/ directory:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```
### Run the Project
Start backend
```bash
cd server
npm start
```
Start frontend
```bash
cd client
npm run dev
```
---
## API Endpoints
### Authentication & User

- `POST /api/createuser` : Used for user registration
- `POST /api/loginuser` : Used for user authentication
- `POST /api/refresh` : Used for refreshing authentication tokens

### Food & Orders
- `POST /api/foodData` : Used for fetching food items and categories
- `POST /api/orderData` : Used for submitting a new order
- `POST /api/myorderData` : Used for retrieving a user’s order history
Admin
- `GET /api/admin` : Used for admin-specific data access
---
## Screenshots / Demo
- Live Demo : https://food-website-1-ck7j.onrender.com

<p align="center">
  <img src="Screenshots/Food1.png" width="45%" />
  <img src="Screenshots/Food2.png" width="45%" />
</p>

<p align="center">
  <img src="Screenshots/Food4.png" width="45%" />
  <img src="Screenshots/Food5.png" width="45%" />
</p
---
## Future Improvements
- Role-based access control for admin dashboard
- Online payment integration (Stripe / Razorpay)
- Real-time order status tracking

