import React from 'react';

const FooterAllPages = () => {
    return (
        <footer className="bg-gradient-to-b from-red-600 via-red-800 to-red-800 mt-10 mb-0">
            <div className="mx-auto w-full max-w-screen-xl p-4 lg:py-6">
                <hr className="my-4 border-gray-300 dark:border-gray-700" />
                <div className="flex items-center justify-center">
                <span className="text-sm font-semibold text-white text-center">
                    © {new Date().getFullYear()} KPU Kota Cimahi. All Rights Reserved.
                </span>
                </div>
            </div>
        </footer>
    );
};

export default FooterAllPages;
