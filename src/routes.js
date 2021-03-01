import WelcomeController from './controllers/welcomeController';
import AuthController from './controllers/authController';
import MessageController from './controllers/messageController';

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: WelcomeController.index,
  },
  {
    method: 'POST',
    path: '/signup',
    handler: AuthController.signup,
  },
  {
    method: 'POST',
    path: '/login',
    handler: AuthController.login,
  },
  {
    method: 'POST',
    path: '/message',
    handler: MessageController.sendMessage,
  },
  {
    method: 'GET',
    path: '/message',
    handler: MessageController.getUserMessages,
  },
  {
    method: 'GET',
    path: '/users',
    handler: AuthController.getAllUser,
  },
];

export { routes };
