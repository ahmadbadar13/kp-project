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
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'kp_project'
// });

const db = mysql.createConnection({
  host: 'bz4kzerb13skvzsklu2n-mysql.services.clever-cloud.com',
  user: 'uteofvtkhgj76a2o',
  password: 'WW8UkNEM2x3438ppvsUv',
  database: 'bz4kzerb13skvzsklu2n'
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
app.use(cors({
  origin: '*', // Mengizinkan semua origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


// ===================================== Start endpoint buat halaman Divisi HP =====================================
// Endpoint untuk create data anggota
app.post('/api/divisi-hp-op', upload.single('photo'), (req, res) => {
  const { name } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO divisi_hp (nama_div_hp, foto_div_hp) VALUES (?, ?)';
  db.query(query, [name, photo], (err, results) => {
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
  const { name } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  // Query untuk mendapatkan data anggota yang ada
  const getUserQuery = 'SELECT * FROM divisi_hp WHERE id = ?';
  db.query(getUserQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    // Data yang akan diperbarui
    const updatedName = name || results[0].nama_div_hp;
    const updatedPhoto = photo || results[0].foto_div_hp;

    // Query untuk memperbarui data anggota
    const updateUserQuery = 'UPDATE divisi_hp SET nama_div_hp = ?, foto_div_hp = ? WHERE id = ?';
    db.query(updateUserQuery, [updatedName, updatedPhoto, id], (err) => {
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

// Endpoint untuk mengambil komentar berdasarkan id
app.get('/api/komentar-divisi-hp/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'SELECT komentar_div_hp FROM divisi_hp WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ komentar: result[0].komentar_div_hp });
  });
});

// Endpoint untuk menghapus komentar berdasarkan id
app.delete('/api/komentar-divisi-hp/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'UPDATE divisi_hp SET komentar_div_hp = NULL WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ message: 'Komentar berhasil dihapus' });
  });
});
// ===================================== End Endpoint buat halaman Divisi HP =====================================


// ===================================== Start endpoint buat halaman Divisi KURL =====================================
// Endpoint untuk create data anggota
app.post('/api/divisi-kurl-op', upload.single('photo'), (req, res) => {
  const { name } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO divisi_kurl (nama_div_kurl, foto_div_kurl) VALUES (?, ?)';
  db.query(query, [name, photo], (err, results) => {
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
  const { name } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  // Query untuk mendapatkan data anggota yang ada
  const getUserQuery = 'SELECT * FROM divisi_kurl WHERE id = ?';
  db.query(getUserQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    // Data yang akan diperbarui
    const updatedName = name || results[0].nama_div_kurl;
    const updatedPhoto = photo || results[0].foto_div_kurl;

    // Query untuk memperbarui data anggota
    const updateUserQuery = 'UPDATE divisi_kurl SET nama_div_kurl = ?, foto_div_kurl = ? WHERE id = ?';
    db.query(updateUserQuery, [updatedName, updatedPhoto, id], (err) => {
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

// Endpoint untuk mengambil komentar berdasarkan id
app.get('/api/komentar-divisi-kurl/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'SELECT komentar_div_kurl FROM divisi_kurl WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ komentar: result[0].komentar_div_kurl });
  });
});

// Endpoint untuk menghapus komentar berdasarkan id
app.delete('/api/komentar-divisi-kurl/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'UPDATE divisi_kurl SET komentar_div_kurl = NULL WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ message: 'Komentar berhasil dihapus' });
  });
});
// ===================================== End endpoint buat halaman Divisi KURL =====================================


