import { cyan } from 'chalk';
import { injectable } from 'tsyringe';

@injectable()
export class DateTimeLogger {

  public log(message: String) {
    console.log(cyan(`[${new Date().toISOString()}]`), message);
  }

}
