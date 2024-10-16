import React from 'react';

const ProfileCard = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
        <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="rounded-full w-32 h-32 mx-auto mb-4"
        />
        <h2 className="text-xl font-bold">Nama Pegawai</h2>
        <p className="text-gray-600">Jabatan: Staff IT</p>
        <p className="text-gray-600">Divisi: Pengembangan Sistem</p>
        </div>
    );
};

export default ProfileCard;
