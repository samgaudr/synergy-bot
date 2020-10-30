import { injectable } from 'tsyringe';
import { dateColor } from './chalk-theme';

@injectable()
export class DateTimeLogger {

  public log(message: String) {
    console.log(dateColor(`[${new Date().toISOString()}]`), message);
  }

}
