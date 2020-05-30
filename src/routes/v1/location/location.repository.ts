import LocationCity, {LocationCityModel} from '../../../database/models/location-city';
import { PaginateResult } from 'mongoose';

export class LocationRepository {

  async createLocationCity(
    cityName: string,
    descriptionCity: string,
    lat: number,
    lon: number
  ): Promise<LocationCityModel | null> {
    try {
      const locationCity = new LocationCity({
        name: cityName,
        description: descriptionCity,
        location: {
          type: 'Point',
          coordinates: [lon, lat]
        }
      });
      return await locationCity.save();
    } catch (error) {
      // TODO: add error logging
      console.log(error);
      return null;
    }
  }

  async getLocationCityByName(name: string): Promise<LocationCityModel | null> {
    try {
      return await LocationCity.findOne({name})
    } catch (error) {
      // TODO: add error logging
      console.log(error);
      return null;
    }
  }

  async getLocationCitiesPaginated(
    page: number,
    limit: number
  ): Promise<PaginateResult<LocationCityModel> | null> {
    try {
      return await LocationCity.paginate({}, { page, limit});
    } catch (error) {
      // TODO: add error logging
      console.log(error);
      return null;
    }
  }
}