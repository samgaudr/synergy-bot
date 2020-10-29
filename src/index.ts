// TODO: Unit tests
// TODO: CI
// TODO: Host

import { green, red } from 'chalk';
import { Client, Message } from 'discord.js';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { ConfigLoader } from './config-loader';
import { DateTimeLogger } from './datetime-logger';
import { SynergyBot } from './synergy-bot';

const config = container.resolve(ConfigLoader).load();

container.register('SynergyBotConfiguration', { useValue: config });

const discordClient = new Client();
const synergyBot: SynergyBot = container.resolve(SynergyBot);
const logger = container.resolve(DateTimeLogger);

logger.log('Setting up Synergy bot');

discordClient.on('message', (message: Message) => synergyBot.receiveMessage(message));

discordClient.login(config.discordBotToken)
    .catch((error) => logger.log(red(error)))
    .then((token) => token && logger.log(green(`Successfully logged in (token=${token})`)));
