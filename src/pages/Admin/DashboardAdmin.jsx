import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo KPU.png';

const DashboardAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const toggleAdminDropdown = () => {
    setAdminDropdownOpen(!adminDropdownOpen);
  };

  return (
    <nav className="bg-red-700 p-4">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
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
                    <Link to="/" className="block py-1 px-4 hover:bg-gray-200 rounded text-sm">Divisi Keuangan, Umum, Rumah Tangga, dan Logistik</Link>
                  </li>
                  <li>
                    <Link to="/" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Teknik Penyelenggaraan</Link>
                  </li>
                  <li>
                    <Link to="/" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Perencanaan, Data, & Informasi</Link>
                  </li>
                  <li>
                    <Link to="/" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Hukum dan Pengawasan</Link>
                  </li>
                  <li>
                    <Link to="/" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Sosialisasi, Pendidikan Pemilih, Parmas, & SDM</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="relative">
              <button
                className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
              >
                Sekretaris
              </button>
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
                    <Link to="/" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Teknis Penyelenggaraan Pemilu, Partisipasi, & Hupmas</Link>
                  </li>
                  <li>
                    <Link to="/" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Perencanaan, Data & Informasi</Link>
                  </li>
                  <li>
                    <Link to="/" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Hukum & SDM</Link>
                  </li>
                  <li>
                    <Link to="/" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Keuangan, Umum, & Logistik</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
        <div className="hidden md:flex md:items-center">
          <div className="relative">
            <button
              onClick={toggleAdminDropdown}
              className="text-white font-medium text-lg flex items-center"
            >
              Hallo, Admin!
              <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg>
            </button>
            {adminDropdownOpen && (
              <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black rounded shadow-lg w-30">
                <li>
                <Link to="/" className="block px-4 py-2 w-32 hover:bg-gray-200 rounded text-center">Logout</Link>
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

export default DashboardAdmin;