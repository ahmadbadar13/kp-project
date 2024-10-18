import React from 'react';
import NavHome from '../components/NavHome';
import Footer from '../components/FooterAllPages';
import { Bar } from 'react-chartjs-2'; // Contoh menggunakan chartjs
import 'chart.js/auto'; // Pastikan untuk mengimpor auto dari chart.js

const cardData = [
    { title: 'Grafik 1', data: [12, 19, 3, 5, 2, 3] },
    { title: 'Grafik 2', data: [2, 3, 20, 5, 1, 4] },
    { title: 'Grafik 3', data: [3, 10, 13, 15, 22, 30] },
    { title: 'Grafik 4', data: [4, 1, 5, 2, 3, 9] },
    { title: 'Grafik 5', data: [5, 10, 15, 20, 25, 30] },
    { title: 'Grafik 6', data: [1, 2, 3, 4, 5, 6] },
    { title: 'Grafik 7', data: [2, 4, 6, 8, 10, 12] },
    { title: 'Grafik 8', data: [1, 1, 2, 3, 5, 8] },
    { title: 'Grafik 9', data: [3, 6, 9, 12, 15, 18] },
    { title: 'Grafik 10', data: [2, 3, 4, 5, 6, 7] },
    { title: 'Grafik 11', data: [1, 4, 9, 16, 25, 36] },
    { title: 'Grafik 12', data: [1, 2, 1, 2, 1, 2] },
];

const Card = ({ title, data }) => {
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: title,
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <Bar data={chartData} />
        </div>
    );
};

const DashboardHome = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <NavHome />
            <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <h1 className="text-2xl font-semibold mb-6 text-center col-span-4">Selamat Datang!</h1>
                {cardData.map((card, index) => (
                    <Card key={index} title={card.title} data={card.data} />
                ))}
            </div>
            {/* Start: Footer */}
            <Footer />
            {/* End: Footer */}
        </div>
    );
};

export default DashboardHome;
