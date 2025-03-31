import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTenantApp } from "../assets/contextAPI/AppContext";
import Header from "../assets/component/Header";
import { Helmet } from "react-helmet";

const TenantAppList = () => {
  const { tenantId, name } = useParams(); // Get tenantId from URL
  const { apps, fetchAppsByTenant, deleteApp, loading, error } = useTenantApp();

  useEffect(() => {
    fetchAppsByTenant(tenantId); // Fetch apps for the specific tenant
  }, [tenantId]); // Run when tenantId changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <Helmet>
      <title>Website Apps | Website Directory</title>
      <meta name='description' content='Browse and manage different website types' />
    </Helmet>
      <Header />
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Apps for Website
          </h1>
          <Link
            to="/app/addtenantapp" // Pass tenantId when adding new app
            className="px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition"
          >
            Add New App
          </Link>
        </div>

        {/* Apps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.length > 0 ? (
            apps.map((app) => (
              <div
                key={app._id}
                className="p-5 border rounded-lg shadow-sm bg-white dark:bg-gray-800 transition hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                  {app.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {app.description || "No description available"}
                </p>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-between">
                  <button
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
                    onClick={() => deleteApp(app._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-6">
              No apps available for this tenant.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default TenantAppList;
