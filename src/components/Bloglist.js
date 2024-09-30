import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios/api'; // Axios instance with base URL and token interceptor

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({}); // State to hold user information
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Fetch blog posts and user info when component mounts
  useEffect(() => {
    fetchBlogPosts();
    fetchUserProfile(); // Fetch user profile info
  }, []);

  // Function to fetch blog posts from the API
  const fetchBlogPosts = async () => {
    try {
      const response = await api.get('/posts/');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  // Function to fetch user profile from the API
  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/profile/'); // Adjust the endpoint as needed
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Function to delete a blog post
  const deletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}/`);
      fetchBlogPosts(); // Refresh blog posts after deletion
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  // Redirect to the edit page for a blog post
  const editPost = (id) => {
    navigate(`/edit-post/${id}`); // Use navigate instead of history.push
  };

  // Redirect to the view page for a blog post
  const viewPost = (id) => {
    navigate(`/posts/${id}`); // Use navigate instead of history.push
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Remove the token
    navigate('/login'); // Redirect to login
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Blog Posts</h1>

      {/* User Welcome Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          {user.profilePicture && (
            <img 
              src={user.profilePicture} // Adjust the URL as needed
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          )}
          <h2 className="text-lg font-semibold">
            Welcome, {user.username || 'User'}!
          </h2>
        </div>

        {/* Navigation Links for Profile and Logout positioned to the right */}
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/profile')} 
            className="text-blue-600 hover:underline mr-4"
          >
            Profile Management
          </button>
          <button 
            onClick={handleLogout} 
            className="text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Create New Post Button positioned above the blog posts */}
      <div className="mb-4">
        <button 
          onClick={() => navigate('/create-post')} // Button to create new post
          className="bg-red-500 text-black px-4 py-2 rounded">
          Create New Post
        </button>
      </div>

      {/* List of blog posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => (
          <div key={post.id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold mb-2 cursor-pointer" onClick={() => viewPost(post.id)}>
              {post.title}
            </h2>
            <p className="text-sm mb-2 text-gray-600">Tags: {post.tags || 'No tags'}</p>
            <p className="text-gray-800 mb-4">{post.content.slice(0, 100)}...</p>

            {/* Edit and Delete Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => editPost(post.id)}
                className="bg-green-500 text-white px-4 py-2 rounded">
                Edit
              </button>
              <button
                onClick={() => deletePost(post.id)}
                className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
