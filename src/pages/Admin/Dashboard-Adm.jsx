import React, { useState, useEffect } from 'react';
import { FaEye, FaCog, FaNewspaper  } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../../components/NavAdmin';
import Jumbotron from '../../components/Jumbotron';
import Footer from '../../components/FooterAllPages';
import Tentang from '../../assets/tentang.png'

const Dashboard_Adm = () => {
  const [struktur, setStruktur] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subBagian, setSubBagian] = useState([]);

  useEffect(() => {
    // Fetch data from API
    axios.get('http://localhost:5000/api/struktur-organisasi')
      .then(response => {
        const data = response.data;
        // Pisahkan data struktur organisasi dengan sub bagian
        const strukturData = data.filter(item => item.peran === 'Ketua' || item.peran === 'Anggota' || item.peran === 'Sekretaris');
        const subBagianData = data.filter(item => item.sub_bagian); // Ambil data yang memiliki sub_bagian

        setStruktur(strukturData);
        setSubBagian(subBagianData); // Set data untuk sub bagian
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

  const printContent = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>KPU Kota Cimahi</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            body {
              background-color: #fff;
              font-family: Arial, sans-serif;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: center;
            }
            th {
              background-color: #f1f1f1;
              font-weight: bold;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .header img {
              max-width: 100px;
              margin-bottom: 10px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 12px;
              color: #555;
            }
            h1, h2, h3 {
              text-align: center;
              margin-bottom: 10px;
            }
            .section {
              margin-bottom: 20px;
            }
            .table-container {
              margin-bottom: 20px;
            }
            img {
              display: block;
              margin: 0 auto;
            }
          </style>
        </head>
        <body class="p-6 bg-white">
          <!-- Header -->
          <div class="header">
            <img src="https://github.com/ahmadbadar13/kp-project/blob/main/src/assets/Logo%20KPU.png?raw=true" alt="Logo KPU Kota Cimahi" />
            <h1 class="text-3xl font-bold">KOMISI PEMILIHAN UMUM</h1>
            <h2 class="text-xl font-semibold">Kota Cimahi</h2>
          </div>
          <br><hr><hr><hr><hr><br>

          <h1 class="text-2xl font-bold mb-6">Struktur Organisasi KPU Kota Cimahi</h1>
  
          <div class="w-full max-w-6xl mx-auto">
            <!-- Ketua -->
            <div class="section">
              <h2 class="text-xl font-semibold">Ketua</h2>
              <table>
                <thead>
                  <tr>
                    <th>Foto</th>
                    <th>Nama</th>
                    <th>Divisi</th>
                  </tr>
                </thead>
                <tbody>
                  ${struktur.length > 0 && struktur[0] ? `
                    <tr>
                      <td><img src="http://localhost:5000${struktur[0].foto}" alt="${struktur[0].nama}" class="w-20 h-20 rounded-full object-cover"/></td>
                      <td>${struktur[0].nama}</td>
                      <td>Divisi Keuangan, Umum, Rumah Tangga, dan Logistik</td>
                    </tr>
                  ` : `
                    <tr><td colspan="3" class="text-center">Data Ketua tidak tersedia</td></tr>
                  `}
                </tbody>
              </table>
            </div>

            <!-- Anggota -->
            <div class="section">
              <h2 class="text-xl font-semibold">Anggota</h2>
              <table>
                <thead>
                  <tr>
                    <th>Foto</th>
                    <th>Nama</th>
                    <th>Divisi</th>
                  </tr>
                </thead>
                <tbody>
                  ${struktur.slice(1, 5).map((item, index) => {
                    const divisiList = ['Divisi Teknis Penyelenggaraan', 'Divisi Perencanaan, Data dan Informasi', 'Divisi Hukum dan Pengawasan', 'Divisi Sosialisasi, Pendidikan Pemilih, Parmas & SDM'];
                    return `
                      <tr>
                        <td><img src="http://localhost:5000${item.foto}" alt="${item.nama}" class="w-20 h-20 rounded-full object-cover"/></td>
                        <td>${item.nama || 'Data tidak tersedia'}</td>
                        <td>${divisiList[index]}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>

            <br>
            <!-- Sekretaris -->
            <div class="section">
              <h2 class="text-xl font-semibold">Sekretaris</h2>
              <table>
                <thead>
                  <tr>
                    <th>Foto</th>
                    <th>Nama</th>
                    <th>Peran</th>
                  </tr>
                </thead>
                <tbody>
                  ${struktur[struktur.length - 1] ? `
                    <tr>
                      <td><img src="http://localhost:5000${struktur[struktur.length - 1].foto}" alt="${struktur[struktur.length - 1].nama}" class="w-20 h-20 rounded-full object-cover"/></td>
                      <td>${struktur[struktur.length - 1].nama || 'Data tidak tersedia'}</td>
                      <td>${struktur[struktur.length - 1].peran || 'Data tidak tersedia'}</td>
                    </tr>
                  ` : `
                    <tr><td colspan="3" class="text-center">Data Sekretaris tidak tersedia</td></tr>
                  `}
                </tbody>
              </table>
            </div>

            <!-- Sub Bagian -->
            <div class="section">
              <h2 class="text-xl font-semibold">Sub Bagian</h2>
              ${['Sub Bagian Hukum dan Pengawasan', 'Sub Bagian Perencanaan, Data & Informasi', 'Sub Bagian Keuangan, Umum & Logistik', 'Sub Bagian Teknis Penyelenggaraan Pemilu, Partisipasi & Hupmas'].map(subBagianName => `
                <div class="table-container">
                  <h3 class="text-lg font-semibold">${subBagianName}</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th>NIP</th>
                        <th>Posisi</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${subBagian.filter(sub => sub.sub_bagian === subBagianName).length > 0 ?
                        subBagian.filter(sub => sub.sub_bagian === subBagianName).map(sub => `
                          <tr>
                            <td>${sub.nama || 'Data tidak tersedia'}</td>
                            <td>${sub.nip || 'Data tidak tersedia'}</td>
                            <td>${sub.posisi || 'Data tidak tersedia'}</td>
                          </tr>
                        `).join('') :
                        `<tr><td colspan="3" class="text-center">Data tidak tersedia</td></tr>`
                      }
                    </tbody>
                  </table>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p>KPU Kota Cimahi © ${new Date().getFullYear()}</p>
          </div>
        </body>
      </html>
    `);
  
    printWindow.document.close();
    printWindow.print();
};

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
      {/* Grid utama untuk 3 card atas */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 m-10 w-full max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
          <div className="w-24 h-24 mb-4">
            <div className="bg-gray-300 w-full h-full rounded-full flex items-center justify-center">
              <FaEye className="w-12 h-12 text-black" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Memantau</h2>
            <p className="text-gray-600 text-justify">
              Admin perlu secara rutin memeriksa dan mengawasi informasi yang tercatat tentang setiap pegawai. Informasi tersebut mencakup berbagai aspek penting, seperti data pribadi serta jabatan. Dengan melakukan pengawasan yang teratur, admin dapat memastikan bahwa semua data pegawai selalu diperbarui dan akurat, sehingga mendukung pengambilan keputusan yang tepat dan efektif.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
          <div className="w-24 h-24 mb-4">
            <div className="bg-gray-300 w-full h-full rounded-full flex items-center justify-center">
              <FaCog className="w-12 h-12 text-black" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Mengelola</h2>
            <p className="text-gray-600 text-justify">
              Admin bertugas untuk memastikan keakuratan data pegawai di KPU Kota Cimahi. Admin akan memeriksa jika terdapat kesalahan input data yang dilakukan oleh Operator, melakukan verifikasi terhadap data yang dimasukkan, serta memastikan bahwa data tersebut selalu diperbarui sesuai dengan perubahan yang terjadi.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
          <div className="w-24 h-24 mb-4">
            <div className="bg-gray-300 w-full h-full rounded-full flex items-center justify-center">
              <FaNewspaper className="w-12 h-12 text-black" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Berita</h2>
            <p className="text-gray-600 text-justify">
              Admin memiliki tugas untuk menambahkan berita terbaru yang berkaitan dengan kegiatan dan informasi di KPU Kota Cimahi. Melalui penambahan berita, admin dapat memberikan informasi kepada pegawai dan masyarakat.
            </p>
          </div>
        </div>
      </div>

      {/* Card Tentang Sistem */}
      <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg mx-auto w-full max-w-6xl md:flex-row md:justify-between mt-10">
        <div className="md:w-2/3">
          <h1 className="text-2xl font-bold mb-4">Tentang Sistem</h1>
          <p className="text-gray-600 text-justify">
          Sistem informasi ini dirancang untuk mencatat dan mengelola data pegawai yang terdaftar di Sistem Informasi Manajemen Kepegawaian (SIMPEG) KPU RI. Tujuan utama dari sistem ini adalah untuk memberikan kemudahan dalam mencatat, menyimpan, dan mengakses data pegawai secara efektif. Data yang tersimpan dalam sistem ini akan digunakan untuk mendukung pencetakan daftar pegawai, yang kemudian diorganisasikan sesuai dengan struktur organisasi yang berlaku. Dengan adanya sistem ini, diharapkan proses pengelolaan data kepegawaian menjadi lebih cepat dan transparan, sehingga memudahkan KPU Kota Cimahi dalam menjalankan tugas administrasi kepegawaian.
          </p>
        </div>
        <div className="mt-6 md:mt-0 md:w-1/3 flex justify-center">
          <img src={Tentang} alt="Tentang" className="bg-gray-200 rounded-full w-56 h-56 border-2 border-black" />
        </div>
      </div>

      {/* Start: Struktur Organisasi */}
      <div className="p-6 bg-white min-h-screen mb-11">
        <h1 className="text-3xl font-bold text-center mb-6">Struktur Organisasi Komisi Pemilihan Umum Kota Cimahi</h1>

        <div className="flex flex-col items-center space-y-12">
          {/* Ketua */}
          {struktur.length > 0 && struktur[0] ? (
            <div className="bg-gradient-to-b from-blue-600 to-blue-300 text-black p-6 rounded-full shadow-md w-48 h-48 md:w-64 md:h-64 flex flex-col items-center justify-center transition-transform transform hover:scale-105">
              <img
                src={`http://localhost:5000${struktur[0].foto}`}
                alt={struktur[0].nama || 'Ketua'}
                className="w-20 h-20 md:w-28 md:h-28 rounded-full mb-4 object-cover border-4 border-gray"
              />
              <h2 className="text-lg md:text-xl font-semibold text-center">{struktur[0].nama || 'Nama Ketua'}</h2>
              <p className="text-center">{struktur[0].peran || 'Peran Ketua'}</p>
            </div>
          ) : (
            <div className="bg-gradient-to-b from-blue-600 to-blue-300 text-black p-6 rounded-full shadow-md w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
              <p>Data Ketua tidak tersedia</p>
            </div>
          )}

          {/* Anggota */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 w-full max-w-6xl">
            {struktur.slice(1, -1).map((item, index) => (
              item && item.foto ? (
                <div key={index} className="bg-gradient-to-b from-green-600 to-green-300 text-black p-6 rounded-full shadow-md w-48 h-48 md:w-64 md:h-64 flex flex-col items-center justify-center transition-transform transform hover:scale-105">
                  <img
                    src={`http://localhost:5000${item.foto}`}
                    alt={item.nama || 'Anggota'}
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full mb-4 object-cover border-4 border-gray"
                  />
                  <h2 className="text-sm md:text-lg font-semibold text-center">{item.nama || 'Nama Anggota'}</h2>
                  <p className="text-center">{item.peran || 'Peran Anggota'}</p>
                </div>
              ) : (
                <div key={index} className="bg-gradient-to-b from-green-600 to-green-300 text-black p-6 rounded-full shadow-md w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                  <p>Data tidak tersedia</p>
                </div>
              )
            ))}
          </div>

          {/* Sekretaris */}
          {struktur[struktur.length - 1] && struktur[struktur.length - 1].foto ? (
            <div className="bg-gradient-to-b from-blue-600 to-blue-300 text-black p-6 rounded-full shadow-md w-48 h-48 md:w-64 md:h-64 flex flex-col items-center justify-center transition-transform transform hover:scale-105">
              <img
                src={`http://localhost:5000${struktur[struktur.length - 1].foto}`}
                alt={struktur[struktur.length - 1].nama || 'Sekretaris'}
                className="w-20 h-20 md:w-28 md:h-28 rounded-full mb-4 object-cover border-4 border-gray"
              />
              <h2 className="text-lg md:text-xl font-semibold text-center">{struktur[struktur.length - 1].nama || 'Nama Sekretaris'}</h2>
              <p className="text-center">{struktur[struktur.length - 1].peran || 'Peran Sekretaris'}</p>
            </div>
          ) : (
            <div className="bg-gradient-to-b from-blue-600 to-blue-300 text-black p-6 rounded-full shadow-md w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
              <p>Data Sekretaris tidak tersedia</p>
            </div>
          )}
        </div>

        {/* Tabel Sub Bagian */}
        <div className="mt-12 w-full max-w-6xl mx-auto">

          {/* Kontainer untuk Tabel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Sub Bagian HSDM */}
            <div>
              <h3 className="text-xl text-center font-semibold mt-4 mb-2">Sub Bagian Hukum & SDM</h3>
              <table className="table-auto w-full bg-white shadow-md rounded-lg mb-8">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">Nama</th>
                    <th className="px-4 py-2">NIP</th>
                    <th className="px-4 py-2">Posisi</th>
                  </tr>
                </thead>
                <tbody>
                  {subBagian.filter(sub => sub.sub_bagian === 'Sub Bagian Hukum dan Pengawasan').length > 0 ? (
                    subBagian.filter(sub => sub.sub_bagian === 'Sub Bagian Hukum dan Pengawasan').map((sub, index) => (
                      <tr key={index} className="text-center">
                        <td className="border px-4 py-2">{sub.nama || 'Nama Sub Bagian'}</td>
                        <td className="border px-4 py-2">{sub.nip || 'NIP Sub Bagian'}</td>
                        <td className="border px-4 py-2">{sub.posisi || 'Posisi Sub Bagian'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="border px-4 py-2 text-center">Data Sub Bagian tidak tersedia</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Sub Bagian PDI */}
            <div>
            <h3 className="text-xl text-center font-semibold mt-4 mb-2">Sub Bagian Perencanaan, Data & Informasi</h3>
              <table className="table-auto w-full bg-white shadow-md rounded-lg mb-8">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">Nama</th>
                    <th className="px-4 py-2">NIP</th>
                    <th className="px-4 py-2">Posisi</th>
                  </tr>
                </thead>
                <tbody>
                  {subBagian.filter(sub => sub.sub_bagian === 'Sub Bagian Perencanaan, Data & Informasi').length > 0 ? (
                    subBagian.filter(sub => sub.sub_bagian === 'Sub Bagian Perencanaan, Data & Informasi').map((sub, index) => (
                      <tr key={index} className="text-center">
                        <td className="border px-4 py-2">{sub.nama || 'Nama Sub Bagian'}</td>
                        <td className="border px-4 py-2">{sub.nip || 'NIP Sub Bagian'}</td>
                        <td className="border px-4 py-2">{sub.posisi || 'Posisi Sub Bagian'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="border px-4 py-2 text-center">Data Sub Bagian tidak tersedia</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Kontainer untuk Tabel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Sub Bagian KUL */}
            <div>
            <h3 className="text-xl text-center font-semibold mt-4 mb-2">Sub Bagian Keuangan, Umum & Logistik</h3>
              <table className="table-auto w-full bg-white shadow-md rounded-lg mb-8">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">Nama</th>
                    <th className="px-4 py-2">NIP</th>
                    <th className="px-4 py-2">Posisi</th>
                  </tr>
                </thead>
                <tbody>
                  {subBagian.filter(sub => sub.sub_bagian === 'Sub Bagian Keuangan, Umum & Logistik').length > 0 ? (
                    subBagian.filter(sub => sub.sub_bagian === 'Sub Bagian Keuangan, Umum & Logistik').map((sub, index) => (
                      <tr key={index} className="text-center">
                        <td className="border px-4 py-2">{sub.nama || 'Nama Sub Bagian'}</td>
                        <td className="border px-4 py-2">{sub.nip || 'NIP Sub Bagian'}</td>
                        <td className="border px-4 py-2">{sub.posisi || 'Posisi Sub Bagian'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="border px-4 py-2 text-center">Data Sub Bagian tidak tersedia</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Sub Bagian TPPPH */}
            <div>
              <h3 className="text-lg text-center font-semibold mt-4 mb-2">Sub Bagian Teknis Penyelenggaraan Pemilu, Partisipasi & Hupmas</h3>
              <table className="table-auto w-full bg-white shadow-md rounded-lg mb-8">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">Nama</th>
                    <th className="px-4 py-2">NIP</th>
                    <th className="px-4 py-2">Posisi</th>
                  </tr>
                </thead>
                <tbody>
                  {subBagian.filter(sub => sub.sub_bagian === 'Sub Bagian Teknis Penyelenggaraan Pemilu, Partisipasi & Hupmas').length > 0 ? (
                    subBagian.filter(sub => sub.sub_bagian === 'Sub Bagian Teknis Penyelenggaraan Pemilu, Partisipasi & Hupmas').map((sub, index) => (
                      <tr key={index} className="text-center">
                        <td className="border px-4 py-2">{sub.nama || 'Nama Sub Bagian'}</td>
                        <td className="border px-4 py-2">{sub.nip || 'NIP Sub Bagian'}</td>
                        <td className="border px-4 py-2">{sub.posisi || 'Posisi Sub Bagian'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="border px-4 py-2 text-center">Data Sub Bagian tidak tersedia</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
        <button
          onClick={printContent}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Cetak Struktur Organisasi
        </button>
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
