import { useState, useEffect } from 'react';
import { useTenant } from '../assets/contextAPI/TenantContext';
import Header from '../assets/component/Header';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const AddTenant = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { createTenant } = useTenant();
  const [tenantCategoryId, setTenantCategoryId] = useState("");
  const [TenantCategory, setTenantCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://app-directory-backend.onrender.com/api/tenant-categories");
        setTenantCategory(response.data);
      } catch (error) {
        console.error("Error fetching tenant categories:", error);
      }
    };
  
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return alert("Please enter a tenant name");
    if (!description) return alert("Please enter a description");
    if (!tenantCategoryId) return alert("Please select a category");
  
    try {
      await createTenant({ name, description, tenantCategoryId });
      setName(""); 
      setTenantCategoryId("");
      setDescription("");
      alert("Tenant created successfully");
    } catch (error) {
      console.error("Error creating tenant:", error);
      alert("Failed to create tenant");
    }
  };
  

  return (
    <>
    <Helmet>
      <title>Add Website | Website Directory</title>
      <meta name="description" content="Define and categorize different types of websites." />
    </Helmet>
    <Header />
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create New Website Type</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">Website Name:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
            placeholder="Enter website name"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">Tenant Description:</span>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" placeholder='Enter website description' required></textarea>
        </label>

        <div>
          <label className="block text-sm font-medium text-gray-700">Choose Website Category</label>
          <select
            value={tenantCategoryId}
            onChange={(e) => setTenantCategoryId(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
            required
          >
            <option value="">Choose a Category</option>
            {TenantCategory.map((TenantCategory) => (
              <option key={TenantCategory._id} value={TenantCategory._id}>
                {TenantCategory.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mt-4 cursor-pointer"
        >
          Add Website
        </button>
      </form>
    </div>
    </>
  );
};

export default AddTenant;