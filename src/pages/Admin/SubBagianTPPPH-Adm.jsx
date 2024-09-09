import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo KPU.png';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { HiOutlineLogout } from "react-icons/hi";

// Mengatur elemen root untuk modal
Modal.setAppElement('#root');

const SubBagianTPPPH_Adm = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [comment, setComment] = useState('');

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleDropdown = (dropdown) => setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  const toggleAdminDropdown = () => setAdminDropdownOpen(!adminDropdownOpen);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sub-bagian-tppph-adm');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
    setComment('');
  };

  const handleCommentSubmit = async () => {
    try {
      // Menampilkan notifikasi loading sebelum proses pengiriman
      Swal.fire({
        title: 'Mengirim komentar...',
        text: 'Harap tunggu sebentar.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      await axios.post('http://localhost:5000/api/tambah-komentar-sb-tppph', {
        userId: selectedUserId,
        comment: comment,
      });
  
      // Menampilkan notifikasi berhasil setelah komentar berhasil dikirim
      Swal.fire(
        'Berhasil!',
        'Komentar telah ditambahkan.',
        'success'
      );
  
      // Update UI atau beri feedback kepada pengguna
      closeModal();
    } catch (error) {
      console.error('Error adding comment:', error);
  
      // Menampilkan notifikasi kesalahan jika terjadi error
      Swal.fire(
        'Error!',
        'Terjadi kesalahan saat menambahkan komentar.',
        'error'
      );
    }
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

      {/* Start: Responsive Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 z-50">
          <div className="flex flex-col items-center pt-10">
            <Link to="/SubBagianTPPPH-Adm" onClick={closeMenu} className="text-white text-2xl mb-6">≡</Link>
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
                      <Link to="/DivisiPDI-Adm" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Perencanaan, Data, & Informasi</Link>
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
      {/* End: Responsive Mobile Menu */}

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Data Pegawai Sub Bagian Teknik Penyelenggaraan Pemilu Partisipasi & Hupmas</h1>
        {/* Start: Card Read Data */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {users.map((user) => (
                <div key={user.id} className="bg-gray-200 shadow-md rounded-md p-4 flex flex-col items-center ">
                  <div className="w-32 h-32 mb-4 overflow-hidden rounded-full flex items-center justify-center">
                    <img
                      src={"http://localhost:5000" + user.foto_sb_tppph}
                      alt={user.nama_sb_tppph}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-center">{user.nama_sb_tppph}</h2>
                  <p className="text-gray-600 mb-2 text-center">NIP: {user.nip_sb_tppph}</p>
                  <p className="text-gray-600 mb-2 text-center">Posisi: {user.posisi_sb_tppph}</p>
                  <button
                  onClick={() => openModal(user.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Tambah Komentar
                  </button>
              </div>
              ))}
            </div>
          </div>
      </div>
      {/* End: Card Read Data */}

      {/* Start: Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Komentar Modal"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
        overlayClassName="fixed inset-0"
      >
        <div className="bg-white p-6 rounded-lg w-80">
          <h2 className="text-xl font-bold mb-4">Tambah Komentar</h2>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-32 p-2 border border-gray-300 rounded"
            placeholder="Tulis komentar di sini..."
          ></textarea>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Batal
            </button>
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Kirim
            </button>
          </div>
        </div>
      </Modal>
      {/* End: Modal */}

      {/* Start: Footer */}
      <footer class="bg-red dark:bg-gray-900 mt-10">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div class="sm:flex sm:items-center sm:justify-center"> {/* Ubah sm:justify-between menjadi sm:justify-center */}
                <span class="text-md text-gray-500 text-center dark:text-gray-400"> 
                  © KPU Kota Cimahi {new Date().getFullYear()}. All Rights Reserved.
                </span>
            </div>
        </div>
      </footer>
      {/* End: Footer */}
    </div>
  );
};

export default SubBagianTPPPH_Adm;
