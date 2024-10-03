import React, { useState, useEffect } from "react";
import api from "../axios/api"; 
import { useNavigate } from "react-router-dom"; 

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    bio: "",
    location: "",
    profilePicture: "", 
  });
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get("/profile/");
      setUser({
        username: response.data.username || "", 
        email: response.data.email || "", 
        bio: response.data.bio || "", 
        location: response.data.location || "",
        profilePicture:
          `http://localhost:8000/${response.data.profile_picture}` || "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfilePictureFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("bio", user.bio);
    formData.append("location", user.location); 
    if (profilePictureFile) {
      formData.append("profile_picture", profilePictureFile);
    }

    try {
      await api.put("/profile/", formData); 
      fetchUserProfile();
      navigate("/blog"); 
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profile Management</h1>
        {user.profilePicture && (
          <div className="w-32 h-32">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="mt-2 w-full h-full  object-top rounded-full"
            />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={user.location}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
