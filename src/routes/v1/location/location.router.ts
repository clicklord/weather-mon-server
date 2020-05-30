import * as express from 'express';
import { LocationController } from './location.controller';

const locationRouter = express.Router();

locationRouter.get('/', new LocationController().getLocationCities);
locationRouter.post('/', new LocationController().createLocationCity);

export default locationRouter;