const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Membuat aplikasi Express untuk pengujian
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Konfigurasi multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Menambahkan timestamp ke nama file
    },
});
const upload = multer({ storage });

// Konfigurasi koneksi database (ganti dengan pengaturan database Anda)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kp_project',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Database connected!');
});

// Tambahkan endpoint yang ingin diuji

// Endpoint untuk upload file
app.post('/api/upload', upload.single('foto_div_hp'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { nama_div_hp} = req.body;
    const fotoPath = `/uploads/${req.file.filename}`;

    const query = 'INSERT INTO divisi_hp (nama_div_hp, foto_div_hp) VALUES (?, ?)';
    db.query(query, [nama_div_hp,  fotoPath], (err, results) => {
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

// Menjalankan pengujian
beforeAll((done) => {
    const insertDummyUser = 'INSERT INTO divisi_hp (nama_div_hp) VALUES (?)';
    db.query(insertDummyUser, ['Dummy User', '000001', 'Anggota'], (err, results) => {
        if (err) {
            console.error('Error inserting dummy user:', err);
        }
        done();
    });
});

describe('API Endpoints', () => {
    it('should upload a file and insert data successfully', async () => {
        const response = await request(app)
            .post('/api/upload')
            .field('nama_div_hp', 'Divisi HP')
            .field('jabatan_div_hp', 'Ketua')
            .attach('foto_div_hp', path.join(__dirname, '../../uploads/1723100163104.png')); 

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Data inserted successfully');
    });

    it('should get all members from divisi_hp', async () => {
        const response = await request(app).get('/api/divisi-hp-adm');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should add a comment successfully', async () => {
        const response = await request(app)
            .post('/api/tambah-komentar-divisi-hp')
            .send({ userId: 64, comment: 'Test comment' });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Comment added successfully');
    });
});

// Menjalankan server untuk pengujian
const server = app.listen(5003, () => {
    console.log('Test server running on port 5003');
});

// Menghentikan server setelah semua tes selesai
afterAll((done) => {
    server.close();
    db.end();
    done();
});