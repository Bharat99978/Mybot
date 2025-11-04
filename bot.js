const TelegramBot = require('node-telegram-bot-api');

// Replace with your own token
const token = '7306535365:AAGdXyjdGK8d7_SHUEEubkohKU28YeMnHL8';
const bot = new TelegramBot(token, { polling: true });

let stopwatchInterval;
let elapsedSeconds = 0;

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    if (stopwatchInterval) {
        bot.sendMessage(chatId, "Stopwatch is already running.");
        return;
    }

    bot.sendMessage(chatId, "Stopwatch started! Type /stop to stop it.");

    // Start the stopwatch
    stopwatchInterval = setInterval(() => {
        elapsedSeconds++;
        const hours = Math.floor(elapsedSeconds / 3600);
        const minutes = Math.floor((elapsedSeconds % 3600) / 60);
        const seconds = elapsedSeconds % 60;
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        bot.sendMessage(chatId, `Elapsed time: ${formattedTime}`);
    }, 1000);
});

bot.onText(/\/stop/, (msg) => {
    const chatId = msg.chat.id;

    if (!stopwatchInterval) {
        bot.sendMessage(chatId, "Stopwatch is not running.");
        return;
    }

    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    bot.sendMessage(chatId, `Stopwatch stopped! Final time: ${formattedTime}`);

    // Reset elapsed time
    elapsedSeconds = 0;
});

// Error handling
bot.on("polling_error", (error) => {
    console.error("Polling error:", error);
});
