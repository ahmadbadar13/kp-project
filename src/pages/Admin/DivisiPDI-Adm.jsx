import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import Navbar from '../../components/NavAdmin';
import Footer from '../../components/FooterAllPages';

// Mengatur elemen root untuk modal
Modal.setAppElement('#root');

const DivisiPDI_Adm = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleNameClick = (user) => {
    setSelectedUser(user);
  };
  
  const closeModalIdentitas = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/divisi-pdi-adm');
        if (response.data && Array.isArray(response.data)) {
          setUsers(response.data); // Update state dengan data atau array kosong
        } else {
          setUsers([]); // Pastikan state tetap di-set ke array kosong jika respons tidak sesuai
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Gagal mengambil data. Silakan coba lagi.');
      }
    };
  
    fetchData();
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
        title: 'Mengirim Catatan...',
        text: 'Harap tunggu sebentar.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      await axios.post('http://localhost:5000/api/tambah-komentar-divisi-pdi', {
        userId: selectedUserId,
        comment: comment,
      });
  
      // Menampilkan notifikasi berhasil setelah catatan berhasil dikirim
      Swal.fire(
        'Berhasil!',
        'Catatan telah ditambahkan.',
        'success'
      );
  
      // Update UI atau beri feedback kepada pengguna
      closeModal();
    } catch (error) {
      console.error('Error adding comment:', error);
  
      // Menampilkan notifikasi kesalahan jika terjadi error
      Swal.fire(
        'Error!',
        'Terjadi kesalahan saat menambahkan catatan.',
        'error'
      );
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />
  
      <div className="flex flex-col min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Data Pegawai Divisi Perencanaan, Data & Informasi
        </h1>
  
        {/* Card Read Data */}
        {error ? (
          <p className="text-red-500">
            Error: {error || "Terjadi kesalahan. Silakan coba lagi."}
          </p>
        ) : (
          <div>
            {/* Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-gray-200 shadow-md rounded-md p-4 flex flex-col items-center relative"
                >
  
                  {/* Foto Profil */}
                  <div className="w-32 h-32 mb-4 overflow-hidden rounded-full flex items-center justify-center">
                    <img
                      src={`http://localhost:5000${user.foto_div_pdi}`}
                      alt={`Foto ${user.nama_div_pdi}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
  
                  {/* Nama Pegawai */}
                  <h2
                    className="text-xl font-semibold mb-2 text-center cursor-pointer hover:underline"
                    onClick={() => handleNameClick(user)}
                  >
                    {user.nama_div_pdi}
                  </h2>
  
                  {/* Tombol Aksi */}
                  <div className="flex justify-around w-full mt-2">
                    <button
                    onClick={() => openModal(user.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Tambah Catatan
                    </button>
                  </div>
                </div>
              ))}
  
              {/* Detail Identitas */}
              {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="relative bg-white rounded-md shadow-lg p-6 w-11/12 max-w-lg">
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition-colors"
                      onClick={closeModalIdentitas}
                      aria-label="Tutup Modal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <div className="text-center">
                      <img
                        src={`http://localhost:5000${selectedUser.foto_div_pdi}`}
                        alt={`Foto ${selectedUser.nama_div_pdi}`}
                        className="w-32 h-32 rounded-full mx-auto mb-4"
                      />
                      <h2 className="text-xl font-semibold mb-2">
                        {selectedUser.nama_div_pdi}
                      </h2>
                      <p className="text-lg font-medium">
                        Email: {selectedUser.email}
                      </p>
                      <p className="text-lg font-medium">
                        Tanggal Lahir:{" "}
                        {new Date(selectedUser.tanggal_lahir).toLocaleDateString(
                          "id-ID",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-lg font-medium">
                        Masa Jabatan: {selectedUser.masa_jabatan}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* End: card Read Data */}
  
        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Catatan Modal"
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
          overlayClassName="fixed inset-0"
        >
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4">Tambah Catatan</h2>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-32 p-2 border border-gray-300 rounded"
              placeholder="Tulis Catatan di sini..."
              aria-label="Input Catatan"
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
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );  
};

export default DivisiPDI_Adm;
