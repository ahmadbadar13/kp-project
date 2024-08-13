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
  if (err) throw err;
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
  })
});

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


// ===================================== Start endpoint buat halaman Divisi HP =====================================
// Endpoint untuk creat data anggota
app.post('/api/divisi-hp-op', upload.single('photo'), (req, res) => {
  const { name, nip, position } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO divisi_hp (nama_div_hp, nip_div_hp, posisi_div_hp, foto_div_hp) VALUES (?, ?, ?, ?)';
  db.query(query, [name, nip, position, photo], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, message: 'User added successfully' });
  });
});

// Endpoint untuk read data anggota
app.get('/api/divisi-hp-op', (req, res) => {
  const query = 'SELECT * FROM divisi_hp';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Endpoint untuk update data anggota
app.put('/api/divisi-hp-op/:id', upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const { name, nip, position } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  // Query untuk mendapatkan data anggota yang ada
  const getUserQuery = 'SELECT * FROM divisi_hp WHERE id = ?';
  db.query(getUserQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    // Data yang akan diperbarui
    const updatedName = name || results[0].nama_div_hp;
    const updatedNip = nip || results[0].nip_div_hp;
    const updatedPosition = position || results[0].posisi_div_hp;
    const updatedPhoto = photo || results[0].foto_div_hp;

    // Query untuk memperbarui data anggota
    const updateUserQuery = 'UPDATE divisi_hp SET nama_div_hp = ?, nip_div_hp = ?, posisi_div_hp = ?, foto_div_hp = ? WHERE id = ?';
    db.query(updateUserQuery, [updatedName, updatedNip, updatedPosition, updatedPhoto, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ success: true, message: 'User updated successfully' });
    });
  });
});

// Endpoint untuk delete data anggota
app.delete('/api/divisi-hp-op/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM divisi_hp WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  });
});

app.listen(5001, () => {
  console.log('Operator server running on port 5001');
});
// ===================================== Start Endpoint buat halaman Divisi HP =====================================


// ===================================== Start endpoint buat halaman Divisi KURL =====================================
// Endpoint untuk creat data anggota
app.post('/api/divisi-kurl-op', upload.single('photo'), (req, res) => {
  const { name, nip, position } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO divisi_kurl (nama_div_kurl, nip_div_kurl, posisi_div_kurl, foto_div_kurl) VALUES (?, ?, ?, ?)';
  db.query(query, [name, nip, position, photo], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, message: 'User added successfully' });
  });
});

// Endpoint untuk read data anggota
app.get('/api/divisi-kurl-op', (req, res) => {
  const query = 'SELECT * FROM divisi_kurl';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Endpoint untuk update data anggota
app.put('/api/divisi-kurl-op/:id', upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const { name, nip, position } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  // Query untuk mendapatkan data anggota yang ada
  const getUserQuery = 'SELECT * FROM divisi_kurl WHERE id = ?';
  db.query(getUserQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    // Data yang akan diperbarui
    const updatedName = name || results[0].nama_div_kurl;
    const updatedNip = nip || results[0].nip_div_kurl;
    const updatedPosition = position || results[0].posisi_div_kurl;
    const updatedPhoto = photo || results[0].foto_div_kurl;

    // Query untuk memperbarui data anggota
    const updateUserQuery = 'UPDATE divisi_kurl SET nama_div_kurl = ?, nip_div_kurl = ?, posisi_div_kurl = ?, foto_div_kurl = ? WHERE id = ?';
    db.query(updateUserQuery, [updatedName, updatedNip, updatedPosition, updatedPhoto, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ success: true, message: 'User updated successfully' });
    });
  });
});

// Endpoint untuk delete data anggota
app.delete('/api/divisi-kurl-op/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM divisi_kurl WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  });
});
// ===================================== End endpoint buat halaman Divisi KURL =====================================


// ===================================== Start endpoint buat halaman Divisi PDI =====================================
// Endpoint untuk creat data anggota
app.post('/api/divisi-pdi-op', upload.single('photo'), (req, res) => {
  const { name, nip, position } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO divisi_pdi (nama_div_pdi, nip_div_pdi, posisi_div_pdi, foto_div_pdi) VALUES (?, ?, ?, ?)';
  db.query(query, [name, nip, position, photo], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, message: 'User added successfully' });
  });
});

// Endpoint untuk read data anggota
app.get('/api/divisi-pdi-op', (req, res) => {
  const query = 'SELECT * FROM divisi_pdi';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Endpoint untuk update data anggota
app.put('/api/divisi-pdi-op/:id', upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const { name, nip, position } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  // Query untuk mendapatkan data anggota yang ada
  const getUserQuery = 'SELECT * FROM divisi_pdi WHERE id = ?';
  db.query(getUserQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    // Data yang akan diperbarui
    const updatedName = name || results[0].nama_div_pdi;
    const updatedNip = nip || results[0].nip_div_pdi;
    const updatedPosition = position || results[0].posisi_div_pdi;
    const updatedPhoto = photo || results[0].foto_div_pdi;

    // Query untuk memperbarui data anggota
    const updateUserQuery = 'UPDATE divisi_pdi SET nama_div_pdi = ?, nip_div_pdi = ?, posisi_div_pdi = ?, foto_div_pdi = ? WHERE id = ?';
    db.query(updateUserQuery, [updatedName, updatedNip, updatedPosition, updatedPhoto, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ success: true, message: 'User updated successfully' });
    });
  });
});

// Endpoint untuk delete data anggota
app.delete('/api/divisi-pdi-op/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM divisi_pdi WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  });
});
// ===================================== End endpoint buat halaman Divisi PDI =====================================


// ===================================== Start endpoint buat halaman Divisi SPPP_SDM =====================================
// Endpoint untuk creat data anggota
app.post('/api/divisi-sppp_sdm-op', upload.single('photo'), (req, res) => {
  const { name, nip, position } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO divisi_sppp_sdm (nama_div_sppp_sdm, nip_div_sppp_sdm, posisi_div_sppp_sdm, foto_div_sppp_sdm) VALUES (?, ?, ?, ?)';
  db.query(query, [name, nip, position, photo], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, message: 'User added successfully' });
  });
});

// Endpoint untuk read data anggota
app.get('/api/divisi-sppp_sdm-op', (req, res) => {
  const query = 'SELECT * FROM divisi_sppp_sdm';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Endpoint untuk update data anggota
app.put('/api/divisi-sppp_sdm-op/:id', upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const { name, nip, position } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  // Query untuk mendapatkan data anggota yang ada
  const getUserQuery = 'SELECT * FROM divisi_sppp_sdm WHERE id = ?';
  db.query(getUserQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    // Data yang akan diperbarui
    const updatedName = name || results[0].nama_div_sppp_sdm;
    const updatedNip = nip || results[0].nip_div_sppp_sdm;
    const updatedPosition = position || results[0].posisi_div_sppp_sdm;
    const updatedPhoto = photo || results[0].foto_div_sppp_sdm;

    // Query untuk memperbarui data anggota
    const updateUserQuery = 'UPDATE divisi_sppp_sdm SET nama_div_sppp_sdm = ?, nip_div_sppp_sdm = ?, posisi_div_sppp_sdm = ?, foto_div_sppp_sdm = ? WHERE id = ?';
    db.query(updateUserQuery, [updatedName, updatedNip, updatedPosition, updatedPhoto, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ success: true, message: 'User updated successfully' });
    });
  });
});

// Endpoint untuk delete data anggota
app.delete('/api/divisi-sppp_sdm-op/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM divisi_sppp_sdm WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  });
});
// ===================================== End endpoint buat halaman Divisi SPPP_SDM =====================================