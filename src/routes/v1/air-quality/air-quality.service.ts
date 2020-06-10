import { WeatherProviderRepository } from '../../../repositories/weather-provider.repository';
import { LocationRepository } from '../location/location.repository';

export class AirQualityService {

  private weatherProviderRepository: WeatherProviderRepository;
  private locationRepository: LocationRepository;

  constructor(
    weatherProviderRepository?: WeatherProviderRepository,
    locationRepository?: LocationRepository
  ) {
    this.weatherProviderRepository = weatherProviderRepository ?? new WeatherProviderRepository();
    this.locationRepository = locationRepository ?? new LocationRepository();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getAirQualityRealTime(cityName: string): Promise<any> {

    const foundCity = await this.locationRepository.getLocationCityByName(cityName);

    if (!foundCity) return null;

    return await this.weatherProviderRepository.getWeatherRealtimeByCoordinates(
      foundCity.location.coordinates[1] ?? 0,
      foundCity.location.coordinates[0] ?? 0,
      [
        'pm25',
        'pm10',
        'no2',
        'co',
        'so2',
        'o3',
        'epa_aqi',
        'epa_health_concern',
        'china_aqi',
        'china_health_concern'
      ]
    );
  }
}