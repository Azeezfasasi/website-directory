import { useState, useEffect } from "react";
import axios from "axios";

const TenantApps = () => {
  const [categories, setCategories] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [apps, setApps] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tenant categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://app-directory-backend.onrender.com/api/tenant-categories");
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch tenants when a category is selected
  const handleCategoryClick = async (tenantCategoryId) => {
    if (!tenantCategoryId) {
      console.error("Category ID is undefined!");
      return;
    }
    
    setSelectedCategory(tenantCategoryId);
    setSelectedTenant(null); // Reset tenant selection
    setApps([]); // Reset apps list
  
    try {
      const response = await axios.get(
        `https://app-directory-backend.onrender.com/api/tenants?categoryId=${tenantCategoryId}`
      );
      setTenants(response.data);
    } catch (err) {
      console.error("Failed to fetch tenants", err);
      setError("Failed to fetch tenants");
    }
  };

  // Fetch apps when a tenant is selected
  const handleTenantClick = async (tenantId) => {
    setSelectedTenant(tenantId);
  
    try {
      const response = await axios.get(`https://app-directory-backend.onrender.com/api/apps/${tenantId}`);
      setApps(response.data);
    } catch (err) {
      setError("Failed to fetch apps");
    }
  };  
  

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center h-[100vh] lg:h-screen p-4 bg-white">
      {/* Tenant Categories */}
      <div className="tenant-scroll flex flex-col justify-start items-start w-[99%] lg:w-[30%] h-[290px] lg:h-[90%] pl-[20px] lg:mt-0 relative">
        <h2 className="bg-white sticky top-0 w-[95%] text-xl font-bold mb-4 pb-1 lg:pb-0 border-b border-solid border-gray-400 lg:border-none">Website Categories</h2>

        {loading && <p className="text-gray-500">Loading categories...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <ul className="w-[95%]">
          {categories
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((category) => (
            <li
              key={category._id} // Ensure key is unique
              className={`w-full flex justify-between items-center p-3 my-2 rounded-md cursor-pointer ${
                String(selectedCategory) === String(category._id) ? "bg-green-600 text-white" : "hover:bg-gray-100"
              }`}
              onClick={() => handleCategoryClick(category._id)}
            >
              {category.name}
              <i className="fa-solid fa-chevron-right"></i>
            </li>
          ))}
        </ul>

      </div>

      {/* Tenants Section */}
      <div className="tenant-scroll flex flex-col justify-start items-start w-[99%] lg:w-[30%] h-[290px] lg:h-[90%] pl-[20px] lg:mt-0 relative">
        <h2 className="bg-white sticky top-0 w-[95%] text-xl font-bold mb-4 pb-1 lg:pb-0 border-b border-solid border-gray-400 lg:border-none">Website Types</h2>
        {selectedCategory ? (
          tenants.length > 0 ? (
            <ul className="w-[95%]">
              {tenants
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((tenant) => (
                <li
                  key={tenant._id}
                  className={`w-full flex flex-row justify-center items-center p-3 my-2 rounded-md cursor-pointer ${
                    selectedTenant === tenant._id ? "bg-green-600 text-white" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleTenantClick(tenant._id)}
                >
                  <div>
                    <p className="font-[700] cursor-pointer text-[17px] w-[90%]">{tenant.name}</p>
                    <p className="text-[13px] font-normal text-inherit mt-[3px] mb-[30px] w-[90%]">{tenant.description}</p>
                  </div>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No websites available for this category</p>
          )
        ) : (
          <p className="text-gray-500 italic"><i className="fa-solid fa-arrow-left"></i> Select a website category from the list</p>
        )}
      </div>

      {/* Apps Section */}
      <div className="flex flex-col justify-start items-start w-[99%] lg:w-[30%] h-[290px] lg:h-[90%] pl-[20px] lg:mt-0">
        <h2 className="w-[95%] text-xl font-bold mb-4 pb-1 lg:pb-0 border-b border-solid border-gray-400 lg:border-none">Version</h2>
        {selectedTenant ? (
          apps.length > 0 ? (
            <ul className="w-[95%]">
              {apps.map((app) => (
                <li key={app._id} className="my-2">
                  <a
                    href={app.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex flex-row justify-center items-center p-3 my-2 rounded-md cursor-pointer hover:bg-green-600 hover:text-white"
                  >
                    <div>
                      <p className="font-bold">{app.name}</p>
                      <p className="text-sm">{app.description}</p>
                    </div>
                    <i className="fa-solid fa-chevron-right"></i>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No apps available for this website</p>
          )
        ) : (
          <p className="text-gray-500 italic"><i className="fa-solid fa-arrow-left"></i> Select a website type from the list</p>
        )}
      </div>
    </div>
  );
};

export default TenantApps;
