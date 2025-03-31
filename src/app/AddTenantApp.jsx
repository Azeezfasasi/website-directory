import { useState, useEffect } from "react";
import { useTenantApp } from "../assets/contextAPI/AppContext";
import axios from "axios";
import Header from "../assets/component/Header";
import { Helmet } from "react-helmet";

const AddTenantApp = () => {
  const { createApp, loading, error } = useTenantApp();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [link, setLink] = useState("");
  const [tenants, setTenants] = useState([]);

  // Fetch tenants on mount
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axios.get("https://app-directory-backend.onrender.com/api/tenants");
        setTenants(response.data);
      } catch (error) {
        console.error("Error fetching tenants:", error);
      }
    };

    fetchTenants();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !tenantId) {
      alert("Name and Tenant are required.");
      return;
    }

    await createApp({ name, description, tenantId, link });
    alert("App added successfully");

    // Reset form
    setName("");
    setDescription("");
    setTenantId("");
    setLink("");
  };

  return (
    <>
    <Helmet>
      <title>Add Apps | Website Directory</title>
      <meta name="description" content="Register new applications in the directory." />
    </Helmet>
    <Header />
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Add New App</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">App Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
            placeholder="Enter app name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">App Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
            placeholder="Enter app description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Select Tenant</label>
          <select
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
            required
          >
            <option value="">Choose a tenant</option>
            {tenants.map((tenant) => (
              <option key={tenant._id} value={tenant._id}>
                {tenant.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">App Link</label>
          <input 
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
            placeholder="https://"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add App"}
        </button>
      </form>
    </div>
    </>
  );
};

export default AddTenantApp;
