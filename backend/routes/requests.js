const express = require('express');
const { v4: uuidv4 } = require('uuid');

module.exports = ({ db, jwt, JWT_SECRET }) => {
  const router = express.Router();

  router.post('/', (req, res) => {
    // create request (no auth required for demo)
    const { name, email, bank_id, blood_group, units } = req.body;
    const id = uuidv4();
    const created_at = new Date().toISOString();
    const stmt = db.prepare('INSERT INTO requests (id, user_id, bank_id, blood_group, units, status, created_at) VALUES (?,?,?,?,?,?,?)');
    stmt.run(id, email || name || 'guest', bank_id, blood_group, units || 1, 'pending', created_at);
    res.json({ id, status: 'pending' });
  });

  router.get('/', (req, res) => {
    const rows = db.prepare('SELECT * FROM requests ORDER BY created_at DESC').all();
    res.json(rows);
  });

  router.post('/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.prepare('UPDATE requests SET status = ? WHERE id = ?').run(status, id);
    res.json({ ok: true });
  });

  return router;
};
