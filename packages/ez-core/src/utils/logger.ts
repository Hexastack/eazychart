// inspired from https://en.wikipedia.org/wiki/Syslog
export enum Levels {
  debug, // Debug-level messages
  info, // Informational messages
  log, // Normal but significant
  warn, // Not harmful but to be taken seriously
  error, // Error conditions
  critical, // Critical conditions
  alert, // Action must be taken immediately
  emergency, // System is unusable
}

type LogFunctions = 'debug' | 'info' | 'log' | 'warn' | 'error';

interface Logger extends Console {
  emergency: Console['error'];
  alert: Console['error'];
  critical: Console['error'];
}

function createLogger(severityThreshold: number) {
  return new Proxy(console as Logger, {
    get(target, prop: string, reciever?: any) {
      if (prop in Levels) {
        if (severityThreshold <= Levels[prop as keyof typeof Levels]) {
          if (['emergency', 'alert', 'critical'].includes(prop)) {
            // we can do further customization for each danger level
            return (...args: any[]) =>
              target.error(
                `%c${prop.toUpperCase()}`,
                'font-size: 20px; color: red; display: block; background: white;',
                ...args
              );
          }
          return target[prop as LogFunctions];
        } else {
          return () => {};
        }
      }
      return Reflect.get(target, prop, reciever);
    },
  });
}
let severity = 0; // allows any log level
if (process.env.NODE_ENV === 'production') {
  severity = 3; // allow warning and errors
}
export const logger = createLogger(severity);
