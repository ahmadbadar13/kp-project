import React from 'react';

const PopupPegawai = ({ title, message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                <h3 className="text-lg font-semibold mb-4">{title}</h3>
                <p className="text-sm text-gray-600">{message}</p>
                <div className="mt-4 flex justify-end">
                    <button className="bg-red-500 text-white rounded-lg px-4 py-2" onClick={onClose}>
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopupPegawai;