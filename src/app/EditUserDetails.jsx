import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../assets/component/Header";
import { Helmet } from "react-helmet";

const EditUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`https://app-directory-backend.onrender.com/api/profiles/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `https://app-directory-backend.onrender.com/api/profiles/${id}`,
        user,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("User updated successfully");
      navigate("/app/manageusers");
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Helmet>
      <title>Edit User Details | Website Directory</title>
      <meta name="description" content="Update user information and permissions" />
    </Helmet>
      <Header />
      <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Role:</label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            >
              <option value="Viewer">Viewer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition duration-300 cursor-pointer"
          >
            {loading ? "Updating..." : "Update User"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditUserDetails;
