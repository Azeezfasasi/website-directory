import { Link } from "react-router-dom";
import Header from "../assets/component/Header";
import { useTenant } from "../assets/contextAPI/TenantContext";

const TenantList = () => {
  const { tenants, fetchTenantApps, deleteTenant } = useTenant();

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Website List
        </h2>

        {/* Tenants Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenants.map((tenant) => (
            <div
              key={tenant._id}
              className="p-5 border rounded-lg shadow-sm bg-white dark:bg-gray-800 transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                {tenant.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {tenant.description || "No description available"}
              </p>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <Link
                  to={`/app/tenantapplists/${tenant._id}`} // Pass tenantId in URL
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
                >
                  View Apps
                </Link>
                
                <Link
                  to={`/app/edittenant/${tenant._id}`} // Navigate to the edit page
                  className="px-3 py-1 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600 transition"
                >
                  Edit
                </Link>

                <button
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
                  onClick={() => {
                    console.log("Deleting tenant with ID:", tenant._id);
                    deleteTenant(tenant._id);
                  }}
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* No Tenants Message */}
        {tenants.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No tenants available.</p>
        )}
      </div>
    </>
  );
};

export default TenantList;
