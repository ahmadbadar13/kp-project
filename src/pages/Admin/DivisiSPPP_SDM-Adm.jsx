import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import Navbar from '../../components/NavAdmin';
import Footer from '../../components/FooterAllPages';

// Mengatur elemen root untuk modal
Modal.setAppElement('#root');

const DivisiSPPP_SDM_Adm = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [comment, setComment] = useState('');
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/divisi-sppp_sdm-adm');
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
        title: 'Mengirim catatan...',
        text: 'Harap tunggu sebentar.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      await axios.post('http://localhost:5000/api/tambah-komentar-divisi-sppp_sdm', {
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
      {/* Start: Navbar */}
      <Navbar />
      {/* End: Navbar */}

      <div className="flex flex-col min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Data Pegawai Divisi Sosialisasi, Pendidikan Pemilih, Parmas, & SDM</h1>
        {/* Start: Card Read Data */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {users.map((user) => (
                <div key={user.id} className="bg-gray-200 shadow-md rounded-md p-4 flex flex-col items-center ">
                  <div className="w-32 h-32 mb-4 overflow-hidden rounded-full flex items-center justify-center">
                    <img
                      src={"http://localhost:5000" + user.foto_div_sppp_sdm}
                      alt={user.nama_div_sppp_sdm}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-center">{user.nama_div_sppp_sdm}</h2>
                  <button
                  onClick={() => openModal(user.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Tambah Catatan
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
            placeholder="Tulis catatan di sini..."
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
      <Footer />
      {/* End: Footer */}
    </div>
  );
};

export default DivisiSPPP_SDM_Adm;
