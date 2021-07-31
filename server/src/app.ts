import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { movieIndexRouter } from './routes';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.set('trust proxy', true);
app.use(helmet());
app.use(cors());
app.use(json());

//routers
app.use(movieIndexRouter);

//handle invalid routes
app.get('*', async () => {
    throw new NotFoundError();
});
//end routers

app.use(errorHandler);

export { app };
