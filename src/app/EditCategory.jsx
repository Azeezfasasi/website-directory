import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../assets/component/Header";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tenant-categories/${id}`)
      .then((res) => setName(res.data.name))
      .catch((err) => console.error("Error fetching category:", err));
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tenant-categories/${id}`, {
        name: name,
      });
      alert("Category updated successfully!");
      navigate("/app/tenantcategorylists");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Edit Website Category</h2>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter category name"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-all duration-300 cursor-pointer"
          >
            Update Category
          </button>
        </div>
      </div>
    </>
  );
};

export default EditCategory;
