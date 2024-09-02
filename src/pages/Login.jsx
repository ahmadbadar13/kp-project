import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo KPU.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
        const { role } = response.data;
        localStorage.setItem('role', role);

        await Swal.fire({
          position: "top-center",
          icon: "success",
          title: `Selamat Datang ${role.charAt(0).toUpperCase() + role.slice(1)}!`,
          showConfirmButton: false,
          timer: 1500
        });

        navigate(role === 'admin' ? '/Dashboard-Adm' : '/Dashboard-Op');
      } else {
        setError('Kredensial tidak valid');
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email atau password tidak valid",
        });
      }
    } catch (error) {
      setError('Terjadi kesalahan');
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan!",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg relative">
        {/* Logo Section */}
        <div className="flex justify-center mb-20 mt-8">
          {/* Background Circle */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-28 h-28 bg-gradient-to-r from-red-500 to-white rounded-full flex items-center justify-center -top-10">
              <img src={Logo} alt="Logo KPU" className="w-20 h-20" />
            </div>
          </div>
        </div>

        {/* Title Section */}
        <h2 className="text-3xl font-extrabold text-center mb-5 text-gray-800">
          Login
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
