const express = require('express');
const { v4: uuidv4 } = require('uuid');

module.exports = ({ db, jwt, JWT_SECRET }) => {
  const router = express.Router();

  router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const id = uuidv4();
    try {
      const stmt = db.prepare('INSERT INTO users (id, name, email, password) VALUES (?,?,?,?)');
      stmt.run(id, name || '', email, password); // NOTE: plaintext password for demo ONLY
      const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id, name, email } });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const row = db.prepare('SELECT id, name, email, password, role FROM users WHERE email = ?').get(email);
    if (!row || row.password !== password) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: row.id, email: row.email, role: row.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: row.id, name: row.name, email: row.email, role: row.role } });
  });

  return router;
};
