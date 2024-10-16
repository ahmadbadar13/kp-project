import React, { useState } from 'react';
import Popup from '../components/PopupPegawai';

const AttendanceCard = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleButtonClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Absensi</h3>
            <div className="mb-4">
                <p className="text-sm text-gray-600">Hari ini: <span className="font-bold">Hadir</span></p>
                <p className="text-sm text-gray-600">Jam Masuk: <span className="font-bold">08:00 AM</span></p>
                <p className="text-sm text-gray-600">Jam Keluar: <span className="font-bold">17:00 PM</span></p>
            </div>
            <button className="bg-blue-500 text-white rounded-lg px-4 py-2" onClick={handleButtonClick}>
                Lihat Riwayat Absensi
            </button>
            {isPopupOpen && (
                <Popup
                    title="Riwayat Absensi"
                    message="Berikut adalah riwayat absensi Anda..."
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
};

export default AttendanceCard;
