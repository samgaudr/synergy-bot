import { injectable } from 'tsyringe';
import { SynergyBotConfiguration } from './synergy-bot-configuration';

const configFile = '../synergy.conf.json';

@injectable()
export class ConfigLoader {

  public load(): SynergyBotConfiguration {
    let config: SynergyBotConfiguration;
    if (process.env.SNRG_CONFIG) {
      config = JSON.parse(process.env.SNRG_CONFIG);
    } else {
      config = require(configFile);
    }
    return config;
  }

}
