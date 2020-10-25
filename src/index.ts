import {Client, Message} from 'discord.js';

const config = require('../config.json');

const client = new Client();

const prefix = '!';

client.on('message', function(message: Message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift()!.toLowerCase();

  if (command === 'hello') {
    message.reply(`world`);
  }
});

client.login(config.BOT_TOKEN);
