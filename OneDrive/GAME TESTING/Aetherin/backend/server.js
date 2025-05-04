const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = process.env.PORT || 3000;

// Replace this with your actual bot token
const TOKEN = '7976256188:AAEzPyX_lhRMRu3spUpKwA63OdXNelW6lDw';

// Replace this with your Render URL (without trailing slash)
const WEBHOOK_URL = 'https://aetherin.onrender.com';

// Create the bot without polling
const bot = new TelegramBot(TOKEN);

// Set the webhook to tell Telegram where to send updates
bot.setWebHook(`${WEBHOOK_URL}/bot${TOKEN}`);

// Middleware to parse JSON body (required for Telegram updates)
app.use(express.json());

// Telegram webhook route
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Root route for basic testing
app.get('/', (req, res) => {
  res.send('Aetherin backend is live!');
});

// Sample login route (dummy credentials)
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'player' && password === '1234') {
    return res.status(200).json({ message: 'Login successful', token: 'dummy-token' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Telegram bot message response
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello from Aetherin backend (via webhook)!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
