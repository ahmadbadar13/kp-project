import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavHome from '../components/NavHome';
import Footer from '../components/FooterHome';

const DashboardHome = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

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
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Berita Utama</h1>

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
    const maxTitleLength = 60;

    // Memformat judul agar tidak melebihi panjang maksimum
    const formattedTitle = article.title.length > maxTitleLength 
        ? article.title.substring(0, maxTitleLength) + '...' 
        : article.title;

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
            <img src={`http://localhost:5000${article.image}`} alt={article.title} className="w-full h-48 object-cover" />
            <div className="p-6 flex-1 flex flex-col">
                {/* Menampilkan judul yang sudah diformat */}
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{formattedTitle}</h2>
                
                {/* Gaya untuk menempatkan tanggal di tengah */}
                <p className="text-sm text-gray-600 mb-4">{formatDate(article.date)}</p>

                <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: article.content.substring(0, 150) + '...' }} />

                {/* Gunakan Link untuk navigasi ke halaman lengkap */}
                <Link
                    to={`/news/${article.id}`}
                    className="mt-auto text-indigo-500 hover:underline self-end"
                >
                    Baca selengkapnya...
                </Link>
            </div>
        </div>
    );
};

export default DashboardHome;
