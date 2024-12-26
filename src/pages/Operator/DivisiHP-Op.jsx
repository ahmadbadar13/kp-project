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
import dummyData from '../../assets/data/dummy-divisi.json';

Modal.setAppElement('#root');

const DivisiHP_Op = () => {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', photo: null });
  const [editingUser, setEditingUser] = useState(
    { id: '', 
      name: '', 
      photo: null,
      tanggal_lahir: '',
      email: '',
      komentar_div_hp: ''});
  const [comments, setComments] = useState({});
  const [activeComments, setActiveComments] = useState(null);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const handleNameClick = (user) => {
    setSelectedUser(user);
  };
  
  const closeModal = () => {
    setSelectedUser(null);
  };

  const handleAddUser = () => setIsAddingUser(true);
  const handleCancelAddUser = () => setIsAddingUser(false);

  const handleSubmitNewUser = async (e) => {
    e.preventDefault();

    const selectedDivision = dummyData.find((div) => div.id === parseInt(newUser.division));
    if (!selectedDivision) {
        Swal.fire(
            'Error!',
            'Pilih divisi yang valid.',
            'error'
        );
        return;
    }

    // Tidak perlu formData untuk file upload, cukup data dari dummyData
    const formData = {
        nama_div_hp: selectedDivision.nama_div,
        foto_div_hp: selectedDivision.foto_div,
        tanggal_lahir: selectedDivision.tanggal_lahir,
        email: selectedDivision.email,
        komentar_div_hp: selectedDivision.komentar_div_hp
    };

    try {
        Swal.fire({
            title: 'Menambahkan...',
            text: 'Harap tunggu sebentar.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await axios.post('http://localhost:5000/api/divisi-hp-op', formData);

        if (response.data.success) {
            Swal.fire(
                'Berhasil!',
                'Data baru telah ditambahkan.',
                'success'
            );

            setNewUser({ division: '' });
            setIsAddingUser(false);
            fetchUsers(); // Reload users after adding
        } else {
            Swal.fire(
                'Error!',
                response.data.message || 'Terjadi kesalahan saat menambahkan data.',
                'error'
            );
        }
    } catch (error) {
        if (error.response) {
            Swal.fire(
                'Error!',
                error.response.data.message || 'Terjadi kesalahan saat menambahkan data.',
                'error'
            );
        } else {
            console.error('Error adding data:', error);
            Swal.fire(
                'Error!',
                'Terjadi kesalahan saat menghubungi server.',
                'error'
            );
        }
    }
};

  const handleEditUser = (user) => {
    setIsEditingUser(true);
    setEditingUser({
      id: user.id,
      name: user.nama_div_hp,
      photo: user.foto_div_hp,
      tanggal_lahir: user.tanggal_lahir,
      email: user.email,
      komentar_div_hp: user.komentar_div_hp
    });
  };
  const handleCancelEditUser = () => setIsEditingUser(false);

  const handleSubmitEditUser = async (e) => {
    e.preventDefault();

    // Siapkan formData untuk mengirim data ke server
    const formData = new FormData();
    formData.append('name', editingUser.name);
    formData.append('tanggal_lahir', editingUser.tanggal_lahir);
    formData.append('email', editingUser.email);
    formData.append('komentar_div_hp', editingUser.komentar_div_hp);

    // Jika photo diubah, tambahkan ke formData
    if (editingUser.photo instanceof File) {
      formData.append('photo', editingUser.photo);
    }

    try {
      Swal.fire({
        title: 'Mengedit...',
        text: 'Harap tunggu sebentar.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Kirim data ke backend
      const response = await axios.put(
        `http://localhost:5000/api/divisi-hp-op/${editingUser.id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data.success) {
        Swal.fire('Berhasil!', 'Data anggota telah diperbarui.', 'success');

        // Memperbarui data di frontend
        fetchUsers(); // Memanggil ulang data dari server
        setIsEditingUser(false); // Menutup popup edit
      } else {
        Swal.fire(
          'Error!',
          response.data.message || 'Gagal memperbarui data anggota.',
          'error'
        );
      }
    } catch (error) {
      console.error('Error editing user:', error);
      Swal.fire(
        'Error!',
        'Terjadi kesalahan saat memperbarui data anggota.',
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
        await axios.delete(`http://localhost:5000/api/divisi-hp-op/anggota/${userId}`);
  
        // Hapus user dari state users langsung
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  
        // Tampilkan animasi berhasil
        Swal.fire(
          'Terhapus!',
          'Anggota telah dihapus.',
          'success'
        );
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


  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/divisi-hp-op');
      if (response.data && response.data.length > 0) {
        setUsers(response.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setUsers([]);
    }
  };  

  const fetchComments = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/komentar-divisi-hp/${userId}`);
        setComments((prevComments) => ({ ...prevComments, [userId]: response.data.komentar }));
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
  };

  const deleteComment = async (userId) => {
      try {
          await axios.delete(`http://localhost:5000/api/komentar-divisi-hp/${userId}`);
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
        title: 'Catatan Kosong',
        text: 'Tidak ada catatan untuk diselesaikan.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    // Jika komentar ada
    Swal.fire({
      title: 'Catatan Telah Diselesaikan',
      text: 'Anda telah menyelesaikan catatan ini.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      deleteComment(commentId);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/divisi-hp-op');
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

  return (
    <div>
      {/* Start: Navbar */}
      <Navbar />
      {/* End: Navbar */}

      <div className="flex flex-col min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Data Pegawai Divisi Hukum dan Pengawasan</h1>

        {/* Start: Popup Tambah Data */}
        {isAddingUser && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full relative">
                    <button
                        onClick={handleCancelAddUser}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ✕
                    </button>
                    <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Tambah Data Divisi</h2>
                    <form onSubmit={handleSubmitNewUser}>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">Pilih Divisi:</label>
                            <select
                                value={newUser.division}
                                onChange={(e) => setNewUser({ ...newUser, division: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Pilih Divisi</option>
                                {dummyData.map((div) => (
                                    <option key={div.id} value={div.id}>
                                        {div.nama_div}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition duration-200"
                        >
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
          <label className="block text-gray-700">Pilih Divisi:</label>
          <select
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
            className="border rounded w-full py-2 px-3"
            required
          >
            <option value="">Pilih Divisi</option>
            {dummyData.map((div) => (
              <option key={div.id} value={div.nama_div}>
                {div.nama_div}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded w-full hover:bg-blue-600"
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
              <h4 className="text-lg font-semibold mb-4 text-center">Catatan</h4>
              {comments[activeComments] ? (
                <p>{comments[activeComments]}</p>
              ) : (
                <p>Tidak ada catatan.</p>
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
        {error ? (
          <p className="text-red-500">Error: {error}</p> // Menambahkan kelas warna merah untuk menandakan error
        ) : (
          <div>
            {/* Button for adding user */}
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleAddUser}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center"
              >
                <FaPlus className="mr-2" /> Tambah Data
              </button>
            </div>

            {/* User Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-gray-200 shadow-md rounded-md p-4 flex flex-col items-center relative"
                >
                  {/* Notification Button */}
                  <button
                    onClick={() => toggleComments(user.id)}
                    className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    <FontAwesomeIcon icon={faBell} />
                  </button>

                  <div className="w-32 h-32 mb-4 overflow-hidden rounded-full flex items-center justify-center">
                    <img
                      src={"http://localhost:5000" + user.foto_div_hp}
                      alt={user.nama_div_hp}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h2
                    className="text-xl font-semibold mb-2 text-center cursor-pointer hover:underline"
                    onClick={() => handleNameClick(user)}
                  >
                    {user.nama_div_hp}
                  </h2>

                  {/* Action Buttons */}
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

              {/* Detail identitas */}
              {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="relative bg-white rounded-md shadow-lg p-6 w-11/12 max-w-lg">
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition-colors"
                      onClick={closeModal}
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
                    <div className="text-center">
                      <img
                        src={`http://localhost:5000${selectedUser.foto_div_hp}`}
                        alt={selectedUser.nama_div_hp}
                        className="w-32 h-32 rounded-full mx-auto mb-4"
                      />
                      <h2 className="text-xl font-semibold mb-2">{selectedUser.nama_div_hp}</h2>
                      <p className="text-lg font-medium">Email: {selectedUser.email}</p>
                      <p className="text-lg font-medium"> Tangal Lahir: {new Date(selectedUser.tanggal_lahir).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
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

export default DivisiHP_Op;
