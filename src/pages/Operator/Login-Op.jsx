import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo KPU.png';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });

      if (response.data.success) {
        navigate('/Dashboard-Op');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Logo and Text */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-red-700 p-4">
        <img
          src={Logo}
          alt="Logo"
          className="w-3/4 md:w-1/2 h-auto"
        />
        <h1 className="mt-4 text-white text-3xl font-semibold font-sans">
          KOTA CIMAHI
        </h1>
      </div>
      
      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4 md:p-0">
        <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-gray-50 shadow-lg rounded-lg">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
