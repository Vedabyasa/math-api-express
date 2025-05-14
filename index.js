const express = require('express');
const cors = require('cors');
const mathRoutes = require('./routes/math');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from frontend folder
app.use(express.static('frontend'));

// API routes
app.use('/api/math', mathRoutes);

// Fallback to index.html for any non-API route (optional)
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
