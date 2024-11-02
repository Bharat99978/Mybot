const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot token from @BotFather
const token = '7228147192:AAEg1GtZGTGSr_uag1BMi2V6hwytNBBYb8o';
const bot = new TelegramBot(token, { polling: true });

let startTime;

// Start bot
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Send a message with a "Start Stopwatch" button
    bot.sendMessage(chatId, 'Click the button to start the stopwatch:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Start Stopwatch', callback_data: 'start_stopwatch' }]
            ]
        }
    });
});

// Handle button press
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    if (query.data === 'start_stopwatch') {
        startTime = new Date(); // Start time
        bot.sendMessage(chatId, 'Stopwatch started! Click "Stop Stopwatch" to end.', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Stop Stopwatch', callback_data: 'stop_stopwatch' }]
                ]
            }
        });
    } else if (query.data === 'stop_stopwatch') {
        const endTime = new Date();
        const elapsedTime = ((endTime - startTime) / 1000).toFixed(2); // Time in seconds
        bot.sendMessage(chatId, `Stopwatch stopped! Elapsed time: ${elapsedTime} seconds.`);
    }
});
