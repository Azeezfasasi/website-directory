import React, { useState, useContext } from "react";
import { useProfile } from "../assets/contextAPI/ProfileContext";
import Header from "../assets/component/Header";

const AddNewUser = () => {
  const { addUserByAdmin } = useProfile();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await addUserByAdmin(formData);
      setMessage(response.message);
      setFormData({ name: "", email: "", password: "", role: "user" });
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Add New User</h2>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        >
          <option value="">Select Role</option>
          <option value="Viewer">Viewer</option>
          <option value="Admin">Admin</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 cursor-pointer text-white p-2 rounded"
        >
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
    </>
  );
};

export default AddNewUser;
