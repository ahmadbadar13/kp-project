import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavHome from '../components/NavHome';
import Footer from '../components/FooterAllPages';
import Modal from 'react-modal';

const DashboardHome = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    

    // Fungsi untuk memformat tanggal ke format "Rabu, 12 Oktober 2021"
    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/news/list');
                setArticles(response.data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <NavHome />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Berita Terbaru</h1>

                {loading ? (
                    <p className="text-center text-gray-600">Loading berita...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.length > 0 ? (
                            articles.map((article, index) => (
                                <ArticleCard key={index} article={article} formatDate={formatDate} />
                            ))
                        ) : (
                            <p className="text-center text-gray-600">Tidak ada berita yang tersedia saat ini.</p>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

const ArticleCard = ({ article, formatDate }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false); // State untuk mengatur apakah modal terbuka atau tidak

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={`http://localhost:5000${article.image}`} alt={article.title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{article.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{formatDate(article.date)}</p>

                {/* Tampilkan ringkasan berita */}
                <p className="text-gray-700 mb-4">
                    {article.content.substring(0, 100)}...
                </p>

                {/* Tombol untuk membuka modal */}
                <button
                    onClick={openModal}
                    className="text-indigo-500 hover:underline"
                >
                    Baca selengkapnya...
                </button>

                {/* Modal untuk menampilkan konten lengkap */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Konten Berita"
                    className="bg-white p-6 rounded-lg shadow-lg mx-auto my-auto w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2" // Ukuran modal diatur
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    ariaHideApp={false} // Agar tidak muncul warning saat development
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{article.title}</h2>
                    <img src={`http://localhost:5000${article.image}`} alt={article.title} className="w-full h-48 object-cover mb-4" /> {/* Tambahkan mb-4 untuk jarak di bawah gambar */}
                    <p className="text-sm text-gray-600 mb-2">{formatDate(article.date)}</p>
                    <p className="text-gray-700 mb-4">{article.content}</p>
                    <button
                        onClick={closeModal}
                        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Tutup
                    </button>
                </Modal>
            </div>
        </div>
    );
};

export default DashboardHome;
