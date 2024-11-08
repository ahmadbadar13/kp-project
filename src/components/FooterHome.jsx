import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo KPU.png';

const FooterDashboard = () => {
    return (
        <footer className="bg-gradient-to-b from-red-700 via-red-900 to-red-900">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0 ml-3">
                    <Link to="/Dashboard-Adm" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={Logo} className="h-16" alt="Logo KPU" />
                        <span className="self-center text-white text-3xl tracking-tighter font-semibold font-frank whitespace-nowrap">
                        Kota Cimahi
                        </span>
                    </Link>
                </div>
                <div className="flex ml-auto space-x-9 mr-3">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Website</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                <a href="https://www.kpu.go.id/" className="hover:underline">KPU RI</a>
                            </li>
                            <li className="mb-4">
                                <a href="https://jdih.kpu.go.id/jabar/cimahi/" className="hover:underline">JDIH KPU Kota Cimahi</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">HOTLINE</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4">
                                <a href="https://wa.me/6281513579961" className="hover:underline ">Admin</a>
                            </li>
                            <li>
                                <a href="https://wa.me/6285951709433" className="hover:underline">Operator</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© KPU Kota Cimahi {new Date().getFullYear()}. All Rights Reserved.
                </span>
                <div className="flex mt-4 sm:justify-center sm:mt-0">
                    <a href="https://www.facebook.com/kpukota.cimahi/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.676 0H1.324C.592 0 0 .592 0 1.324v21.351C0 23.408.592 24 1.324 24H12.82v-9.294H9.692v-3.618h3.127V8.041c0-3.1 1.895-4.788 4.663-4.788 1.325 0 2.463.099 2.794.142v3.24l-1.917.001c-1.502 0-1.792.713-1.792 1.76v2.309h3.587l-.467 3.617h-3.12V24h6.113c.732 0 1.324-.592 1.324-1.324V1.324C24 .592 23.408 0 22.676 0z"/>
                    </svg>
                    <span className="sr-only">Facebook page</span>
                    </a>

                    <a href="https://www.instagram.com/kpu_kota_cimahi/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.206.056 1.973.24 2.432.405a4.926 4.926 0 011.777 1.152 4.92 4.92 0 011.152 1.777c.165.459.349 1.226.405 2.432.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.206-.24 1.973-.405 2.432a4.92 4.92 0 01-1.152 1.777 4.926 4.926 0 01-1.777 1.152c-.459.165-1.226.349-2.432.405-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.206-.056-1.973-.24-2.432-.405a4.926 4.926 0 01-1.777-1.152 4.92 4.92 0 01-1.152-1.777c-.165-.459-.349-1.226-.405-2.432-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.056-1.206.24-1.973.405-2.432a4.92 4.92 0 011.152-1.777 4.926 4.926 0 011.777-1.152c.459-.165 1.226-.349 2.432-.405 1.266-.058 1.646-.07 4.85-.07m0-2.163C8.741 0 8.332.013 7.052.07 5.771.128 4.723.329 3.85.671 3.012.999 2.317 1.52 1.737 2.1c-.58.58-1.101 1.275-1.429 2.113-.342.873-.543 1.921-.601 3.202C.013 8.332 0 8.741 0 12s.013 3.668.07 4.948c.058 1.281.259 2.329.601 3.202.328.838.849 1.533 1.429 2.113.58.58 1.275 1.101 2.113 1.429.873.342 1.921.543 3.202.601C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.07c1.281-.058 2.329-.259 3.202-.601.838-.328 1.533-.849 2.113-1.429.58-.58 1.101-1.275 1.429-2.113.342-.873.543-1.921.601-3.202.058-1.281.07-1.691.07-4.948s-.013-3.668-.07-4.948c-.058-1.281-.259-2.329-.601-3.202-.328-.838-.849-1.533-1.429-2.113-.58-.58-1.275-1.101-2.113-1.429-.873-.342-1.921-.543-3.202-.601C15.668.013 15.259 0 12 0z"/>
                        <path d="M12 5.838A6.162 6.162 0 105.838 12 6.173 6.173 0 0012 5.838M12 4a8 8 0 11-8 8 8.009 8.009 0 018-8z"/>
                        <circle cx="18.406" cy="5.594" r="1.44"/>
                    </svg>
                    <span className="sr-only">Instagram</span>
                    </a>

                    <a href="https://x.com/kpu_kotacimahi" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.954 4.569c-.885.39-1.83.654-2.825.775a4.932 4.932 0 002.163-2.724 9.864 9.864 0 01-3.127 1.197 4.918 4.918 0 00-8.379 4.482 13.944 13.944 0 01-10.125-5.134 4.822 4.822 0 00-.666 2.475 4.92 4.92 0 002.188 4.099 4.904 4.904 0 01-2.229-.616v.061a4.935 4.935 0 003.946 4.827 4.996 4.996 0 01-2.224.084 4.937 4.937 0 004.604 3.419A9.869 9.869 0 010 21.54 13.91 13.91 0 007.548 24c9.142 0 14.307-7.721 13.995-14.646a10.025 10.025 0 002.458-2.725 9.995 9.995 0 01-2.847.775 4.919 4.919 0 002.163-2.725z"/>
                    </svg>
                    <span className="sr-only">Twitter page</span>
                    </a>

                    <a href="https://www.youtube.com/@kpukotacimahi50" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a2.994 2.994 0 00-2.11-2.11C19.255 3.5 12 3.5 12 3.5s-7.255 0-9.388.576a2.994 2.994 0 00-2.11 2.11A31.397 31.397 0 000 12a31.397 31.397 0 00.502 5.814 2.994 2.994 0 002.11 2.11C4.745 20.5 12 20.5 12 20.5s7.255 0 9.388-.576a2.994 2.994 0 002.11-2.11A31.397 31.397 0 0024 12a31.397 31.397 0 00-.502-5.814zM9.75 15.083V8.917l6.167 3.083-6.167 3.083z"/>
                    </svg>
                    <span className="sr-only">YouTube channel</span>
                    </a>
                </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterDashboard;
