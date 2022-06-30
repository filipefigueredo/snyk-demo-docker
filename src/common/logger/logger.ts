import { getConfig } from '../configurations/config';
import { LogLevel } from './log-level.enum';

export class Logger {
  /**
   * Method that implements info log
   * @param message logging message
   */
  static log(message: string | object) {
    if (typeof message === `object`) {
      JSON.stringify(message);
    }

    const timestamp = new Date().toISOString();
    console.log(`[timestamp: ${timestamp}] [logLevel: ${LogLevel.INFO}] [message: ${message}]`);
  }

  /**
   * Method that implements debug log. The debug messages can be disabled in the configurations
   * @param message logging message
   */
  static debug(message: string | object) {
    const isDebugEnabled = getConfig('app.debugModeEnabled') === 'true' || Number(getConfig('app.debugModeEnabled')) === 1;
    if (typeof message === `object`) {
      JSON.stringify(message);
    }

    if (isDebugEnabled) {
      const timestamp = new Date().toISOString();
      console.log(`[timestamp: ${timestamp}] [logLevel: ${LogLevel.DEBUG}] [message: ${message}]`);
    }
  }

  /**
   * Method that implements error log.
   * @param message logging message
   */
  static error(message: string | object) {
    if (typeof message === `object`) {
      JSON.stringify(message);
    }

    const timestamp = new Date().toISOString();
    console.log(`[timestamp: ${timestamp}] [logLevel: ${LogLevel.ERROR}] [message: ${message}]`);
  }

  /**
   * Method that implements warn log.
   * @param message logging message
   */
  static warn(message: string | object) {
    if (typeof message === `object`) {
      JSON.stringify(message);
    }

    const timestamp = new Date().toISOString();
    console.log(`[timestamp: ${timestamp}] [logLevel: ${LogLevel.WARN}] [message: ${message}]`);
  }
}
