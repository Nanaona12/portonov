const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET || 'change_me_secret';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:8080';

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password, displayName, display_name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length) return res.status(409).json({ error: 'User exists' });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (email, password_hash, display_name) VALUES (?, ?, ?)',
      [email, hash, displayName || display_name || null]
    );

    const token = jwt.sign({ sub: result.insertId }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({
      token,
      user: {
        id: result.insertId,
        email,
        display_name: displayName || display_name || null,
        isAdmin: false,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const [rows] = await pool.query('SELECT id, password_hash, display_name FROM users WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const [adminRows] = await pool.query('SELECT 1 FROM admin_users WHERE user_id = ?', [user.id]);
    const isAdmin = adminRows.length > 0;
    const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      token,
      user: {
        id: user.id,
        email,
        display_name: user.display_name,
        isAdmin,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const [rows] = await pool.query('SELECT id, email, display_name FROM users WHERE id = ?', [payload.sub]);
    if (!rows.length) return res.status(401).json({ error: 'Invalid token' });

    const user = rows[0];
    const [adminRows] = await pool.query('SELECT 1 FROM admin_users WHERE user_id = ?', [user.id]);
    const isAdmin = adminRows.length > 0;

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        display_name: user.display_name,
        isAdmin,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
});

// POST /api/auth/request-reset
router.post('/request-reset', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Missing email' });

  try {
    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (!rows.length) return res.status(200).json({ ok: true }); // don't reveal

    const user = rows[0];
    const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '1h' });
    const resetUrl = `${CLIENT_URL}/auth?reset_token=${token}`;

    // send email (simple transporter)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Reset your password',
      text: `Reset your password: ${resetUrl}`,
      html: `<p>Reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/auth/reset
router.post('/reset', async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const userId = payload.sub;
    const hash = await bcrypt.hash(password, 10);
    await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [hash, userId]);
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: 'Invalid or expired token' });
  }
});

module.exports = router;
