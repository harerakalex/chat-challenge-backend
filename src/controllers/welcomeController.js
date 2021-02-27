import * as helpers from '../helpers';
import { STATUS_CODES, STATUS } from '../constants';

class WelcomeController {
  // Welcome msg
  async index(_req, res) {
    return helpers.success(res, STATUS_CODES.OK, STATUS.SUCCESS, 'Welcome to our app');
  }
}

export default new WelcomeController();
