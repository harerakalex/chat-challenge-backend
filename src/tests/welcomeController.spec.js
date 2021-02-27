import supertest from 'supertest';
import { STATUS_CODES } from '../constants';
import { server } from '../';

describe('WelcomeController', () => {
  it('Welcome message', async () => {
    const res = await supertest(server).get('/');

    expect(res.status).toBe(STATUS_CODES.OK);
  });

  it('Should return not found when try to access ivalid api', async () => {
    const res = await supertest(server).get('/invalid');

    expect(res.status).toBe(STATUS_CODES.NOT_FOUND);
  });

  it('Should stop if no data provided for post request', async () => {
    const res = await supertest(server).post('/login');

    expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
  });
});