// ===================================== Start endpoint buat halaman Divisi PDI =====================================
// Endpoint untuk create data anggota
app.post('/api/divisi-pdi-op', upload.single('photo'), (req, res) => {
  const { name } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO divisi_pdi (nama_div_pdi, foto_div_pdi) VALUES (?, ?)';
  db.query(query, [name, photo], (err, results) => {
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
  const { name } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  // Query untuk mendapatkan data anggota yang ada
  const getUserQuery = 'SELECT * FROM divisi_pdi WHERE id = ?';
  db.query(getUserQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    // Data yang akan diperbarui
    const updatedName = name || results[0].nama_div_pdi;
    const updatedPhoto = photo || results[0].foto_div_pdi;

    // Query untuk memperbarui data anggota
    const updateUserQuery = 'UPDATE divisi_pdi SET nama_div_pdi = ?, foto_div_pdi = ? WHERE id = ?';
    db.query(updateUserQuery, [updatedName, updatedPhoto, id], (err) => {
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

// Endpoint untuk mengambil komentar berdasarkan id
app.get('/api/komentar-divisi-pdi/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'SELECT komentar_div_pdi FROM divisi_pdi WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ komentar: result[0].komentar_div_pdi });
  });
});

// Endpoint untuk menghapus komentar berdasarkan id
app.delete('/api/komentar-divisi-pdi/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'UPDATE divisi_pdi SET komentar_div_pdi = NULL WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ message: 'Komentar berhasil dihapus' });
  });
});
// ===================================== End endpoint buat halaman Divisi PDI =====================================


// ===================================== Start endpoint buat halaman Divisi SPPP_SDM =====================================
// Endpoint untuk create data anggota
app.post('/api/divisi-sppp_sdm-op', upload.single('photo'), (req, res) => {
  const { name } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO divisi_sppp_sdm (nama_div_sppp_sdm, foto_div_sppp_sdm) VALUES (?, ?)';
  db.query(query, [name, photo], (err, results) => {
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
  const { name } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  // Query untuk mendapatkan data anggota yang ada
  const getUserQuery = 'SELECT * FROM divisi_sppp_sdm WHERE id = ?';
  db.query(getUserQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    // Data yang akan diperbarui
    const updatedName = name || results[0].nama_div_sppp_sdm;
    const updatedPhoto = photo || results[0].foto_div_sppp_sdm;

    // Query untuk memperbarui data anggota
    const updateUserQuery = 'UPDATE divisi_sppp_sdm SET nama_div_sppp_sdm = ?, foto_div_sppp_sdm = ? WHERE id = ?';
    db.query(updateUserQuery, [updatedName, updatedPhoto, id], (err) => {
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

// Endpoint untuk mengambil komentar berdasarkan id
app.get('/api/komentar-divisi-sppp_sdm/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'SELECT komentar_div_sppp_sdm FROM divisi_sppp_sdm WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ komentar: result[0].komentar_div_sppp_sdm });
  });
});

// Endpoint untuk menghapus komentar berdasarkan id
app.delete('/api/komentar-divisi-sppp_sdm/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'UPDATE divisi_sppp_sdm SET komentar_div_sppp_sdm = NULL WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ message: 'Komentar berhasil dihapus' });
  });
});
// ===================================== End endpoint buat halaman Divisi SPPP_SDM =====================================


// ===================================== Start endpoint buat halaman Divisi TP =====================================
// Endpoint untuk create data anggota
app.post('/api/divisi-tp-op', upload.single('photo'), (req, res) => {
  const { name } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO divisi_tp (nama_div_tp, foto_div_tp) VALUES (?, ?)';
  db.query(query, [name, photo], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, message: 'User added successfully' });
  });
});

// Endpoint untuk read data anggota
app.get('/api/divisi-tp-op', (req, res) => {
  const query = 'SELECT * FROM divisi_tp';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Endpoint untuk update data anggota
app.put('/api/divisi-tp-op/:id', upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  // Query untuk mendapatkan data anggota yang ada
  const getUserQuery = 'SELECT * FROM divisi_tp WHERE id = ?';
  db.query(getUserQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    // Data yang akan diperbarui
    const updatedName = name || results[0].nama_div_tp;
    const updatedPhoto = photo || results[0].foto_div_tp;

    // Query untuk memperbarui data anggota
    const updateUserQuery = 'UPDATE divisi_tp SET nama_div_tp = ?, foto_div_tp = ? WHERE id = ?';
    db.query(updateUserQuery, [updatedName, updatedPhoto, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ success: true, message: 'User updated successfully' });
    });
  });
});

// Endpoint untuk delete data anggota
app.delete('/api/divisi-tp-op/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM divisi_tp WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  });
});

// Endpoint untuk mengambil komentar berdasarkan id
app.get('/api/komentar-divisi-tp/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'SELECT komentar_div_tp FROM divisi_tp WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ komentar: result[0].komentar_div_tp });
  });
});

