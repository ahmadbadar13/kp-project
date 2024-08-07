import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoKPU from '../assets/Logo KPU.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center m-10 justify-center min-h-screen bg-gray-100">
      <div className="mb-8">
        <img src={logoKPU} alt="Logo KPU" className="w-32 h-32" />
      </div>
      <h2 className="text-2xl font-bold mb-8">Pilih Role Anda</h2>
      <div className="bg-gray-200 p-20 rounded-lg shadow-lg flex justify-between gap-16">
        <div
          className="flex flex-col items-center justify-center bg-gray-300 p-4 m-2 rounded cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:bg-gray-400"
          onClick={() => navigate('/Dashboard-Adm')}
        >
          <img
            src="https://img.icons8.com/ios-filled/100/000000/admin-settings-male.png"
            alt="Admin Icon"
            className="w-20 h-20 mb-4"
          />
          <h3 className="text-black-500 font-bold">Admin</h3>
        </div>
        <div
          className="flex flex-col items-center justify-center bg-gray-300 p-4 m-2 rounded cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:bg-gray-400"
          onClick={() => navigate('/Login-Op')}
        >
          <img
            src="https://img.icons8.com/ios-filled/100/000000/user.png"
            alt="Operator Icon"
            className="w-20 h-20 mb-4"
          />
          <h3 className="text-black-500 font-bold">Operator</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
