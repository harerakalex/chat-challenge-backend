import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

import { STATUS_CODES, STATUS } from '../constants';

config();

const error = (
  res,
  error,
  message = 'An unknown error occurred',
  statusCode = STATUS_CODES.SERVER_ERROR,
) => {
  addHeaders(res);

  res.statusCode = statusCode;

  res.end(
    JSON.stringify(
      {
        status: STATUS.FAIL,
        message,
        error,
      },
      null,
      3,
    ),
  );
};

const success = (res, code, status, message, data = null) => {
  addHeaders(res);

  res.statusCode = code;

  res.end(
    JSON.stringify(
      {
        status: status,
        message,
        data,
      },
      null,
      3,
    ),
  );
};

const addHeaders = (res) => {
  return res.setHeader('Content-Type', 'application/json');
};

const timeStamp = () => {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  var DateTime = date + ' ' + time;
  return DateTime;
};

const generateToken = (id, username) => {
  const token = jwt.sign(
    {
      id: id,
      username: username,
    },
    process.env.SECRETKEY,
    { expiresIn: '24h' },
  );
  return token;
};

const checkAuth = (token) => {
  try {
    if (!token || token === '')
      return { error: { status: STATUS_CODES.UNAUTHORIZED, message: 'No token provided' } };

    const decode = jwt.verify(token, process.env.SECRETKEY);

    return decode;
  } catch (error) {
    return { error: { status: STATUS_CODES.UNAUTHORIZED, message: error.message } };
  }
};

const validator = (data, schema) => {
  if (typeof data !== 'object') return { error: { message: 'Should be valid object' } };

  const keys = Object.keys(data);
  // Validate unwanted field
  for (var i in keys) {
    if (!schema.includes(keys[i])) {
      return { error: { message: `${keys[i]} is not allowed` } };
    }
  }

  // Validate unwanted field
  for (var i in schema) {
    if (!keys.includes(schema[i])) {
      return { error: { message: `${schema[i]} is required` } };
    }
  }

  return true;
};

export { success, error, timeStamp, generateToken, validator, checkAuth };
