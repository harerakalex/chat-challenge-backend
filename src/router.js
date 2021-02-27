import * as helpers from './helpers';
import { STATUS_CODES, STATUS } from './constants';

const router = async (req, res, routes) => {
  // Find a matching route
  const route = routes.find((route) => {
    const methodMatch = route.method === req.method;
    let pathMatch = false;

    if (typeof route.path === 'object') {
      // Path is a RegEx, we use RegEx matching
      pathMatch = req.url.match(route.path);
    } else {
      // Path is a string, we simply match with URL
      pathMatch = route.path === req.url;
    }

    return pathMatch && methodMatch;
  });

  // Extract the "id" parameter from route and pass it to controller
  let param = null;

  if (route && typeof route.path === 'object') {
    param = req.url.match(route.path)[1];
  }

  // Extract request body
  if (route) {
    let body = null;

    if (req.method === 'POST' || req.method === 'PUT') {
      body = await getPostData(req);

      if (!body)
        return helpers.success(res, STATUS_CODES.BAD_REQUEST, STATUS.FAIL, 'No data provided');
    }

    return route.handler(req, res, param, body);
  } else {
    return helpers.success(res, STATUS_CODES.NOT_FOUND, STATUS.FAIL, 'Endpoint not found');
  }
};

/**
 * Extract posted data from request body
 * @param req
 * @returns {Promise<any>}
 */
function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(body);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export { router };
