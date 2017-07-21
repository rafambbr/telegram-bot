const TelegramBot = require( `node-telegram-bot-api` )
const TOKEN = `MY_TOKEN`
const bot = new TelegramBot( TOKEN, { polling: true } )

//https://github.com/yagop/node-telegram-bot-api/blob/master/doc/usage.md
bot.on('message', function(msg){
  console.log('msg', msg);
});

var logErrorEcho = function logErrorEcho(msg) {
  return function (err) {
    return console.log(msg, err);
  };
};

var logSuccessEcho = function(msg, match){
  return function(data){
    console.log( 'Success:', data);
  };
};

var sendEcho = function(msg, match){
  bot.sendMessage( msg.chat.id, match[ 1 ] )
      .then( logSuccessEcho( msg, match ) )
      .catch( logErrorEcho( 'Error:') );
};

bot.onText( /\/echo (.*)/, sendEcho);
