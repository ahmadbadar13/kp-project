import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo KPU.png';
import BackgroundImage from '../../assets/bg-KPU.png';

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(''); // State untuk menyimpan peran pengguna

  useEffect(() => {
    // Ambil informasi peran pengguna dari local storage atau API
    const role = localStorage.getItem('userRole'); // Atau dari state management (Redux, Context, dll.)
    setUserRole(role || ''); // Set role ke state
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const toggleAdminDropdown = () => {
    setAdminDropdownOpen(!adminDropdownOpen);
  };

  return (
    <div>
      {/* Start: Navbar */}
      <nav className="bg-red-700 p-4 sticky top-0 z-50">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto">
          <Link to="/DashboardAdmin" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-16" alt="Logo KPU" />
            <span className="self-center text-white text-3xl tracking-tighter font-semibold font-frank whitespace-nowrap">
              Kota Cimahi
            </span>
          </Link>
          <div className="hidden md:flex md:items-center flex-grow justify-center">
            <ul className="font-medium text-lg flex space-x-12">
              <li className="relative">
                <button
                  onClick={() => toggleDropdown('divisi')}
                  className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
                >
                  Divisi
                </button>
                {activeDropdown === 'divisi' && (
                  <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black rounded shadow-lg w-48">
                    <li>
                      <Link to="/DivisiKURL-Op" className="block py-1 px-4 hover:bg-gray-200 rounded text-sm">Divisi Keuangan, Umum, Rumah Tangga, dan Logistik</Link>
                    </li>
                    <li>
                      <Link to="/DivisiTP-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Teknik Penyelenggaraan</Link>
                    </li>
                    <li>
                      <Link to="/DivisiPDI-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Perencanaan, Data, & Informasi</Link>
                    </li>
                    <li>
                      <Link to="/DivisiHP-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Hukum dan Pengawasan</Link>
                    </li>
                    <li>
                      <Link to="/DivisiSPPP_SDM-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Divisi Sosialisasi, Pendidikan Pemilih, Parmas, & SDM</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link to="/Sekretaris-Op" className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0">
                  Sekretaris
                </Link>
              </li>
              <li className="relative">
                <button
                  onClick={() => toggleDropdown('subBagian')}
                  className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0"
                >
                  Sub Bagian
                </button>
                {activeDropdown === 'subBagian' && (
                  <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black rounded shadow-lg w-48">
                    <li>
                      <Link to="/SubBagianTPPPH-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Teknis Penyelenggaraan Pemilu, Partisipasi, & Hupmas</Link>
                    </li>
                    <li>
                      <Link to="/SubBagianPDI-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Perencanaan, Data & Informasi</Link>
                    </li>
                    <li>
                      <Link to="/SubBagianHSDM-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Hukum & SDM</Link>
                    </li>
                    <li>
                      <Link to="/SubBagianKUL-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm">Sub Bagian Keuangan, Umum, & Logistik</Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
          <div className="hidden md:flex md:items-center">
            <div className="relative">
              <button
                onClick={toggleAdminDropdown}
                className="text-white font-medium text-lg flex items-center focus:outline-none"
              >
                Hallo, Operator!
                <svg
                  className={`w-2.5 h-2.5 ms-2.5 transition-transform duration-300 ${
                    adminDropdownOpen ? 'transform rotate-180' : ''
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {adminDropdownOpen && (
                <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black rounded shadow-lg w-32 z-10">
                  <li>
                    <Link to="/" className="block px-4 py-2 hover:bg-gray-200 rounded text-center">
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="block text-white focus:outline-none">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v1H4V6zm0 5h16v1H4v-1zm0 5h16v1H4v-1z"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {/* End: Navbar */}

      {/* Start: Navbar Responsive Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 z-50">
          <div className="flex flex-col items-center pt-10">
            <Link to="/Dashboard-Op" onClick={closeMenu} className="text-white text-2xl mb-6">≡</Link>
            <ul className="flex flex-col items-center space-y-4">
              <li>
                <button
                  onClick={() => toggleDropdown('divisi')}
                  className="text-white text-lg"
                >
                  Divisi
                </button>
                {activeDropdown === 'divisi' && (
                  <ul className="bg-white text-black rounded shadow-lg mt-2 w-48">
                    <li>
                      <Link to="/DivisiKURL-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Divisi Keuangan, Umum, Rumah Tangga, dan Logistik</Link>
                    </li>
                    <li>
                      <Link to="/DivisiTP-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Divisi Teknik Penyelenggaraan</Link>
                    </li>
                    <li>
                      <Link to="/DivisiPDI-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Divisi Perencanaan, Data, & Informasi</Link>
                    </li>
                    <li>
                      <Link to="/DivisiHP-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Divisi Hukum dan Pengawasan</Link>
                    </li>
                    <li>
                      <Link to="/DivisiSPPP_SDM-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Divisi Sosialisasi, Pendidikan Pemilih, Parmas, & SDM</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link to="/Sekretaris-Op" className="block py-2 px-3 text-white text-lg" onClick={closeMenu}>
                  Sekretaris
                </Link>
              </li>
              <li>
                <button
                  onClick={() => toggleDropdown('subBagian')}
                  className="text-white text-lg"
                >
                  Sub Bagian
                </button>
                {activeDropdown === 'subBagian' && (
                  <ul className="bg-white text-black rounded shadow-lg mt-2 w-48">
                    <li>
                      <Link to="/SubBagianTPPPH-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Sub Bagian Teknis Penyelenggaraan Pemilu, Partisipasi, & Hupmas</Link>
                    </li>
                    <li>
                      <Link to="/SubBagianPDI-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Sub Bagian Perencanaan, Data & Informasi</Link>
                    </li>
                    <li>
                      <Link to="/SubBagianHSDM-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Sub Bagian Hukum & SDM</Link>
                    </li>
                    <li>
                      <Link to="/SubBagianKUL-Op" className="block py-2 px-4 hover:bg-gray-200 rounded text-sm" onClick={closeMenu}>Sub Bagian Keuangan, Umum, & Logistik</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  onClick={toggleAdminDropdown}
                  className="text-white text-lg"
                >
                  Hallo, Operator!
                </button>
                {adminDropdownOpen && (
                  <ul className="bg-white text-black rounded shadow-lg mt-2 w-30">
                    <li>
                      <Link to="/" className="block px-4 py-2 hover:bg-gray-200 rounded text-center" onClick={closeMenu}>Logout</Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
      {/* End: Navbar Responsive Mobile menu */}

      {/* Start: Jumbotron */}
      <section className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply" style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-5xl">Pengelolaan Pegawai KPU Kota Cimahi</h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Solusi Terbaik untuk Pengelolaan dan Pemantauan Data Pegawai KPU</p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Get started
              <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
      {/* End: Jumbotron */}

      {/* Start: Konten Sementara */}    
      <div className="flex flex-col items-center m-20">
        <div className="text-center mb-8 text-2xl font-semibold">
          Aktivitas
        </div>
        <div className="flex space-x-4 gap-10 justify-center">
          <div className="w-60 h-60 bg-gray-300 rounded-lg flex flex-col items-center justify-center p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gray-600 rounded-full mb-4"></div>
            <div className="mb-4 text-lg font-medium">Feedback Admin</div>
            <button className="bg-green-500 text-white px-4 py-2 w-full rounded-full hover:bg-green-600 transition-colors duration-300">Lihat</button>
          </div>
          <div className="w-60 h-60 bg-gray-300 rounded-lg flex flex-col items-center justify-center p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gray-600 rounded-full mb-4"></div>
            <div className="mb-4 text-lg font-medium">Fitur 2</div>
            <button className="bg-green-500 text-white px-4 py-2 w-full rounded-full hover:bg-green-600 transition-colors duration-300">Lihat</button>
          </div>
          <div className="w-60 h-60 bg-gray-300 rounded-lg flex flex-col items-center justify-center p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gray-600 rounded-full mb-4"></div>
            <div className="mb-4 text-lg font-medium">Fitur 3</div>
            <button className="bg-green-500 text-white px-4 py-2 w-full rounded-full hover:bg-green-600 transition-colors duration-300">Lihat</button>
          </div>
        </div>
      </div>
      {/* End: Konten Sementara */}

      {/* Start: Footer */}
      <footer class="bg-white dark:bg-gray-900">
          <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
              <div class="md:flex md:justify-between">
                <div class="mb-6 md:mb-0">
                    <a href="https://flowbite.com/" class="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 me-3" alt="FlowBite Logo" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </a>
                </div>
                <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                        <ul class="text-gray-500 dark:text-gray-400 font-medium">
                            <li class="mb-4">
                                <a href="https://flowbite.com/" class="hover:underline">Flowbite</a>
                            </li>
                            <li>
                                <a href="https://tailwindcss.com/" class="hover:underline">Tailwind CSS</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                        <ul class="text-gray-500 dark:text-gray-400 font-medium">
                            <li class="mb-4">
                                <a href="https://github.com/themesberg/flowbite" class="hover:underline ">Github</a>
                            </li>
                            <li>
                                <a href="https://discord.gg/4eeurUVvTy" class="hover:underline">Discord</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                        <ul class="text-gray-500 dark:text-gray-400 font-medium">
                            <li class="mb-4">
                                <a href="#" class="hover:underline">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div class="sm:flex sm:items-center sm:justify-between">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
                </span>
                <div class="flex mt-4 sm:justify-center sm:mt-0">
                    <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                              <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                          </svg>
                        <span class="sr-only">Facebook page</span>
                    </a>
                    <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                              <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
                          </svg>
                        <span class="sr-only">Discord community</span>
                    </a>
                    <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                          <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>
                      </svg>
                        <span class="sr-only">Twitter page</span>
                    </a>
                    <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                        </svg>
                        <span class="sr-only">GitHub account</span>
                    </a>
                    <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clip-rule="evenodd"/>
                      </svg>
                        <span class="sr-only">Dribbble account</span>
                    </a>
                </div>
            </div>
          </div>
      </footer>
      {/* End: Footer */}
    </div>
  );
};

export default Dashboard;
