import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo KPU.png';
import axios from 'axios';

const DivisiHP = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', nip: '', position: '', photo: null });

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleDropdown = (dropdown) => setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  const toggleAdminDropdown = () => setAdminDropdownOpen(!adminDropdownOpen);

  const handleAddUser = () => setIsAddingUser(true);
  const handleCancelAddUser = () => setIsAddingUser(false);

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
      await axios.post('http://localhost:5000/api/users', formData);
      setNewUser({ name: '', nip: '', position: '', photo: null });
      setIsAddingUser(false);
      fetchUsers(); // Reload users after adding
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      fetchUsers(); // Reload users after deleting
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (userId) => {
    // Implement edit user logic
    // You can set state or show another form for editing
  };

  const handleFileChange = (e) => {
    setNewUser({ ...newUser, photo: e.target.files[0] });
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  return (
    <div>
      <nav className="bg-red-700 p-4 sticky top-0 z-50">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto">
          <Link to="/Dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-16" alt="Logo KPU" />
            <span className="self-center text-white text-3xl tracking-tighter font-semibold font-frank whitespace-nowrap">
              Kota Cimahi
            </span>
          </Link>
          <div className="hidden md:flex md:items-center flex-grow justify-center">
            <ul className="font-medium text-lg flex space-x-12">
              {/* Dropdowns and Links */}
            </ul>
          </div>
          <div className="hidden md:flex md:items-center">
            <div className="relative">
              <button onClick={toggleAdminDropdown} className="text-white font-medium text-lg flex items-center">
                Hallo, Admin!
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              {adminDropdownOpen && (
                <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black rounded shadow-lg w-30">
                  <li><Link to="/" className="block px-4 py-2 w-32 hover:bg-gray-200 rounded text-center">Logout</Link></li>
                </ul>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="block text-white focus:outline-none">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16v1H4V6zm0 5h16v1H4v-1zm0 5h16v1H4v-1z"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 z-50">
          <div className="flex flex-col items-center pt-10">
            <Link to="/Dashboard" onClick={closeMenu} className="text-white text-2xl mb-6">≡</Link>
            <ul className="flex flex-col items-center space-y-4">
              {/* Mobile Dropdowns and Links */}
            </ul>
          </div>
        </div>
      )}

      {/* Judul */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Divisi Hukum dan Pengawasan</h1>
        <div className="flex justify-end mb-4">
          <button onClick={handleAddUser} className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600">Tambah Pengguna</button>
        </div>

        {/* Popup Tambah Data */}
        {isAddingUser && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Tambah Pengguna</h2>
              <form onSubmit={handleSubmitNewUser}>
                <div className="mb-4">
                  <label className="block text-gray-700">Nama</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="border rounded w-full py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">NIP</label>
                  <input
                    type="text"
                    value={newUser.nip}
                    onChange={(e) => setNewUser({ ...newUser, nip: e.target.value })}
                    className="border rounded w-full py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Jabatan</label>
                  <select
                    value={newUser.position}
                    onChange={(e) => setNewUser({ ...newUser, position: e.target.value })}
                    className="border rounded w-full py-2 px-3"
                    required
                  >
                    <option value="" disabled>Pilih Jabatan</option>
                    <option value="Ketua">Ketua</option>
                    <option value="Anggota">Anggota</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Foto</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="border rounded w-full py-2 px-3"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={handleCancelAddUser} className="bg-gray-500 text-white px-4 py-2 rounded">Batal</button>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Daftar Pengguna */}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">Nama</th>
              <th className="border-b px-4 py-2">NIP</th>
              <th className="border-b px-4 py-2">Jabatan</th>
              <th className="border-b px-4 py-2">Foto</th>
              <th className="border-b px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border-b px-4 py-2">{user.name}</td>
                <td className="border-b px-4 py-2">{user.nip}</td>
                <td className="border-b px-4 py-2">{user.position}</td>
                <td className="border-b px-4 py-2">
                  {user.photo && <img src={`http://localhost:5000/uploads/${user.photo}`} alt={user.name} className="h-16 w-16 object-cover"/>}
                </td>
                <td className="border-b px-4 py-2">
                  <button onClick={() => handleEditUser(user.id)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white px-2 py-1 rounded ms-2">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DivisiHP;
