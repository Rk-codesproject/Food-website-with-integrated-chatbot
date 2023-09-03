// Import the required modules
const mysql = require('mysql2');

// Create a connection pool (recommended for better performance)
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'coderchefs',
  connectionLimit: 10, // Adjust this number based on your requirements
});

// You can now perform database operations using the 'pool' object
// For example, to query the database:
pool.query('SELECT * FROM items', (error, results) => {
  if (error) {
    console.error('Error executing query:', error);
  } else {
    console.log('Query results:', results);
  }
});


module.exports ={
    mysql,
    pool
}