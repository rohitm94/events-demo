import {Router} from 'express';
import * as UserController from '../../controllers/auth.controller';
import {verifySignUp} from '../../middlewares/index';

const routes = new Router();

routes.post('/signup',[verifySignUp.checkDuplicateUsernameOrEmail], UserController.signup);
routes.post('/login', UserController.signin);

export default routes;