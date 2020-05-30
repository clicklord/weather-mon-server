import { WeatherRepository } from './weather.repository';
import { LocationRepository } from '../location/location.repository';

export class WeatherService {

  private weatherRepository: WeatherRepository;
  private locationRepository: LocationRepository;

  constructor(
    weatherRepository?: WeatherRepository,
    locationRepository?: LocationRepository
  ) {
    this.weatherRepository = weatherRepository ?? new WeatherRepository();
    this.locationRepository = locationRepository ?? new LocationRepository();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getWeatherRealTime(cityName: string): Promise<any> {

    const foundCity = await this.locationRepository.getLocationCityByName(cityName);

    if (!foundCity) return null;

    return await this.weatherRepository.getWeatherRealtimeByCoordinates(
      foundCity.location.coordinates[1] ?? 0,
      foundCity.location.coordinates[0] ?? 0,
      [
        'temp',
        'o3'
      ]
    );
  }
}