// server.js
const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // You can use any available port you prefer

// Serve static files from the "public" directory (e.g., CSS, JavaScript)
app.use(express.static(path.join('./styles.css', 'public')));

// Define a route to serve the index.html file when hitting the root route "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
