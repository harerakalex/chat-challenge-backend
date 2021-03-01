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
  await cors(res);
  await router(req, res, routes);
});

const cors = async (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Allow-Headers', '*');

  return true;
};

export { server };
