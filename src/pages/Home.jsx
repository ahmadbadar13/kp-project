import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoKPU from '../assets/Logo KPU.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="mb-10">
        <img src={logoKPU} alt="Logo KPU" className="w-32 h-32 shadow-lg transform transition-transform duration-500 hover:scale-110" />
      </div>
      <h2 className="text-3xl font-extrabold mb-12 text-gray-800 animate__animated animate__fadeIn">Pilih Role Anda</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div
          className="flex flex-col items-center justify-center bg-gray-300 p-6 rounded-lg shadow-xl cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:bg-gray-400 hover:shadow-2xl"
          onClick={() => navigate('/Login-Adm')}
        >
          <img
            src="https://img.icons8.com/ios-filled/100/000000/admin-settings-male.png"
            alt="Admin Icon"
            className="w-24 h-24 mb-4 transition-transform duration-300 transform hover:scale-110"
          />
          <h3 className="text-lg font-semibold text-gray-700">Admin</h3>
        </div>
        <div
          className="flex flex-col items-center justify-center bg-gray-300 p-6 rounded-lg shadow-xl cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:bg-gray-400 hover:shadow-2xl"
          onClick={() => navigate('/Login-Op')}
        >
          <img
            src="https://img.icons8.com/ios-filled/100/000000/user.png"
            alt="Operator Icon"
            className="w-24 h-24 mb-4 transition-transform duration-300 transform hover:scale-110"
          />
          <h3 className="text-lg font-semibold text-gray-700">Operator</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
