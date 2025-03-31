import { useEffect, useState } from "react";
import { useTenantApp } from "../assets/contextAPI/AppContext";
import Header from "../assets/component/Header";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const TenantApps = () => {
  const { apps, fetchApps, updateApp, deleteApp } = useTenantApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApps = async () => {
      await fetchApps();
      setLoading(false);
    };
    loadApps();
  }, [fetchApps]);

  return (
    <>
    <Helmet>
      <title>All Apps | Website Directory</title>
      <meta name='description' content='Display a comprehensive list of all applications in the directory.' />
    </Helmet>
      <Header />
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          All Apps
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading apps...</p>
        ) : apps.length === 0 ? (
          <p className="text-center text-gray-500">No apps available</p>
        ) : (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((app) => (
              <li
                key={app._id}
                className="p-5 border rounded-lg shadow-sm bg-white dark:bg-gray-800"
              >
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                  {app.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {app.description}
                </p>
                <div className="mt-3 flex gap-2">
                  {/* <Link to="/app/editapp/:appId" className="bg-blue-500 text-white px-3 py-1 rounded">Edit</Link> */}
                  <Link to={`/app/editapp/${app._id}`} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</Link>
                  <button
                    onClick={() => deleteApp(app._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default TenantApps;
