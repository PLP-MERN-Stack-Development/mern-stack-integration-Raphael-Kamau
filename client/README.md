# 🧠 MERN Blog Platform — Backend

This is the Express + MongoDB backend for the MERN blog platform. It handles user authentication, post management, and real-time comment broadcasting via Socket.IO.

## 🚀 Features

- User registration and login (JWT-based)
- CRUD operations for blog posts
- Real-time comment updates with Socket.IO
- MongoDB integration with Mongoose
- Validation with express-validator
- Environment configuration via `.env`

## 📦 Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- Socket.IO
- JWT
- dotenv
- express-validator

## ⚙️ Setup

1. Clone the repo and navigate to `server/`
2. Install dependencies:

   ```bash
   npm install
Create a .env file:

env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
Start the server:

bash
npm run dev

## 📡 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and get token
GET	/api/posts	Fetch all posts
POST	/api/posts	Create a new post

## 🧪 Testing
Use Postman or your frontend to test endpoints. JWT token required for protected routes.

## 📁 Folder Structure
Code
```
server/
├── controllers/
├── models/
├── routes/
├── middleware/
├── index.js
└── .env.example
```

## 📜 License
MIT — feel free to use and adapt.
