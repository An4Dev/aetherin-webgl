const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Enable JSON body parsing

// Test root
app.get('/', (req, res) => {
  res.send('Aetherin backend is live!');
});

// Basic login route
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Dummy check – in a real app you'd check a database
  if (username === 'player' && password === '1234') {
    return res.status(200).json({ message: 'Login successful', token: 'dummy-token' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
