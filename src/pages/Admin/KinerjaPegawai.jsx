import React, { useState, useEffect } from 'react';
import Navbar from '../../components/NavAdmin';
import Footer from '../../components/FooterAllPages';
import axios from 'axios';

const KinerjaPegawai = () => {
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

    const renderTable = (title, columns, data) => (
        <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
            <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        {columns.map((column, index) => (
                            <th key={index} className="border border-gray-300 px-4 py-2">{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
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

                            <td className="border border-gray-300 p-4 text-center">{item.nama_div_hp || item.nama_div_kurl || item.nama_div_pdi || item.nama_div_sppp_sdm ||  item.nama_div_tp ||
                                    item.nama_sekretaris || item.nama_sb_hsdm || item.nama_sb_kul || item.nama_sb_pdi || item.nama_sb_tppph}</td>

                            {(item.nip_sekretaris || item.nip_sb_hsdm || item.nip_sb_kul || item.nip_sb_pdi || item.nip_sb_tppph) && (
                                <td className="border border-gray-300 p-4 text-center">
                                    {item.nip_sekretaris || item.nip_sb_hsdm || item.nip_sb_kul || item.nip_sb_pdi || item.nip_sb_tppph}
                                </td>
                            )}

                            {(item.posisi_sb_hsdm || item.posisi_sb_kul || item.posisi_sb_pdi || item.posisi_sb_tppph) && (
                                <td className="border border-gray-300 p-4 text-center">
                                    {item.posisi_sb_hsdm || item.posisi_sb_kul || item.posisi_sb_pdi || item.posisi_sb_tppph}
                                </td>
                            )}

                            {item.identitas && <td className="border border-gray-300 p-4 text-center">{item.identitas}</td>}
                            <td className="border border-gray-300 p-4 text-center">{item.kinerja}</td>
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
        </div>
    );
};

export default KinerjaPegawai;
