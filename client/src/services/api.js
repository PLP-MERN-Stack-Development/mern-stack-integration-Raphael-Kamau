import axios from 'axios';

// Axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for auth errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    console.error('API error:', err.response?.data || err.message);
    return Promise.reject(err);
  }
);

// Post API
export const postService = {
  getAll: async (page = 1, limit = 10, category = null) => {
    let url = `/posts?page=${page}&limit=${limit}`;
    if (category) url += `&category=${category}`;
    const res = await api.get(url);
    return res.data;
  },
  getOne: async (idOrSlug) => {
    const res = await api.get(`/posts/${idOrSlug}`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/posts', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/posts/${id}`, data);
    return res.data;
  },
  remove: async (id) => {
    const res = await api.delete(`/posts/${id}`);
    return res.data;
  },
  comment: async (postId, comment) => {
    const res = await api.post(`/posts/${postId}/comments`, comment);
    return res.data;
  },
  search: async (query) => {
    const res = await api.get(`/posts/search?q=${query}`);
    return res.data;
  },
};

// Category API
export const categoryService = {
  getAll: async () => {
    const res = await api.get('/categories');
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/categories', data);
    return res.data;
  },
};

// Auth API
export const authService = {
  register: async (data) => {
    const res = await api.post('/auth/register', data);
    return res.data;
  },
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  currentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Image Upload API
export const uploadService = {
  upload: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
};

export default api;
