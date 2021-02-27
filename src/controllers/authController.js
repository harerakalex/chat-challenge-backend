import bcrypt from 'bcrypt';

import * as helpers from '../helpers';
import Query from '../models/queries';
import { STATUS_CODES, STATUS, TABLES, siginupSchema } from '../constants';

class AuthController {
  async signup(_req, res, _param, postData) {
    try {
      const data = JSON.parse(postData);
      const validate = helpers.validator(data, siginupSchema);

      if (validate.error) {
        return helpers.success(res, STATUS_CODES.BAD_REQUEST, STATUS.FAIL, validate.error.message);
      }

      const user = await Query.selectByColumn(TABLES.USERS, 'username', data.username);

      if (user) {
        const message = 'User already exist';
        return helpers.success(res, STATUS_CODES.CONFLICT, STATUS.FAIL, message);
      }

      const payload = {
        username: data.username,
        password: bcrypt.hashSync(data.password, 10),
        created_at: helpers.timeStamp(),
      };
      const add = await Query.createUser(payload);

      const message = 'User registered successfully';

      return helpers.success(res, STATUS_CODES.CREATED, STATUS.SUCCESS, message, add);
    } catch (error) {
      return helpers.error(res, error);
    }
  }

  async login(_req, res, _param, postData) {
    try {
      const data = JSON.parse(postData);
      const user = await Query.selectByColumn(TABLES.USERS, 'username', data.username);

      if (!user) {
        const message = 'This username is not registered, Please sign up';
        return helpers.success(res, STATUS_CODES.UNAUTHORIZED, STATUS.FAIL, message);
      }

      if (!bcrypt.compareSync(data.password, user.password)) {
        const message = 'Incorrect email or password';
        return helpers.success(res, STATUS_CODES.UNAUTHORIZED, STATUS.FAIL, message);
      }

      const token = helpers.generateToken(user.id, user.username);
      const message = 'User logged in successfully';

      return helpers.success(res, STATUS_CODES.OK, STATUS.SUCCESS, message, {
        ...user,
        token,
      });
    } catch (error) {
      return helpers.error(res, error.message);
    }
  }
}

export default new AuthController();
