import { BotCommand } from './bot-command';
import { Guild, GuildChannel, GuildMember, Message, VoiceChannel } from 'discord.js';
import { DateTimeLogger } from '../datetime-logger';
import { injectable } from 'tsyringe';
import { channelColor, userColor } from '../chalk-theme';

@injectable()
export class SynergyCommand implements BotCommand {

  constructor(private logger: DateTimeLogger) {}

  public run(message: Message): void {
    if (!message.guild?.available) return;
    const connectedUser: Array<GuildMember> = this.fetchConnectedUsers(message.guild);
    const availableChannels: Array<GuildChannel> = this.fetchVoiceChannels(message.guild);
    const shuffledUsers = this.shuffleUserInVoiceChannel(connectedUser, availableChannels);
    shuffledUsers.forEach((item) => this.moveUserToVoiceChannel(item[0], item[1]));
  }

  private fetchConnectedUsers(guild: Guild): Array<GuildMember> {
    return guild.members.cache.filter((item) => item.voice.channelID !== null).array();
  }

  private fetchVoiceChannels(guild: Guild): Array<GuildChannel> {
    if (!guild) return [];
    return Array.from(guild.channels.cache.filter((channel: GuildChannel) => channel instanceof VoiceChannel).values());
  }

  private shuffleUserInVoiceChannel(user: Array<GuildMember>, availableChannels: Array<GuildChannel>): Array<[GuildMember, GuildChannel]> {
    return user.map((user) => {
      let randomChannelIndex: number;
      do {
        randomChannelIndex = Math.floor(Math.random() * availableChannels.length);
      } while (availableChannels[randomChannelIndex].id === user.voice.channelID);
      return [user, availableChannels[randomChannelIndex]];
    });
  }

  private moveUserToVoiceChannel(user: GuildMember, channel: GuildChannel): void {
    this.logger.log(`${userColor(user.displayName)} moved to ${channelColor(channel.name)}`);
    user.voice.setChannel(channel.id, 'Synergy!');
  }

}
