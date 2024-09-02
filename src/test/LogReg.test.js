const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const app = express();

// Setup aplikasi Express
app.use(bodyParser.json());
app.use(cors());

// Mocking MySQL connection
jest.mock('mysql');

// Mock MySQL connection dan query function
const db = {
  query: jest.fn(),
};

mysql.createConnection = jest.fn().mockReturnValue(db);

// Endpoint login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM user WHERE email = ?';

  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      const user = results[0];
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

// Endpoint register
app.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: 'Semua field harus diisi' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO user (email, role, password) VALUES (?, ?, ?)';

    db.query(sql, [email, role, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
      }
      res.json({ success: true, message: 'Registrasi berhasil' });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat registrasi' });
  }
});

describe('Testing Auth API', () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    db.query.mockReset();
  });

  it('Harus berhasil melakukan registrasi', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const role = 'user';

    db.query.mockImplementationOnce((sql, values, callback) => {
      callback(null, { affectedRows: 1 });
    });

    const res = await request(app)
      .post('/register')
      .send({ email, password, role });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('Harus gagal registrasi ketika field tidak lengkap', async () => {
    const res = await request(app)
      .post('/register')
      .send({ email: 'test@example.com', password: '' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('success', false);
  });

  it('Harus berhasil login dengan kredensial yang benar', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query.mockImplementationOnce((sql, values, callback) => {
      callback(null, [{ email, password: hashedPassword, role: 'user' }]);
    });

    const res = await request(app)
      .post('/login')
      .send({ email, password });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('role', 'user');
  });

  it('Harus gagal login dengan kredensial yang salah', async () => {
    const email = 'test@example.com';
    const password = 'wrongpassword';
    const hashedPassword = await bcrypt.hash('password123', 10);

    db.query.mockImplementationOnce((sql, values, callback) => {
      callback(null, [{ email, password: hashedPassword, role: 'user' }]);
    });

    const res = await request(app)
      .post('/login')
      .send({ email, password });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'Kredensial tidak valid');
  });
});
