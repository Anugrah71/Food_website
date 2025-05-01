Documentation for MERN-App
Overview
The MERN-App is a food delivery application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It provides a responsive and user-friendly interface for users to browse food items, add them to their cart, and place orders. The app also includes features like user authentication, category-based filtering, and a responsive design for various screen sizes.

Technologies Used
Frontend
React.js:

Used for building the user interface.
Components like Navbar, Footer, Category, Card, and Modal are used to structure the app.
State management is handled using React's useState and useReducer hooks.
Bootstrap:

Provides responsive design and pre-styled components.
Used for layout, buttons, forms, and the carousel.
CSS:

Custom styles are defined in the src/styles folder.
Files like Navbar.css, Home.css, Card.css, and Category.css are used for styling specific components.
React Router:

Used for client-side routing.
Routes include:
/ (Home)
/login (Login)
/createuser (Signup)
/myOrders (My Orders)
Backend
Node.js:

Provides the runtime environment for the backend.
Express.js:

Used to create RESTful APIs for handling requests and responses.
MongoDB:

Stores user data, food items, and order details.
Collections include:
newFoodData
foodCategory
orders
Mongoose:

Used for object data modeling (ODM) to interact with MongoDB.
JWT (JSON Web Tokens):

Used for user authentication and session management.
Bcrypt.js:

Used for hashing passwords securely.
Additional Libraries
React-Bootstrap:

Provides Bootstrap components as React components.
Used for badges and modals.
Context API:

Used for managing the cart state globally across the app.
Nodemon:

Used during development to automatically restart the server on file changes.
Features

1. User Authentication
   Signup:
   Users can create an account by providing their name, email, password, and location.
   Passwords are hashed using bcrypt.js before being stored in the database.
   Login:
   Users can log in using their email and password.
   A JWT token is generated upon successful login and stored in localStorage.
2. Food Browsing
   Categories:
   Food items are grouped into categories like "Starter", "Main Course", "Snacks", etc.
   Categories are displayed using the Category component.
   Search:
   Users can search for food items using the search bar.
   The search is case-insensitive and filters items based on the entered text.
3. Cart Management
   Add to Cart:
   Users can add food items to their cart with a selected quantity and size.
   Update Cart:
   If an item already exists in the cart, its quantity and price are updated.
   Remove from Cart:
   Users can remove items from the cart.
   Checkout:
   Users can place an order, which is stored in the database.
4. Order History
   Users can view their past orders on the "My Orders" page.
   Orders are displayed with details like order date, item name, quantity, size, and price.
5. Responsive Design
   Bootstrap Grid System:
   Used for creating a responsive layout.
   Components like Card and Category adjust their size and alignment based on the screen width.
   Custom CSS:
   Media queries are used to fine-tune the responsiveness.
   Example: The carousel images are styled to fit different screen sizes.
   Folder Structure
   Frontend
   src/:
   components/: Contains reusable components like Navbar, Footer, Card, etc.
   Screens/: Contains pages like Home, Login, Signup, and MyOrders.
   context/: Contains the ContextReducer.js file for managing the cart state.
   styles/: Contains CSS files for styling individual components.
   Backend
   backend/:
   models/: Contains Mongoose schemas for user and orders.
   Routes/: Contains API routes for user creation, login, food data, and orders.
   db.js: Handles the MongoDB connection.
   API Endpoints
   User Routes
   POST /api/createuser:
   Creates a new user.
   POST /api/loginusers:
   Authenticates a user and returns a JWT token.
   Food Routes
   POST /api/foodData:
   Returns food items and categories.
   Order Routes
   POST /api/orderData:
   Stores order details in the database.
   POST /api/MyOrderData:
   Fetches order history for a user.
   How the App is Responsive
   Bootstrap:

The grid system ensures that components like cards and categories adjust their layout based on the screen size.
Example: Food cards are displayed in a single column on small screens and in multiple columns on larger screens.
CSS Media Queries:

Custom styles are applied for different screen sizes.
Example: The carousel images are styled to maintain their aspect ratio on all devices.
React Components:

Components like Navbar and Footer are designed to be flexible and adapt to different screen sizes.

How to Run the Project
Prerequisites
Node.js and npm installed.
MongoDB database.
Steps
Clone the repository.
Navigate to the mern-app folder.
Install dependencies:
npm install
Start the backend server:
cd backend
nodemon index.js
Start the frontend:
cd ..
npm start
