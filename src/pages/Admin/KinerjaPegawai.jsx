import React, { useState, useEffect } from 'react';
import Navbar from '../../components/NavAdmin';
import Footer from '../../components/FooterAllPages';
import axios from 'axios';
import { FaPlus, FaComment, FaEdit } from 'react-icons/fa';
import Modal from 'react-modal';

const KinerjaPegawai = () => {
    const [kinerjaValue, setKinerjaValue] = useState(0);
    const [komentar, setKomentar] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isKinerjaModalOpen, setIsKinerjaModalOpen] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [kinerjaDivisi, setKinerjaDivisi] = useState({
        kurl: [],
        tp: [],
        pdi: [],
        hp: [],
        sppp_sdm: [],
    });
    const [sekretaris, setSekretaris] = useState([]);
    const [subBagian, setSubBagian] = useState({
        tppph: [],
        pdi: [],
        hsdm: [],
        kul: [],
    });

    useEffect(() => {
        // Fungsi untuk mengambil data berdasarkan ID
        const fetchData = async () => {
            try {
                // Ambil semua data divisi
                const divisiKurlRes = await axios.get('http://localhost:5000/api/divisi-kurl-adm');
                const divisiTPRes = await axios.get('http://localhost:5000/api/divisi-tp-adm');
                const divisiPDIRes = await axios.get('http://localhost:5000/api/divisi-pdi-adm');
                const divisiHPRes = await axios.get('http://localhost:5000/api/divisi-hp-adm');
                const divisiSPPPSDMRes = await axios.get('http://localhost:5000/api/divisi-sppp_sdm-adm');

                // Ambil semua data sekretaris
                const sekretarisRes = await axios.get('http://localhost:5000/api/sekretaris-adm');

                // Ambil semua data sub bagian
                const tppphRes = await axios.get('http://localhost:5000/api/sub-bagian-tppph-adm');
                const pdiSubRes = await axios.get('http://localhost:5000/api/sub-bagian-pdi-adm');
                const hsdmRes = await axios.get('http://localhost:5000/api/sub-bagian-hsdm-adm');
                const kulRes = await axios.get('http://localhost:5000/api/sub-bagian-kul-adm');

                // Update state dengan data yang diterima
                setKinerjaDivisi({
                    kurl: divisiKurlRes.data,
                    tp: divisiTPRes.data,
                    pdi: divisiPDIRes.data,
                    hp: divisiHPRes.data,
                    sppp_sdm: divisiSPPPSDMRes.data,
                });
                setSekretaris(sekretarisRes.data);
                setSubBagian({
                    tppph: tppphRes.data,
                    pdi: pdiSubRes.data,
                    hsdm: hsdmRes.data,
                    kul: kulRes.data,
                });
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const handleAddKinerja = async () => {
        if (selectedUserId !== null) {
            console.log('Menambahkan kinerja untuk User ID:', selectedUserId, 'Dengan kinerja:', kinerjaValue);
            try {
                const response = await axios.put(`http://localhost:5000/api/tambah-kinerja-div-hp/${selectedUserId}`, { kinerja_div_hp: kinerjaValue });
                console.log(response.data);
                
                // Simpan nilai kinerja sebelum mereset
                const savedKinerjaValue = kinerjaValue;
                console.log("Kinerja yang disimpan:", savedKinerjaValue);
                
                // Reset modal dan nilai kinerja
                setIsKinerjaModalOpen(false);
                setKinerjaValue(savedKinerjaValue); // Reset nilai setelah berhasil
                
            } catch (error) {
                console.error('Error adding kinerja:', error.response?.data || error.message);
            }
        } else {
            console.warn("selectedUserId is null");
        }
    };
    
    const handleAddKomentar = async (kinerjaValue) => { 
        console.log("Selected User ID:", selectedUserId);
        console.log("Komentar:", komentar);
        console.log("Kinerja Value:", kinerjaValue);
    
        try {
            // Periksa apakah nilai yang diperlukan valid
            if (selectedUserId === null || komentar.trim() === '' || kinerjaValue <= 0) {
                console.warn("User ID, komentar, dan kinerja harus valid dan tidak boleh kosong");
                return;
            }
    
            console.log('Mengirim data:', { userId: selectedUserId, performanceComment: komentar, kinerja_div_hp: kinerjaValue });
            
            // Panggil API dengan userId sebagai parameter URL
            const response = await axios.put(`http://localhost:5000/api/komentar-kinerja/kinerja-div-hp/${selectedUserId}`, { 
                performanceComment: komentar,
                kinerja_div_hp: kinerjaValue,
            });
            console.log(response.data);
            
            // Reset state setelah mengirim
            setSelectedUserId(null);
            setKomentar(''); // Reset komentar setelah mengirim
            setIsCommentModalOpen(false); // Tutup modal setelah berhasil
        } catch (error) {
            console.error("Error adding komentar: ", error.response?.data || error.message);
        }
    };
    

    const renderTable = (title, columns, data) => (
        <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
            <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        {columns.map((column, index) => (
                            <th key={index} className="border border-gray-300 px-4 py-2 text-center">{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            {/* Kolom Foto */}
                            <td className="border border-gray-300 p-4 text-center">
                                {(item.foto_div_hp && (
                                    <img src={`http://localhost:5000${item.foto_div_hp}`} alt="Foto" className="h-16 w-16 object-cover rounded-full mx-auto" />
                                )) ||
                                (item.foto_div_kurl && (
                                    <img src={`http://localhost:5000${item.foto_div_kurl}`} alt="Foto" className="h-16 w-16 object-cover rounded-full mx-auto" />
                                )) ||
                                (item.foto_div_pdi && (
                                    <img src={`http://localhost:5000${item.foto_div_pdi}`} alt="Foto" className="h-16 w-16 object-cover rounded-full mx-auto" />
                                )) ||
                                (item.foto_div_sppp_sdm && (
                                    <img src={`http://localhost:5000${item.foto_div_sppp_sdm}`} alt="Foto" className="h-16 w-16 object-cover rounded-full mx-auto" />
                                )) ||
                                (item.foto_div_tp && (
                                    <img src={`http://localhost:5000${item.foto_div_tp}`} alt="Foto" className="h-16 w-16 object-cover rounded-full mx-auto" />
                                )) ||
                                (item.foto_sekretaris && (
                                    <img src={`http://localhost:5000${item.foto_sekretaris}`} alt="Foto" className="h-16 w-16 object-cover rounded-full mx-auto" />
                                )) ||
                                (item.foto_sb_hsdm && (
                                    <img src={`http://localhost:5000${item.foto_sb_hsdm}`} alt="Foto" className="h-16 w-16 object-cover rounded-full mx-auto" />
                                )) ||
                                (item.foto_sb_kul && (
                                    <img src={`http://localhost:5000${item.foto_sb_kul}`} alt="Foto" className="h-16 w-16 object-cover rounded-full mx-auto" />
                                )) ||
                                (item.foto_sb_pdi && (
                                    <img src={`http://localhost:5000${item.foto_sb_pdi}`} alt="Foto" className="h-16 w-16 object-cover rounded-full mx-auto" />
                                )) ||
                                (item.foto_sb_tppph && (
                                    <img src={`http://localhost:5000${item.foto_sb_tppph}`} alt="Foto" className="h-16 w-16 object-cover rounded-full mx-auto" />
                                ))}
                            </td>

                            {/* Kolom Nama */}
                            <td className="border border-gray-300 p-4 text-center">
                                {item.nama_div_hp || item.nama_div_kurl || item.nama_div_pdi || item.nama_div_sppp_sdm || item.nama_div_tp ||
                                item.nama_sekretaris || item.nama_sb_hsdm || item.nama_sb_kul || item.nama_sb_pdi || item.nama_sb_tppph}
                            </td>

                            {/* Kolom NIP */}
                            {(item.nip_sekretaris || item.nip_sb_hsdm || item.nip_sb_kul || item.nip_sb_pdi || item.nip_sb_tppph) && (
                                <td className="border border-gray-300 p-4 text-center">
                                    {item.nip_sekretaris || item.nip_sb_hsdm || item.nip_sb_kul || item.nip_sb_pdi || item.nip_sb_tppph}
                                </td>
                            )}

                            {/* Kolom Posisi */}
                            {(item.posisi_sb_hsdm || item.posisi_sb_kul || item.posisi_sb_pdi || item.posisi_sb_tppph) && (
                                <td className="border border-gray-300 p-4 text-center">
                                    {item.posisi_sb_hsdm || item.posisi_sb_kul || item.posisi_sb_pdi || item.posisi_sb_tppph}
                                </td>
                            )}

                            {/* Kolom Kinerja */}
                            <td className="border border-gray-300 p-4 text-center">
                                <div className="flex justify-center items-center space-x-4">
                                    <button 
                                        onClick={() => { setSelectedUserId(item.id); setIsKinerjaModalOpen(true); }} 
                                        className="text-blue-500 text-2xl">
                                        <FaPlus />
                                    </button>
                                    
                                    <button 
                                        onClick={() => { setSelectedUserId(item.id); setIsCommentModalOpen(true); }} 
                                        className="text-green-500 text-2xl">
                                        <FaComment />
                                    </button>
                                    
                                    <button 
                                        onClick={() => { setSelectedUserId(item.id); setIsEditModalOpen(true); }} 
                                        className="text-yellow-500 text-2xl">
                                        <FaEdit />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen">
            {/* Start: Navbar */}
            <Navbar />
            {/* End: Navbar */}

            <main className="flex-grow p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Kinerja Pegawai</h1>

                {/* Tabel Divisi */}
                {Object.entries(kinerjaDivisi).map(([key, data]) => (
                    <div key={key} className="mb-12">
                        {renderTable(`Kinerja Divisi ${key}`, ["Foto", "Nama", "Kinerja"], data)}
                    </div>
                ))}

                {/* Tabel Sekretaris */}
                <div className="mb-12">
                    {renderTable("Sekretaris", ["Foto", "Nama", "NIP", "Kinerja"], sekretaris)}
                </div>

                {/* Tabel Sub Bagian */}
                {Object.entries(subBagian).map(([key, data]) => (
                    <div key={key} className="mb-12">
                        {renderTable(`Sub Bagian ${key}`, ["Foto", "Nama", "NIP/Identitas", "Posisi", "Kinerja"], data)}
                    </div>
                ))}
            </main>

            {/* Start: Footer */}
            <Footer />
            {/* End: Footer */}

            {/* Popup Tambah Kinerja */}
            <Modal
                isOpen={isKinerjaModalOpen}
                onRequestClose={() => setIsKinerjaModalOpen(false)}
                contentLabel="Tambah Kinerja Modal"
                className="flex items-center justify-center fixed inset-0 z-50"
            >
                <div className="w-1/3 max-w-xs mx-auto rounded-lg p-6 bg-white shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Tambah Kinerja</h2>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={kinerjaValue} 
                        onChange={(e) => setKinerjaValue(e.target.value)} 
                        className="w-full mt-4" 
                    />
                    <button
                        onClick={handleAddKinerja}
                        className="mt-4 p-2 bg-blue-500 text-white rounded"
                    >
                        Simpan
                    </button>
                </div>
            </Modal>

            {/* Popup Tambah Komen */}
            <Modal
                isOpen={isCommentModalOpen}
                onRequestClose={() => setIsCommentModalOpen(false)}
                contentLabel="Tambah Komen Kinerja Modal"
                className="flex items-center justify-center fixed inset-0 z-50"
            >
                <div className="w-1/3 max-w-xs mx-auto rounded-lg p-6 bg-white shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Tambah Komen Kinerja</h2>
                    <textarea 
                        className="w-full p-2 mt-4 border rounded" 
                        rows="4" 
                        value={komentar} 
                        onChange={(e) => setKomentar(e.target.value)} 
                    />
                    <button
                        onClick={() => {
                            handleAddKomentar(kinerjaValue); // Kirim nilai yang benar
                            setIsCommentModalOpen(false); // Tutup modal setelah menyimpan
                        }} 
                        className="mt-4 p-2 bg-green-500 text-white rounded"
                    >
                        Simpan
                    </button>
                </div>
            </Modal>

            {/* Popup Edit Kinerja */}
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                contentLabel="Edit Kinerja Modal"
                className="flex items-center justify-center fixed inset-0 z-50"
            >
                <div className="w-1/3 max-w-xs mx-auto rounded-lg p-6 bg-white shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Edit Kinerja</h2>
                    <p>Isi form edit kinerja di sini.</p>
                    <button
                        onClick={() => setIsEditModalOpen(false)}
                        className="mt-4 p-2 bg-yellow-500 text-white rounded"
                    >
                        Simpan
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default KinerjaPegawai;
