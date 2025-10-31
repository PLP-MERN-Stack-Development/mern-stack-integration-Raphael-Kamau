# 🖼️ MERN Blog Platform — Frontend

This is the React frontend for the MERN blog platform. It connects to the backend API, displays posts, and supports real-time comments.

## 🚀 Features

- Responsive UI with React and Bootstrap
- Auth-aware navigation (Login/Signup)
- Create and view blog posts
- Real-time comment updates
- Axios for API calls
- React Router for navigation

## 📦 Tech Stack

- React
- React Router
- Axios
- Bootstrap / React-Bootstrap
- Socket.IO Client

## ⚙️ Setup

1. Navigate to `client/`
2. Install dependencies:

   ```bash
   npm install
Create a .env file:

```env
REACT_APP_API_URL=http://localhost:5000/api
Start the frontend:

bash
npm start
```

## 🧭 Pages
/ — Home (list of posts)

/login — Login form

/signup — Signup form

/create — Create a new post

/posts/:id — View post with comments

## 📁 Folder Structure
```
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── api/
│   ├── App.js
│   └── index.js
├── public/
└── .env.example
```
## 📜 License
MIT — feel free to use and adapt.
