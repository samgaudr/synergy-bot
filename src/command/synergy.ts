import { BotCommand } from './bot-command';
import { Guild, GuildChannel, GuildMember, Message, VoiceChannel } from 'discord.js';
import { cyan, yellow } from 'chalk';
import { DateTimeLogger } from '../datetime-logger';

export class SynergyCommand implements BotCommand {
  private logger = new DateTimeLogger();

  public run(message: Message, args: Array<String>): void {
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
    this.logger.log(`${yellow(user.displayName)} moved to ${cyan(channel.name)}`);
    user.voice.setChannel(channel.id, 'Synergy!');
  }
}
