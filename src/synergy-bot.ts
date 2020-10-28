import { blue, green, red, yellow } from 'chalk';
import { Message } from 'discord.js';
import { container, inject, injectable } from 'tsyringe';
import { BotCommand } from './command/bot-command';
import { SynergyCommand } from './command/synergy';
import { DateTimeLogger } from './datetime-logger';
import { SynergyBotConfiguration } from './synergy-bot-configuration';

@injectable()
export class SynergyBot {

  constructor(@inject('SynergyBotConfiguration') private botConfig: SynergyBotConfiguration, private logger: DateTimeLogger) { }

  public receiveMessage(message: Message): void {
    if (this.messageIsFromBot(message)) return;
    if (!this.isBotCommand(message.content)) return;
    const commandName: String = this.extractCommandFromMessage(message);
    let command: BotCommand;
    try {
      switch (commandName) {
        case 'synergy':
          command = container.resolve(SynergyCommand);
          break;
        default:
          throw new Error(`${blue.bold(commandName)} ${red('not recognized as a bot command')}`);
      }
      this.logger.log(`${yellow.bold(message.author.username)} run ${blue.bold(message.content)}`);
      command.run(message);
      this.logger.log(`${blue.bold(commandName)} ${green('ran successfully!')}`);
    } catch (error) {
      this.logger.log(error.message);
    }
  }

  private isBotCommand(message: String): boolean {
    return message.startsWith(this.botConfig.commandPrefix);
  };

  private messageIsFromBot(message: Message): boolean {
    return message.author.bot;
  }

  private extractCommandFromMessage(message: Message) {
    return message.content.slice(this.botConfig.commandPrefix.length).split(' ').shift()!.toLowerCase();
  }

}
