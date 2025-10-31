import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import PostList from './components/posts/PostList.jsx';
import PostDetail from './components/posts/PostDetail.jsx';
import PostForm from './components/posts/PostForm.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import PrivateRoute from './routes/PrivateRoutes.jsx';
import { AuthProvider } from './context/AuthContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <AppNavbar />
      <main className="flex-grow-1 hero">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <PostForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <PostForm />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h2 className="text-center mt-4">404 - Page Not Found</h2>} />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
