import mysql from 'mysql2/promise';

const db = mysql.createPool({
  database: process.env['DB_NAME'] || 'pictogrammers',
  host: process.env['DB_HOST'] || 'localhost',
  password: process.env['DB_PASSWORD'] || 'pictogrammers',
  user: process.env['DB_USER'] || 'pictogrammers'
});

export default db;