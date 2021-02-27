import { Server } from 'socket.io';

import eventEmitter from './eventEmitter';

export default (app) => {
  const io = new Server(app, {
    cors: {
      origin: '*',
      methods: '*',
    },
  });

  io.on('connection', (client) => {
    eventEmitter.on('messageCreated', (message) => {
      client.emit('newMessage', {
        message,
      });
      client.broadcast.emit('newMessage', {
        message,
      });
    });
  });

  return io;
};
