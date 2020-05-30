import { LocationRepository } from './location.repository';
import { LocationCityModel } from '../../../database/models/location-city';

export class LocationService {

  private locationRepository: LocationRepository;

  constructor(locationRepository?: LocationRepository) {
    this.locationRepository = locationRepository ?? new LocationRepository();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createLocationCity(
    cityName: string,
    descriptionCity: string,
    lat: number,
    lon: number
  ): Promise<LocationCityModel | null> {
    return await this.locationRepository.createLocationCity(
      cityName,
      descriptionCity,
      lat,
      lon
    );
  }

  async getLocationCities(
    page: number,
    size: number
  ): Promise<{cities: LocationCityModel[]; total: number} | null> {
    const findResult = await this.locationRepository.getLocationCitiesPaginated(page, size);

    if (!findResult) return null;

    return {cities: findResult.docs ?? [], total:findResult.total};
  }
}