import { useState } from "react";
import { useProfile } from "../assets/contextAPI/ProfileContext";
import { Link } from "react-router-dom";

const Register = () => {
  const { registerProfile, loading } = useProfile();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await registerProfile(formData);
      setSuccess("Registration successful! You can now log in.");
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
    }
  }; 

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4 text-center">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="First Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition duration-300 cursor-pointer"
          >
            {loading ? "Registering" : "Register"}
          </button>
        </form>
        <div className="flex justify-center items-center mt-4 space-x-2 text-sm">
            <p className="text-gray-600">Already have an account?</p>
            <Link to="/" className="text-green-600 hover:underline font-medium">
                Login
            </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;