// Endpoint untuk menghapus komentar berdasarkan id
app.delete('/api/komentar-divisi-tp/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'UPDATE divisi_tp SET komentar_div_tp = NULL WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ message: 'Komentar berhasil dihapus' });
  });
});
// ===================================== End endpoint buat halaman Divisi TP =====================================


// ===================================== Start endpoint buat halaman Sekretaris =====================================
// Endpoint untuk creat data anggota
app.post('/api/sekretaris-op', upload.single('photo'), (req, res) => {
  const { name, nip } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO sekretaris (nama_sekretaris, nip_sekretaris, foto_sekretaris) VALUES (?, ?, ?)';
  db.query(query, [name, nip, photo], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, message: 'User added successfully' });
  });
});

// Endpoint untuk read data anggota
app.get('/api/sekretaris-op', (req, res) => {
  const query = 'SELECT * FROM sekretaris';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Endpoint untuk update data anggota
app.put('/api/sekretaris-op/:id', upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const { name, nip } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  // Query untuk mendapatkan data anggota yang ada
  const getUserQuery = 'SELECT * FROM sekretaris WHERE id = ?';
  db.query(getUserQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    // Data yang akan diperbarui
    const updatedName = name || results[0].nama_sekretaris;
    const updatedNip = nip || results[0].nip_sekretaris;
    const updatedPhoto = photo || results[0].foto_sekretaris;

    // Query untuk memperbarui data anggota
    const updateUserQuery = 'UPDATE sekretaris SET nama_sekretaris = ?, nip_sekretaris = ?, foto_sekretaris = ? WHERE id = ?';
    db.query(updateUserQuery, [updatedName, updatedNip, updatedPhoto, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ success: true, message: 'User updated successfully' });
    });
  });
});

// Endpoint untuk delete data anggota
app.delete('/api/sekretaris-op/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM sekretaris WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  });
});

// Endpoint untuk mengambil komentar berdasarkan id
app.get('/api/komentar-sekretaris/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'SELECT komentar_sekretaris FROM sekretaris WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ komentar: result[0].komentar_sekretaris });
  });
});

// Endpoint untuk menghapus komentar berdasarkan id
app.delete('/api/komentar-sekretaris/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'UPDATE sekretaris SET komentar_sekretaris = NULL WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ message: 'Komentar berhasil dihapus' });
  });
});
// ===================================== End endpoint buat halaman Sekretaris =====================================


// ===================================== Start endpoint buat halaman Sub Bagian HSDM =====================================
// Endpoint untuk creat data anggota
app.post('/api/sub-bagian-hsdm-op', upload.single('photo'), (req, res) => {
  const { name, nip, position } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO sub_bagian_hsdm (nama_sb_hsdm, nip_sb_hsdm, posisi_sb_hsdm, foto_sb_hsdm) VALUES (?, ?, ?, ?)';
  db.query(query, [name, nip, position, photo], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, message: 'User added successfully' });
  });
});

// Endpoint untuk read data anggota
app.get('/api/sub-bagian-hsdm-op', (req, res) => {
  const query = 'SELECT * FROM sub_bagian_hsdm';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Endpoint untuk update data anggota
app.put('/api/sub-bagian-hsdm-op/:id', upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const { name, nip, position } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  // Query untuk mendapatkan data anggota yang ada
  const getUserQuery = 'SELECT * FROM sub_bagian_hsdm WHERE id = ?';
  db.query(getUserQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    // Data yang akan diperbarui
    const updatedName = name || results[0].nama_sb_hsdm;
    const updatedNip = nip || results[0].nip_sb_hsdm;
    const updatedPosition = position || results[0].posisi_sb_hsdm;
    const updatedPhoto = photo || results[0].foto_sb_hsdm;

    // Query untuk memperbarui data anggota
    const updateUserQuery = 'UPDATE sub_bagian_hsdm SET nama_sb_hsdm = ?, nip_sb_hsdm = ?, posisi_sb_hsdm = ?, foto_sb_hsdm = ? WHERE id = ?';
    db.query(updateUserQuery, [updatedName, updatedNip, updatedPosition, updatedPhoto, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ success: true, message: 'User updated successfully' });
    });
  });
});

