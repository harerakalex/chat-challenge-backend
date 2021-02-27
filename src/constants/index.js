const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

const STATUS = {
  SUCCESS: 'success',
  FAIL: 'fail',
};

const TABLES = {
  USERS: 'users',
  MESSAGES: 'messages',
};

const siginupSchema = ['username', 'password'];
const messageSchema = ['receiverId', 'message'];

export { STATUS_CODES, STATUS, TABLES, siginupSchema, messageSchema };
