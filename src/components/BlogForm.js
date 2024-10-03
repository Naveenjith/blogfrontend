import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTask, updateTask, getTask } from '../services/blogservice'; 

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const post = await getTask(id); // Fetch the post data
          setTitle(post.title);
          setContent(post.content);
          setTags(post.tags);
        } catch (error) {
          setError('Failed to fetch the blog post for editing');
        }
      };

      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, content, tags };

    try {
      if (id) {
        // If editing, update the post
        await updateTask(id, taskData);
        setSuccess('Blog post updated successfully!');
      } else {
        // If creating, create a new post
        await createTask(taskData);
        setSuccess('Blog post created successfully!');
      }

      // Clear fields
      setTitle('');
      setContent('');
      setTags('');
      setError('');
      
      // Navigate to the blog list
      navigate('/blog'); 
    } catch (error) {
      setError('Failed to submit the blog post');
      setSuccess('');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Blog Post' : 'Create a New Blog Post'}</h1>
      {success && <p className="text-green-500 mb-4">{success}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter your blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            placeholder="Write your blog content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="5"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
            Tags (optional)
          </label>
          <input
            id="tags"
            type="text"
            placeholder="Add tags separated by commas"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {id ? 'Update' : 'Create'} Blog Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
