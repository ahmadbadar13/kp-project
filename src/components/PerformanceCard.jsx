import React, { useState } from 'react';
import Popup from '../components/PopupPegawai';

const PerformanceCard = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleButtonClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Hasil Kinerja</h3>
            <div className="mb-4">
                <p className="text-sm text-gray-600">Proyek Terbaru: <span className="font-bold">Sistem Informasi XYZ</span></p>
                <p className="text-sm text-gray-600">Status: <span className="font-bold">Selesai</span></p>
                <p className="text-sm text-gray-600">Penilaian: <span className="font-bold">90/100</span></p>
            </div>
            <button className="bg-green-500 text-white rounded-lg px-4 py-2" onClick={handleButtonClick}>
                Lihat Detail Kinerja
            </button>
            {isPopupOpen && (
                <Popup
                    title="Detail Kinerja"
                    message="Berikut adalah detail kinerja Anda..."
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
};

export default PerformanceCard;
