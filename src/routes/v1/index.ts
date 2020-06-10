import * as express from 'express';
import weatherRouter from './weather/weather.router';
import locationRouter from './location/location.router';
import airQualityRouter from './air-quality/air-quality.router';

const router = express.Router();

router.use('/weather', weatherRouter);
router.use('/air-quality', airQualityRouter);
router.use('/location', locationRouter);

export default router;
