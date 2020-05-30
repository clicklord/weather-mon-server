import { appPort } from './config';
import app from './app';
import { logger } from './utils/Logger';

export const startAppServer = (): void => {
  app
    .listen(appPort, () => {
      console.log(`Server running on http://localhost:${appPort}`);
    })
    .on('error', (err) => logger.error(err.message));
};