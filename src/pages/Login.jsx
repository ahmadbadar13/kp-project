import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo KPU.png';
import axios from 'axios';
import Swal from 'sweetalert2';

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
        const { role } = response.data; // Asumsikan peran dikembalikan dari backend
        localStorage.setItem('role', role); // Simpan peran di localStorage

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
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo KPU" className="w-24 h-24" />
        </div>

        {/* Title Section */}
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
