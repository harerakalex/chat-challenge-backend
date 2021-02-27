import http from 'http';

import { routes } from './routes';
import { router } from './router';

process.on('uncaughtException', function (err) {
  // handle the error
  console.log('uncaughtException');
  console.error(err.stack);
  console.log(err);
});

const server = http.createServer(async (req, res) => {
  await router(req, res, routes);
});

export { server };
