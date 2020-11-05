import * as express from 'express';
import { Request, Response } from 'express';
import { WeatherService } from './weather.service';
import { BadRequest } from '../../../utils/errors';

export class WeatherController {
  private weatherService: WeatherService;

  constructor(weatherService?: WeatherService) {
    this.weatherService = weatherService ?? new WeatherService();
  }

  public getWeatherForCity = async (
    req: Request,
    res: Response,
    next: express.NextFunction,
  ): Promise<void> => {
    try {
      const cityName = req.params['name'] ?? '';

      if (!cityName) throw new BadRequest('Invalid query params');

      const result = await this.weatherService.getWeatherRealTime(cityName);

      res.json({
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };
}
