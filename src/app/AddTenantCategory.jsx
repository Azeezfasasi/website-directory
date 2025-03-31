import { useState } from "react";
import { useTenantCategory } from "../assets/contextAPI/TenantCategoryContext";
import Header from "../assets/component/Header";
import { Helmet } from "react-helmet";

const AddTenantCategory = () => {
  const { addCategory, loading, error } = useTenantCategory();
  const [name, setName] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Category name is required");
  
    try {
      await addCategory({ name: name.trim() }); 
      alert("Category name added successfuly");
      setName(""); // Clear input after successful submission
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <>
    <Helmet>
      <title>Add Website Category | Website Directory</title>
      <meta name="description" content="Organize websites into relevant categories." />
    </Helmet>
    <Header />
    <div className="max-w-lg my-auto mx-auto bg-white shadow-lg rounded-2xl p-8 mt-[10px] lg:mt-[40px]">
      <h2 className="text-2xl font-semibold mb-6">Add New Website Category</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="py-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="Enter category name"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
    </>
  );
};

export default AddTenantCategory;
