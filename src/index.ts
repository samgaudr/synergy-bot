// TODO: DATETIME logger
// TODO: Inject logger
// TODO: Color Documentation
// TODO: Config Documentation
// TODO: Unit tests
// TODO: CI
// TODO: Host

import { Client, Message } from 'discord.js';
import { BotCommand } from './command/bot-command';
import { SynergyCommand } from './command/synergy';
import { blue, green, red, yellow } from 'chalk';
import { DateTimeLogger } from './datetime-logger';

const config = require('../configuration.json');
const client = new Client();
const logger = new DateTimeLogger();

const isBotCommand: (message: String) => boolean = (message: String) => {
  return message.startsWith(config.commandPrefix);
};

client.on('message', (message: Message) => {
  if (message.author.bot) return;
  if (!isBotCommand(message.content)) return;
  // TODO: Refactor to another method + create bot args interface
  const commandBody = message.content.slice(config.commandPrefix.length);
  const args = commandBody.split(' ');
  const commandName = args.shift()!.toLowerCase();
  let command: BotCommand;
  try {
    switch (commandName) {
      case 'synergy':
        command = new SynergyCommand();
        break;
      default:
        throw new Error(`${blue.bold(commandName)} ${red('not recognized as a bot command')}`);
    }
    logger.log(`${yellow.bold(message.author.username)} run ${blue.bold(message.content)}`);
    command.run(message, args);
    logger.log(`${blue.bold(commandName)} ${green('ran successfully!')}`);
  } catch (error) {
    logger.log(error.message);
  }
});

client.login(config.discordBotToken);
