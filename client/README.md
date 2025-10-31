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
<img width="664" height="483" alt="image" src="https://github.com/user-attachments/assets/7db25d95-2984-402b-b77a-c6923ff9177f" />

/login — Login form
<img width="1270" height="602" alt="image" src="https://github.com/user-attachments/assets/b69fb72c-bd7d-489a-aac2-f5a69a1ab4f5" />

/signup — Signup form
<img width="1231" height="584" alt="image" src="https://github.com/user-attachments/assets/08867975-54ef-496b-b1c0-f92211625374" />

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
