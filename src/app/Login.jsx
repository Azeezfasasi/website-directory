// import React, { useState } from 'react';
// import { Helmet } from 'react-helmet';
// import { Link, useNavigate } from 'react-router-dom';
// import { useProfile } from '../assets/contextAPI/ProfileContext';
// import LoginCopy from '../assets/component/LoginCopy';
// import BuyTemplateButton from '../assets/component/BuyTemplateButton';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { loginProfile, loading, setLoading } = useProfile();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       await loginProfile({ email, password });
//       navigate('/app/home');
//     } catch (err) {
//       setError(err.message || 'Failed to login. Please try again.');
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Login | App Director</title>
//         <meta name="description" content="Welcome to Application Directory!" />
//         <meta name="keywords" content="App, Directory, SEO, Meta Tags" />
//       </Helmet>
//       <div
//         className="form-container flex flex-col items-center justify-center h-screen bg-blue-100"
//         style={{ backgroundImage: "url('../assets/images/background1.jpg')" }}
//       >
//         <BuyTemplateButton />

//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col items-center p-[20px] border border-solid border-[#ccc] rounded-[5px] w-[300px]"
//         >
//           {error && <div className="error text-red-700 mb-[10px]">{error}</div>}

//           <input
//             type="text"
//             placeholder="Username"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-[10px] mb-[10px] border border-solid border-[#ccc] rounded-[5px]"
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-[10px] mb-[10px] border border-solid border-[#ccc] rounded-[5px]"
//             required
//           />

//           <button
//             className="login-btn bg-[#4CAF50] text-white px-[20px] py-[10px] border-none rounded-[5px]"
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>

//         <div className="flex justify-center items-center mt-4 space-x-2 text-sm">
//             <p className="text-gray-600">Dont have an accout?</p>
//             <Link to="/app/register" className="text-green-600 hover:underline font-medium">
//               Register
//             </Link>
//         </div>

//         <LoginCopy />
//       </div>
//     </>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../assets/contextAPI/ProfileContext";
import LoginCopy from "../assets/component/LoginCopy";
import BuyTemplateButton from "../assets/component/BuyTemplateButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginProfile, loading } = useProfile();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginProfile({ email, password });
      navigate("/app/home");
    } catch (err) {
      setError(err.message || "Failed to login. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | App Director</title>
        <meta name="description" content="Welcome to Application Directory!" />
        <meta name="keywords" content="App, Directory, SEO, Meta Tags" />
      </Helmet>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('../assets/images/background1.jpg')" }}
        />

        <BuyTemplateButton />

        <form
          onSubmit={handleSubmit}
          className="relative z-10 bg-white shadow-lg rounded-lg p-6 w-full max-w-sm border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
            Login to Your Account
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-3">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center mt-3 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/app/register" className="text-green-500 hover:underline">
              Register
            </Link>
          </div>
        </form>

        <LoginCopy />
      </div>
    </>
  );
};

export default Login;
