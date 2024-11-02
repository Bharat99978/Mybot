const TelegramBot = require('node-telegram-bot-api');
const token = '7228147192:AAEg1GtZGTGSr_uag1BMi2V6hwytNBBYb8o';
const bot = new TelegramBot(token, { polling: true });

let counter = 0;
let intervalId;

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Starting count...');

    intervalId = setInterval(() => {
        counter += 1;
        bot.sendMessage(chatId, `Minute: ${counter}`);
    }, 60000); // Sends a message every minute (60000 ms)
});

bot.onText(/\/stop/, (msg) => {
    const chatId = msg.chat.id;
    clearInterval(intervalId);
    counter = 0; // Reset counter if needed
    bot.sendMessage(chatId, 'Counting stopped.');
});
