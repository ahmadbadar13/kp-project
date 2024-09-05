const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
const buildPath = path.join(__dirname, '..', 'build');

// Menggunakan folder 'build' sebagai static files
app.use(express.static(buildPath));

// Konfigurasi koneksi database
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'kp_project'
// });

// production
const db = mysql.createConnection({
  host: 'bz4kzerb13skvzsklu2n-mysql.services.clever-cloud.com',
  user: 'uteofvtkhgj76a2o',
  password: 'WW8UkNEM2x3438ppvsUv',
  database: 'bz4kzerb13skvzsklu2n'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to database');
  }
});

app.use(bodyParser.json());
// app.use(cors());
app.use(cors({
  origin: '*', // Mengizinkan semua origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());

// Endpoint untuk memeriksa kredensial
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM user WHERE email = ?';

  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      const user = results[0];

      // Cek password menggunakan bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).json({ success: true, role: user.role });
      } else {
        res.status(401).json({ success: false, message: 'Kredensial tidak valid' });
      }
    } else {
      res.status(401).json({ success: false, message: 'Kredensial tidak valid' });
    }
  });
});

// Endpoint untuk register
app.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  // Validasi input
  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: 'Semua field harus diisi' });
  }

  try {
    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user ke dalam database
    const sql = 'INSERT INTO user (email, role, password) VALUES (?, ?, ?)';
    db.query(sql, [email, role, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
      }
      res.json({ success: true, message: 'Registrasi berhasil' });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat registrasi' });
  }
});
app.use(express.static("../app/dist"));
app.listen(5000, () => {
  console.log('Login server running on port 5000');
});