// Endpoint untuk delete data anggota
app.delete('/api/sub-bagian-hsdm-op/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM sub_bagian_hsdm WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  });
});

// Endpoint untuk mengambil komentar berdasarkan id
app.get('/api/komentar-sb-hsdm/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'SELECT komentar_sb_hsdm FROM sub_bagian_hsdm WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ komentar: result[0].komentar_sb_hsdm });
  });
});

// Endpoint untuk menghapus komentar berdasarkan id
app.delete('/api/komentar-sb-hsdm/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'UPDATE sub_bagian_hsdm SET komentar_sb_hsdm = NULL WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ message: 'Komentar berhasil dihapus' });
  });
});
// ===================================== End endpoint buat halaman Sub Bagian HSDM =====================================


// ===================================== Start endpoint buat halaman Sub Bagian KUL =====================================
// Endpoint untuk creat data anggota
app.post('/api/sub-bagian-kul-op', upload.single('photo'), (req, res) => {
  const { name, nip, position } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO sub_bagian_kul (nama_sb_kul, nip_sb_kul, posisi_sb_kul, foto_sb_kul) VALUES (?, ?, ?, ?)';
  db.query(query, [name, nip, position, photo], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, message: 'User added successfully' });
  });
});

// Endpoint untuk read data anggota
app.get('/api/sub-bagian-kul-op', (req, res) => {
  const query = 'SELECT * FROM sub_bagian_kul';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Endpoint untuk update data anggota
app.put('/api/sub-bagian-kul-op/:id', upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const { name, nip, position } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  // Query untuk mendapatkan data anggota yang ada
  const getUserQuery = 'SELECT * FROM sub_bagian_kul WHERE id = ?';
  db.query(getUserQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    // Data yang akan diperbarui
    const updatedName = name || results[0].nama_sb_kul;
    const updatedNip = nip || results[0].nip_sb_kul;
    const updatedPosition = position || results[0].posisi_sb_kul;
    const updatedPhoto = photo || results[0].foto_sb_kul;

    // Query untuk memperbarui data anggota
    const updateUserQuery = 'UPDATE sub_bagian_kul SET nama_sb_kul = ?, nip_sb_kul = ?, posisi_sb_kul = ?, foto_sb_kul = ? WHERE id = ?';
    db.query(updateUserQuery, [updatedName, updatedNip, updatedPosition, updatedPhoto, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ success: true, message: 'User updated successfully' });
    });
  });
});

// Endpoint untuk delete data anggota
app.delete('/api/sub-bagian-kul-op/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM sub_bagian_kul WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  });
});

// Endpoint untuk mengambil komentar berdasarkan id
app.get('/api/komentar-sb-kul/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'SELECT komentar_sb_kul FROM sub_bagian_kul WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ komentar: result[0].komentar_sb_kul });
  });
});

// Endpoint untuk menghapus komentar berdasarkan id
app.delete('/api/komentar-sb-kul/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'UPDATE sub_bagian_kul SET komentar_sb_kul = NULL WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ message: 'Komentar berhasil dihapus' });
  });
});
// ===================================== End endpoint buat halaman Sub Bagian KUL =====================================


// ===================================== Start endpoint buat halaman Sub Bagian PDI =====================================
// Endpoint untuk creat data anggota
app.post('/api/sub-bagian-pdi-op', upload.single('photo'), (req, res) => {
  const { name, nip, position } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO sub_bagian_pdi (nama_sb_pdi, nip_sb_pdi, posisi_sb_pdi, foto_sb_pdi) VALUES (?, ?, ?, ?)';
  db.query(query, [name, nip, position, photo], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, message: 'User added successfully' });
  });
});

