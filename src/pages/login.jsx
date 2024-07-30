import React from 'react';
import Logo from '../assets/Logo KPU.png';

const LoginUser = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Logo */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <img
          src={Logo}
          alt="Logo"
          className="w-3/4 md:w-1/2 h-auto"
        />
      </div>
      
      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4 md:p-0">
        <form className="w-full max-w-sm p-6 bg-gray-50 shadow-lg rounded-lg">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
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

export default LoginUser;
