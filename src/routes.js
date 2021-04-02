import {Router} from 'express'
import * as NotFoundController from './controllers/NotFoundController';
import * as ConectorController from './controllers/ConectorController';
import * as UserController from './controllers/UserController';
import AuthJWT from "./middleware/auth";

export const routes = new Router();

routes.get('/api/user', UserController.showAll);
routes.post('/api/user/register', UserController.register);
routes.post('/api/user/login', UserController.login);
routes.post('/api/user/logout', UserController.logout);

routes.get('/api/conector/', AuthJWT, ConectorController.index);
routes.get('/api/conector/:query', AuthJWT, ConectorController.findBy);
routes.post('/api/conector', AuthJWT, ConectorController.store);
routes.put('/api/conector/:id', AuthJWT, ConectorController.updateConector);
routes.delete('/api/conector/:id', AuthJWT, ConectorController.deleteConector);

routes.get('*', NotFoundController.notFound);
routes.post('*', NotFoundController.notFound);
routes.put('*', NotFoundController.notFound);
routes.delete('*', NotFoundController.notFound);