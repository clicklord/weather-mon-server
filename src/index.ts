import 'dotenv/config';
import 'reflect-metadata';
import { dbConfig } from './config';
import { startAppServer } from './server';
import connectDB from './database';

((): void  => {
  connectDB({db: dbConfig.connectString});
  startAppServer();
})();
