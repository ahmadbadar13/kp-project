import React, { useState, useEffect } from 'react';
import Logo from '../../assets/Logo KPU.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../../components/NavAdmin';
import Footer from '../../components/FooterAllPages';

const AccountManagement = () => {
    const [accounts, setAccounts] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [editingAccount, setEditingAccount] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Fetch accounts from API on mount
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                setAccounts(response.data || []);
                console.log('Fetched Accounts:', response.data);
            } catch (error) {
                console.error('Error fetching accounts:', error);
                setError('Terjadi kesalahan saat mengambil data akun');
            }
        };
        fetchAccounts();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password || !confirmPassword || !role) {
            setError('Semua field harus diisi');
            return;
        }

        if (password !== confirmPassword) {
            setError('Password harus sama');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/register/newaccount', { email, role, password });
            console.log('Server Response:', response.data);

            if (response.data?.success) {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Registrasi berhasil!',
                    showConfirmButton: false,
                    timer: 1500
                });
                setAccounts(prevAccounts => [...prevAccounts, response.data.newAccount ?? {}]);
                clearForm();
            } else {
                setError('Registrasi gagal: ' + (response.data?.message || 'Terjadi kesalahan'));
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('Terjadi kesalahan saat registrasi');
        }
    };

    const handleEdit = (account) => {
        if (account) {
            setEditingAccount(account);
            setEmail(account.email || '');
            setRole(account.role || '');
            setPassword('');
            setConfirmPassword('');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !role) {
            setError('Email dan Role harus diisi');
            return;
        }

        if (password && password !== confirmPassword) {
            setError('Password dan konfirmasi password harus sama');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/users/update/${editingAccount?.id}`, {
                email,
                role,
                password: password || editingAccount?.password, 
            });

            if (response.data?.success) {
                setAccounts(prevAccounts => 
                    prevAccounts.map(acc => acc.id === editingAccount?.id ? response.data.updatedAccount : acc)
                );
                setEditingAccount(null);
                clearForm();
                await Swal.fire('Berhasil!', 'Akun telah diperbarui!', 'success');
            } else {
                setError(`Gagal memperbarui akun: ${response.data?.message || 'Terjadi kesalahan'}`);
            }
        } catch (error) {
            console.error('Error updating account:', error);
            setError('Terjadi kesalahan saat memperbarui akun');
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
            title: 'Anda yakin?',
            text: "Akun ini akan dihapus!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        });

        if (confirmDelete.isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:5000/users/delete/${id}`);
                
                if (response.data?.success) {
                    // Hapus akun dari frontend
                    setAccounts(prevAccounts => prevAccounts.filter(acc => acc.id !== id));
                    await Swal.fire({
                        title: 'Dihapus!',
                        text: 'Akun telah berhasil dihapus.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                    });
                } else {
                    // Jika respons sukses tetapi tidak mengandung 'success' true, beri tahu kegagalan
                    await Swal.fire({
                        title: 'Gagal!',
                        text: response.data?.message || 'Terjadi kesalahan saat menghapus akun.',
                        icon: 'error',
                        confirmButtonText: 'Tutup'
                    });
                }
            } catch (error) {
                console.error('Error deleting account:', error);
                await Swal.fire({
                    title: 'Error',
                    text: 'Terjadi kesalahan saat menghapus akun',
                    icon: 'error',
                    confirmButtonText: 'Tutup'
                });
                setError('Terjadi kesalahan saat menghapus akun');
            }
        }
    };

    const clearForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('');
        setEditingAccount(null);
        setError('');
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Navbar */}
            <Navbar />

            <div className="w-full max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
                <div className="flex justify-center mb-20 mt-8">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-28 h-28 bg-gradient-to-r from-red-500 to-white rounded-full flex items-center justify-center -top-10">
                            <img src={Logo} alt="Logo KPU" className="w-20 h-20" />
                        </div>
                    </div>
                </div>
                <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Manajemen Akun</h2>

                {/* Form Registrasi */}
                <form onSubmit={editingAccount ? handleUpdate : handleRegister} className="mb-6">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            >
                                <option value="">Pilih Role</option>
                                <option value="admin">Admin</option>
                                <option value="operator">Operator</option>
                            </select>
                        </div>
                        {!editingAccount && (
                            <>
                                <div className="relative">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-6" onClick={toggleShowPassword}>
                                        {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                                    </div>
                                </div>
                                <div className="relative">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-6" onClick={toggleShowConfirmPassword}>
                                        {showConfirmPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                                    </div>
                                </div>
                            </>
                        )}
                        {editingAccount && (
                            <>
                                <div className="relative">
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Password Baru</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="newPassword"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-6" onClick={toggleShowPassword}>
                                        {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                                    </div>
                                </div>
                                <div className="relative">
                                    <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmNewPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-6" onClick={toggleShowConfirmPassword}>
                                        {showConfirmPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 mt-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {editingAccount ? 'Perbarui Akun' : 'Daftar Akun'}
                    </button>
                </form>

                {/* Tabel Akun */}
                <h3 className="text-2xl font-bold mb-4 text-center">Daftar Akun</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-left">Email</th>
                                <th className="py-2 px-4 border-b text-left">Role</th>
                                <th className="py-2 px-4 border-b text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map(account => (
                                <tr key={account.id || account.email + Math.random()}>
                                    <td className="py-2 px-4 border-b">{account.email}</td>
                                    <td className="py-2 px-4 border-b">{account.role}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button onClick={() => handleEdit(account)} className="text-blue-500 hover:underline mr-2">Edit</button>
                                        <button onClick={() => handleDelete(account.id)} className="text-red-500 hover:underline">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AccountManagement;
