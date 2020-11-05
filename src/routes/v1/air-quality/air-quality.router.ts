import * as express from 'express';
import { AirQualityController } from './air-quality.controller';

const airQualityRouter = express.Router();

airQualityRouter.get(
  '/city/:name',
  new AirQualityController().getAirQualityForCity,
);

export default airQualityRouter;
