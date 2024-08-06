const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

const app = express();

// Konfigurasi koneksi database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kp_project'
});

db.connect();

// Konfigurasi multer untuk mengatur upload file
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  })
});

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoint untuk menambahkan pengguna
app.post('/api/users', upload.single('photo'), (req, res) => {
  const { name, nip, position } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

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

// Endpoint untuk mengedit data pengguna
app.put('/api/users/:id', upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const { name, nip, position } = req.body;
  const photo = req.file ? req.file.filename : null;

  // Query untuk mendapatkan data pengguna yang ada
  const getUserQuery = 'SELECT * FROM divisi_hp WHERE id = ?';
  db.query(getUserQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Data yang akan diperbarui
    const updatedName = name || results[0].nama_div_hp;
    const updatedNip = nip || results[0].nip_div_hp;
    const updatedPosition = position || results[0].jabatan_div_hp;
    const updatedPhoto = photo || results[0].foto_div_hp;

    // Query untuk memperbarui data pengguna
    const updateUserQuery = 'UPDATE divisi_hp SET nama_div_hp = ?, nip_div_hp = ?, jabatan_div_hp = ?, foto_div_hp = ? WHERE id = ?';
    db.query(updateUserQuery, [updatedName, updatedNip, updatedPosition, updatedPhoto, id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ success: true, message: 'User updated successfully' });
    });
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

app.listen(5001, () => {
  console.log('DivisiHP server running on port 5001');
});
