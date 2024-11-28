// import  format from 'date-fns/format';
// import {nanoid} from 'nanoid/non-secure';

// import {Sentry} from '#/logger/sentry';
// import * as env from '#/env';
// import {DebugContext} from '#/logger/debugContext';
// import {add} from '#/logger/logDump';

// export enum LogLevel {
//   Debug = 'debug',
//   Info = 'info',
//   Warn = 'warn',
//   Log = 'log',
//   Error = 'error',
// }

// type Transport = (
//   level: LogLevel,
//   message: string | Error,
//   metadata: Metadata,
//   timestamp: number,
// ) => void;

// type Metadata = {
//   type?:
//     | 'default'
//     | 'debug'
//     | 'error'
//     | 'navigation'
//     | 'http'
//     | 'info'
//     | 'query'
//     | 'transaction'
//     | 'ui'
//     | 'user';

//   tags?: {
//     [key: string]:
//       | number
//       | string
//       | boolean
//       | bigint
//       | symbol
//       | null
//       | undefined;
//   };
//   [key: string]: unknown;
// } & Parameters<typeof Sentry.captureException>[1];

// export type ConsoleTransportEntry = {
//   id: string;
//   timestamp: number;
//   level: LogLevel;
//   message: string | Error;
//   metadata: Metadata;
// };

// const enableLogLevels: {
//   [key in LogLevel]: LogLevel[];
// } = {
//   [LogLevel.Debug]: [
//     LogLevel.Debug,
//     LogLevel.Info,
//     LogLevel.Warn,
//     LogLevel.Log,
//     LogLevel.Error,
//   ],
//   [LogLevel.Info]: [LogLevel.Info, LogLevel.Warn, LogLevel.Log, LogLevel.Error],
//   [LogLevel.Log]: [LogLevel.Log, LogLevel.Warn, LogLevel.Error],
//   [LogLevel.Warn]: [LogLevel.Warn, LogLevel.Error],
//   [LogLevel.Error]: [LogLevel.Error],
// };

// export function prepareMetadata(metadata: Metadata): Metadata {
//   return Object.keys(metadata).reduce((acc, key) => {
//     let value = metadata[key];
//     if (value instanceof Error) {
//       value = value.message.toString();
//     }
//     return {...acc, [key]: value};
//   }, {});
// }

// export const consoleTransport: Transport = (
//   level,
//   message,
//   metadata,
//   timestamp,
// ) => {
//   const extra = Object.keys(metadata).length
//     ? ' ' + JSON.stringify(prepareMetadata(metadata), null, ' ')
//     : ' ';

//   const log = {
//     [LogLevel.Debug]: console.debug,
//     [LogLevel.Info]: console.info,
//     [LogLevel.Log]: console.log,
//     [LogLevel.Warn]: console.warn,
//     [LogLevel.Error]: console.error,
//   }[level];

//   if (message instanceof Error) {
//     console.info(
//       `${format(timestamp, 'HH:mm:ss')} ${message.message.toString()}${extra}`,
//     );
//   }
// };
