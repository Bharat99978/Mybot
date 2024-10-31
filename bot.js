// bot.js
const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_TOKEN' with the token you got from BotFather
const token = '7228147192:AAEg1GtZGTGSr_uag1BMi2V6hwytNBBYb8o';
const bot = new TelegramBot(token, { polling: true });

// Message to be sent every 30 minutes
const message = "Hello! This is your scheduled message every 30 minutes.";

// Start bot and send a message every 30 minutes
bot.on('polling_error', console.log); // Error handling

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Send an initial message when the bot starts
  bot.sendMessage(chatId, "Bot started! You will receive messages every 30 minutes.");

  // Set an interval to send a message every 30 minutes (30 * 60 * 1000 milliseconds)
  setInterval(() => {
    bot.sendMessage(chatId, message);
  }, 30 * 60 * 1000);
});

console.log("Telegram bot is running...");
