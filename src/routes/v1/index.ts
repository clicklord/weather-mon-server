import * as express from 'express';
import weatherRouter from './weather/weather.router';
import locationRouter from './location/location.router';

const router = express.Router();

router.use('/weather', weatherRouter);
router.use('/location', locationRouter);

export default router;
