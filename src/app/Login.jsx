import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../assets/contextAPI/ProfileContext';
import LoginCopy from '../assets/component/LoginCopy';
import BuyTemplateButton from '../assets/component/BuyTemplateButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginProfile, loading } = useProfile();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await loginProfile({ email, password });
      navigate('/app/home');
    } catch (err) {
      setError(err.message || 'Failed to login. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | App Director</title>
        <meta name="description" content="Welcome to Application Directory!" />
        <meta name="keywords" content="App, Directory, SEO, Meta Tags" />
      </Helmet>
      <div
        className="form-container flex flex-col items-center justify-center h-screen bg-blue-100"
        style={{ backgroundImage: "url('../assets/images/background1.jpg')" }}
      >
        <BuyTemplateButton />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center p-[20px] border border-solid border-[#ccc] rounded-[5px] w-[300px]"
        >
          {error && <div className="error text-red-700 mb-[10px]">{error}</div>}

          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-[10px] mb-[10px] border border-solid border-[#ccc] rounded-[5px]"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-[10px] mb-[10px] border border-solid border-[#ccc] rounded-[5px]"
            required
          />

          <button
            className="login-btn bg-[#4CAF50] text-white px-[20px] py-[10px] border-none rounded-[5px]"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <LoginCopy />
      </div>
    </>
  );
};

export default Login;
