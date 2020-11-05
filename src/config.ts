const environment = process.env.NODE_ENV;
const appPort: number = Number(process.env.APP_PORT) || 3000;

const logLevel = process.env.LOG_LEVEL || 'info';

const corsUrl = process.env.CORS_URL;

const dbPort = Number(process.env.DB_PORT);

const weatherApiKey = process.env.WEATHER_APIKEY || '';

const dbConfig = {
  type: 'mongodb+srv',
  host: process.env.DB_HOST,
  port: isNaN(dbPort) ? 27017 : dbPort,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectString: '',
};

dbConfig.connectString = `${dbConfig.type}://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/${dbConfig.database}`;

export { environment, appPort, logLevel, corsUrl, dbConfig, weatherApiKey };
