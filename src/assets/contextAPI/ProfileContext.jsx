import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(false);

  // Set token in headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);
  

  useEffect(() => {
    const loadUser = async () => {
      if (token && !user) {
        try {
          const response = await axios.get("http://localhost:5000/api/profiles/me");
          setUser(response.data);
        } catch (error) {
          logout();
        }
      }
    };
    loadUser();
  }, [token, user]);
  
  
  // Register a new profile
  const registerProfile = async (profileData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/profiles/register",
        profileData
      );
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    } finally {
      setLoading(false);
    }
  };

  // Login profile
  const loginProfile = async (credentials) => {
    try {
      setLoading(true);      
      const response = await axios.post(
        "http://localhost:5000/api/profiles/login",
        credentials
      );
      
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile by userId
  const fetchProfile = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/profiles/${userId}`);
      setUser(response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (userId, profileData) => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:5000/api/profiles/${userId}`, profileData);
      setUser(response.data.updatedProfile);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    } finally {
      setLoading(false);
    }
  };

  // Delete profile
  const deleteProfile = async (userId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/profiles/${userId}`);
      logout();
    } catch (error) {
      throw error.response?.data || error.message;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken('');
  };

  return (
    <ProfileContext.Provider
      value={{
        user,
        loading,
        registerProfile,
        loginProfile,
        fetchProfile,
        updateProfile,
        deleteProfile,
        logout,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
