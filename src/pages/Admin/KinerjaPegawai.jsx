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
        const fetchData = async () => {
            try {
                const [kurlRes, tpRes, pdiRes, hpRes, spppRes, sekretarisRes, tppphRes, pdiSubRes, hsdmRes, kulRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/divisi-kurl-adm'),
                    axios.get('http://localhost:5000/api/divisi-tp-adm'),
                    axios.get('http://localhost:5000/api/divisi-pdi-adm'),
                    axios.get('http://localhost:5000/api/divisi-hp-adm'),
                    axios.get('http://localhost:5000/api/divisi-sppp_sdm-adm'),
                    axios.get('http://localhost:5000/api/sekretaris-adm'),
                    axios.get('http://localhost:5000/api/sub-bagian-tppph-adm'),
                    axios.get('http://localhost:5000/api/sub-bagian-pdi-adm'),
                    axios.get('http://localhost:5000/api/sub-bagian-hsdm-adm'),
                    axios.get('http://localhost:5000/api/sub-bagian-kul-adm'),
                ]);
                
                setKinerjaDivisi({
                    kurl: kurlRes.data,
                    tp: tpRes.data,
                    pdi: pdiRes.data,
                    hp: hpRes.data,
                    sppp_sdm: spppRes.data,
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
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-4 text-center">
                                    <img src={item.foto || 'default.jpg'} alt="Foto" className="h-16 w-16 object-cover rounded-full mx-auto" />
                                </td>
                                <td className="border border-gray-300 p-4 text-center">{item.nama}</td>
                                {item.nip && <td className="border border-gray-300 p-4 text-center">{item.nip}</td>}
                                {item.posisi && <td className="border border-gray-300 p-4 text-center">{item.posisi}</td>}
                                {item.identitas && <td className="border border-gray-300 p-4 text-center">{item.identitas}</td>}
                                <td className="border border-gray-300 p-4 text-center">{item.kinerja}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="border border-gray-300 p-4 text-center">Tidak ada data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    const renderSubBagian = (subBagians) => (
        <div className="mb-10">
            {subBagians.map((subBagian, index) => (
                <div key={index}>
                    {renderTable(subBagian.title, ["Foto", "Nama", "Posisi", "Identitas", "Kinerja"], subBagian.data)}
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Kinerja Pegawai</h1>
                {Object.entries(kinerjaDivisi).map(([key, data]) => (
                    <div key={key} className="mb-12">
                        {renderTable(`Kinerja Divisi ${key}`, ["Foto", "Nama", "Kinerja"], data)}
                    </div>
                ))}
                <div className="mb-12">
                    {renderTable("Sekretaris", ["Foto", "Nama", "NIP", "Kinerja"], sekretaris)}
                </div>
                {Object.entries(subBagian).map(([key, data]) => (
                    <div key={key} className="mb-12">
                        {renderTable(`Sub Bagian ${key}`, ["Foto", "Nama", "Posisi", "Identitas", "Kinerja"], data)}
                    </div>
                ))}
            </main>
            <Footer />
        </div>
    );
};

export default KinerjaPegawai;
