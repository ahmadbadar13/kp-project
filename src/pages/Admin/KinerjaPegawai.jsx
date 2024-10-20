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
    const [selectedDivision, setSelectedDivision] = useState('');
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
            
            // Validasi nilai kinerja...
            if (kinerjaValue < 0 || kinerjaValue > 100) {
                console.warn('Nilai kinerja tidak valid. Harus antara 0 dan 100.');
                return;
            }
            
            try {
                let endpoint = '';
                let payload = {}; // Menyimpan payload untuk dikirim
                
                // Tentukan endpoint dan payload berdasarkan selectedDivision
                switch (selectedDivision) {
                    case 'hp':
                        endpoint = `http://localhost:5000/api/tambah-kinerja-div-hp/${selectedUserId}`;
                        payload = { kinerja_div_hp: kinerjaValue };
                        break;
                    case 'kurl':
                        endpoint = `http://localhost:5000/api/tambah-kinerja-div-kurl/${selectedUserId}`;
                        payload = { kinerja_div_kurl: kinerjaValue };
                        break;
                    case 'pdi':
                        endpoint = `http://localhost:5000/api/tambah-kinerja-div-pdi/${selectedUserId}`;
                        payload = { kinerja_div_pdi: kinerjaValue };
                        break;
                    case 'sppp_sdm':
                        endpoint = `http://localhost:5000/api/tambah-kinerja-div-sppp_sdm/${selectedUserId}`;
                        payload = { kinerja_div_sppp_sdm: kinerjaValue };
                        break;
                    case 'tp':
                        endpoint = `http://localhost:5000/api/tambah-kinerja-div-tp/${selectedUserId}`;
                        payload = { kinerja_div_tp: kinerjaValue };
                        break;
                    case 'sekretaris':
                        endpoint = `http://localhost:5000/api/tambah-kinerja-sekretaris/${selectedUserId}`;
                        payload = { kinerja_sekretaris: kinerjaValue };
                        break;
                    case 'sb-hsdm':
                        endpoint = `http://localhost:5000/api/tambah-kinerja-sb-hsdm/${selectedUserId}`;
                        payload = { kinerja_sb_hsdm: kinerjaValue };
                        break;
                    case 'sb-kul':
                        endpoint = `http://localhost:5000/api/tambah-kinerja-sb-kul/${selectedUserId}`;
                        payload = { kinerja_sb_kul: kinerjaValue };
                        break;
                    case 'sb-pdi':
                        endpoint = `http://localhost:5000/api/tambah-kinerja-sb-pdi/${selectedUserId}`;
                        payload = { kinerja_sb_pdi: kinerjaValue };
                        break;
                    case 'sb-tppph':
                        endpoint = `http://localhost:5000/api/tambah-kinerja-sb-tppph/${selectedUserId}`;
                        payload = { kinerja_sb_tppph: kinerjaValue };
                        break;
                    default:
                        console.warn('Divisi tidak dikenali');
                        return;
                }
    
                // Log payload
                console.log('Payload yang dikirim:', payload);

                // Kirim permintaan ke API
                const response = await axios.put(endpoint, payload);
                console.log(response.data);

                // Simpan nilai kinerja untuk digunakan saat menambah komentar
                const savedKinerjaValue = kinerjaValue; // Simpan kinerjaValue yang berhasil ditambahkan
                
                // Reset modal dan nilai kinerja
                setIsKinerjaModalOpen(false);
                setKinerjaValue(savedKinerjaValue); // Reset nilai kinerja ke 0 setelah berhasil

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
        console.log("Kinerja Value:", kinerjaValue); // Menampilkan kinerjaValue yang diambil
        
        try {
            if (selectedUserId === null || komentar.trim() === '') {
                console.warn("User ID dan komentar harus valid dan tidak boleh kosong");
                return;
            }
    
            // Tentukan endpoint dan payload
            let apiUrl = '';
            let payload = {}; 
    
            // Tentukan endpoint berdasarkan selectedDivision
            switch (selectedDivision) {
                case 'hp':
                    apiUrl = `http://localhost:5000/api/komentar-kinerja/kinerja-div-hp/${selectedUserId}`;
                    payload = { performanceComment: komentar, kinerja_div_hp: kinerjaValue };
                    break;
                case 'kurl':
                    apiUrl = `http://localhost:5000/api/komentar-kinerja/kinerja-div-kurl/${selectedUserId}`;
                    payload = { performanceComment: komentar, kinerja_div_kurl: kinerjaValue };
                    break;
                case 'pdi':
                    apiUrl = `http://localhost:5000/api/komentar-kinerja/kinerja-div-pdi/${selectedUserId}`;
                    payload = { performanceComment: komentar, kinerja_div_pdi: kinerjaValue };
                    break;
                case 'sppp_sdm':
                    apiUrl = `http://localhost:5000/api/komentar-kinerja/kinerja-div-sppp_sdm/${selectedUserId}`;
                    payload = { performanceComment: komentar, kinerja_div_sppp_sdm: kinerjaValue };
                    break;
                case 'tp':
                    apiUrl = `http://localhost:5000/api/komentar-kinerja/kinerja-div-tp/${selectedUserId}`;
                    payload = { performanceComment: komentar, kinerja_div_tp: kinerjaValue };
                    break;
                case 'sekretaris':
                    apiUrl = `http://localhost:5000/api/komentar-kinerja/kinerja-sekretaris/${selectedUserId}`;
                    payload = { performanceComment: komentar, kinerja_sekretaris: kinerjaValue };
                    break;
                case 'sb-hsdm':
                    apiUrl = `http://localhost:5000/api/komentar-kinerja/kinerja-sb-hsdm/${selectedUserId}`;
                    payload = { performanceComment: komentar, kinerja_sb_hsdm: kinerjaValue };
                    break;
                case 'sb-kul':
                    apiUrl = `http://localhost:5000/api/komentar-kinerja/kinerja-sb-kul/${selectedUserId}`;
                    payload = { performanceComment: komentar, kinerja_sb_kul: kinerjaValue };
                    break;
                case 'sb-pdi':
                    apiUrl = `http://localhost:5000/api/komentar-kinerja/kinerja-sb-pdi/${selectedUserId}`;
                    payload = { performanceComment: komentar, kinerja_sb_pdi: kinerjaValue };
                    break;
                case 'sb-tppph':
                    apiUrl = `http://localhost:5000/api/komentar-kinerja/kinerja-sb-tppph/${selectedUserId}`;
                    payload = { performanceComment: komentar, kinerja_sb_tppph: kinerjaValue };
                    break;
                default:
                    console.warn('Divisi tidak dikenali');
                    return; // Menghentikan eksekusi jika divisi tidak dikenali
            }
    
            // Log payload yang akan dikirim
            console.log('Payload yang dikirim:', payload);
    
            // Panggil API
            const response = await axios.put(apiUrl, payload);
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
            <button onClick={() => setIsKinerjaModalOpen(true)}>Tambah Kinerja</button>

            <Modal
                isOpen={isKinerjaModalOpen}
                onRequestClose={() => setIsKinerjaModalOpen(false)}
                contentLabel="Tambah Kinerja Modal"
                className="flex items-center justify-center fixed inset-0 z-50"
            >
                <div className="w-1/3 max-w-xs mx-auto rounded-lg p-6 bg-white shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Tambah Kinerja</h2>

                    {/* Pilih Divisi */}
                    <div className="mb-4">
                        <label className="block mb-2">Pilih Divisi:</label>
                        <select value={selectedDivision} onChange={(e) => setSelectedDivision(e.target.value)} className="w-full p-2 border rounded">
                            <option value="hp">Divisi HP</option>
                            <option value="kurl">Divisi KURL</option>
                            <option value="pdi">Divisi PDI</option>
                            <option value="sppp_sdm">Divisi SPPP & SDM</option>
                            <option value="tp">Divisi TP</option>
                            <option value="sekretaris">Sekretaris</option>
                            <option value="sb-hsdm">Sub Bagian HSDM</option>
                            <option value="sb-kul">Sub Bagian KUL</option>
                            <option value="sb-pdi">Sub Bagian PDI</option>
                            <option value="sb-tppph">Sub Bagian TPPPH</option>
                        </select>
                    </div>

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
                overlayClassName="fixed inset-0 bg-black bg-opacity-50" // Tambahkan overlay
            >
                <div className="w-full max-w-md mx-auto rounded-lg p-6 bg-white shadow-lg">
                    <h2 className="text-lg font-semibold mb-4 text-center">Tambah Komen Kinerja</h2>
                    
                    <textarea 
                        className="w-full p-2 mt-4 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        rows="4"
                        placeholder="Tambahkan komentar kinerja..."
                        value={komentar}
                        onChange={(e) => setKomentar(e.target.value)} 
                    />
                    
                    {/* Validasi jika komentar kosong */}
                    {komentar.trim() === '' && (
                        <p className="text-red-500 text-sm mt-2">Komentar tidak boleh kosong.</p>
                    )}

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setIsCommentModalOpen(false)} // Tutup modal tanpa menyimpan
                            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                        >
                            Batal
                        </button>
                        <button
                            onClick={() => {
                                if (komentar.trim() !== '') {
                                    handleAddKomentar(kinerjaValue, selectedDivision); // Kirim nilai yang sesuai
                                }
                            }} 
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            disabled={komentar.trim() === ''} // Nonaktifkan tombol jika komentar kosong
                        >
                            Simpan
                        </button>
                    </div>
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
