// src/pages/Settings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
    const [accounts, setAccounts] = useState([]);
    const [form, setForm] = useState({ email: '', password: '', role: '' });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
        const response = await axios.get('http://localhost:5000/accounts');
        setAccounts(response.data.data);
        } catch (error) {
        console.error('Error fetching accounts:', error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        if (editMode) {
            await axios.put(`http://localhost:5000/accounts/${form.email}`, form);
        } else {
            await axios.post('http://localhost:5000/accounts', form);
        }
        fetchAccounts();
        setForm({ email: '', password: '', role: '' });
        setEditMode(false);
        } catch (error) {
        console.error('Error submitting form:', error);
        }
    };

    const handleEdit = (email) => {
        const account = accounts.find((acc) => acc.email === email);
        setForm(account);
        setEditMode(true);
    };

    const handleDelete = async (email) => {
        try {
        await axios.delete(`http://localhost:5000/accounts/${email}`);
        fetchAccounts();
        } catch (error) {
        console.error('Error deleting account:', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Accounts</h2>
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-2 border border-gray-300 rounded"
                required
            />
            <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="p-2 border border-gray-300 rounded"
                required={!editMode}
            />
            <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
                required
            >
                <option value="" disabled>
                Select Role
                </option>
                <option value="admin">Admin</option>
                <option value="operator">Operator</option>
            </select>
            </div>
            <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
            {editMode ? 'Update Account' : 'Add Account'}
            </button>
            {editMode && (
            <button
                type="button"
                onClick={() => {
                setEditMode(false);
                setForm({ email: '', password: '', role: '' });
                }}
                className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
                Cancel
            </button>
            )}
        </form>
        <table className="min-w-full bg-white shadow-md rounded">
            <thead>
            <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4">Actions</th>
            </tr>
            </thead>
            <tbody>
            {accounts.map((account) => (
                <tr key={account.email} className="border-t">
                <td className="py-2 px-4">{account.email}</td>
                <td className="py-2 px-4">{account.role}</td>
                <td className="py-2 px-4">
                    <button
                    onClick={() => handleEdit(account.email)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600 transition"
                    >
                    Edit
                    </button>
                    <button
                    onClick={() => handleDelete(account.email)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    >
                    Delete
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default Settings;
