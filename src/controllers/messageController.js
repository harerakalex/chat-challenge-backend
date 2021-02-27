import * as helpers from '../helpers';
import Query from '../models/queries';
import { STATUS_CODES, STATUS, TABLES, messageSchema } from '../constants';

class MessageController {
  async sendMessage(req, res, _param, postData) {
    const token = req.headers.authorization;
    const user = helpers.checkAuth(token);

    if (user.error) {
      return helpers.success(res, user.error.status, STATUS.FAIL, user.error.message);
    }

    const data = JSON.parse(postData);
    const validate = helpers.validator(data, messageSchema);

    if (validate.error) {
      return helpers.success(res, STATUS_CODES.BAD_REQUEST, STATUS.FAIL, validate.error.message);
    }

    const receiver = await Query.selectByColumn(TABLES.USERS, 'id', data.receiverId);

    if (!receiver) {
      const message = 'Receiver does not exist';
      return helpers.success(res, STATUS_CODES.NOT_FOUND, STATUS.FAIL, message);
    }

    const add = await Query.createMessage({
      senderId: user.id,
      receiverId: data.receiverId,
      message: data.message,
      created_at: helpers.timeStamp(),
    });

    const message = 'Message sent successfully';

    return helpers.success(res, STATUS_CODES.CREATED, STATUS.SUCCESS, message, add);
  }
}

export default new MessageController();
