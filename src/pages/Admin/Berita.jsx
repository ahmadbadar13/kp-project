import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/NavAdmin';
import Footer from '../../components/FooterAllPages';
import Swal from 'sweetalert2';

const AddNews = () => {
    // State untuk menyimpan input form
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [newsList, setNewsList] = useState([]);
    const [editId, setEditId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showFullContent, setShowFullContent] = useState({});

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
    
            // Tampilkan SweetAlert2 untuk konfirmasi sukses
            Swal.fire({
                title: 'Berhasil!',
                text: 'Berita berhasil ditambahkan!',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 2000,
            });
    
            setTitle('');
            setImage(null);
            setDate('');
            setContent('');
            fetchNews(); // Mengambil data berita setelah berhasil menambah
        } catch (error) {
            console.error('Gagal menambahkan berita', error);
            
            // Tampilkan SweetAlert2 untuk konfirmasi gagal
            Swal.fire({
                title: 'Gagal!',
                text: 'Gagal menambahkan berita.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
        setLoading(false);
    };

    // Fungsi untuk membuka form edit dengan data berita yang dipilih
    const handleEditClick = (news) => {
        setEditId(news.id);
        setTitle(news.title);
        setDate(news.date);
        setContent(news.content);
        setImage(null); // Reset gambar jika ingin diubah
        setIsEditing(true); // Buka modal edit
    };

    // Fungsi untuk menyimpan perubahan pada berita
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('date', date);
        formData.append('content', content);
    
        try {
            // Kirim request PUT ke backend untuk mengedit berita
            await axios.put(`http://localhost:5000/news/edit/${editId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            // Tampilkan SweetAlert2 untuk konfirmasi sukses
            Swal.fire({
                title: 'Berhasil!',
                text: 'Berita berhasil diperbarui!',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 2000,
            });
    
            setIsEditing(false); // Tutup modal edit
            setTitle('');
            setImage(null);
            setDate('');
            setContent('');
            fetchNews(); // Ambil data berita setelah perubahan
        } catch (error) {
            console.error('Gagal mengedit berita', error);
            
            // Tampilkan SweetAlert2 untuk konfirmasi gagal
            Swal.fire({
                title: 'Gagal!',
                text: 'Gagal mengedit berita.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
        setLoading(false);
    };

    // Fungsi untuk menghapus berita
    const handleDelete = async (id) => {
        // Tampilkan konfirmasi sebelum menghapus
        const result = await Swal.fire({
            title: 'Anda Yakin?',
            text: 'Berita ini akan dihapus!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        });
    
        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/news/delete/${id}`);
                
                // Tampilkan SweetAlert2 untuk konfirmasi sukses
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Berita berhasil dihapus!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                });
    
                fetchNews(); // Mengambil data berita setelah berhasil menghapus
            } catch (error) {
                console.error('Gagal menghapus berita', error);
                
                // Tampilkan SweetAlert2 untuk konfirmasi gagal
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Gagal menghapus berita.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
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
                    {newsList.map((news) => {
                        const contentLimit = 100; // Batas karakter untuk menampilkan ringkasan
                        const isContentLong = news.content.length > contentLimit; // Cek apakah konten panjang
                        
                        return (
                            <div key={news.id} className="bg-white p-4 rounded-lg shadow-md">
                                <img src={`http://localhost:5000${news.image}`} alt={news.title} className="w-full h-32 object-cover rounded-md" />
                                <h3 className="text-lg font-semibold mt-2">{news.title}</h3>

                                {/* Tampilkan konten */}
                                <p className="text-gray-700">
                                    {showFullContent ? news.content : `${news.content.substring(0, contentLimit)}...`}
                                </p>

                                {/* Tampilkan tombol hanya jika teks panjang */}
                                {isContentLong && (
                                    <button
                                        onClick={() => setShowFullContent(!showFullContent)}
                                        className="text-indigo-500 hover:underline"
                                    >
                                        {showFullContent ? 'Tampilkan sedikit' : 'Baca selengkapnya'}
                                    </button>
                                )}

                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handleEditClick(news)}
                                        className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600"
                                    >
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
                        );
                    })}
                    </div>
                </div>
            </div>

            {/* Modal Edit Berita */}
            {isEditing && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                        <h1 className="text-2xl font-bold mb-6 text-center">Edit Berita</h1>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
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
                                <label className="block text-sm font-medium text-gray-700">Upload Gambar (Opsional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
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

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)} // Tutup modal
                                    className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                                    disabled={loading}
                                >
                                    {loading ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>

                        {successMessage && (
                            <div className={`mt-4 p-2 text-center ${successMessage.includes('berhasil') ? 'text-green-500' : 'text-red-500'}`}>
                                {successMessage}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AddNews;
