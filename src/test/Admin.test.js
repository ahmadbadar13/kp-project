const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

// Membuat aplikasi Express untuk pengujian
const app = express();

// Konfigurasi koneksi database untuk pengujian
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kp_project' // Ganti dengan nama database yang Anda gunakan untuk pengujian
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Database connected!');
});

// Konfigurasi middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoint untuk mendapatkan daftar anggota
app.get('/api/divisi-hp-adm', (req, res) => {
    const query = 'SELECT * FROM divisi_hp'; // Ganti dengan query yang sesuai
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching members:', error); // Logging error
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar
app.post('/api/tambah-komentar-divisi-hp', (req, res) => {
    const { userId, comment } = req.body;
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }
    
    // Misalnya, simpan komentar ke database
    const query = 'INSERT INTO divisi_hp (id, komentar_div_hp) VALUES (?, ?)';
    db.query(query, [userId, comment], (error, results) => {
        if (error) {
            console.error('Error adding comment:', error); // Logging error
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json({ message: 'Comment added successfully' });
    });
});

// Memulai Server untuk Pengujian
const server = app.listen(5003, () => {
    console.log('Test server running on port 5003');
});

// Test Case
describe('API Tests', () => {
    afterAll((done) => {
        server.close();
        db.end(); // Menutup koneksi database
        done();
    });

    // Test GET data anggota
    it('GET /api/divisi-hp-adm should return a list of members', async () => {
        const response = await request(server).get('/api/divisi-hp-adm');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test POST menambahkan komentar
    it('POST /api/tambah-komentar-divisi-hp should add a comment', async () => {
        const response = await request(server)
            .post('/api/tambah-komentar-divisi-hp')
            .send({
                userId: 65, // Ganti dengan ID pengguna yang valid
                comment: 'Ini adalah komentar.'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Comment added successfully');
    });

    // Test kasus dengan input tidak valid
    it('POST /api/tambah-komentar-divisi-hp should return error for missing fields', async () => {
        const response = await request(server)
            .post('/api/tambah-komentar-divisi-hp')
            .send({
                userId: 65 // Hanya ID pengguna, komentar hilang
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('User ID and comment are required');
    });

    // Test endpoint lain serupa...
});