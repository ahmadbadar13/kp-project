import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo KPU.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validasi input sebelum melakukan registrasi
        if (!email || !password || !confirmPassword || !role) {
            setError('Semua field harus diisi');
            return;
        }

        if (password !== confirmPassword) {
            setError('Password harus sama');
            return;
        }

        try {
            // Memanggil API register
            const response = await axios.post('http://localhost:5000/register', { email, role, password });

            if (response.data.success) {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Registrasi berhasil!',
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate('/login');
            } else {
                setError('Registrasi gagal: ' + response.data.message);
                await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Registrasi gagal, coba lagi.",
                });
            }
        } catch (error) {
            setError('Terjadi kesalahan');
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Terjadi kesalahan saat registrasi!",
            });
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg relative">
                {/* Logo Section */}
                <div className="flex justify-center mb-20 mt-8">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-28 h-28 bg-gradient-to-r from-red-500 to-white rounded-full flex items-center justify-center -top-10">
                            <img src={Logo} alt="Logo KPU" className="w-20 h-20" />
                        </div>
                    </div>
                </div>

                {/* Title Section */}
                <h2 className="text-3xl font-extrabold text-center mb-5 text-gray-800">
                    Register
                </h2>

                {/* Register Form */}
                <form onSubmit={handleRegister}>
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
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-6 mr-2" onClick={toggleShowPassword}>
                            {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                        </div>
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Konfirmasi Password
                        </label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-6 mr-2" onClick={toggleShowConfirmPassword}>
                            {showConfirmPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        >
                            <option value="">Pilih Role</option>
                            <option value="admin">Admin</option>
                            <option value="operator">Operator</option>
                        </select>
                    </div>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
