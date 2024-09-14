import React from 'react';
import BackgroundImage from '../assets/bg-KPU.png';

const Jumbotron = () => {
    return (
        <section className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply" style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-5xl">Dashboard Operator</h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Solusi Terbaik untuk Pengelolaan dan Pemantauan Data Pegawai KPU</p>
            </div>
        </section>
    );
};

export default Jumbotron;
