const mysql = require('mysql2');

// Create connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'fsd_labex9',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get promise wrapper
const promisePool = pool.promise();

module.exports = promisePool;
