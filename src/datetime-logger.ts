import { cyan } from 'chalk';


export class DateTimeLogger {
  public log(message: String) {
    console.log(cyan(`[${new Date().toISOString()}]`), message);
  }
}
