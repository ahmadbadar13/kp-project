import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { FaPlus } from 'react-icons/fa';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import Navbar from '../../components/NavOperator';
import Footer from '../../components/FooterAllPages';

Modal.setAppElement('#root');

const DivisiSPPP_SDM_Op = () => {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', photo: null });
  const [editingUser, setEditingUser] = useState({ id: '', name: '', photo: null });
  const [comments, setComments] = useState({});
  const [activeComments, setActiveComments] = useState(null);

  const handleAddUser = () => setIsAddingUser(true);
  const handleCancelAddUser = () => setIsAddingUser(false);

  const handleEditUser = (user) => {
    setIsEditingUser(true);
    setEditingUser({
      id: user.id,
      name: user.nama_div_sppp_sdm,
      photo: user.foto_div_sppp_sdm,
    });
  };
  const handleCancelEditUser = () => setIsEditingUser(false);

  const handleSubmitNewUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newUser.name);
    if (newUser.photo) {
      formData.append('photo', newUser.photo);
    }
  
    try {
      // Menampilkan notifikasi loading sebelum proses penambahan
      Swal.fire({
        title: 'Menambahkan...',
        text: 'Harap tunggu sebentar.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      const response = await axios.post('http://localhost:5000/api/divisi-sppp_sdm-op', formData);
  
      if (response.data.success) {
        // Tampilkan notifikasi berhasil
        Swal.fire(
          'Berhasil!',
          'Anggota baru telah ditambahkan.',
          'success'
        );
  
        setNewUser({ name: '', photo: null });
        setIsAddingUser(false);
        fetchUsers(); // Reload users after adding
      } else {
        // Tampilkan notifikasi kesalahan
        Swal.fire(
          'Error!',
          response.data.message || 'Terjadi kesalahan saat menambahkan anggota.',
          'error'
        );
      }
    } catch (error) {
      console.error('Error adding user:', error);
  
      // Tampilkan notifikasi kesalahan jika terjadi error
      Swal.fire(
        'Error!',
        'Terjadi kesalahan saat menambahkan anggota.',
        'error'
      );
    }
  };

  const handleSubmitEditUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', editingUser.name);
    if (editingUser.photo) {
      formData.append('photo', editingUser.photo);
    }
  
    try {
      // Menampilkan notifikasi loading sebelum proses edit
      Swal.fire({
        title: 'Mengedit...',
        text: 'Harap tunggu sebentar.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      const response = await axios.put(`http://localhost:5000/api/divisi-sppp_sdm-op/${editingUser.id}`, formData);
  
      if (response.data.success) {
        // Tampilkan notifikasi berhasil
        Swal.fire(
          'Berhasil!',
          'Anggota telah diperbarui.',
          'success'
        );
  
        setEditingUser({ id: '', name: '', photo: null });
        setIsEditingUser(false);
        fetchUsers();
      } else {
        // Tampilkan notifikasi kesalahan
        Swal.fire(
          'Error!',
          response.data.message || 'Terjadi kesalahan saat mengedit anggota.',
          'error'
        );
      }
    } catch (error) {
      console.error('Error editing user:', error);
  
      // Tampilkan notifikasi kesalahan jika terjadi error
      Swal.fire(
        'Error!',
        'Terjadi kesalahan saat mengedit anggota.',
        'error'
      );
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const result = await Swal.fire({
        title: 'Apakah anda yakin?',
        text: 'Anggota yang dihapus tidak dapat dikembalikan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5cb85c',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
      });
  
      if (result.isConfirmed) {
        // Jika anggota mengonfirmasi penghapusan
        await axios.delete(`http://localhost:5000/api/divisi-sppp_sdm-op/${userId}`);
  
        // Tampilkan animasi berhasil
        Swal.fire(
          'Terhapus!',
          'Anggota telah dihapus.',
          'success'
        );
  
        // Refresh data setelah berhasil dihapus
        fetchUsers();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Jika anggota membatalkan penghapusan
        Swal.fire({
          title: 'Dibatalkan',
          text: 'Penghapusan anggota dibatalkan.',
          icon: 'info',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
  
      // Tampilkan animasi kesalahan
      Swal.fire(
        'Error!',
        'Terjadi kesalahan saat menghapus anggota.',
        'error'
      );
    }
  };

  const handleFileChange = (e) => {
    setNewUser({ ...newUser, photo: e.target.files[0] });
  };

  const handleFileChangeEdit = (e) => {
    setEditingUser({ ...editingUser, photo: e.target.files[0] });
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/divisi-sppp_sdm-op');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchComments = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/komentar-divisi-sppp_sdm/${userId}`);
        setComments((prevComments) => ({ ...prevComments, [userId]: response.data.komentar }));
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
  };

  const deleteComment = async (userId) => {
      try {
          await axios.delete(`http://localhost:5000/api/komentar-divisi-sppp_sdm/${userId}`);
          setComments((prevComments) => ({ ...prevComments, [userId]: null }));
          setActiveComments(null);
      } catch (error) {
          console.error('Error deleting comment:', error);
      }
  };

  const toggleComments = (userId) => {
      if (activeComments === userId) {
          setActiveComments(null);
      } else {
          setActiveComments(userId);
          fetchComments(userId);
      }
  };

  const handleCommentCompletion = (commentId) => {
    // Cek apakah komentar ada
    if (!comments[commentId]) {
      // Jika komentar kosong
      Swal.fire({
        title: 'Komentar Kosong',
        text: 'Tidak ada komentar untuk diselesaikan.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    // Jika komentar ada
    Swal.fire({
      title: 'Komentar Telah Diselesaikan',
      text: 'Anda telah menyelesaikan komentar ini.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      deleteComment(commentId);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {/* Start: Navbar */}
      <Navbar />
      {/* End: Navbar */}

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Data Pegawai Divisi Sosialisasi Pemilu, Pendidikan Pemilih, Parmas, & SDM </h1>

        {/* Start: Popup Tambah Data */}
        {isAddingUser && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full relative">
              <button
                onClick={handleCancelAddUser}
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <h2 className="text-xl font-semibold mb-4 text-center">Tambah Data Pegawai</h2>
              <form onSubmit={handleSubmitNewUser}>
                <div className="mb-4">
                  <label className="block text-gray-700">Nama:</label>
                  <input
                    type="text"
                    className="border rounded w-full py-2 px-3"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Foto:</label>
                  <input type="file" onChange={handleFileChange} />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 rounded w-full">
                  Tambah
                </button>
              </form>
            </div>
          </div>
        )}
        {/* End: Popup Tambah Data */}

        {/* Start: Popup Edit Data */}
        {isEditingUser && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full relative">
              <button
                onClick={handleCancelEditUser}
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <h2 className="text-xl font-semibold mb-4 text-center">Edit Data Pegawai</h2>
              <form onSubmit={handleSubmitEditUser}>
                <div className="mb-4">
                  <label className="block text-gray-700">Nama:</label>
                  <input
                    type="text"
                    className="border rounded w-full py-2 px-3"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Foto:</label>
                  <input type="file" onChange={handleFileChangeEdit} />
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded w-full"
                  >
                    Edit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* End: Popup Edit Data */}

        {/* Start: Popup Komen */}
        {activeComments && (
          <Modal
            isOpen={!!activeComments}
            onRequestClose={() => setActiveComments(null)}
            contentLabel="Comments"
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          >
            <div className="bg-white rounded-lg p-6 w-96 relative">
              <button
                onClick={() => setActiveComments(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h4 className="text-lg font-semibold mb-4 text-center">Komentar</h4>
              {comments[activeComments] ? (
                <p>{comments[activeComments]}</p>
              ) : (
                <p>Tidak ada komentar.</p>
              )}
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => handleCommentCompletion(activeComments)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  Selesai
                </button>
              </div>
            </div>
          </Modal>
        )}
        {/* End: Popup Komen */}

        {/* Start: Card Read Data */}
        {!isAddingUser && !isEditingUser && (
          <div>
            <button
              onClick={handleAddUser}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mb-4 flex items-center"
            >
              <FaPlus className="mr-2" /> Tambah Data
            </button>
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {users.map((user) => (
                <div key={user.id} className="bg-gray-200 shadow-md rounded-md p-4 flex flex-col items-center relative">
                  <button
                    onClick={() => toggleComments(user.id)}
                    className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    <FontAwesomeIcon icon={faBell} />
                  </button>
                  <div className="w-32 h-32 mb-4 overflow-hidden rounded-full flex items-center justify-center">
                    <img
                      src={"http://localhost:5000" + user.foto_div_sppp_sdm}
                      alt={user.nama_div_sppp_sdm}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-center">{user.nama_div_sppp_sdm}</h2>
                  <div className="flex justify-around w-full mt-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105 w-1/4 flex items-center justify-center gap-2"
                    >
                      <AiFillEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105 w-1/4 flex items-center justify-center gap-2"
                    >
                      <AiFillDelete size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* End: Card Read Data */}
      </div>
      {/* Start: Footer */}
      <Footer />
      {/* End: Footer */}
    </div>
  );
};

export default DivisiSPPP_SDM_Op;
