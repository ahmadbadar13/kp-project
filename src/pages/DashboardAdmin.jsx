import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import Logo from '../assets/Logo KPU.png';

const DashboardAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-red-700 p-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} className="h-16" alt="Logo KPU" />
          <span className="self-center text-white text-3xl tracking-tighter font-semibold font-frank whitespace-nowrap">
            Kota Cimahi
          </span>
        </Link>
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
        <div className={`w-full md:w-auto ${menuOpen ? 'block' : 'hidden'} md:flex`}>
          <ul className="font-medium text-lg flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0"
                aria-current="page"
              >
                Divisi
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0"
              >
                Sekretaris
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0"
                aria-current="page"
              >
                Sub Bagian
              </Link>
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
      </div>
    </nav>
  );
};

export default DashboardAdmin;
