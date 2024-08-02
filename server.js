const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

// Konfigurasi koneksi database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kp_project'
});

db.connect();

const app = express();

// Konfigurasi multer untuk mengatur upload file
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  })
});

app.use(bodyParser.json());
app.use(cors());

// Endpoint untuk memeriksa kredensial
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
  
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (results.length > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Endpoint untuk menambahkan pengguna
app.post('/api/users', upload.single('photo'), (req, res) => {
  const { name, nip, position } = req.body;
  const photo = req.file ? req.file.filename : null;

  const query = 'INSERT INTO divisi_hp (nama_div_hp, nip_div_hp, jabatan_div_hp, foto_div_hp) VALUES (?, ?, ?, ?)';
  
  db.query(query, [name, nip, position, photo], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, message: 'User added successfully' });
  });
});

// Endpoint untuk mendapatkan daftar pengguna
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM divisi_hp';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Endpoint untuk menghapus pengguna
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM divisi_hp WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
