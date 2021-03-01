import supertest from 'supertest';
import { STATUS_CODES } from '../constants';
import { server } from '../';
import Query from '../models/queries';

describe('AuthController', () => {
  describe('Signup', () => {
    it('should be able to register a user', async () => {
      const res = await supertest(server).post('/signup').send({
        username: 'carlos',
        password: 'butare',
      });

      expect(res.status).toBe(STATUS_CODES.CREATED);
    });

    it('should not be able to register a user if no data provided', async () => {
      const res = await supertest(server).post('/signup').send({});

      expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    it('should not be able to register a user twice', async () => {
      const res = await supertest(server).post('/signup').send({
        username: 'carlos',
        password: 'butare',
      });

      expect(res.status).toBe(STATUS_CODES.CONFLICT);
    });

    it('should not be able to register a user wrong object is provided', async () => {
      const res = await supertest(server).post('/signup').send('1');

      expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    it('should not be able to register a user if put an allowed data', async () => {
      const res = await supertest(server).post('/signup').send({ invlaid: 'invalid' });

      expect(res.status).toBe(STATUS_CODES.BAD_REQUEST);
    });

    it('should send HTTP errors', async () => {
      const createUserSpy = jest.spyOn(Query, 'createUser');
      createUserSpy.mockRejectedValueOnce('an error');
      const res = await supertest(server).post('/signup').send({
        username: 'carlos1',
        password: 'butare1',
      });
      expect(res.status).toBe(STATUS_CODES.SERVER_ERROR);
    });
  });

  describe('login', () => {
    it('should be able to login a user', async () => {
      const res = await supertest(server).post('/login').send({
        username: 'carlos',
        password: 'butare',
      });

      expect(res.status).toBe(STATUS_CODES.OK);
    });

    it('should not be able to login a user if username is invalid', async () => {
      const res = await supertest(server).post('/login').send({
        username: 'invalid',
        password: 'butare',
      });

      expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });

    it('should not be able to login a user for incorrect password', async () => {
      const res = await supertest(server).post('/login').send({
        username: 'carlos',
        password: 'fake',
      });

      expect(res.status).toBe(STATUS_CODES.UNAUTHORIZED);
    });

    it('should send HTTP errors', async () => {
      const findUserSpy = jest.spyOn(Query, 'selectByColumn');
      findUserSpy.mockRejectedValueOnce('an error');
      const res = await supertest(server).post('/login').send({
        username: 'carlos1',
        password: 'butare1',
      });
      expect(res.status).toBe(STATUS_CODES.SERVER_ERROR);
    });
  });

  describe('Get all users', () => {
    it('should get all users', async () => {
      const res = await supertest(server).get('/users');

      expect(res.status).toBe(STATUS_CODES.OK);
    });
  });
});
