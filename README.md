# Synergy Bot
The Synergy's official Discord bot.

## Setup bot in Discord

1. Create application in Discord
1. Add bot to application in Discord
1. Invite bot in test channel
1. Get bot token
1. Add [config file](#config) to project
1. Run `npm run build && node dist/index.js` to run the bot on the local wokstation in production mode.

[More information on discord bot](https://discordpy.readthedocs.io/en/latest/discord.html)

## Bot configuration

The configuration can be stored in multiple way, in order of priority:
1. A JSON string in an environment variable named `SNRG_CONFIG`
1. In a file `synergy.config.json`.

### Config example <a name="config"></a>
```json
{
    "commandPrefix": "!",
    "discordBotToken": "<discord-bot-token>"
}
```

## Development
### Logger Color Code

| Color                                                            | Log Item           | function     |
| ---------------------------------------------------------------- | ------------------ | ------------ |
| ![](https://via.placeholder.com/15/008000/000000?text=+) green   | Success message    | successColor |
| ![](https://via.placeholder.com/15/FF0000/000000?text=+) red     | Error message      | errorColor   |
| ![](https://via.placeholder.com/15/0000FF/000000?text=+) blue    | Command name       | commandColor |
| ![](https://via.placeholder.com/15/FFFF00/000000?text=+) yellow  | User name or ID    | userColor    |
| ![](https://via.placeholder.com/15/FF00FF/000000?text=+) magenta | Channel Name or ID | channelColor |
| ![](https://via.placeholder.com/15/00FFFF/000000?text=+) cyan    | Date or Datetime   | dateColor    |
