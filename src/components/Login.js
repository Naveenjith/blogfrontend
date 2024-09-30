import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link here
//import api from '../axios/api';  // Import your global axios instance
import { login, saveTokens } from '../services/authservice'; // Import login and saveTokens

const Login = () => {
  const [username, setUsername] = useState(''); // Change email to username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // React Router's useNavigate to redirect after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login({ username, password }); // Send username instead of email

      // Save tokens to localStorage
      saveTokens(response.access, response.refresh); // Use saveTokens function

      // Redirect to another page (e.g., dashboard or blog post list)
      navigate('/blog');
    } catch (error) {
      setError('Invalid login credentials. Please try again.');
      console.error('Login error:', error); // Log the error for debugging
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-red-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-red-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
