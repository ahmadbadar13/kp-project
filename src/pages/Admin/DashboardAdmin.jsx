import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo KPU.png';

const DashboardAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
                onClick={toggleDropdown}
                className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0"
              >
                Divisi
              </button>
              {dropdownOpen && (
                <ul className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg w-48">
                  <li>
                    <Link to="/" className="block py-2 px-4 hover:bg-gray-200">Sub Divisi 1</Link>
                  </li>
                  <li>
                    <Link to="/" className="block py-2 px-4 hover:bg-gray-200">Sub Divisi 2</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0"
              >
                Sekretaris
              </button>
              {dropdownOpen && (
                <ul className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg w-48">
                  <li>
                    <Link to="/" className="block py-2 px-4 hover:bg-gray-200">Detail Sekretaris 1</Link>
                  </li>
                  <li>
                    <Link to="/" className="block py-2 px-4 hover:bg-gray-200">Detail Sekretaris 2</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0"
              >
                Sub Bagian
              </button>
              {dropdownOpen && (
                <ul className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg w-48">
                  <li>
                    <Link to="/" className="block py-2 px-4 hover:bg-gray-200">Sub Bagian 1</Link>
                  </li>
                  <li>
                    <Link to="/" className="block py-2 px-4 hover:bg-gray-200">Sub Bagian 2</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0"
                aria-current="page"
              >
                Logout
              </Link>
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
              <ul className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-48">
                <li>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                </li>
                <li>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-gray-200">Settings</Link>
                </li>
                <li>
                  <Link to="/logout" className="block px-4 py-2 hover:bg-gray-200">Logout</Link>
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
      <div className={`w-full ${menuOpen ? 'block' : 'hidden'} md:hidden`}>
        <ul className="font-medium text-lg flex flex-col p-4 mt-4 border-t border-gray-200">
          <li>
            <Link
              to="/"
              className="block py-2 px-3 text-white rounded hover:bg-gray-700"
              aria-current="page"
            >
              Divisi
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="block py-2 px-3 text-white rounded hover:bg-gray-700"
            >
              Sekretaris
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="block py-2 px-3 text-white rounded hover:bg-gray-700"
              aria-current="page"
            >
              Sub Bagian
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={toggleAdminDropdown}
              className="block py-2 px-3 text-white rounded hover:bg-gray-700"
            >
              Hallo, Admin!
            </button>
            {adminDropdownOpen && (
              <ul className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg w-48">
                <li>
                  <Link to="/" className="block py-2 px-3 text-white rounded hover:bg-gray-700" aria-current="page">
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DashboardAdmin;
