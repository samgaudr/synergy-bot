import { DateTimeLogger } from '../src/datetime-logger';
const MockDate = require('mockdate');

describe('DateTimeLogger', () => {
  let logger: DateTimeLogger;
  const logSpy = jest.spyOn(global.console, 'log');
  const now = new Date();

  beforeEach(() => {
    logger = new DateTimeLogger();
    MockDate.set(now);

  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should log a message preceded by the current time in ISO', () => {
    const testMessage = 'message';

    logger.log(testMessage);

    MockDate.reset();

    expect(logSpy.mock.calls[0][0]).toMatch(`[${now.toISOString()}]`);
    expect(logSpy.mock.calls[0][1]).toBe(testMessage);
  });
});
