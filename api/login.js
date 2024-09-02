const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// Konfigurasi koneksi database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kp_project'
});

db.connect();

app.use(bodyParser.json());
app.use(cors());

// Endpoint untuk memeriksa kredensial
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
  
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (results.length > 0) {
      const user = results[0];
      res.status(200).json({ success: true, role: user.role }); // Asumsikan field `role` ada
    } else {
      res.status(401).json({ success: false, message: 'Kredensial tidak valid' });
    }
  });
});

app.listen(5000, () => {
  console.log('Login server running on port 5000');
});
