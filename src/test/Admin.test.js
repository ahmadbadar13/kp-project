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

// ===================================== Start endpoint untuk semua divisi =====================================
// Endpoint untuk mendapatkan daftar anggota divisi HP
app.get('/api/divisi-hp-adm', (req, res) => {
    const query = 'SELECT * FROM divisi_hp'; // Ganti dengan query yang sesuai
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching members:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar ke divisi HP
app.post('/api/tambah-komentar-divisi-hp', (req, res) => {
    const { userId, comment } = req.body;
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }
    
    const query = 'INSERT INTO divisi_hp (id, komentar_div_hp) VALUES (?, ?)';
    db.query(query, [userId, comment], (error, results) => {
        if (error) {
            console.error('Error adding comment:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json({ message: 'Comment added successfully' });
    });
});

// Endpoint untuk mendapatkan daftar anggota divisi KURL
app.get('/api/divisi-kurl', (req, res) => {
    const query = 'SELECT * FROM divisi_kurl'; // Ganti dengan query yang sesuai
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching members:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar ke divisi KURL
app.post('/api/tambah-komentar-divisi-kurl', (req, res) => {
    const { userId, comment } = req.body;
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }
    
    const query = 'INSERT INTO divisi_kurl (id, komentar_div_kurl) VALUES (?, ?)';
    db.query(query, [userId, comment], (error, results) => {
        if (error) {
            console.error('Error adding comment:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json({ message: 'Comment added successfully' });
    });
});

// Endpoint untuk mendapatkan daftar anggota divisi PDI
app.get('/api/divisi-pdi', (req, res) => {
    const query = 'SELECT * FROM divisi_pdi'; // Ganti dengan query yang sesuai
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching members:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar ke divisi PDI
app.post('/api/tambah-komentar-divisi-pdi', (req, res) => {
    const { userId, comment } = req.body;
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }
    
    const query = 'INSERT INTO divisi_pdi (id, komentar_div_pdi) VALUES (?, ?)';
    db.query(query, [userId, comment], (error, results) => {
        if (error) {
            console.error('Error adding comment:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json({ message: 'Comment added successfully' });
    });
});

// Endpoint untuk mendapatkan daftar anggota divisi SPPP_SDM
app.get('/api/divisi-sppp_sdm', (req, res) => {
    const query = 'SELECT * FROM divisi_sppp_sdm'; // Ganti dengan query yang sesuai
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching members:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar ke divisi SPPP_SDM
app.post('/api/tambah-komentar-divisi-sppp_sdm', (req, res) => {
    const { userId, comment } = req.body;
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }
    
    const query = 'INSERT INTO divisi_sppp_sdm (id, komentar_div_sppp_sdm) VALUES (?, ?)';
    db.query(query, [userId, comment], (error, results) => {
        if (error) {
            console.error('Error adding comment:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json({ message: 'Comment added successfully' });
    });
});

// Endpoint untuk mendapatkan daftar anggota divisi TP
app.get('/api/divisi-tp', (req, res) => {
    const query = 'SELECT * FROM divisi_tp'; // Ganti dengan query yang sesuai
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching members:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar ke divisi TP
app.post('/api/tambah-komentar-divisi-tp', (req, res) => {
    const { userId, comment } = req.body;
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }
    
    const query = 'INSERT INTO divisi_tp (id, komentar_div_tp) VALUES (?, ?)';
    db.query(query, [userId, comment], (error, results) => {
        if (error) {
            console.error('Error adding comment:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json({ message: 'Comment added successfully' });
    });
});

// Endpoint untuk mendapatkan daftar anggota sekretaris
app.get('/api/sekretaris', (req, res) => {
    const query = 'SELECT * FROM sekretaris'; // Ganti dengan query yang sesuai
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching members:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar ke sekretaris
app.post('/api/tambah-komentar-sekretaris', (req, res) => {
    const { userId, comment } = req.body;
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }
    
    const query = 'INSERT INTO sekretaris (id, komentar_sekretaris) VALUES (?, ?)';
    db.query(query, [userId, comment], (error, results) => {
        if (error) {
            console.error('Error adding comment:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json({ message: 'Comment added successfully' });
    });
});

// Endpoint untuk mendapatkan daftar anggota sub bagian HSDM
app.get('/api/sub-bagian-hsdm', (req, res) => {
    const query = 'SELECT * FROM sub_bagian_hsdm'; // Ganti dengan query yang sesuai
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching members:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar ke sub bagian HSDM
app.post('/api/tambah-komentar-sub-bagian-hsdm', (req, res) => {
    const { userId, comment } = req.body;
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }
    
    const query = 'INSERT INTO sub_bagian_hsdm (id, komentar_sb_hsdm) VALUES (?, ?)';
    db.query(query, [userId, comment], (error, results) => {
        if (error) {
            console.error('Error adding comment:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json({ message: 'Comment added successfully' });
    });
});

// Endpoint untuk mendapatkan daftar anggota sub bagian KUL
app.get('/api/sub-bagian-kul', (req, res) => {
    const query = 'SELECT * FROM sub_bagian_kul'; // Ganti dengan query yang sesuai
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching members:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar ke sub bagian KUL
app.post('/api/tambah-komentar-sub-bagian-kul', (req, res) => {
    const { userId, comment } = req.body;
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }
    
    const query = 'INSERT INTO sub_bagian_kul (id, komentar_sb_kul) VALUES (?, ?)';
    db.query(query, [userId, comment], (error, results) => {
        if (error) {
            console.error('Error adding comment:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json({ message: 'Comment added successfully' });
    });
});

// Endpoint untuk mendapatkan daftar anggota sub bagian PDI
app.get('/api/sub-bagian-pdi', (req, res) => {
    const query = 'SELECT * FROM sub_bagian_pdi'; // Ganti dengan query yang sesuai
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching members:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar ke sub bagian PDI
app.post('/api/tambah-komentar-sub-bagian-pdi', (req, res) => {
    const { userId, comment } = req.body;
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }
    
    const query = 'INSERT INTO sub_bagian_pdi (id, komentar_sb_pdi) VALUES (?, ?)';
    db.query(query, [userId, comment], (error, results) => {
        if (error) {
            console.error('Error adding comment:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json({ message: 'Comment added successfully' });
    });
});

// Endpoint untuk mendapatkan daftar anggota sub bagian TPPPH
app.get('/api/sub-bagian-tppph', (req, res) => {
    const query = 'SELECT * FROM sub_bagian_tppph'; // Ganti dengan query yang sesuai
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching members:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json(results);
    });
});

// Endpoint untuk menambahkan komentar ke sub bagian TPPPH
app.post('/api/tambah-komentar-sub-bagian-tppph', (req, res) => {
    const { userId, comment } = req.body;
    if (!userId || !comment) {
        return res.status(400).json({ error: 'User ID and comment are required' });
    }
    
    const query = 'INSERT INTO sub_bagian_tppph (id, komentar_sb_tppph) VALUES (?, ?)';
    db.query(query, [userId, comment], (error, results) => {
        if (error) {
            console.error('Error adding comment:', error);
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

    // Test GET data anggota divisi HP
    it('GET /api/divisi-hp-adm should return a list of members', async () => {
        const response = await request(server).get('/api/divisi-hp-adm');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test POST menambahkan komentar ke divisi HP
    it('POST /api/tambah-komentar-divisi-hp should add a comment', async () => {
        const response = await request(server)
            .post('/api/tambah-komentar-divisi-hp')
            .send({
                userId: 68, // Ganti dengan ID pengguna yang valid
                comment: 'Ini adalah komentar.'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Comment added successfully');
    });

    // Test kasus dengan input tidak valid untuk divisi HP
    it('POST /api/tambah-komentar-divisi-hp should return error for missing fields', async () => {
        const response = await request(server)
            .post('/api/tambah-komentar-divisi-hp')
            .send({
                userId: 68 // Hanya ID pengguna, komentar hilang
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('User ID and comment are required');
    });

    // Test GET data anggota divisi KURL
    it('GET /api/divisi-kurl should return a list of members', async () => {
        const response = await request(server).get('/api/divisi-kurl');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test POST menambahkan komentar ke divisi KURL
    it('POST /api/tambah-komentar-divisi-kurl should add a comment', async () => {
        const response = await request(server)
            .post('/api/tambah-komentar-divisi-kurl')
            .send({
                userId: 12, // Ganti dengan ID pengguna yang valid
                comment: 'Komentar untuk KURL.'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Comment added successfully');
    });

    // Test GET data anggota divisi PDI
    it('GET /api/divisi-pdi should return a list of members', async () => {
        const response = await request(server).get('/api/divisi-pdi');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test POST menambahkan komentar ke divisi PDI
    it('POST /api/tambah-komentar-divisi-pdi should add a comment', async () => {
        const response = await request(server)
            .post('/api/tambah-komentar-divisi-pdi')
            .send({
                userId: 7, // Ganti dengan ID pengguna yang valid
                comment: 'Komentar untuk PDI.'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Comment added successfully');
    });

    // Test GET data anggota divisi SPPP_SDM
    it('GET /api/divisi-sppp_sdm should return a list of members', async () => {
        const response = await request(server).get('/api/divisi-sppp_sdm');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test POST menambahkan komentar ke divisi SPPP_SDM
    it('POST /api/tambah-komentar-divisi-sppp_sdm should add a comment', async () => {
        const response = await request(server)
            .post('/api/tambah-komentar-divisi-sppp_sdm')
            .send({
                userId: 8, // Ganti dengan ID pengguna yang valid
                comment: 'Komentar untuk SPPP_SDM.'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Comment added successfully');
    });

    // Test GET data anggota divisi TP
    it('GET /api/divisi-tp should return a list of members', async () => {
        const response = await request(server).get('/api/divisi-tp');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test POST menambahkan komentar ke divisi TP
    it('POST /api/tambah-komentar-divisi-tp should add a comment', async () => {
        const response = await request(server)
            .post('/api/tambah-komentar-divisi-tp')
            .send({
                userId: 9, // Ganti dengan ID pengguna yang valid
                comment: 'Komentar untuk TP.'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Comment added successfully');
    });

    // Test GET data anggota Sekretaris
    it('GET /api/sekretaris should return a list of members', async () => {
        const response = await request(server).get('/api/sekretaris');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test POST menambahkan komentar ke Sekretaris
    it('POST /api/tambah-komentar-sekretaris should add a comment', async () => {
        const response = await request(server)
            .post('/api/tambah-komentar-sekretaris')
            .send({
                userId: 5, // Ganti dengan ID pengguna yang valid
                comment: 'Komentar untuk Sekretaris.'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Comment added successfully');
    });

    // Test GET data anggota sub bagian HSDM
    it('GET /api/sub-bagian-hsdm should return a list of members', async () => {
        const response = await request(server).get('/api/sub-bagian-hsdm');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test POST menambahkan komentar ke sub bagian HSDM
    it('POST /api/tambah-komentar-sub-bagian-hsdm should add a comment', async () => {
        const response = await request(server)
            .post('/api/tambah-komentar-sub-bagian-hsdm')
            .send({
                userId: 6, // Ganti dengan ID pengguna yang valid
                comment: 'Komentar untuk sub bagian HSDM.'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Comment added successfully');
    });

    // Test GET data anggota sub bagian KUL
    it('GET /api/sub-bagian-kul should return a list of members', async () => {
        const response = await request(server).get('/api/sub-bagian-kul');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test POST menambahkan komentar ke sub bagian KUL
    it('POST /api/tambah-komentar-sub-bagian-kul should add a comment', async () => {
        const response = await request(server)
            .post('/api/tambah-komentar-sub-bagian-kul')
            .send({
                userId: 4, // Ganti dengan ID pengguna yang valid
                comment: 'Komentar untuk sub bagian KUL.'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Comment added successfully');
    });

    // Test GET data anggota sub bagian PDI
    it('GET /api/sub-bagian-pdi should return a list of members', async () => {
        const response = await request(server).get('/api/sub-bagian-pdi');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test POST menambahkan komentar ke sub bagian PDI
    it('POST /api/tambah-komentar-sub-bagian-pdi should add a comment', async () => {
        const response = await request(server)
            .post('/api/tambah-komentar-sub-bagian-pdi')
            .send({
                userId: 7, // Ganti dengan ID pengguna yang valid
                comment: 'Komentar untuk sub bagian PDI.'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Comment added successfully');
    });

    // Test GET data anggota sub bagian TPPPH
    it('GET /api/sub-bagian-tppph should return a list of members', async () => {
        const response = await request(server).get('/api/sub-bagian-tppph');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test POST menambahkan komentar ke sub bagian TPPPH
    it('POST /api/tambah-komentar-sub-bagian-tppph should add a comment', async () => {
        const response = await request(server)
            .post('/api/tambah-komentar-sub-bagian-tppph')
            .send({
                userId: 4, // Ganti dengan ID pengguna yang valid
                comment: 'Komentar untuk sub bagian TPPPH.'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Comment added successfully');
    });
});
