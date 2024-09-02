-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 02 Sep 2024 pada 19.37
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kp_project`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `divisi_hp`
--

CREATE TABLE `divisi_hp` (
  `id` int(11) NOT NULL,
  `nama_div_hp` varchar(255) NOT NULL,
  `foto_div_hp` varchar(255) NOT NULL,
  `komentar_div_hp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `divisi_hp`
--

INSERT INTO `divisi_hp` (`id`, `nama_div_hp`, `foto_div_hp`, `komentar_div_hp`) VALUES
(60, 'Testo', '/uploads/1725244045900.png', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `divisi_kurl`
--

CREATE TABLE `divisi_kurl` (
  `id` int(11) NOT NULL,
  `nama_div_kurl` varchar(255) NOT NULL,
  `foto_div_kurl` varchar(255) NOT NULL,
  `komentar_div_kurl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `divisi_kurl`
--

INSERT INTO `divisi_kurl` (`id`, `nama_div_kurl`, `foto_div_kurl`, `komentar_div_kurl`) VALUES
(10, 'Ketua', '/uploads/1725257247585.png', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `divisi_pdi`
--

CREATE TABLE `divisi_pdi` (
  `id` int(11) NOT NULL,
  `nama_div_pdi` varchar(255) NOT NULL,
  `foto_div_pdi` varchar(255) NOT NULL,
  `komentar_div_pdi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `divisi_pdi`
--

INSERT INTO `divisi_pdi` (`id`, `nama_div_pdi`, `foto_div_pdi`, `komentar_div_pdi`) VALUES
(5, 'Testing', '/uploads/1725245022236.png', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `divisi_sppp_sdm`
--

CREATE TABLE `divisi_sppp_sdm` (
  `id` int(11) NOT NULL,
  `nama_div_sppp_sdm` varchar(255) NOT NULL,
  `foto_div_sppp_sdm` varchar(255) NOT NULL,
  `komentar_div_sppp_sdm` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `divisi_tp`
--

CREATE TABLE `divisi_tp` (
  `id` int(11) NOT NULL,
  `nama_div_tp` varchar(255) NOT NULL,
  `foto_div_tp` varchar(255) NOT NULL,
  `komentar_div_tp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `divisi_tp`
--

INSERT INTO `divisi_tp` (`id`, `nama_div_tp`, `foto_div_tp`, `komentar_div_tp`) VALUES
(7, 'Test', '/uploads/1725245649372.png', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sekretaris`
--

CREATE TABLE `sekretaris` (
  `id` int(11) NOT NULL,
  `nama_sekretaris` varchar(255) NOT NULL,
  `nip_sekretaris` bigint(30) NOT NULL,
  `foto_sekretaris` varchar(255) NOT NULL,
  `komentar_sekretaris` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `sekretaris`
--

INSERT INTO `sekretaris` (`id`, `nama_sekretaris`, `nip_sekretaris`, `foto_sekretaris`, `komentar_sekretaris`) VALUES
(3, 'Test', 12121212, '/uploads/1724983980901.jpg', 'waaaaa');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sub_bagian_hsdm`
--

CREATE TABLE `sub_bagian_hsdm` (
  `id` int(11) NOT NULL,
  `nama_sb_hsdm` varchar(255) NOT NULL,
  `nip_sb_hsdm` varchar(30) NOT NULL,
  `posisi_sb_hsdm` enum('Ketua','Anggota') NOT NULL,
  `foto_sb_hsdm` varchar(255) NOT NULL,
  `komentar_sb_hsdm` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `sub_bagian_hsdm`
--

INSERT INTO `sub_bagian_hsdm` (`id`, `nama_sb_hsdm`, `nip_sb_hsdm`, `posisi_sb_hsdm`, `foto_sb_hsdm`, `komentar_sb_hsdm`) VALUES
(4, 'Testoo', '1212121212121', 'Anggota', '/uploads/1724984537983.jpg', 'sqsqsqsq');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sub_bagian_kul`
--

CREATE TABLE `sub_bagian_kul` (
  `id` int(11) NOT NULL,
  `nama_sb_kul` varchar(255) NOT NULL,
  `nip_sb_kul` varchar(30) NOT NULL,
  `posisi_sb_kul` enum('Ketua','Anggota') NOT NULL,
  `foto_sb_kul` varchar(255) NOT NULL,
  `komentar_sb_kul` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `sub_bagian_kul`
--

INSERT INTO `sub_bagian_kul` (`id`, `nama_sb_kul`, `nip_sb_kul`, `posisi_sb_kul`, `foto_sb_kul`, `komentar_sb_kul`) VALUES
(2, 'Testing', '121212', 'Ketua', '/uploads/1724984245652.jpg', ''),
(3, 'Hayoo', '2129198291892', 'Anggota', '/uploads/1724984760926.jpg', 'sqqsqsqsq');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sub_bagian_pdi`
--

CREATE TABLE `sub_bagian_pdi` (
  `id` int(11) NOT NULL,
  `nama_sb_pdi` varchar(255) NOT NULL,
  `nip_sb_pdi` varchar(30) NOT NULL,
  `posisi_sb_pdi` enum('Ketua','Anggota') NOT NULL,
  `foto_sb_pdi` varchar(255) NOT NULL,
  `komentar_sb_pdi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `sub_bagian_pdi`
--

INSERT INTO `sub_bagian_pdi` (`id`, `nama_sb_pdi`, `nip_sb_pdi`, `posisi_sb_pdi`, `foto_sb_pdi`, `komentar_sb_pdi`) VALUES
(2, 'Tesss', '12121212', 'Ketua', '/uploads/1724984337089.jpg', 'sqsqsqsq'),
(5, 'Tesssssss', '2182918212918', 'Ketua', '/uploads/1725257458089.png', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sub_bagian_tppph`
--

CREATE TABLE `sub_bagian_tppph` (
  `id` int(11) NOT NULL,
  `nama_sb_tppph` varchar(255) NOT NULL,
  `nip_sb_tppph` varchar(30) NOT NULL,
  `posisi_sb_tppph` enum('Ketua','Anggota') NOT NULL,
  `foto_sb_tppph` varchar(255) NOT NULL,
  `komentar_sb_tppph` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `sub_bagian_tppph`
--

INSERT INTO `sub_bagian_tppph` (`id`, `nama_sb_tppph`, `nip_sb_tppph`, `posisi_sb_tppph`, `foto_sb_tppph`, `komentar_sb_tppph`) VALUES
(2, 'Testing', 'PPNPN', 'Anggota', '/uploads/1724946770209.jpg', 'qqqqqq');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `email` varchar(250) NOT NULL,
  `role` enum('operator','admin') NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`email`, `role`, `password`) VALUES
('admin_kpu1@gmail.com', 'admin', '$2b$10$LPIUgsaABgnDRrXjOu99C.KCla9OGD/reYjkton.5vPxtWT5wa7Ii'),
('operator_kpu1@gmail.com', 'operator', '$2b$10$vveEpynWL1eAmXI0pObKvuGFql7vy.5Eglf3nm.jVt9EFdUHvG8me');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `divisi_hp`
--
ALTER TABLE `divisi_hp`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `divisi_kurl`
--
ALTER TABLE `divisi_kurl`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `divisi_pdi`
--
ALTER TABLE `divisi_pdi`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `divisi_sppp_sdm`
--
ALTER TABLE `divisi_sppp_sdm`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `divisi_tp`
--
ALTER TABLE `divisi_tp`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sekretaris`
--
ALTER TABLE `sekretaris`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sub_bagian_hsdm`
--
ALTER TABLE `sub_bagian_hsdm`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sub_bagian_kul`
--
ALTER TABLE `sub_bagian_kul`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sub_bagian_pdi`
--
ALTER TABLE `sub_bagian_pdi`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sub_bagian_tppph`
--
ALTER TABLE `sub_bagian_tppph`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `divisi_hp`
--
ALTER TABLE `divisi_hp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT untuk tabel `divisi_kurl`
--
ALTER TABLE `divisi_kurl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `divisi_pdi`
--
ALTER TABLE `divisi_pdi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `divisi_sppp_sdm`
--
ALTER TABLE `divisi_sppp_sdm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `divisi_tp`
--
ALTER TABLE `divisi_tp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `sekretaris`
--
ALTER TABLE `sekretaris`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `sub_bagian_hsdm`
--
ALTER TABLE `sub_bagian_hsdm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `sub_bagian_kul`
--
ALTER TABLE `sub_bagian_kul`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `sub_bagian_pdi`
--
ALTER TABLE `sub_bagian_pdi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `sub_bagian_tppph`
--
ALTER TABLE `sub_bagian_tppph`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
