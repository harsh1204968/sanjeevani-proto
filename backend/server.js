const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const DB_FILE = process.env.DATABASE_FILE || './data/sanjeevani.db';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const PORT = process.env.PORT || 4000;

// ensure data dir exists
const dir = path.dirname(DB_FILE);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const initSql = fs.readFileSync(path.join(__dirname, 'db', 'init.sql'), 'utf8');
const seedSql = fs.readFileSync(path.join(__dirname, 'db', 'seed.sql'), 'utf8');

const db = new Database(DB_FILE);
db.exec(initSql);
db.exec(seedSql);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// simple auth: register/login and token
const authRoutes = require('./routes/auth');
const bankRoutes = require('./routes/banks');
const requestRoutes = require('./routes/requests');

app.use('/api/auth', authRoutes({ db, jwt, JWT_SECRET }));
app.use('/api/banks', bankRoutes({ db }));
app.use('/api/requests', requestRoutes({ db, jwt, JWT_SECRET }));

app.get('/', (_, res) => res.json({ message: 'Sanjeevani API running' }));

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
