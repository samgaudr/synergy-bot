import { ConfigLoader } from '../src/config-loader';

const TEST_CONFIG = {
  commandPrefix: '!',
  discordBotToken: 'token',
};

describe('ConfigLoader', () => {

  jest.mock('../synergy.conf.json', ()=>(TEST_CONFIG), { virtual: true });

  it('should load config from environment variable', () => {
    process.env = {
      SNRG_CONFIG: JSON.stringify(TEST_CONFIG),
    };

    const loader = new ConfigLoader();
    const result = loader.load();

    expect(result).toStrictEqual(TEST_CONFIG);
  });

  it('should load config from config file', () => {
    process.env ={};

    const loader = new ConfigLoader();
    const result = loader.load();

    expect(result).toStrictEqual(TEST_CONFIG);
  });
});
