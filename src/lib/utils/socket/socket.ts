import {io, Socket as BaseSocket} from 'socket.io-client';

import {API_BASE_URL} from '../../constants';
import sk from '../../constants/socket';
import {InnerKeys} from '../helpers/objects';

// type EventName = keyof {[key in InnerKeys<typeof sk>]: string};
export type EventName = InnerKeys<typeof sk>;

type EventPayloads = {};

export interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

// class SocketProps extends BaseSocket<DefaultEventsMap, DefaultEventsMap> {
//   emit<E extends keyof EventPayloads>(
//     event: E,
//     payload: EventPayloads[E],
//   ): this;
//   emit(event: EventName, payload?: any): this {
//     return super.emit(event, payload);
//   }

//   on<E extends keyof EventPayloads>(
//     event: E,
//     listener: (payload: EventPayloads[E]) => void,
//   ): this;
//   on(event: EventName, listener: (payload: any) => void): this {
//     return super.on(event, listener);
//   }
// }

// const socket: SocketProps = io(API_BASE_URL, {});
const socket = io(API_BASE_URL, {});
export default socket;
