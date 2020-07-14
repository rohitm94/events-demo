import {Router} from 'express';
import * as EventController from './controller';

const routes = new Router();

routes.post('/newEvent', EventController.createEvent);
routes.get('/getevents', EventController.getALLEvents);

export default routes;