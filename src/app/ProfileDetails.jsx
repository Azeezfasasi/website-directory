import { useState, useEffect } from "react";
import { useProfile } from "../assets/contextAPI/ProfileContext";
import Header from "../assets/component/Header";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const ProfileDetails = () => {
  const { user, updateProfile } = useProfile();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user._id, formData);
      alert("Profile updated successfully");
    } catch (error) {
      alert("Error updating profile: " + error.message);
    }
  };

  return (
    <>
    <Helmet>
      <title>Profile Details | Website Directory</title>
      <meta name='description' content='Manage and update personal profile information.' />
    </Helmet>
    <Header />
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
    {user?.role === "Viewer" && (
      <Link 
        to="/app/home" 
        className="text-green-600 hover:text-green-800 font-semibold transition duration-300"
      >
        <i className="fa-solid fa-arrow-left"></i> Back to Home
      </Link>
    )}

      <h2 className="text-xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-sm font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">New Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {user?.role === "Admin" && (
          <div className="mb-4">
            <label className="block text-sm font-medium">Role:</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="Admin">Admin</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 cursor-pointer"
        >
          Update Profile
        </button>
      </form>
    </div>
    {user?.role === "Viewer" && (
      <Link 
          to="/app/home" 
          className="text-green-600 hover:text-green-800 font-semibold transition duration-300 mt-[30px] flex flex-row justify-center items-center gap-1"
        >
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </Link>
    )}
    </>
  );
};

export default ProfileDetails;
