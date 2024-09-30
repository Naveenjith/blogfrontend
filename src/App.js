import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import BlogForm from './components/BlogForm';
import BlogList from './components/Bloglist';
import Profile from './components/Profile';

const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');
  return !!token;
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Blog Application</h1>
        </header>

        <main className="flex-grow container mx-auto p-4">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Redirecting to login if not authenticated */}
            <Route path="/" element={<Navigate to="/login" />} />
            
            {/* Protected routes */}
            <Route path="/blog" element={<ProtectedRoute element={<BlogList />} />} />
            <Route path="/create-post" element={<ProtectedRoute element={<BlogForm />} />} />
            <Route path="/edit-post/:id" element={<ProtectedRoute element={<BlogForm />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />

            {/* Redirect all unmatched routes to login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>

        <footer className="bg-blue-600 text-white p-4 text-center">
          <p>&copy; {new Date().getFullYear()} Blog Application</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
