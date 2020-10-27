import { Message } from 'discord.js';

export interface BotCommand {
    run: (message: Message, args: Array<String>) => void
}
