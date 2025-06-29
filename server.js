const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());

// Root
app.get('/', (req, res) => {
  res.send('Timestamp Microservice');
});

// API Route
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  let date;
  if (!dateParam) {
    date = new Date();
  } else if (isNaN(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

// Listen on port set in environment variable or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});