import * as express from 'express';
import { WeatherController } from './weather.controller';

const weatherRouter = express.Router();

weatherRouter.get('/city/:name', new WeatherController().getWeatherForCity);

export default weatherRouter;