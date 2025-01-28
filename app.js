const express = require('express');
const app = express();
const port = 8080 || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello, Node.js!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
