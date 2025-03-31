import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../assets/component/Header";
import { Helmet } from "react-helmet";

const EditTenant = () => {
  const { id } = useParams(); // Get Tenant ID from URL
  const navigate = useNavigate();
  const [tenant, setTenant] = useState({ name: "", description: "" });

  // Fetch single tenant
  useEffect(() => {
    axios
      .get(`https://app-directory-backend.onrender.com/api/tenants/${id}`)
      .then((res) => setTenant(res.data))
      .catch((err) => console.error("Error fetching tenant:", err));
  }, [id]);

  // Update tenant
const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://app-directory-backend.onrender.com/api/tenants/${id}`,
        { name: tenant.name, description: tenant.description }, // Ensure correct data format
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 200) {
        alert("Tenant updated successfully!");
        navigate("/app/tenantlists"); // Redirect to list
      } else {
        alert("Update failed. Please try again.");
      }
    } catch (error) {
      console.error("Error updating tenant:", error);
    }
  };

  return (
    <>
    <Helmet>
      <title>Edit Websites | Website Directory</title>
      <meta name="description" content="Modify website type classifications" />
    </Helmet>
      <Header />
      <div className="flex items-start lg:items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Edit Website</h2>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Website Name
            </label>
            <input
              type="text"
              value={tenant.name}
              onChange={(e) => setTenant({ ...tenant, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter website name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Website Description
            </label>
            <textarea
              value={tenant.description}
              onChange={(e) =>
                setTenant({ ...tenant, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter website description"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-300"
          >
            Update Website
          </button>
        </div>
      </div>
    </>
  );
};

export default EditTenant;
