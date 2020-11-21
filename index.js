const token = '1463499256:AAH60osI8sunCejKuzkq4X0rerTksKWMfeg';
const TelegramBot = require('node-telegram-bot-api');
 
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, function (msg) {
  
    let startMessage = `Привіт, ${msg.from.first_name} ! Вітаю на сервері EcoLife Community. Якщо ви хочете залишити звернення, натисність на кнопку Залишити звернення`;
    let keyboard = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                  text: 'Залишити звернення',
              callback_data: 'load'
            }, {
                text: 'Перейти на сайт',
                url: 'https://skrypnykov.github.io/ecolife-community/' //внешняя ссылка
              }
            ]
          ]
        } };
        bot.sendMessage(msg.chat.id, startMessage, keyboard);
    });

bot.on('callback_query', (query) => {
    let id = query.message.chat.id;
    switch (query.data) {
      case 'load':
        
            const oneMessage = 'Введіть наступні дані. Додайте свій контактний телефон, натиснув на клавіатурі Contact';
      const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        [{ text: 'Contact', request_contact: true }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    }),
  };
  bot.sendMessage(id, oneMessage, opts);
    }
});

bot.on('contact', function (msg) {
     const oneMessage = 'Завантажте локацію, натиснув Location';
      const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        [{text: 'Location', request_location: true}],
              ],
      resize_keyboard: true,
      one_time_keyboard: true,
    }),
  };
  bot.sendMessage(msg.chat.id, oneMessage, opts);
});

bot.on('location', function (msg) {
  var loclat = msg.location.latitude;
  var loclong = msg.location.longitude;
  console.log(loclat);
  console.log(loclong);
  const twoMessage = 'Ваші координати: ' + loclat + ', ' + loclong + '. Напишіть вашу повну адресу для зворотнього звязку (поштова адреса та Email), обовязково вказавши ПІБ ';
   bot.sendMessage(msg.chat.id, twoMessage);
});
 
bot.onText(/@/, function (msg) {
  
    let startMessage = 'Введіть текст вашого звернення, якщо потрібно можете додати фото. Відправте та натисність кнопку OK';
    let keyboard = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                  text: 'Ok',
              callback_data: 'send'
            }, 
            ]
          ]
        } };
        bot.sendMessage(msg.chat.id, startMessage, keyboard);
});
    

bot.onText(/Ул/, function (msg) {
  
    let startMessage = 'Введіть текст вашого звернення, якщо потрібно можете додати фото. Відправте та натисність кнопку OK';
    let keyboard = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                  text: 'Ok',
              callback_data: 'send'
            }, 
            ]
          ]
        } };
        bot.sendMessage(msg.chat.id, startMessage, keyboard);
});

bot.onText(/ул/, function (msg) {
  
    let startMessage = 'Введіть текст вашого звернення, якщо потрібно можете додати фото. Відправте та натисність кнопку OK';
    let keyboard = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                  text: 'Ok',
              callback_data: 'send'
            }, 
            ]
          ]
        } };
        bot.sendMessage(msg.chat.id, startMessage, keyboard);
});


bot.on('callback_query', (query) => {
    let id = query.message.chat.id;
  switch (query.data) {
    case 'send':
        
      bot.sendMessage(id, 'Ваше звернення прийнято! Дякуємо! Розглянемо найближчим часом та дамо вам відповідь на пошту');
  };
});