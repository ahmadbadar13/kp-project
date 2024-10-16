import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo KPU.png';
import Swal from 'sweetalert2';
import { HiOutlineLogout } from "react-icons/hi";

const NavPegawai = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [pegawaiDropdownOpen, setPegawaiDropdownOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const togglePegawaiDropdown = () => setPegawaiDropdownOpen(!pegawaiDropdownOpen);
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('role');
        Swal.fire({
            title: "Anda yakin ingin keluar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Keluar",
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                title: "Berhasil Keluar",
                text: "Anda keluar dari halaman ini",
                icon: "success",
                }).then(() => {
                navigate('/');
                });
            }
            });
    };

    return (
        <nav className={`w-full bg-gradient-to-t from-red-600 via-red-800 to-red-800 mb-0 p-4 sticky top-0 z-50`}>
            <div className="max-w-screen-xl flex items-center justify-between mx-auto">
                <Link to="/Pegawai" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={Logo} className="h-16" alt="Logo KPU" />
                    <span className="self-center text-white text-3xl tracking-tighter font-semibold font-frank whitespace-nowrap">
                    Kota Cimahi
                    </span>
                </Link>
                <div className="hidden md:flex md:items-center">
                    <div className="relative">
                    <button
                        onClick={togglePegawaiDropdown}
                        className="text-white font-medium text-lg flex items-center focus:outline-none"
                    >
                        Hallo, Pegawai!
                        <svg
                        className={`w-2.5 h-2.5 ms-2.5 transition-transform duration-300 ${
                            pegawaiDropdownOpen ? 'transform rotate-180' : ''
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                        >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                        />
                        </svg>
                    </button>
                    {pegawaiDropdownOpen && (
                        <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black rounded shadow-lg w-32 z-10">
                        <li>
                            <button 
                            onClick={handleLogout} 
                            className="flex items-center px-4 py-2 hover:bg-gray-200 rounded text-center"
                            >
                            <HiOutlineLogout size={20} className="mr-2 text-gray-800" /> 
                            <span className="text-left">Logout</span> 
                            </button>
                        </li>
                        </ul>
                    )}
                    </div>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="block text-white focus:outline-none">
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                        <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4 6h16v1H4V6zm0 5h16v1H4v-1zm0 5h16v1H4v-1z"
                        />
                    </svg>
                    </button>
                </div>
                </div>
            </nav>
    );
};

export default NavPegawai;