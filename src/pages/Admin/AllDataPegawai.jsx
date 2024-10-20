import React, { useState, useEffect } from 'react';
import Navbar from '../../components/NavAdmin';
import Footer from '../../components/FooterAllPages';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AllDataPegawai = () => {
    const [Divisi, setDivisi] = useState({
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
                const divisiKurlRes = await axios.get('http://localhost:5000/api/divisi-kurl-adm');
                const divisiTPRes = await axios.get('http://localhost:5000/api/divisi-tp-adm');
                const divisiPDIRes = await axios.get('http://localhost:5000/api/divisi-pdi-adm');
                const divisiHPRes = await axios.get('http://localhost:5000/api/divisi-hp-adm');
                const divisiSPPPSDMRes = await axios.get('http://localhost:5000/api/divisi-sppp_sdm-adm');
                const sekretarisRes = await axios.get('http://localhost:5000/api/sekretaris-adm');
                const tppphRes = await axios.get('http://localhost:5000/api/sub-bagian-tppph-adm');
                const pdiSubRes = await axios.get('http://localhost:5000/api/sub-bagian-pdi-adm');
                const hsdmRes = await axios.get('http://localhost:5000/api/sub-bagian-hsdm-adm');
                const kulRes = await axios.get('http://localhost:5000/api/sub-bagian-kul-adm');

                setDivisi({
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
            <table className="w-full max-w-screen-md mx-auto border-collapse border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-200">
                        {columns.map((column, index) => (
                            <th key={index} className="border border-gray-300 px-4 py-2 text-center text-gray-600 font-medium">{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="border border-gray-300 p-4 text-center text-red-500">
                                Data Tidak Tersedia
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100 transition duration-200">
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

                                <td className="border border-gray-300 p-4 text-center">
                                    {item.nama_div_hp || item.nama_div_kurl || item.nama_div_pdi || item.nama_div_sppp_sdm || item.nama_div_tp ||
                                    item.nama_sekretaris || item.nama_sb_hsdm || item.nama_sb_kul || item.nama_sb_pdi || item.nama_sb_tppph}
                                </td>

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
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );

    // Fungsi untuk mencetak data ke PDF
    const handlePrint = () => {
        const input = document.getElementById('printArea'); // Mengambil elemen yang akan dicetak
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 190; // Lebar gambar PDF
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('data_pegawai.pdf'); // Menyimpan file PDF
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Data Pegawai</h1>
                <div className="flex justify-end mb-4">
                    <button
                        onClick={handlePrint}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                    >
                        Cetak PDF
                    </button>
                </div>
                <div id="printArea">
                    {Object.entries(Divisi).map(([key, data]) => (
                        <div key={key} className="mb-12">
                            {renderTable(`Divisi ${key}`, ["Foto", "Nama"], data)}
                        </div>
                    ))}
                    <div className="mb-12">
                        {renderTable("Sekretaris", ["Foto", "Nama", "NIP"], sekretaris)}
                    </div>
                    {Object.entries(subBagian).map(([key, data]) => (
                        <div key={key} className="mb-12">
                            {renderTable(`Sub Bagian ${key}`, ["Foto", "Nama", "NIP/Identitas", "Posisi"], data)}
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AllDataPegawai;
