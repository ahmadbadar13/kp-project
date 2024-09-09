import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo KPU.png';
import BackgroundImage from '../../assets/bg-KPU.png';
import { FaEye, FaCog } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { HiOutlineLogout } from "react-icons/hi";

const Dashboard_Adm = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [struktur, setStruktur] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from API
    axios
      .get('http://localhost:5000/api/struktur-organisasi')
      .then((response) => {
        setStruktur(response.data);
        setLoading(false);
      })
      .catch((error) => {
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const toggleAdminDropdown = () => {
    setAdminDropdownOpen(!adminDropdownOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Anda yakin ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Keluar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Berhasil Keluar",
          text: "Anda keluar dari halaman ini",
          icon: "success",
        }).then(() => {
          navigate('/');
        });
      }
    });
  };

  return (
    <div>
      {/* Start: Navbar */}
      <nav className="bg-red-700 p-4 sticky top-0 z-50">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto">
          <Link to="/Dashboard-Adm" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-16" alt="Logo KPU" />
            <span className="self-center text-white text-3xl tracking-tighter font-semibold font-frank whitespace-nowrap">
              Kota Cimahi
            </span>
          </Link>
          <div className="hidden md:flex md:items-center flex-grow justify-center">
            <ul className="font-medium text-lg flex space-x-12">
              <li className="relative">
                <button
                  onClick={() => toggleDropdown('divisi')}
                  className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
                >
                  Divisi
                </button>
                {activeDropdown === 'divisi' && (
                  <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black rounded shadow-lg w-48">
                    <li>
                      <Link to="/DivisiKURL-Adm" className="block py-1 px-4 hover:bg-gray-200 rounded text-sm">Divisi Keuangan, Umum, Rumah Tangga, dan Logistik</Link>
                    </li>
                    <li>
                      <Link to="/DivisiTP-Adm" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Teknis Penyelenggaraan</Link>
                    </li>
                    <li>
                      <Link to="/DivisiPDI-Adm" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Perencanaan, Data, & Informasi</Link>
                    </li>
                    <li>
                      <Link to="/DivisiHP-Adm" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Hukum dan Pengawasan</Link>
                    </li>
                    <li>
                      <Link to="/DivisiSPPP_SDM-Adm" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Sosialisasi, Pendidikan Pemilih, Parmas, & SDM</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link to="/Sekretaris-Adm" className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0">
                  Sekretaris
                </Link>
              </li>
              <li className="relative">
                <button
                  onClick={() => toggleDropdown('subBagian')}
                  className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
                >
                  Sub Bagian
                </button>
                {activeDropdown === 'subBagian' && (
                  <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black rounded shadow-lg w-48">
                    <li>
                      <Link to="/SubBagianTPPPH-Adm" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Teknis Penyelenggaraan Pemilu, Partisipasi, & Hupmas</Link>
                    </li>
                    <li>
                      <Link to="/SubBagianPDI-Adm" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Perencanaan, Data & Informasi</Link>
                    </li>
                    <li>
                      <Link to="/SubBagianHSDM-Adm" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Hukum & SDM</Link>
                    </li>
                    <li>
                      <Link to="/SubBagianKUL-Adm" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Keuangan, Umum, & Logistik</Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
          <div className="hidden md:flex md:items-center">
            <div className="relative">
              <button
                onClick={toggleAdminDropdown}
                className="text-white font-medium text-lg flex items-center focus:outline-none"
              >
                Hallo, Admin!
                <svg
                  className={`w-2.5 h-2.5 ms-2.5 transition-transform duration-300 ${
                    adminDropdownOpen ? 'transform rotate-180' : ''
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {adminDropdownOpen && (
                <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black rounded shadow-lg w-32 z-10">
                  <li>
                    <button 
                      onClick={handleLogout} 
                      className="flex items-center px-4 py-2 hover:bg-gray-200 rounded text-center"
                    >
                      <HiOutlineLogout size={20} className="mr-2 text-gray-800" /> 
                      <span className="text-left">Logout</span> 
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="block text-white focus:outline-none">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v1H4V6zm0 5h16v1H4v-1zm0 5h16v1H4v-1z"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {/* End: Navbar */}

      {/* Start: Navbar Responsive Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 z-50">
          <div className="flex flex-col items-center pt-10">
            <Link to="/Dashboard-Op" onClick={closeMenu} className="text-white text-2xl mb-6">≡</Link>
            <ul className="flex flex-col items-center space-y-4">
              <li>
                <button
                  onClick={() => toggleDropdown('divisi')}
                  className="text-white text-lg"
                >
                  Divisi
                </button>
                {activeDropdown === 'divisi' && (
                  <ul className="bg-white text-black rounded shadow-lg mt-2 w-48">
                    <li>
                      <Link to="/DivisiKURL-Adm" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Divisi Keuangan, Umum, Rumah Tangga, dan Logistik</Link>
                    </li>
                    <li>
                      <Link to="/DivisiTP-Adm" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Divisi Teknis Penyelenggaraan</Link>
                    </li>
                    <li>
                      <Link to="/DivisiPDI-Adm" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Divisi Perencanaan, Data, & Informasi</Link>
                    </li>
                    <li>
                      <Link to="/DivisiHP-Adm" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Divisi Hukum dan Pengawasan</Link>
                    </li>
                    <li>
                      <Link to="/DivisiSPPP_SDM-Adm" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Divisi Sosialisasi, Pendidikan Pemilih, Parmas, & SDM</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link to="/Sekretaris-Adm" className="block py-2 px-3 text-white text-lg" onClick={closeMenu}>
                  Sekretaris
                </Link>
              </li>
              <li>
                <button
                  onClick={() => toggleDropdown('subBagian')}
                  className="text-white text-lg"
                >
                  Sub Bagian
                </button>
                {activeDropdown === 'subBagian' && (
                  <ul className="bg-white text-black rounded shadow-lg mt-2 w-48">
                    <li>
                      <Link to="/SubBagianTPPPH-Adm" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Sub Bagian Teknis Penyelenggaraan Pemilu, Partisipasi, & Hupmas</Link>
                    </li>
                    <li>
                      <Link to="/SubBagianPDI-Adm" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Sub Bagian Perencanaan, Data & Informasi</Link>
                    </li>
                    <li>
                      <Link to="/SubBagianHSDM-Adm" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Sub Bagian Hukum & SDM</Link>
                    </li>
                    <li>
                      <Link to="/SubBagianKUL-Adm" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Sub Bagian Keuangan, Umum, & Logistik</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  onClick={toggleAdminDropdown}
                  className="text-white text-lg"
                >
                  Hallo, Admin!
                </button>
                {adminDropdownOpen && (
                  <ul className="bg-white text-black rounded shadow-lg mt-2 w-30">
                    <li>
                      <Link to="/" className="block px-4 py-2 hover:bg-gray-200 rounded text-center" onClick={closeMenu}>Logout</Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
      {/* End: Navbar Responsive Mobile menu */}

      {/* Start: Jumbotron */}
      <section className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply" style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-5xl">Dashboard Admin</h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Solusi Terbaik untuk Pengelolaan dan Pemantauan Data Pegawai KPU</p>
        </div>
      </section>
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
      <footer class="bg-red dark:bg-gray-900">
          <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
              <div class="md:flex md:justify-between">
                <div class="mb-6 md:mb-0 ml-3">
                  <Link to="/Dashboard-Adm" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={Logo} className="h-16" alt="Logo KPU" />
                    <span className="self-center text-white text-3xl tracking-tighter font-semibold font-frank whitespace-nowrap">
                      Kota Cimahi
                    </span>
                  </Link>
                </div>
                <div class="flex ml-auto space-x-9 mr-3">
                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Website</h2>
                        <ul class="text-gray-500 dark:text-gray-400 font-medium">
                            <li class="mb-4">
                                <a href="https://www.kpu.go.id/" class="hover:underline">KPU RI</a>
                            </li>
                            <li class="mb-4">
                                <a href="https://jdih.kpu.go.id/jabar/cimahi/" class="hover:underline">JDIH KPU Kota Cimahi</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">HOTLINE</h2>
                        <ul class="text-gray-500 dark:text-gray-400 font-medium">
                            <li class="mb-4">
                                <a href="https://wa.me/6281513579961" class="hover:underline ">Admin</a>
                            </li>
                            <li>
                                <a href="https://wa.me/6285951709433" class="hover:underline">Operator</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div class="sm:flex sm:items-center sm:justify-between">
              <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© KPU Kota Cimahi {new Date().getFullYear()}. All Rights Reserved.
              </span>
              <div class="flex mt-4 sm:justify-center sm:mt-0">
                <a href="https://www.facebook.com/kpukota.cimahi/" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.676 0H1.324C.592 0 0 .592 0 1.324v21.351C0 23.408.592 24 1.324 24H12.82v-9.294H9.692v-3.618h3.127V8.041c0-3.1 1.895-4.788 4.663-4.788 1.325 0 2.463.099 2.794.142v3.24l-1.917.001c-1.502 0-1.792.713-1.792 1.76v2.309h3.587l-.467 3.617h-3.12V24h6.113c.732 0 1.324-.592 1.324-1.324V1.324C24 .592 23.408 0 22.676 0z"/>
                  </svg>
                  <span class="sr-only">Facebook page</span>
                </a>

                <a href="https://www.instagram.com/kpu_kota_cimahi/" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.206.056 1.973.24 2.432.405a4.926 4.926 0 011.777 1.152 4.92 4.92 0 011.152 1.777c.165.459.349 1.226.405 2.432.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.206-.24 1.973-.405 2.432a4.92 4.92 0 01-1.152 1.777 4.926 4.926 0 01-1.777 1.152c-.459.165-1.226.349-2.432.405-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.206-.056-1.973-.24-2.432-.405a4.926 4.926 0 01-1.777-1.152 4.92 4.92 0 01-1.152-1.777c-.165-.459-.349-1.226-.405-2.432-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.056-1.206.24-1.973.405-2.432a4.92 4.92 0 011.152-1.777 4.926 4.926 0 011.777-1.152c.459-.165 1.226-.349 2.432-.405 1.266-.058 1.646-.07 4.85-.07m0-2.163C8.741 0 8.332.013 7.052.07 5.771.128 4.723.329 3.85.671 3.012.999 2.317 1.52 1.737 2.1c-.58.58-1.101 1.275-1.429 2.113-.342.873-.543 1.921-.601 3.202C.013 8.332 0 8.741 0 12s.013 3.668.07 4.948c.058 1.281.259 2.329.601 3.202.328.838.849 1.533 1.429 2.113.58.58 1.275 1.101 2.113 1.429.873.342 1.921.543 3.202.601C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.07c1.281-.058 2.329-.259 3.202-.601.838-.328 1.533-.849 2.113-1.429.58-.58 1.101-1.275 1.429-2.113.342-.873.543-1.921.601-3.202.058-1.281.07-1.691.07-4.948s-.013-3.668-.07-4.948c-.058-1.281-.259-2.329-.601-3.202-.328-.838-.849-1.533-1.429-2.113-.58-.58-1.275-1.101-2.113-1.429-.873-.342-1.921-.543-3.202-.601C15.668.013 15.259 0 12 0z"/>
                    <path d="M12 5.838A6.162 6.162 0 105.838 12 6.173 6.173 0 0012 5.838M12 4a8 8 0 11-8 8 8.009 8.009 0 018-8z"/>
                    <circle cx="18.406" cy="5.594" r="1.44"/>
                  </svg>
                  <span class="sr-only">Instagram</span>
                </a>

                <a href="https://x.com/kpu_kotacimahi" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.954 4.569c-.885.39-1.83.654-2.825.775a4.932 4.932 0 002.163-2.724 9.864 9.864 0 01-3.127 1.197 4.918 4.918 0 00-8.379 4.482 13.944 13.944 0 01-10.125-5.134 4.822 4.822 0 00-.666 2.475 4.92 4.92 0 002.188 4.099 4.904 4.904 0 01-2.229-.616v.061a4.935 4.935 0 003.946 4.827 4.996 4.996 0 01-2.224.084 4.937 4.937 0 004.604 3.419A9.869 9.869 0 010 21.54 13.91 13.91 0 007.548 24c9.142 0 14.307-7.721 13.995-14.646a10.025 10.025 0 002.458-2.725 9.995 9.995 0 01-2.847.775 4.919 4.919 0 002.163-2.725z"/>
                  </svg>
                  <span class="sr-only">Twitter page</span>
                </a>

                <a href="https://www.youtube.com/@kpukotacimahi50" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a2.994 2.994 0 00-2.11-2.11C19.255 3.5 12 3.5 12 3.5s-7.255 0-9.388.576a2.994 2.994 0 00-2.11 2.11A31.397 31.397 0 000 12a31.397 31.397 0 00.502 5.814 2.994 2.994 0 002.11 2.11C4.745 20.5 12 20.5 12 20.5s7.255 0 9.388-.576a2.994 2.994 0 002.11-2.11A31.397 31.397 0 0024 12a31.397 31.397 0 00-.502-5.814zM9.75 15.083V8.917l6.167 3.083-6.167 3.083z"/>
                  </svg>
                  <span class="sr-only">YouTube channel</span>
                </a>
              </div>
            </div>
          </div>
      </footer>
      {/* End: Footer */}
    </div>
  );
};

export default Dashboard_Adm;
