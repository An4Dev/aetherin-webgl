// index.js

const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = process.env.PORT || 3000;

// ─── Telegram Bot Setup ────────────────────────────────────────────────────────
// Replace with your actual bot token from BotFather
const TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN_HERE';

// Create the bot using polling (easy for development)
const bot = new TelegramBot(TOKEN, { polling: true });

// Example: reply “Hello” to every message
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello from Aetherin backend!');
});

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json()); // parse JSON bodies

// ─── Routes ──────────────────────────────────────────────────────────────────

// Health-check root
app.get('/', (req, res) => {
  res.send('Aetherin backend is live!');
});

// Dummy login endpoint
app.post('/auth/login', (req, res) => {
  const { username, password, deviceID } = req.body;

  // Simple placeholder logic — replace with real auth
  if ((username === 'player' && password === '1234') || deviceID) {
    return res.json({
      code: 0,
      message: 'Login successful',
      data: {
        id: 1,
        Name: 'TestPlayer',
        LoginSession: 'dummy-session-token'
      }
    });
  }

  return res.status(401).json({
    code: 1,
    message: 'Invalid credentials'
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
