import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import { weatherApiKey } from '../config';

export class WeatherProviderRepository {
  weatherBaseUrl = 'https://api.climacell.co/v3/';
  defaultUnitSystem = 'si';

  async getWeatherRealtimeByCoordinates(
    lat: number,
    lon: number,
    selectedFields: string[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    try {
      const params = new URLSearchParams();
      params.append('apikey', weatherApiKey);
      params.append('lat', lat.toString());
      params.append('lon', lon.toString());
      params.append('unit_system', this.defaultUnitSystem);
      for (const selectedField of selectedFields) {
        params.append('fields', selectedField);
      }
      const response = await fetch(
        this.weatherBaseUrl + 'weather/realtime?' + params,
      );
      return await response.json();
    } catch (error) {
      // TODO: add error logging
      console.log(error);
      return null;
    }
  }
}
