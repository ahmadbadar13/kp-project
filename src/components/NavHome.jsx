import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo KPU.png';
import { FaSignInAlt } from 'react-icons/fa';

const NavHome = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="w-full bg-gradient-to-t from-red-600 via-red-800 to-red-800 p-4 sticky top-0 z-50">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto">
                <Link to="/Home" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={Logo} className="h-16" alt="Logo KPU" />
                    <span className="self-center text-white text-3xl tracking-tighter font-semibold whitespace-nowrap">
                        Kota Cimahi
                    </span>
                </Link>
                <div>
                    <Link to="/login">
                    <button className="flex items-center text-white font-semibold py-2 px-4 rounded transition duration-300 hover:text-black">
                        <FaSignInAlt className="mr-2" />
                        Login
                    </button>
                    </Link>
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

export default NavHome;
