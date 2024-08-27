import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaUserCog } from 'react-icons/fa'; // Import ikon
import logoKPU from '../assets/Logo KPU.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="mb-10">
        <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-110">
          <img src={logoKPU} alt="Logo KPU" className="w-full h-full object-contain" />
        </div>
      </div>
      <h2 className="text-3xl font-extrabold mb-12 text-gray-800 animate__animated animate__fadeIn">Pilih Role Anda</h2>
      <div className="flex flex-wrap justify-center gap-12">
        <div
          className="flex flex-col items-center justify-center bg-gray-300 p-8 rounded-lg shadow-xl cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:bg-gray-400 hover:shadow-2xl w-56 h-56"
          onClick={() => navigate('/Login-Adm')}
        >
          <div className="text-6xl mb-4 text-gray-700">
            <FaUserShield />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">Admin</h3>
        </div>
        <div
          className="flex flex-col items-center justify-center bg-gray-300 p-8 rounded-lg shadow-xl cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:bg-gray-400 hover:shadow-2xl w-56 h-56"
          onClick={() => navigate('/Login-Op')}
        >
          <div className="text-6xl mb-4 text-gray-700">
            <FaUserCog />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">Operator</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
