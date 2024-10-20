import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/NavAdmin';
import Footer from '../../components/FooterAllPages';

const AddNews = () => {
    // State untuk menyimpan input form
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null); // Mengelola file gambar
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Fungsi untuk menangani submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Menampilkan loader saat proses berlangsung
        setSuccessMessage(''); // Reset pesan sukses

        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image); // Menambahkan gambar ke FormData
        formData.append('date', date);
        formData.append('content', content);

        try {
            // Mengirim request ke backend untuk menambah berita
            await axios.post('http://localhost:5000/news/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage('Berita berhasil ditambahkan!');
            setTitle('');
            setImage(null); // Reset input gambar
            setDate('');
            setContent('');
        } catch (error) {
            console.error('Gagal menambahkan berita', error);
            setSuccessMessage('Gagal menambahkan berita.');
        }
        setLoading(false); // Menghilangkan loader setelah proses selesai
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Konten Utama */}
            <div className="flex-grow flex justify-center items-center">
                <div className="bg-white p-8 mt-9 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">Tambah Berita Baru</h1>

                    {/* Form Input Berita */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Judul Berita</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload Gambar</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])} // Mengambil file gambar
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tanggal Berita</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Isi Berita</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                rows="5"
                            />
                        </div>

                        {/* Button Submit */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                            disabled={loading}
                        >
                            {loading ? 'Menambahkan...' : 'Tambah Berita'}
                        </button>
                    </form>

                    {/* Menampilkan Pesan Sukses */}
                    {successMessage && (
                        <div className={`mt-4 p-2 text-center ${successMessage.includes('berhasil') ? 'text-green-500' : 'text-red-500'}`}>
                            {successMessage}
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AddNews;
