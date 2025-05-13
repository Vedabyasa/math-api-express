const express = require('express');
const bodyParser = require('body-parser');
const mathRoutes = require('./routes/math');

const app = express();
app.use(bodyParser.json());

app.use('/api/math', mathRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Math API server is running on port ${PORT}`);
});