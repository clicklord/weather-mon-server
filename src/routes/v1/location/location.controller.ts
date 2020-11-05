import * as express from 'express';
import { Request, Response } from 'express';
import { LocationService } from './location.service';
import { BadRequest, ApiError, InternalError } from '../../../utils/errors';

export class LocationController {
  DEFAULT_PAGE = 1;
  DEFAULT_PAGE_SIZE = 10;

  private locationService: LocationService;

  constructor(locationService?: LocationService) {
    this.locationService = locationService ?? new LocationService();
  }

  public createLocationCity = async (
    req: Request,
    res: Response,
    next: express.NextFunction,
  ): Promise<void> => {
    try {
      if (!req.body.name) throw new BadRequest('Invalid body params');

      const name = req.body.name ?? '';
      const description = req.body.description ?? '';
      const rawLat = req.body.lat ?? NaN;
      const rawLon = req.body.lon ?? NaN;
      const lat = Number(rawLat);
      const lon = Number(rawLon);

      if (isNaN(lat) || isNaN(lon)) {
        throw new BadRequest('Invalid body params');
      }
      const result = await this.locationService.createLocationCity(
        name,
        description,
        lat,
        lon,
      );

      if (!result) throw new ApiError(500, "Can't create new location city");

      res.json({
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };

  public editLocationCity = async (
    req: Request,
    res: Response,
    next: express.NextFunction,
  ): Promise<void> => {
    try {
      if (!req.body.name) throw new BadRequest('Invalid body params');

      const name = req.body.name ?? '';
      const description = req.body.description ?? '';
      const rawLat = req.body.lat ?? NaN;
      const rawLon = req.body.lon ?? NaN;
      const lat = Number(rawLat);
      const lon = Number(rawLon);

      if (isNaN(lat) || isNaN(lon)) {
        throw new BadRequest('Invalid body params');
      }
      const updatedCount = await this.locationService.updateLocationCity(
        name,
        description,
        lat,
        lon,
      );

      res.json({
        result: updatedCount ? true : false,
      });
    } catch (err) {
      next(err);
    }
  };

  public getLocationCities = async (
    req: Request,
    res: Response,
    next: express.NextFunction,
  ): Promise<void> => {
    try {
      const rawPage = req.query.page ?? this.DEFAULT_PAGE;
      const rawSize = req.query.size ?? this.DEFAULT_PAGE_SIZE;
      const page = Number(rawPage);
      const size = Number(rawSize);
      if (isNaN(page) || isNaN(size) || page < 1 || size < 1) {
        throw new BadRequest('Invalid query params');
      }

      const findResult = await this.locationService.getLocationCities(
        page,
        size,
      );
      if (!findResult) {
        throw new InternalError('Error while receiving cities');
      }
      res.json({
        cities: findResult.cities,
        totalCount: findResult.total,
      });
    } catch (err) {
      next(err);
    }
  };

  public getLocationCity = async (
    req: Request,
    res: Response,
    next: express.NextFunction,
  ): Promise<void> => {
    try {
      const cityName = req.params['name'] ?? '';

      if (!cityName) throw new BadRequest('Invalid query params');

      const findResult = await this.locationService.getLocationCity(cityName);

      res.json({
        city: findResult,
      });
    } catch (err) {
      next(err);
    }
  };

  public deleteLocationCity = async (
    req: Request,
    res: Response,
    next: express.NextFunction,
  ): Promise<void> => {
    try {
      const cityName = req.params['name'] ?? '';

      if (!cityName) throw new BadRequest('Invalid query params');

      const deleteCount = await this.locationService.deleteLocationCity(
        cityName,
      );

      if (deleteCount === null)
        throw new InternalError('Error while deleting city');

      res.json({
        deleted: deleteCount,
      });
    } catch (err) {
      next(err);
    }
  };
}
