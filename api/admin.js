const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Konfigurasi koneksi database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kp_project'
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
// Endpoint untuk upload file
app.post('/api/upload', upload.single('foto_div_hp'), (req, res) => {
    const { nama_div_hp, nip_div_hp, jabatan_div_hp } = req.body;
    const fotoPath = `/uploads/${req.file.filename}`;

    const query = 'INSERT INTO divisi_hp (nama_div_hp, nip_div_hp, jabatan_div_hp, foto_div_hp) VALUES (?, ?, ?, ?)';
    db.query(query, [nama_div_hp, nip_div_hp, jabatan_div_hp, fotoPath], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json({ message: 'Data inserted successfully' });
    });
});


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
app.post('/api/add-comment-divisi-hp', (req, res) => {
    const { userId, comment } = req.body;

    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }

    const query = 'UPDATE divisi_hp SET komentar = ? WHERE id = ?';
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
// ===================================== End Endpoint buat halaman Sub Bagian TPPPH =====================================

// Memulai Server
app.listen(5001, () => {
    console.log('Operator server running on port 5001');
});