import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../../components/NavOperator';
import Jumbotron from '../../components/JumbotronOperator';
import Footer from '../../components/FooterDashboard';

const Dashboard_Op = () => {
  const [struktur, setStruktur] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [periodeData, setPeriodeData] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  const handleOpenModal = async () => {
    setModalLoading(true);
    setError('');

    try {
        const response = await axios.get('http://localhost:5000/api/periode-divisi');
        console.log(response.data); // Cek data yang diterima
        setPeriodeData(response.data);
    } catch (err) {
        setError('Gagal mengambil data.');
    } finally {
        setModalLoading(false);
    }

    setIsModalOpen(true);
};

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

      {/* Start: Struktur Organisasi */}
      <div className="p-6 bg-white min-h-screen mb-11">
        <h1 className="text-3xl font-bold text-center mb-6">Profile Anggota KPU Kota Cimahi</h1>
        <div className="flex flex-col items-center space-y-4">
          {/* Ketua */}
          {struktur.length > 0 && struktur[0] ? (
            <div className="bg-gradient-to-b from-blue-600 to-blue-400 text-white p-4 rounded-full shadow-lg w-full md:w-1/4 flex flex-col items-center justify-center transform transition-transform hover:scale-105">
              <p className="mb-2 text-center">Divisi Keuangan, Umum, Rumah Tangga, dan Logistik</p>
              <img
                src={`http://localhost:5000${struktur[0].foto}`}
                alt={struktur[0].nama || 'Ketua'}
                className="w-32 h-32 rounded-full mb-2 object-cover"
              />
              <h2 className="text-xl font-semibold text-center overflow-hidden">{struktur[0].nama || 'Nama Ketua'}</h2>
              <p className="text-center overflow-hidden">{struktur[0].peran || 'Peran Ketua'}</p>
            </div>
          ) : (
            <div className="bg-gradient-to-b from-blue-600 to-blue-400 text-white p-4 rounded-full shadow-lg w-full md:w-1/4 flex items-center justify-center transform transition-transform hover:scale-105">
              <p>Data Ketua tidak tersedia</p>
            </div>
          )}

          {/* Anggota */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full md:w-3/4">
            {struktur.slice(1).length > 0 ? (
              struktur.slice(1).map((item, index) => {
                return item && item.foto ? (
                  <div
                    key={index}
                    className="bg-gradient-to-b from-green-600 to-green-400 text-white p-4 rounded-full shadow-lg flex flex-col items-center justify-center text-center transform transition-transform hover:scale-105"
                  >
                    <p className="mb-2 text-center">{`Divisi Anggota ${index + 1}`}</p>
                    <img
                      src={`http://localhost:5000${item.foto}`}
                      alt={item.nama || 'Anggota'}
                      className="w-24 h-24 rounded-full mb-2 object-cover"
                    />
                    <h2 className="text-lg font-semibold text-center overflow-hidden">{item.nama || 'Nama Anggota'}</h2>
                    <p className="overflow-hidden">{item.peran || 'Peran Anggota'}</p>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="bg-gradient-to-b from-green-600 to-green-400 text-white p-4 rounded-full shadow-lg flex items-center justify-center text-center transform transition-transform hover:scale-105"
                  >
                    <p>Data Anggota tidak tersedia</p>
                  </div>
                );
              })
            ) : (
              <div className="w-full text-center">
                <p>Data Anggota tidak tersedia</p>
              </div>
            )}
          </div>
        </div>

        {/* Button Riwayat Divisi */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
            onClick={handleOpenModal}
          >
            Riwayat Divisi
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
              <h2 className="text-xl font-bold mb-4">Riwayat Divisi</h2>
              {modalLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <ul className="space-y-2">
                  {periodeData.length > 0 ? (
                    periodeData.map((periode, index) => (
                      <li key={index} className="border-b pb-2">
                        <p>{periode.nama_div_hp || 'Nama Divisi tidak tersedia'}</p>
                        <p>{`Periode: ${periode.periode_awal || 'Tidak tersedia'} - ${periode.periode_akhir || 'Tidak tersedia'}`}</p>
                      </li>
                    ))
                  ) : (
                    <p>Tidak ada data periode yang tersedia.</p>
                  )}
                </ul>
              )}
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-600 transition duration-300"
                  onClick={handleCloseModal}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* End: Struktur Organisasi */}

      {/* Start: Footer */}
      <Footer />
      {/* End: Footer */}
    </div>
  );
};

export default Dashboard_Op;
