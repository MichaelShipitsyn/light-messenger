import { attach, createEffect, restore } from 'effector';
import { io } from 'socket.io-client';

export const socketFx = createEffect(() => io('ws://localhost:8080'));

export const $io = restore(socketFx, null);

export const socketEmitFx = attach({
  source: $io,
  effect: (
    io,
    { eventName, payload }: { eventName: string; payload: unknown }
  ) => {
    io?.emit(eventName, JSON.stringify(payload));
  },
});
