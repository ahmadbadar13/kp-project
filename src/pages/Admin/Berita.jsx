import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/NavAdmin';
import Footer from '../../components/FooterAllPages';

const AddNews = () => {
    // State untuk menyimpan input form
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [newsList, setNewsList] = useState([]);

    // Fungsi untuk mengambil data berita dari database
    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/news/list');
            setNewsList(response.data);
        } catch (error) {
            console.error('Gagal mengambil data berita', error);
        }
    };

    // Fungsi untuk menangani submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
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
            setImage(null);
            setDate('');
            setContent('');
            fetchNews(); // Mengambil data berita setelah berhasil menambah
        } catch (error) {
            console.error('Gagal menambahkan berita', error);
            setSuccessMessage('Gagal menambahkan berita.');
        }
        setLoading(false);
    };

    // Fungsi untuk menghapus berita
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/news/delete/${id}`);
            fetchNews(); // Mengambil data berita setelah berhasil menghapus
        } catch (error) {
            console.error('Gagal menghapus berita', error);
        }
    };

    // Mengambil data berita saat komponen pertama kali dimuat
    useEffect(() => {
        fetchNews();
    }, []);

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

            {/* Menampilkan Data Berita */}
            <div className="flex-grow flex justify-center items-center mt-8">
                <div className="w-full max-w-4xl">
                    <h2 className="text-xl font-bold mb-4">Daftar Berita</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {newsList.map((news) => (
                            <div key={news.id} className="bg-white p-4 rounded-lg shadow-md">
                                <img src={`http://localhost:5002/${news.image}`} alt={news.title} className="w-full h-32 object-cover rounded-md" />
                                <h3 className="text-lg font-semibold mt-2">{news.title}</h3>
                                <p className="text-gray-700">{news.content}</p>
                                <div className="flex justify-between mt-4">
                                    <button className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(news.id)}
                                        className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AddNews;
