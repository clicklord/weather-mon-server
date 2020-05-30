import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as pinoHttp from 'pino-http';
import { logger } from './utils/Logger';
import { NotFoundError } from './utils/errors';
import { handleErrors } from './middleware/handleErrors';
import { corsUrl } from './config';
import routesV1 from './routes/v1';

process.on('uncaughtException', (err: Error) => {
  logger.error(err.message);
});

const app = express();
app.use(pinoHttp({ logger: logger }));

// Create link to Angular build directory
// const distDir = __dirname + '/../../client/dist/mean-blog-client/browser';
// app.use(express.static(distDir));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '10mb',
    extended: true,
    parameterLimit: 50000
  })
);
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

// Routes
app.use('/api/v1', routesV1);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next) => next(new NotFoundError('Path not found')));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(handleErrors);

export default app;
