import * as express from 'express';
import { LocationController } from './location.controller';

const locationRouter = express.Router();

locationRouter.get('/city/:name', new LocationController().getLocationCity);
locationRouter.get('/city', new LocationController().getLocationCities);
locationRouter.post('/city', new LocationController().createLocationCity);
locationRouter.patch('/city', new LocationController().editLocationCity);
locationRouter.delete('/city/:name', new LocationController().deleteLocationCity);

export default locationRouter;