import * as helpers from '../helpers';
import Query from '../models/queries';
import { STATUS_CODES, STATUS, TABLES, messageSchema } from '../constants';
import eventEmitter from '../helpers/eventEmitter';

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
    // Catch msg sent and create an event
    eventEmitter.emit('messageCreated', add);

    const message = 'Message sent successfully';

    return helpers.success(res, STATUS_CODES.CREATED, STATUS.SUCCESS, message, add);
  }

  async getUserMessages(req, res) {
    const token = req.headers.authorization;
    const user = helpers.checkAuth(token);
    let data = [];

    if (user.error) {
      return helpers.success(res, user.error.status, STATUS.FAIL, user.error.message);
    }

    const { id } = user;
    data = await Query.getUserMessages(id);

    await Promise.all(
      data.map(async (message) => {
        const receiver = await Query.selectByColumn(TABLES.USERS, 'id', message.receiverid);
        message.receiverName = receiver.username;
        return message;
      }),
    );

    const message = 'Message fetched successfully';

    return helpers.success(res, STATUS_CODES.OK, STATUS.SUCCESS, message, data);
  }
}

export default new MessageController();
