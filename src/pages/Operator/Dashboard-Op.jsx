import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Navbar from '../../components/NavOperator';
import Jumbotron from '../../components/Jumbotron';
import Footer from '../../components/FooterAllPages';

const Dashboard_Op = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set initial state values
    setLoading(false);
    setError(null);
  }, []);
  

  // Inline style for centering and enlarging the spinner
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
    textAlign: 'center',
  };

  // Inline style for a circular error icon with a crossed Wi-Fi symbol
  const errorIconStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: '#f44336', // Red color
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    animation: 'shake 0.5s, fadeIn 1s ease-out',
  };

  // SVG for the crossed Wi-Fi icon
  const wifiIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      width="60px"
      height="60px"
    >
      {/* Wi-Fi Icon */}
      <path d="M12,18c-0.55,0-1,0.45-1,1s0.45,1,1,1s1-0.45,1-1S12.55,18,12,18z M12,12c-2.97,0-5.65,1.16-7.71,3.05L4.59,17.3 C6.32,15.67,9.01,14.5,12,14.5s5.68,1.17,7.41,2.8l0.3-0.25C17.65,13.16,14.97,12,12,12z M12,8c-4.42,0-8,1.75-10.71,4.58 l1.42,1.41C5.11,11.79,8.38,10.5,12,10.5s6.89,1.29,9.29,3.49l1.42-1.41C20,9.75,16.42,8,12,8z M12,4C6.48,4,1.51,6.33,0,9.68 l1.49,1.33C4.15,8.4,7.98,6.5,12,6.5s7.85,1.9,10.51,4.51L24,9.68C22.49,6.33,17.52,4,12,4z" />
      {/* Crossed Line */}
      <line x1="4" y1="4" x2="20" y2="20" stroke="white" strokeWidth="2" />
    </svg>
  );

  // Keyframes for the error icon shake and fade in
  const shakeKeyframes = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-10px); }
      40%, 80% { transform: translateX(10px); }
    }
    
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  `;

  const errorTextStyle = {
    color: 'red',
    fontWeight: 'bold',
    fontSize: '24px',
    animation: 'fadeIn 1s ease-out',
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '6px solid rgba(0,0,0,0.1)', borderLeftColor: '#09f', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ fontSize: '20px' }}>Loading...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <style>{shakeKeyframes}</style>
        <div style={containerStyle}>
          {/* Error icon with Wi-Fi crossed SVG and a shake effect */}
          <div style={errorIconStyle}>
            {wifiIcon}
          </div>
          <p style={errorTextStyle}>Network Error</p>
        </div>
      </>
    );
  }

  return (
    <div>
      {/* Start: Navbar */}
      <Navbar />
      {/* End: Navbar Responsive Mobile menu */}

      {/* Start: Jumbotron */}
      <Jumbotron />
      {/* End: Jumbotron */}

      {/* Start: Konten */}
      <h1 className="text-3xl font-bold mb-8 text-center m-5">Tugas Operator</h1>
      <div className="grid gap-8 grid-cols-1 m-10 md:grid-cols-3 w-full max-w-5xl mx-auto">
        
        {/* Card 1 */}
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg mx-4 w-full max-w-xs md:max-w-sm lg:max-w-md">
          <div className="w-24 h-24 mb-4">
            <div className="bg-gray-300 w-full h-full rounded-full flex items-center justify-center">
              <FaPlus className="w-12 h-12 text-black-900" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Menambahkan Data</h2>
            <p className="text-gray-600 text-justify">Operator bertugas untuk menambahkan data pegawai yang mencakup nama, NIP (Nomor Induk Pegawai), dan jabatan, baik untuk divisi maupun sub bagian. Informasi ini sangat penting dalam pengelolaan sumber daya manusia di organisasi. Dengan mencatat nama dan NIP, setiap pegawai dapat diidentifikasi secara unik, sementara jabatan memberikan gambaran tentang peran dan tanggung jawab mereka di dalam divisi atau sub bagian tertentu. Operator harus memastikan bahwa data yang dimasukkan akurat dan diperbarui secara berkala, agar organisasi dapat berfungsi dengan efisien dan memudahkan proses administrasi.</p>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg mx-4 w-full max-w-xs md:max-w-sm lg:max-w-md">
          <div className="w-24 h-24 mb-4">
            <div className="bg-gray-300 w-full h-full rounded-full flex items-center justify-center">
              <FaEdit className="w-12 h-12 text-black-900" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Mengedit Data</h2>
            <p className="text-gray-600 text-justify">Operator memiliki tugas untuk mengedit data pegawai yang telah terdaftar, termasuk informasi mengenai nama, NIP (Nomor Induk Pegawai), dan jabatan. Tugas ini meliputi pembaruan data yang mungkin berubah, seperti perubahan nama, penggantian jabatan, atau perbaikan NIP yang salah. Proses pengeditan harus dilakukan dengan teliti untuk memastikan bahwa semua informasi yang tercatat tetap akurat dan relevan. Dengan melakukan pengeditan secara rutin, operator membantu menjaga integritas dan keakuratan data pegawai, yang sangat penting untuk pengelolaan sumber daya manusia dan kelancaran operasional organisasi.</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg mx-4 w-full max-w-xs md:max-w-sm lg:max-w-md">
          <div className="w-24 h-24 mb-4">
            <div className="bg-gray-300 w-full h-full rounded-full flex items-center justify-center">
              <FaTrash className="w-12 h-12 text-black-900" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Menghapus Data</h2>
            <p className="text-gray-600 text-justify">Operator bertugas untuk menghapus data pegawai yang tidak lagi relevan atau diperlukan dalam sistem. Proses ini meliputi penghapusan informasi pegawai berdasarkan kriteria tertentu, seperti nama, NIP (Nomor Induk Pegawai), dan jabatan. Dengan melakukan penghapusan data yang sudah tidak aktif atau sudah keluar dari organisasi, operator dapat menjaga kebersihan dan keteraturan database pegawai. Hal ini penting untuk memastikan bahwa informasi yang tersedia adalah data yang akurat dan terkini, sehingga mendukung efisiensi operasional dan pengambilan keputusan yang tepat dalam manajemen sumber daya manusia. Operator harus berhati-hati dalam melakukan proses penghapusan untuk menghindari kehilangan data yang masih diperlukan.</p>
          </div>
        </div>
        
      </div>
      {/* End: Konten */}

      {/* Start: Footer */}
      <Footer />
      {/* End: Footer */}
    </div>
  );
};

export default Dashboard_Op;
