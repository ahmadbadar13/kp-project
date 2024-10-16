import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavPegawai = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('role');
        navigate('/');
    };

    return (
        <nav className="bg-blue-600 text-white py-4 px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard Pegawai</h1>
            <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
                Logout
            </button>
        </nav>
    );
};

export default NavPegawai;