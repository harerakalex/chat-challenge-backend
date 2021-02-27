import supertest from 'supertest';
import { STATUS_CODES } from '../constants';
import { server } from '../';
import Query from '../models/queries';

let token;
describe('MessageController', () => {
  beforeEach(async () => {
    await supertest(server).post('/signup').send({
      username: 'carlos2',
      password: 'butare',
    });

    const user = await supertest(server).post('/login').send({
      username: 'carlos2',
      password: 'butare',
    });

    token = user.body.data.token;
  });

  it('should send message', async () => {
    const res = await supertest(server).post('/message').set('Authorization', token).send({
      receiverId: 1,
      message: 'hi',
    });

    expect(res.status).toBe(STATUS_CODES.CREATED);
  });

  it('should not send message if ivalid token is provided', async () => {
    const res = await supertest(server).post('/message').set('Authorization', 'fake token').send({
      receiverId: 1,
      message: 'hi',
    });

    expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
  });

  it('should not send message if empty token is provided', async () => {
    const res = await supertest(server).post('/message').set('Authorization', '').send({
      receiverId: 1,
      message: 'hi',
    });

    expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
  });

  it('should not send message if no massage provided', async () => {
    const res = await supertest(server).post('/message').set('Authorization', token).send({});

    expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
  });

  it('should not send message if receiver not exist', async () => {
    const res = await supertest(server).post('/message').set('Authorization', token).send({
      receiverId: 1000000,
      message: 'hi',
    });

    expect(res.status).toBe(STATUS_CODES.NOT_FOUND);
  });

  it('Get user message', async () => {
    const res = await supertest(server).get('/message').set('Authorization', token);

    expect(res.status).toBe(STATUS_CODES.OK);
  });

  it('should not get messages if user not autholized', async () => {
    const res = await supertest(server).get('/message').set('Authorization', '');

    expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
  });
});
