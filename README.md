Food Delivery App
A full-stack MERN (MongoDB, Express, React, Node.js) application for ordering food online. This project demonstrates a food delivery platform where users can browse food items, place orders, and manage their accounts.


🛠 Features
User authentication (Sign up, Login)
Browse food items by category
Add items to cart and place orders
View order history
Responsive design for mobile and desktop


📦 Tech Stack
Frontend: React, Tailwind CSS
Backend: Node.js, Express
Database: MongoDB


⚙️ Installation
Clone the repository and install dependencies:
git clone https://github.com/Anugrah71/Food_website
cd Food_website
Install Backend Dependencies:
cd backend
npm install
Install Frontend Dependencies:
cd ../frontend
npm install


🔧 Configuration
Backend:
Create a .env file in the backend folder with the following:
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
PORT=5000

Start the backend server:
cd backend
node index.js

Frontend:
Create a .env file in the frontend folder with the following:
REACT_APP_BACKEND_URL=http://localhost:5000 # For local development
Start the frontend development server:
cd frontend
npm start


🚀 Deployment
Backend:
Deployed on Render: https://food-website-e2hb.onrender.com
Frontend:
Deployed on Render: https://food-website-1-ck7j.onrender.com

📂 Folder Structure

mern-app/
├── backend/
│   ├── db.js
│   ├── index.js
│   ├── models/
│   ├── routes/
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── README.md
└── package.json

🛡️ Security
Passwords are hashed using bcryptjs.
Authentication is handled using jsonwebtoken (JWT).
