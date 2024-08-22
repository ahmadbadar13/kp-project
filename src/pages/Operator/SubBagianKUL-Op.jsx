import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo KPU.png';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const SubBagianKUL_Op = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', nip: '', position: '', photo: null });
  const [editingUser, setEditingUser] = useState({ id: '', name: '', nip: '', position: '', photo: null });
  const [comments, setComments] = useState({});
  const [activeComments, setActiveComments] = useState(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleDropdown = (dropdown) => setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  const toggleAdminDropdown = () => setAdminDropdownOpen(!adminDropdownOpen);

  const handleAddUser = () => setIsAddingUser(true);
  const handleCancelAddUser = () => setIsAddingUser(false);
  const handleEditUser = (user) => {
    setIsEditingUser(true);
    setEditingUser({
      id: user.id,
      name: user.nama_sb_kul,
      nip: user.nip_sb_kul,
      position: user.posisi_sb_kul,
      photo: user.foto_sb_kul,
    });
  };
  const handleCancelEditUser = () => setIsEditingUser(false);

  const handleSubmitNewUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newUser.name);
    formData.append('nip', newUser.nip);
    formData.append('position', newUser.position);
    if (newUser.photo) {
      formData.append('photo', newUser.photo);
    }

    try {
      const response = await axios.post('http://localhost:5002/api/sub-bagian-kul-op', formData);
      if (response.data.success) {
        setNewUser({ name: '', nip: '', position: '', photo: null });
        setIsAddingUser(false);
        fetchUsers(); // Reload users after adding
      } else {
        console.error('Error adding user:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleSubmitEditUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', editingUser.name);
    formData.append('nip', editingUser.nip);
    formData.append('position', editingUser.position);
    if (editingUser.photo) {
      formData.append('photo', editingUser.photo);
    }

    try {
      const response = await axios.put(`http://localhost:5002/api/sub-bagian-kul-op/${editingUser.id}`, formData);
      if (response.data.success) {
        setEditingUser({ id: '', name: '', nip: '', position: '', photo: null });
        setIsEditingUser(false);
        fetchUsers();
      } else {
        console.error('Error editing user:', response.data.message);
      }
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5002/api/sub-bagian-kul-op/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
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
      const response = await axios.get('http://localhost:5002/api/sub-bagian-kul-op');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchComments = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:5002/api/komentar-sb-kul/${userId}`);
        setComments((prevComments) => ({ ...prevComments, [userId]: response.data.komentar }));
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
  };

  const deleteComment = async (userId) => {
      try {
          await axios.delete(`http://localhost:5002/api/komentar-sb-kul/${userId}`);
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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {/* Start: Navbar */}
      <nav className="bg-red-700 p-4 sticky top-0 z-50">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto">
          <Link to="/Dashboard-Op" className="flex items-center space-x-3 rtl:space-x-reverse">
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
                      <Link to="/DivisiKURL-Op" className="block py-1 px-4 hover:bg-gray-200 rounded text-sm">Divisi Keuangan, Umum, Rumah Tangga, dan Logistik</Link>
                    </li>
                    <li>
                      <Link to="/DivisiTP-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Teknik Penyelenggaraan</Link>
                    </li>
                    <li>
                      <Link to="/DivisiPDI-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Perencanaan, Data, & Informasi</Link>
                    </li>
                    <li>
                      <Link to="/DivisiHP-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Hukum dan Pengawasan</Link>
                    </li>
                    <li>
                      <Link to="/DivisiSPPP_SDM-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Sosialisasi, Pendidikan Pemilih, Parmas, & SDM</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link to="/Sekretaris-Op" className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0">
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
                      <Link to="/SubBagianTPPPH-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Teknis Penyelenggaraan Pemilu, Partisipasi, & Hupmas</Link>
                    </li>
                    <li>
                      <Link to="/SubBagianPDI-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Perencanaan, Data & Informasi</Link>
                    </li>
                    <li>
                      <Link to="/SubBagianHSDM-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Hukum & SDM</Link>
                    </li>
                    <li>
                      <Link to="/SubBagianKUL-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Keuangan, Umum, & Logistik</Link>
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
                Hallo, Operator!
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
                    <Link to="/" className="block px-4 py-2 hover:bg-gray-200 rounded text-center">
                      Logout
                    </Link>
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
            <Link to="/SubBagianKUL-Op" onClick={closeMenu} className="text-white text-2xl mb-6">≡</Link>
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
                      <Link to="/DivisiKURL-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Divisi Keuangan, Umum, Rumah Tangga, dan Logistik</Link>
                    </li>
                    <li>
                      <Link to="/DivisiTP-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Divisi Teknik Penyelenggaraan</Link>
                    </li>
                    <li>
                      <Link to="/DivisiPDI-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Perencanaan, Data, & Informasi</Link>
                    </li>
                    <li>
                      <Link to="/DivisiHP-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Divisi Hukum dan Pengawasan</Link>
                    </li>
                    <li>
                      <Link to="/DivisiSPPP_SDM-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Divisi Sosialisasi, Pendidikan Pemilih, Parmas, & SDM</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link to="/Sekretaris-Op" className="block py-2 px-3 text-white text-lg" onClick={closeMenu}>
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
                      <Link to="/SubBagianTPPPH-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Sub Bagian Teknis Penyelenggaraan Pemilu, Partisipasi, & Hupmas</Link>
                    </li>
                    <li>
                      <Link to="/SubBagianPDI-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Sub Bagian Perencanaan, Data & Informasi</Link>
                    </li>
                    <li>
                      <Link to="/SubBagianHSDM-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Sub Bagian Hukum & SDM</Link>
                    </li>
                    <li>
                      <Link to="/SubBagianKUL-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Sub Bagian Keuangan, Umum, & Logistik</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  onClick={toggleAdminDropdown}
                  className="text-white text-lg"
                >
                  Hallo, Operator!
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
        <h1 className="text-2xl font-bold mb-6 text-center">Data Pegawai Sub Bagian Keuangan Umum & Logistik</h1>

        {/* Start: Form Tambah Data */}
        {isAddingUser && (
          <form onSubmit={handleSubmitNewUser} className="mb-6">
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
              <label className="block text-gray-700">NIP:</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                value={newUser.nip}
                onChange={(e) => setNewUser({ ...newUser, nip: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Posisi:</label>
              <select
                className="border rounded w-full py-2 px-3"
                value={newUser.position}
                onChange={(e) => setNewUser({ ...newUser, position: e.target.value })}
                required
              >
                <option value="" disabled>Pilih Posisi</option>
                <option value="Ketua">Ketua</option>
                <option value="Anggota">Anggota</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Foto:</label>
              <input type="file" onChange={handleFileChange} />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={handleCancelAddUser} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
            </div>
          </form>
        )}
        {/* End: Form Tambah Data */}

        {/* Start: Form Edit Data */}
        {isEditingUser && (
          <form onSubmit={handleSubmitEditUser} className="mb-6">
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
              <label className="block text-gray-700">NIP:</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                value={editingUser.nip}
                onChange={(e) => setEditingUser({ ...editingUser, nip: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Posisi:</label>
              <select
                className="border rounded w-full py-2 px-3"
                value={editingUser.position}
                onChange={(e) => setEditingUser({ ...editingUser, position: e.target.value })}
                required
              >
                <option value="" disabled>Pilih Posisi</option>
                <option value="Ketua">Ketua</option>
                <option value="Anggota">Anggota</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Foto:</label>
              <input type="file" onChange={handleFileChangeEdit} />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={handleCancelEditUser} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update User</button>
            </div>
          </form>
        )}
        {/* End: Form Edit Data */}

        {/* Start: Card Read Data */}
        {!isAddingUser && !isEditingUser && (
          <div>
            <button
              onClick={handleAddUser}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mb-4"
            >
              Tambah Data
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
                      src={"http://localhost:5002" + user.foto_sb_kul}
                      alt={user.nama_sb_kul}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-center">{user.nama_sb_kul}</h2>
                  <p className="text-gray-600 mb-2 text-center">NIP: {user.nip_sb_kul}</p>
                  <p className="text-gray-600 mb-2 text-center">Posisi: {user.posisi_sb_kul}</p>
                  <div className="flex justify-around w-full mt-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105 w-1/4 flex items-center justify-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105 w-1/4 flex items-center justify-center"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}

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
                    <h4 className="text-lg font-semibold mb-4 text-center">Comments</h4>
                    {comments[activeComments] ? (
                      <p>{comments[activeComments]}</p>
                    ) : (
                      <p>No comments available.</p>
                    )}
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={() => deleteComment(activeComments)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-4"
                      >
                        Selesai
                      </button>
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          </div>
        )}
        {/* End: Card Read Data */}
      </div>
    </div>
  );
};

export default SubBagianKUL_Op;
