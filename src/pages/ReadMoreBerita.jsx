import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavHome from '../components/NavHome';
import Footer from '../components/FooterHome';

const ReadMorePage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    useEffect(() => {
        console.log('Fetching article with ID:', id);
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/news/${id}`);
                console.log('Fetched article:', response.data);
                setArticle(response.data);
            } catch (error) {
                console.error('Error fetching article:', error);
                setError('Terjadi kesalahan saat mengambil berita. Silakan coba lagi.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) {
        return <p className="text-center text-gray-600">Memuat berita...</p>;
    }

    if (error) {
        console.error(error); // Log the error
        return <p className="text-center text-red-600">{error}</p>;
    }

    if (!article || Object.keys(article).length === 0) {
        return <p className="text-center text-gray-600">Berita tidak ditemukan.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <NavHome />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-3">{article.title}</h1>
                <p className="text-sm text-gray-600 text-center mb-4">{formatDate(article.date)}</p>
                <div className="flex justify-center mb-6">
                    <img 
                        src={`http://localhost:5000${article.image}`} 
                        alt={article.title} 
                        className="w-full max-w-2xl h-auto object-cover rounded-lg shadow-md"
                    />
                </div>
                <div className="text-gray-700 text-lg leading-relaxed text-justify" 
                    dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
            <Footer />
        </div>
    );
};

export default ReadMorePage;
