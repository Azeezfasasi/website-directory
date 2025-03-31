// import { useState } from "react";
// import { useProfile } from "../assets/contextAPI/ProfileContext";
// import Header from "../assets/component/Header";

// const AddNewUser = () => {
//   const { registerProfile, loading } = useProfile();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     try {
//       await registerProfile(formData);
//       setSuccess("User has been registered successfully");
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//       });
//     } catch (err) {
//       setError(err?.message || "User registration failed. Please try again.");
//     }
//   }; 

//   return (
//     <>
//     <Header />
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add a New User</h2>
//         {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
//         {success && <p className="text-green-600 text-sm mb-4 text-center">{success}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="First Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition duration-300 cursor-pointer"
//           >
//             {loading ? "Adding..." : "Add User"}
//           </button>
//         </form>
//       </div>
//     </div>
//     </>
//   );
// };

// export default AddNewUser;

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
