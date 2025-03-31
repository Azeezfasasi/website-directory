import React, { useEffect, useState } from "react";
import { useProfile } from "../assets/contextAPI/ProfileContext";
import axios from "axios";
import Header from "../assets/component/Header";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const ManageUsers = () => {
  const { updateProfile, deleteProfile } = useProfile();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [disabledPage, setDisabledPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://app-directory-backend.onrender.com/api/profiles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const handleToggleDisable = async (userId, currentStatus) => {
    try {
      await updateProfile(userId, { disabled: !currentStatus });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, disabled: !currentStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteProfile(userId);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Pagination logic
  const activeUsers = users.filter((user) => !user.disabled);
  const disabledUsers = users.filter((user) => user.disabled);

  const indexOfLastActiveUser = activePage * usersPerPage;
  const indexOfFirstActiveUser = indexOfLastActiveUser - usersPerPage;
  const currentActiveUsers = activeUsers.slice(
    indexOfFirstActiveUser,
    indexOfLastActiveUser
  );

  const indexOfLastDisabledUser = disabledPage * usersPerPage;
  const indexOfFirstDisabledUser = indexOfLastDisabledUser - usersPerPage;
  const currentDisabledUsers = disabledUsers.slice(
    indexOfFirstDisabledUser,
    indexOfLastDisabledUser
  );

  return (
    <>
    <Helmet>
      <title>Manage Users | Website Directory</title>
      <meta name='description' content='View, edit, and manage all user accounts.' />
    </Helmet>
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          Manage Users
        </h2>

        {loading ? (
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Loading users...
          </p>
        ) : (
          <>
            {/* Active Users Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">
                Active Users
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Role</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">Update</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentActiveUsers
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((user) => (
                      <tr key={user._id} className="border-b border-gray-200">
                        <td className="px-6 py-4 text-gray-900 dark:text-gray-200">{user.name}</td>
                        <td className="px-6 py-4 text-gray-900 dark:text-gray-200">{user.email}</td>
                        <td className="px-6 py-4 text-gray-900 dark:text-gray-200">{user.role}</td>
                        <td className="px-6 py-4 text-center">
                          <Link
                            to={`/app/edituserdetails/${user._id}`}
                            className="text-blue-600 hover:underline mr-3"
                          >
                            Edit
                          </Link>
                        </td>
                        <td>
                            <button
                                onClick={() => handleToggleDisable(user._id, user.disabled)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition cursor-pointer"
                            >
                                Disable
                            </button>
                        </td>
                        <td>
                            <button
                                onClick={() => handleDelete(user._id)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition ml-3 cursor-pointer"
                            >
                                Delete
                            </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  disabled={activePage === 1}
                  onClick={() => setActivePage(activePage - 1)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Back
                </button>
                <span>Page {activePage}</span>
                <button
                  disabled={indexOfLastActiveUser >= activeUsers.length}
                  onClick={() => setActivePage(activePage + 1)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Disabled Users Section */}
            <div>
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
                Disabled Users
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDisabledUsers
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((user) => (
                      <tr key={user._id} className="border-b border-gray-200">
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleToggleDisable(user._id, user.disabled)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                          >
                            Enable
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ManageUsers;
