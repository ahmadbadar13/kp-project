import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useParams untuk mengambil userId dari URL
import Swal from 'sweetalert2';
import Logo from '../assets/Logo KPU.png'

const EditAkun = () => {
    const [email, setEmail] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    // Ambil data peran pengguna dari localStorage
    useEffect(() => {
        
    }, [navigate]);

    // Ambil userId dari localStorage atau URL (gunakan useParams jika dari URL)
    const userId = localStorage.getItem('userId'); // Pastikan userId ada di localStorage atau ganti dengan useParams() jika dari URL

    // Fungsi untuk memverifikasi email
    const verifyEmail = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/verify-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response from server:', errorData);
                // Menggunakan SweetAlert2 untuk menampilkan pesan gagal
                return Swal.fire({
                    icon: 'error',
                    title: 'Gagal Memverifikasi Email',
                    text: errorData.message || 'Kesalahan tidak diketahui',
                });
            }
    
            const data = await response.json();
            setIsEmailVerified(true); // Tandai bahwa email telah diverifikasi
            
            // Menampilkan SweetAlert2 dengan pesan sukses
            Swal.fire({
                icon: 'success',
                title: 'Email Terverifikasi!',
                text: data.message || 'Email Anda berhasil diverifikasi.',
            });
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            // Menampilkan SweetAlert2 dengan pesan error server
            Swal.fire({
                icon: 'error',
                title: 'Terjadi Kesalahan',
                text: 'Terjadi kesalahan pada server. Silakan coba lagi.',
            });
        }
    };

    // Fungsi untuk mengedit password
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Password tidak cocok!',
                text: 'Password baru dan konfirmasi password tidak cocok.',
            });
            return;
        }
    
        if (!userId) {
            Swal.fire({
                icon: 'error',
                title: 'User ID tidak ditemukan!',
                text: 'User ID tidak ditemukan.',
            });
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5000/auth/update-password/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newPassword,
                    confirmPassword,
                }),
            });
    
            const data = await response.json();
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Password berhasil diperbarui!',
                });
                navigate('/dashboard');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: data.message || 'Gagal memperbarui password.',
                });
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan!',
                text: 'Terjadi kesalahan saat memperbarui password.',
            });
        }
    };    

    return (
        <div className="w-full max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
            <div className="flex justify-center mb-20 mt-8">
                <div className="relative flex items-center justify-center">
                    <div className="absolute w-28 h-28 bg-gradient-to-r from-red-500 to-white rounded-full flex items-center justify-center -top-10">
                        <img src={Logo} alt="Logo KPU" className="w-20 h-20" />
                    </div>
                </div>
            </div>
            <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Reset Password</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="flex items-center">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isEmailVerified}
                        />
                        {!isEmailVerified && (
                            <button
                                type="button"
                                className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                                onClick={verifyEmail}
                            >
                                Verifikasi
                            </button>
                        )}
                    </div>
                </div>

                {/* Input Password Baru */}
                {isEmailVerified && (
                    <>
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Password Baru</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Konfirmasi Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Tombol Simpan */}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 mt-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Oke
                        </button>
                    </>
                )}
            </form>
        </div>
    );
};

export default EditAkun;
