import { WeatherProviderRepository } from '../../../repositories/weather-provider.repository';
import { LocationRepository } from '../location/location.repository';

export class WeatherService {
  private weatherProviderRepository: WeatherProviderRepository;
  private locationRepository: LocationRepository;

  constructor(
    weatherProviderRepository?: WeatherProviderRepository,
    locationRepository?: LocationRepository,
  ) {
    this.weatherProviderRepository =
      weatherProviderRepository ?? new WeatherProviderRepository();
    this.locationRepository = locationRepository ?? new LocationRepository();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getWeatherRealTime(cityName: string): Promise<any> {
    const foundCity = await this.locationRepository.getLocationCityByName(
      cityName,
    );

    if (!foundCity) return null;

    return await this.weatherProviderRepository.getWeatherRealtimeByCoordinates(
      foundCity.location.coordinates[1] ?? 0,
      foundCity.location.coordinates[0] ?? 0,
      [
        'temp',
        'feels_like',
        'humidity',
        'wind_speed',
        'precipitation_type',
        'precipitation',
        'visibility',
        'moon_phase',
      ],
    );
  }
}
