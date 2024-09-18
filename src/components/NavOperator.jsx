import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo KPU.png';
import Swal from 'sweetalert2';
import { HiOutlineLogout } from "react-icons/hi";

const NavOperator = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [operatorDropdownOpen, setOperatorDropdownOpen] = useState(false);
    // const [isTransparent, setIsTransparent] = useState(true);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);
    const toggleDropdown = (dropdown) => setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    const toggleOperatorDropdown = () => setOperatorDropdownOpen(!operatorDropdownOpen);
    const navigate = useNavigate();

    useEffect(() => {
        // const handleScroll = () => {
        // if (window.scrollY > 50) {
        //     setIsTransparent(false);
        // } else {
        //     setIsTransparent(true);
        // }
        // };

        // window.addEventListener('scroll', handleScroll);
        // return () => {
        // window.removeEventListener('scroll', handleScroll);
        // };
    }, []);

    const handleLogout = () => {
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
        <div>
            {/* Start: Navbar */}
            <nav className={`w-full bg-gradient-to-t from-red-600 via-red-800 to-red-800 mb-0 p-4 sticky top-0 z-50`}>
                <div className="max-w-screen-xl flex items-center justify-between mx-auto">
                <Link to="/Dashboard-Op" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={Logo} className="h-16" alt="Logo KPU" />
                    <span className="self-center text-white text-3xl tracking-tighter font-semibold font-frank whitespace-nowrap">
                    Kota Cimahi
                    </span>
                </Link>
                <div className="hidden md:flex md:items-center flex-grow justify-center">
                    <ul className="font-medium text-lg flex space-x-12">
                    <li className="relative">
                        <button
                        onClick={() => toggleDropdown('divisi')}
                        className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
                        >
                        Divisi
                        </button>
                        {activeDropdown === 'divisi' && (
                        <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black rounded shadow-lg w-48">
                            <li>
                            <Link to="/DivisiKURL-Op" className="block py-1 px-4 hover:bg-gray-200 rounded text-sm">Divisi Keuangan, Umum, Rumah Tangga, dan Logistik</Link>
                            </li>
                            <li>
                            <Link to="/DivisiTP-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Teknis Penyelenggaraan</Link>
                            </li>
                            <li>
                            <Link to="/DivisiPDI-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Perencanaan, Data, & Informasi</Link>
                            </li>
                            <li>
                            <Link to="/DivisiHP-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Hukum dan Pengawasan</Link>
                            </li>
                            <li>
                            <Link to="/DivisiSPPP_SDM-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Sosialisasi, Pendidikan Pemilih, Parmas, & SDM</Link>
                            </li>
                        </ul>
                        )}
                    </li>
                    <li>
                        <Link to="/Sekretaris-Op" className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0">
                        Sekretaris
                        </Link>
                    </li>
                    <li className="relative">
                        <button
                        onClick={() => toggleDropdown('subBagian')}
                        className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
                        >
                        Sub Bagian
                        </button>
                        {activeDropdown === 'subBagian' && (
                        <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black rounded shadow-lg w-48">
                            <li>
                            <Link to="/SubBagianTPPPH-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Teknis Penyelenggaraan Pemilu, Partisipasi, & Hupmas</Link>
                            </li>
                            <li>
                            <Link to="/SubBagianPDI-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Perencanaan, Data & Informasi</Link>
                            </li>
                            <li>
                            <Link to="/SubBagianHSDM-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Hukum & SDM</Link>
                            </li>
                            <li>
                            <Link to="/SubBagianKUL-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Keuangan, Umum, & Logistik</Link>
                            </li>
                        </ul>
                        )}
                    </li>
                    </ul>
                </div>
                <div className="hidden md:flex md:items-center">
                    <div className="relative">
                    <button
                        onClick={toggleOperatorDropdown}
                        className="text-white font-medium text-lg flex items-center focus:outline-none"
                    >
                        Hallo, Operator!
                        <svg
                        className={`w-2.5 h-2.5 ms-2.5 transition-transform duration-300 ${
                            operatorDropdownOpen ? 'transform rotate-180' : ''
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
                    {operatorDropdownOpen && (
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
            {/* End: Navbar */}

            {/* Start: Responsive Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 z-50">
                <div className="flex flex-col items-center pt-10">
                    <Link to="/" onClick={closeMenu} className="text-white text-2xl mb-6">≡</Link>
                    <ul className="flex flex-col items-center space-y-4">
                    <li>
                        <button
                        onClick={() => toggleDropdown('divisi')}
                        className="text-white text-lg"
                        >
                        Divisi
                        </button>
                        {activeDropdown === 'divisi' && (
                        <ul className="bg-white text-black rounded shadow-lg mt-2 w-48">
                            <li>
                            <Link to="/DivisiKURL-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Divisi Keuangan, Umum, Rumah Tangga, dan Logistik</Link>
                            </li>
                            <li>
                            <Link to="/DivisiTP-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Divisi Teknis Penyelenggaraan</Link>
                            </li>
                            <li>
                            <Link to="/DivisiPDI-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Perencanaan, Data, & Informasi</Link>
                            </li>
                            <li>
                            <Link to="/DivisiHP-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Divisi Hukum dan Pengawasan</Link>
                            </li>
                            <li>
                            <Link to="/DivisiSPPP_SDM-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Divisi Sosialisasi, Pendidikan Pemilih, Parmas, & SDM</Link>
                            </li>
                        </ul>
                        )}
                    </li>
                    <li>
                        <Link to="/Sekretaris-Op" className="block py-2 px-3 text-white text-lg" onClick={closeMenu}>
                        Sekretaris
                        </Link>
                    </li>
                    <li>
                        <button
                        onClick={() => toggleDropdown('subBagian')}
                        className="text-white text-lg"
                        >
                        Sub Bagian
                        </button>
                        {activeDropdown === 'subBagian' && (
                        <ul className="bg-white text-black rounded shadow-lg mt-2 w-48">
                            <li>
                            <Link to="/SubBagianTPPPH-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Sub Bagian Teknis Penyelenggaraan Pemilu, Partisipasi, & Hupmas</Link>
                            </li>
                            <li>
                            <Link to="/SubBagianPDI-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Sub Bagian Perencanaan, Data & Informasi</Link>
                            </li>
                            <li>
                            <Link to="/SubBagianHSDM-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Sub Bagian Hukum & SDM</Link>
                            </li>
                            <li>
                            <Link to="/SubBagianKUL-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Sub Bagian Keuangan, Umum, & Logistik</Link>
                            </li>
                        </ul>
                        )}
                    </li>
                    <li>
                        <button
                        onClick={toggleOperatorDropdown}
                        className="text-white text-lg"
                        >
                        Hallo, Operator!
                        </button>
                        {operatorDropdownOpen && (
                        <ul className="bg-white text-black rounded shadow-lg mt-2 w-30">
                            <li>
                            <Link to="/" className="block px-4 py-2 hover:bg-gray-200 rounded text-center" onClick={closeMenu}>Logout</Link>
                            </li>
                        </ul>
                        )}
                    </li>
                    </ul>
                </div>
                </div>
            )}
            {/* End: Responsive Mobile Menu */}
        </div>
    );
};

export default NavOperator;