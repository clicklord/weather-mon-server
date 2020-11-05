import * as express from 'express';
import { Request, Response } from 'express';
import { BadRequest } from '../../../utils/errors';
import { AirQualityService } from './air-quality.service';

export class AirQualityController {
  private airQualityService: AirQualityService;

  constructor(airQualityService?: AirQualityService) {
    this.airQualityService = airQualityService ?? new AirQualityService();
  }

  public getAirQualityForCity = async (
    req: Request,
    res: Response,
    next: express.NextFunction,
  ): Promise<void> => {
    try {
      const cityName = req.params['name'] ?? '';

      if (!cityName) throw new BadRequest('Invalid query params');

      const result = await this.airQualityService.getAirQualityRealTime(
        cityName,
      );

      res.json({
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };
}
