import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTenantApp } from "../assets/contextAPI/AppContext";
import Header from "../assets/component/Header";

const EditApp = () => {
  const { appId } = useParams(); // Get the app ID from the URL
  const { apps, updateApp } = useTenantApp();
  const navigate = useNavigate();

  const [appData, setAppData] = useState({
    name: "",
    description: "",
    link: "",
  });

  // Load the app details for editing
useEffect(() => {
    const app = apps.find((app) => app._id === appId);
    if (app) {
      setAppData({ name: app.name, description: app.description, link: app.link  });
    }
  }, [apps, appId]);

  // Handle form input change
  const handleChange = (e) => {
    setAppData({ ...appData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateApp(appId, appData);
    navigate("/app/tenantapps");
  };

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Edit App</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={appData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={appData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Link</label>
            <input
              type="text"
              name="link"
              value={appData.link}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Update App
          </button>
        </form>
      </div>
    </>
  );
};

export default EditApp;
