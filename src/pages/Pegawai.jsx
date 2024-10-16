import React from 'react';
import AttendanceCard from '../components/AttendanceCard';
import PerformanceCard from '../components/PerformanceCard';
import ProfileCard from '../components/ProfileCard';
import NavPegawai from '../components/NavPegawai';

const DashboardPegawai = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <NavPegawai />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-6 text-center">Dashboard Pegawai</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1">
                        <ProfileCard className="shadow-lg rounded-lg bg-white p-4" />
                    </div>
                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="shadow-lg rounded-lg bg-white p-4">
                            <AttendanceCard />
                        </div>
                        <div className="shadow-lg rounded-lg bg-white p-4">
                            <PerformanceCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPegawai;
