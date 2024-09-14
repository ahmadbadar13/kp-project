import React, { useState, useEffect } from 'react';
import { FaEye, FaCog } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../../components/NavAdmin';
import Jumbotron from '../../components/JumbotronAdmin';
import Footer from '../../components/FooterDashboard';

const Dashboard_Adm = () => {
  const [struktur, setStruktur] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from API
    axios.get('http://localhost:5000/api/struktur-organisasi')
      .then(response => {
        setStruktur(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message || 'An error occurred');
        setLoading(false);
      });
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
      <h1 className="text-3xl font-bold mb-8 text-center m-5">Tugas Admin</h1>
      <div className="grid gap-8 grid-cols-1 m-10 md:grid-cols-2 w-full max-w-5xl mx-auto">
        
        {/* Card 1 */}
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg mx-4">
          <div className="w-24 h-24 mb-4">
            <div className="bg-gray-300 w-full h-full rounded-full flex items-center justify-center">
              <FaEye className="w-12 h-12 text-black-900" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Memantau</h2>
            <p className="text-gray-600 text-justify">Admin perlu secara rutin memeriksa dan mengawasi informasi yang tercatat tentang setiap pegawai. Informasi tersebut mencakup berbagai aspek penting, seperti data pribadi serta jabatan. Dengan melakukan pengawasan yang teratur, admin dapat memastikan bahwa semua data pegawai selalu diperbarui dan akurat, sehingga mendukung pengambilan keputusan yang tepat dan efektif.</p>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg mx-4">
          <div className="w-24 h-24 mb-4">
            <div className="bg-gray-300 w-full h-full rounded-full flex items-center justify-center">
              <FaCog className="w-12 h-12 text-black-900" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Mengelola</h2>
            <p className="text-gray-600 text-justify">Admin bertugas untuk memastikan keakuratan data pegawai di KPU Kota Cimahi. Admin akan memeriksa jika terdapat kesalahan input data yang dilakukan oleh Operator, melakukan verifikasi terhadap data yang dimasukkan, serta memastikan bahwa data tersebut selalu diperbarui sesuai dengan perubahan yang terjadi. Selain itu, Admin juga bertanggung jawab untuk melaporkan dan mengoreksi kesalahan data serta memberikan komentar kepada Operator untuk mencegah terjadinya kesalahan serupa.</p>
          </div>
        </div>
        
      </div>
      {/* End: Konten */}

      {/* Start: Struktur Organisasi */}
      <div className="p-6 bg-white min-h-screen mb-11">
        <h1 className="text-3xl font-bold text-center mb-6">Profile Anggota KPU Kota Cimahi</h1>
        <div className="flex flex-col items-center space-y-4">
          {/* Ketua */}
          {struktur.length > 0 && struktur[0] ? (
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md w-full md:w-1/4 flex flex-col items-center justify-center">
              <img
                src={`http://localhost:5000${struktur[0].foto}`}
                alt={struktur[0].nama || 'Ketua'}
                className="w-32 h-32 rounded-full mb-2 object-cover"
              />
              <h2 className="text-xl font-semibold text-center">{struktur[0].nama || 'Nama Ketua'}</h2>
              <p className="text-center">{struktur[0].peran || 'Peran Ketua'}</p>
            </div>
          ) : (
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md w-full md:w-1/4 flex items-center justify-center">
              <p>Data Ketua tidak tersedia</p>
            </div>
          )}

          {/* Anggota */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full md:w-3/4">
            {struktur.slice(1).length > 0 ? (
              struktur.slice(1).map((item, index) => (
                item && item.foto ? (
                  <div key={index} className="bg-green-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
                    <img
                      src={`http://localhost:5000${item.foto}`}
                      alt={item.nama || 'Anggota'}
                      className="w-24 h-24 rounded-full mb-2 object-cover"
                    />
                    <h2 className="text-lg font-semibold">{item.nama || 'Nama Anggota'}</h2>
                    <p>{item.peran || 'Peran Anggota'}</p>
                  </div>
                ) : (
                  <div key={index} className="bg-green-500 text-white p-4 rounded-lg shadow-md flex items-center justify-center text-center">
                    <p>Data Anggota tidak tersedia</p>
                  </div>
                )
              ))
            ) : (
              <div className="w-full text-center">
                <p>Data Anggota tidak tersedia</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* End: Struktur Organisasi */}

      {/* Start: Footer */}
      <Footer />
      {/* End: Footer */}
    </div>
  );
};

export default Dashboard_Adm;
