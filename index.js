const TelegramBot = require('node-telegram-bot-api');
const nodemailer = require('nodemailer');

// Your Gmail credentials
const GMAIL_USER = 'abc13792588@gmail.com';
const GMAIL_PASS = 'nrpo ulms zlgi idqb'; // Use your actual password

// Your Telegram Bot API token
const TELEGRAM_BOT_TOKEN = '7599218155:AAFKstH1DT0oPN5kpaiQ6YP2QpyeFikYC1U';
const CHAT_ID = '6972382984';

// Create a new Telegram bot instance
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Set up Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS
  }
});

// Command to send multiple emails
bot.onText(/\/mail (.+)/, (msg, match) => {
  const chatId = msg.chat.id;

  // Check if the user is authorized
  if (chatId.toString() !== CHAT_ID) {
    bot.sendMessage(chatId, "Unauthorized access.");
    return;
  }

  // Split the input into email, message, and number of messages
  const [email, message, numberOfMessages] = match[1].split('|').map(s => s.trim());

  // Validate inputs
  if (!email || !message || isNaN(numberOfMessages) || numberOfMessages <= 0) {
    bot.sendMessage(chatId, "Invalid format. Use: /mail email@example.com | Your message here | number_of_messages");
    return;
  }

  // Send the specified number of messages
  for (let i = 0; i < parseInt(numberOfMessages); i++) {
    const mailOptions = {
      from: GMAIL_USER,
      to: email,
      subject: `Message #${i + 1} from Telegram Bot`,
      text: message
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        bot.sendMessage(chatId, `Error sending message #${i + 1}: ${error.message}`);
      } else {
        bot.sendMessage(chatId, `Email #${i + 1} sent: ${info.response}`);
      }
    });
  }
});

// Welcome message for start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Check if the user is authorized
  if (chatId.toString() !== CHAT_ID) {
    bot.sendMessage(chatId, "Unauthorized access.");
  } else {
    bot.sendMessage(chatId, "Welcome! Use /mail email@example.com | Your message | number to send multiple emails.");
  }
});
