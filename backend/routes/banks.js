const express = require('express');
const { v4: uuidv4 } = require('uuid');

module.exports = ({ db }) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    const { q, city, blood } = req.query;
    let rows = db.prepare('SELECT * FROM blood_banks').all();
    rows = rows.map(r => ({ ...r, inventory: JSON.parse(r.inventory_json || '{}') }));

    if (city) rows = rows.filter(r => r.city.toLowerCase().includes(city.toLowerCase()));
    if (q) rows = rows.filter(r => r.name.toLowerCase().includes(q.toLowerCase()) || r.address.toLowerCase().includes(q.toLowerCase()));
    if (blood) rows = rows.filter(r => (r.inventory[blood] || 0) > 0);

    res.json(rows);
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    const row = db.prepare('SELECT * FROM blood_banks WHERE id = ?').get(id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    row.inventory = JSON.parse(row.inventory_json || '{}');
    res.json(row);
  });

  // admin: update inventory
  router.post('/:id/inventory', (req, res) => {
    const id = req.params.id;
    const { inventory } = req.body;
    const stmt = db.prepare('UPDATE blood_banks SET inventory_json = ? WHERE id = ?');
    stmt.run(JSON.stringify(inventory || {}), id);
    res.json({ ok: true });
  });

  // add new bank
  router.post('/', (req, res) => {
    const { name, city, address, phone, inventory } = req.body;
    const id = uuidv4();
    const stmt = db.prepare('INSERT INTO blood_banks (id,name,city,address,phone,inventory_json) VALUES (?,?,?,?,?,?)');
    stmt.run(id, name, city, address, phone, JSON.stringify(inventory || {}));
    res.json({ id });
  });

  return router;
};
