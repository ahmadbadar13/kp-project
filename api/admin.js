const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Konfigurasi koneksi database
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'kp_project'
// });

const db = mysql.createConnection({
    host: 'bz4kzerb13skvzsklu2n-mysql.services.clever-cloud.com',
    user: 'uteofvtkhgj76a2o',
    password: 'WW8UkNEM2x3438ppvsUv',
    database: 'bz4kzerb13skvzsklu2n'
  });

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Database connected!');
});

// Konfigurasi multer untuk mengatur upload file
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.join(__dirname, '../uploads');
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    }),
});

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ===================================== Start endpoint buat halaman Divisi HP =====================================
// Endpoint untuk read data anggota
app.get('/api/divisi-hp-adm', (req, res) => {
    const query = 'SELECT * FROM divisi_hp';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar
app.post('/api/tambah-komentar-divisi-hp', (req, res) => {
    const { userId, comment } = req.body;

    // Validasi input
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }

    const query = 'UPDATE divisi_hp SET komentar_div_hp = ? WHERE id = ?';
    db.query(query, [comment, userId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'Comment added successfully' });
    });
});
// ===================================== End Endpoint buat halaman Divisi HP =====================================


// ===================================== Start endpoint buat halaman Divisi KURL =====================================
// Endpoint untuk read data anggota
app.get('/api/divisi-kurl-adm', (req, res) => {
    const query = 'SELECT * FROM divisi_kurl';
        db.query(query, (err, results) => {
            if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar
app.post('/api/tambah-komentar-divisi-kurl', (req, res) => {
    const { userId, comment } = req.body;

    // Validasi input
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }

    const query = 'UPDATE divisi_kurl SET komentar_div_kurl = ? WHERE id = ?';
    db.query(query, [comment, userId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'Comment added successfully' });
    });
});
// ===================================== End Endpoint buat halaman Divisi KURL =====================================


// ===================================== Start endpoint buat halaman Divisi PDI =====================================
// Endpoint untuk read data anggota
app.get('/api/divisi-pdi-adm', (req, res) => {
    const query = 'SELECT * FROM divisi_pdi';
        db.query(query, (err, results) => {
            if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
            }
        res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar
app.post('/api/tambah-komentar-divisi-pdi', (req, res) => {
    const { userId, comment } = req.body;

    // Validasi input
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }

    const query = 'UPDATE divisi_pdi SET komentar_div_pdi = ? WHERE id = ?';
    db.query(query, [comment, userId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'Comment added successfully' });
    });
});
// ===================================== End Endpoint buat halaman Divisi PDI =====================================


// ===================================== Start endpoint buat halaman Divisi SPPP SDM =====================================
// Endpoint untuk read data anggota
app.get('/api/divisi-sppp_sdm-adm', (req, res) => {
    const query = 'SELECT * FROM divisi_sppp_sdm';
        db.query(query, (err, results) => {
            if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar
app.post('/api/tambah-komentar-divisi-sppp_sdm', (req, res) => {
    const { userId, comment } = req.body;

    // Validasi input
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }

    const query = 'UPDATE divisi_sppp_sdm SET komentar_div_sppp_sdm = ? WHERE id = ?';
    db.query(query, [comment, userId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'Comment added successfully' });
    });
});
// ===================================== End Endpoint buat halaman Divisi SPPP SDM =====================================


// ===================================== Start endpoint buat halaman Divisi TP =====================================
// Endpoint untuk read data anggota
app.get('/api/divisi-tp-adm', (req, res) => {
    const query = 'SELECT * FROM divisi_tp';
        db.query(query, (err, results) => {
            if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar
app.post('/api/tambah-komentar-divisi-tp', (req, res) => {
    const { userId, comment } = req.body;

    // Validasi input
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }

    const query = 'UPDATE divisi_tp SET komentar_div_tp = ? WHERE id = ?';
    db.query(query, [comment, userId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'Comment added successfully' });
    });
});
// ===================================== End Endpoint buat halaman Divisi TP =====================================


// ===================================== Start endpoint buat halaman Sekretaris =====================================
// Endpoint untuk read data anggota
app.get('/api/sekretaris-adm', (req, res) => {
    const query = 'SELECT * FROM sekretaris';
        db.query(query, (err, results) => {
            if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar
app.post('/api/tambah-komentar-sekretaris', (req, res) => {
    const { userId, comment } = req.body;

    // Validasi input
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }

    const query = 'UPDATE sekretaris SET komentar_sekretaris = ? WHERE id = ?';
    db.query(query, [comment, userId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'Comment added successfully' });
    });
});
// ===================================== End Endpoint buat halaman Sekretaris =====================================


// ===================================== Start endpoint buat halaman Sub Bagian HSDM =====================================
// Endpoint untuk read data anggota
app.get('/api/sub-bagian-hsdm-adm', (req, res) => {
    const query = 'SELECT * FROM sub_bagian_hsdm';
        db.query(query, (err, results) => {
            if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar
app.post('/api/tambah-komentar-sb-hsdm', (req, res) => {
    const { userId, comment } = req.body;

    // Validasi input
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }

    const query = 'UPDATE sub_bagian_hsdm SET komentar_sb_hsdm = ? WHERE id = ?';
    db.query(query, [comment, userId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'Comment added successfully' });
    });
});
// ===================================== End Endpoint buat halaman Sub Bagian HSDM =====================================


// ===================================== Start endpoint buat halaman Sub Bagian KUL =====================================
// Endpoint untuk read data anggota
app.get('/api/sub-bagian-kul-adm', (req, res) => {
    const query = 'SELECT * FROM sub_bagian_kul';
        db.query(query, (err, results) => {
            if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar
app.post('/api/tambah-komentar-sb-kul', (req, res) => {
    const { userId, comment } = req.body;

    // Validasi input
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }

    const query = 'UPDATE sub_bagian_kul SET komentar_sb_kul = ? WHERE id = ?';
    db.query(query, [comment, userId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'Comment added successfully' });
    });
});
// ===================================== End Endpoint buat halaman Sub Bagian KUL =====================================


// ===================================== Start endpoint buat halaman Sub Bagian PDI =====================================
// Endpoint untuk read data anggota
app.get('/api/sub-bagian-pdi-adm', (req, res) => {
    const query = 'SELECT * FROM sub_bagian_pdi';
        db.query(query, (err, results) => {
            if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar
app.post('/api/tambah-komentar-sb-pdi', (req, res) => {
    const { userId, comment } = req.body;

    // Validasi input
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }

    const query = 'UPDATE sub_bagian_pdi SET komentar_sb_pdi = ? WHERE id = ?';
    db.query(query, [comment, userId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'Comment added successfully' });
    });
});
// ===================================== End Endpoint buat halaman Sub Bagian PDI =====================================


// ===================================== Start endpoint buat halaman Sub Bagian TPPPH =====================================
// Endpoint untuk read data anggota
app.get('/api/sub-bagian-tppph-adm', (req, res) => {
    const query = 'SELECT * FROM sub_bagian_tppph';
        db.query(query, (err, results) => {
            if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar
app.post('/api/tambah-komentar-sb-tppph', (req, res) => {
    const { userId, comment } = req.body;

    // Validasi input
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }

    const query = 'UPDATE sub_bagian_tppph SET komentar_sb_tppph = ? WHERE id = ?';
    db.query(query, [comment, userId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'Comment added successfully' });
    });
});
// ===================================== End Endpoint buat halaman Sub Bagian TPPPH =====================================

// ===================================== Start endpoint buat halaman Dashboard Struktur Organisasi =====================================
// API untuk mendapatkan data struktur organisasi
app.get('/api/struktur-organisasi', (req, res) => {
    const queries = [
      'SELECT foto_div_kurl AS foto, nama_div_kurl AS nama, "Ketua" AS peran FROM divisi_kurl LIMIT 1',
      'SELECT foto_div_tp AS foto, nama_div_tp AS nama, "Anggota" AS peran FROM divisi_tp LIMIT 1',
      'SELECT foto_div_pdi AS foto, nama_div_pdi AS nama, "Anggota" AS peran FROM divisi_pdi LIMIT 1',
      'SELECT foto_div_hp AS foto, nama_div_hp AS nama, "Anggota" AS peran FROM divisi_hp LIMIT 1',
      'SELECT foto_div_sppp_sdm AS foto, nama_div_sppp_sdm AS nama, "Anggota" AS peran FROM divisi_sppp_sdm LIMIT 1',
    ];
  
    Promise.all(queries.map((query) => new Promise((resolve, reject) => {
      db.query(query, (error, results) => {
        if (error) return reject(error);
        resolve(results[0]);
      });
    })))
    .then(results => res.json(results))
    .catch(err => res.status(500).json({ error: err.message }));
  });
// ===================================== End endpoint buat halaman Dashboard Struktur Organisasi =====================================
  
// Memulai Server
app.listen(5001, () => {
    console.log('Admin server running on port 5001');
});