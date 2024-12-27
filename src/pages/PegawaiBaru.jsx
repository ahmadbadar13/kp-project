import React, { useState } from "react";
import NavHome from '../components/NavHome';
import Footer from '../components/FooterHome';

const FormPendaftaran = () => {
    const [formData, setFormData] = useState({
        nama: "",
        bagianDilamar: "",
        statusPegawai: "",
        dokumen: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            dokumen: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data yang dikirim:", formData);
        alert("Formulir berhasil disubmit!");
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <NavHome />
            
            {/* Form Container */}
            <div className="flex justify-center items-center pt-10 pb-20">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Formulir Pendaftaran Pegawai Baru
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nama */}
                        <div>
                            <label htmlFor="nama" className="block text-gray-700 font-medium mb-2">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                id="nama"
                                name="nama"
                                value={formData.nama}
                                onChange={handleChange}
                                required
                                placeholder="Masukkan nama lengkap"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Bagian yang Dilamar */}
                        <div>
                            <label htmlFor="bagianDilamar" className="block text-gray-700 font-medium mb-2">
                                Bagian yang Dilamar
                            </label>
                            <input
                                type="text"
                                id="bagianDilamar"
                                name="bagianDilamar"
                                value={formData.bagianDilamar}
                                onChange={handleChange}
                                required
                                placeholder="Masukkan bagian"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Status Pegawai */}
                        <div>
                            <label htmlFor="statusPegawai" className="block text-gray-700 font-medium mb-2">
                                Status Pegawai
                            </label>
                            <select
                                id="statusPegawai"
                                name="statusPegawai"
                                value={formData.statusPegawai}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Pilih Status</option>
                                <option value="PNS">PNS</option>
                                <option value="Kontrak">Kontrak</option>
                            </select>
                        </div>

                        {/* Dokumen */}
                        <div>
                            <label htmlFor="dokumen" className="block text-gray-700 font-medium mb-2">
                                Tautan Dokumen (Google Drive)
                            </label>
                            <input
                                type="url"
                                id="dokumen"
                                name="dokumen"
                                value={formData.dokumen || ""}
                                onChange={handleFileChange}
                                required
                                placeholder="Masukkan tautan Google Drive"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Pastikan tautan bersifat publik atau dapat diakses oleh panitia.
                            </p>
                        </div>

                        {/* Tombol Submit */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default FormPendaftaran;