// Endpoint untuk read data anggota
app.get('/api/sub-bagian-pdi-op', (req, res) => {
  const query = 'SELECT * FROM sub_bagian_pdi';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Endpoint untuk update data anggota
app.put('/api/sub-bagian-pdi-op/:id', upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const { name, nip, position } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  // Query untuk mendapatkan data anggota yang ada
  const getUserQuery = 'SELECT * FROM sub_bagian_pdi WHERE id = ?';
  db.query(getUserQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    // Data yang akan diperbarui
    const updatedName = name || results[0].nama_sb_pdi;
    const updatedNip = nip || results[0].nip_sb_pdi;
    const updatedPosition = position || results[0].posisi_sb_pdi;
    const updatedPhoto = photo || results[0].foto_sb_pdi;

    // Query untuk memperbarui data anggota
    const updateUserQuery = 'UPDATE sub_bagian_pdi SET nama_sb_pdi = ?, nip_sb_pdi = ?, posisi_sb_pdi = ?, foto_sb_pdi = ? WHERE id = ?';
    db.query(updateUserQuery, [updatedName, updatedNip, updatedPosition, updatedPhoto, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ success: true, message: 'User updated successfully' });
    });
  });
});

// Endpoint untuk delete data anggota
app.delete('/api/sub-bagian-pdi-op/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM sub_bagian_pdi WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  });
});

// Endpoint untuk mengambil komentar berdasarkan id
app.get('/api/komentar-sb-pdi/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'SELECT komentar_sb_pdi FROM sub_bagian_pdi WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ komentar: result[0].komentar_sb_pdi });
  });
});

// Endpoint untuk menghapus komentar berdasarkan id
app.delete('/api/komentar-sb-pdi/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'UPDATE sub_bagian_pdi SET komentar_sb_pdi = NULL WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ message: 'Komentar berhasil dihapus' });
  });
});
// ===================================== End endpoint buat halaman Sub Bagian PDI =====================================


// ===================================== Start endpoint buat halaman Sub Bagian TPPPH =====================================
// Endpoint untuk creat data anggota
app.post('/api/sub-bagian-tppph-op', upload.single('photo'), (req, res) => {
  const { name, nip, position } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO sub_bagian_tppph (nama_sb_tppph, nip_sb_tppph, posisi_sb_tppph, foto_sb_tppph) VALUES (?, ?, ?, ?)';
  db.query(query, [name, nip, position, photo], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, message: 'User added successfully' });
  });
});

// Endpoint untuk read data anggota
app.get('/api/sub-bagian-tppph-op', (req, res) => {
  const query = 'SELECT * FROM sub_bagian_tppph';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Endpoint untuk update data anggota
app.put('/api/sub-bagian-tppph-op/:id', upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const { name, nip, position } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  // Query untuk mendapatkan data anggota yang ada
  const getUserQuery = 'SELECT * FROM sub_bagian_tppph WHERE id = ?';
  db.query(getUserQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    // Data yang akan diperbarui
    const updatedName = name || results[0].nama_sb_tppph;
    const updatedNip = nip || results[0].nip_sb_tppph;
    const updatedPosition = position || results[0].posisi_sb_tppph;
    const updatedPhoto = photo || results[0].foto_sb_tppph;

    // Query untuk memperbarui data anggota
    const updateUserQuery = 'UPDATE sub_bagian_tppph SET nama_sb_tppph = ?, nip_sb_tppph = ?, posisi_sb_tppph = ?, foto_sb_tppph = ? WHERE id = ?';
    db.query(updateUserQuery, [updatedName, updatedNip, updatedPosition, updatedPhoto, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ success: true, message: 'User updated successfully' });
    });
  });
});

// Endpoint untuk delete data anggota
app.delete('/api/sub-bagian-tppph-op/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM sub_bagian_tppph WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  });
});

// Endpoint untuk mengambil komentar berdasarkan id
app.get('/api/komentar-sb-tppph/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'SELECT komentar_sb_tppph FROM sub_bagian_tppph WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ komentar: result[0].komentar_sb_tppph });
  });
});

// Endpoint untuk menghapus komentar berdasarkan id
app.delete('/api/komentar-sb-tppph/:id', (req, res) => {
  const id = req.params.id;

  // Validasi ID
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const query = 'UPDATE sub_bagian_tppph SET komentar_sb_tppph = NULL WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.json({ message: 'Komentar berhasil dihapus' });
  });
});
// ===================================== End endpoint buat halaman Sub Bagian TPPPH =====================================

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
app.listen(5002, () => {
  console.log('Operator server running on port 5002');
});