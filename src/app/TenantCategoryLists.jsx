import { Link, useNavigate } from "react-router-dom";
import Header from "../assets/component/Header";
import { useTenantCategory } from "../assets/contextAPI/TenantCategoryContext";

const TenantCategoryLists = () => {
  const { categories, deleteCategory, loading, error } = useTenantCategory();

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/app/EditCategory/${id}`);
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Website Categories
        </h2>

        <div className="flex flex-row justify-end text-center mt-6 mb-3">
          <Link to="/app/addtenantcategory"
            className="px-5 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
          >
            Add Category
          </Link>
        </div>

        {/* Loading and Error Handling */}
        {loading && <p className="text-center text-blue-500 font-medium">Loading...</p>}
        {error && <p className="text-center text-red-500 font-medium">{error}</p>}

        {/* Category List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div 
              key={category._id} 
              className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-700 dark:text-white">{category.name}</h3>
              
              {/* Action Buttons */}
              <div className="mt-3 flex gap-2">
                <button onClick={() => handleEdit(category._id)} className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition cursor-pointer">Edit</button>
                
                <button 
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition cursor-pointer"
                  onClick={() => deleteCategory(category._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Category Button */}
        <div className="text-center mt-6">
          <Link to="/app/addtenantcategory"
            className="px-5 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
          >
            Add Category
          </Link>
        </div>
      </div>
    </>
  );
};

export default TenantCategoryLists;
