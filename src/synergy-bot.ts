import { Message } from 'discord.js';
import { container, inject, injectable } from 'tsyringe';
import { commandColor, errorColor, successColor, userColor } from './chalk-theme';
import { BotCommand } from './command/bot-command';
import { SynergyCommand } from './command/synergy-command';
import { DateTimeLogger } from './datetime-logger';
import { SynergyBotConfiguration } from './synergy-bot-configuration';

@injectable()
export class SynergyBot {

  constructor(@inject('SynergyBotConfiguration') private botConfig: SynergyBotConfiguration, private logger: DateTimeLogger) { }

  public receiveMessage(message: Message): void {
    if (this.messageIsFromBot(message)) return;
    if (!this.messageStartWithPrefix(message.content)) return;
    const commandName: String = this.extractCommandFromMessage(message);
    let command: BotCommand;
    try {
      switch (commandName) {
        case 'synergy':
          command = container.resolve(SynergyCommand);
          break;
        default:
          throw new Error(`${commandColor.bold(commandName)} ${errorColor('not recognized as a bot command')}`);
      }
      this.logger.log(`${userColor.bold(message.author.username)} run ${commandColor.bold(commandName)}`);
      command.run(message);
      this.logger.log(`${commandColor.bold(commandName)} ${successColor('ran successfully!')}`);
    } catch (error) {
      this.logger.log(error.message);
    }
  }

  private messageStartWithPrefix(message: String): boolean {
    return message.startsWith(this.botConfig.commandPrefix);
  };

  private messageIsFromBot(message: Message): boolean {
    return message.author.bot;
  }

  private extractCommandFromMessage(message: Message) {
    return message.content.slice(this.botConfig.commandPrefix.length).split(' ').shift()!.toLowerCase();
  }

}
