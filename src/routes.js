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
  // {
  //     method: 'GET',
  //     path: /\/employee\/([0-9a-z]+)/,
  //     handler: employeeController.show.bind(employeeController)
  // },
  // {
  //     method: 'POST',
  //     path: '/employee',
  //     handler: employeeController.create.bind(employeeController)
  // },
  // {
  //     method: 'PUT',
  //     path: /\/employee\/([0-9a-z]+)/,
  //     handler: employeeController.update.bind(employeeController)
  // },
  // {
  //     method: 'DELETE',
  //     path: /\/employee\/([0-9a-z]+)/,
  //     handler: employeeController.delete.bind(employeeController)
  // },
  // {
  //     method: 'POST',
  //     path: '/project',
  //     handler: projectController.create.bind(projectController)
  // },
  // {
  //     method: 'GET',
  //     path: '/project',
  //     handler: projectController.index.bind(projectController)
  // },
  // {
  //     method: 'GET',
  //     path: /\/project\/([0-9a-z]+)/,
  //     handler: projectController.show.bind(projectController)
  // },
  // {
  //     method: 'PUT',
  //     path: /\/project\/([0-9a-z]+)/,
  //     handler: projectController.update.bind(projectController)
  // },
  // {
  //     method: 'DELETE',
  //     path: /\/project\/([0-9a-z]+)/,
  //     handler: projectController.delete.bind(projectController)
  // },
];

export { routes };
