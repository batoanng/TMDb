import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { movieRouter } from './routes/movie';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import cors from 'cors';
import helmet from 'helmet';
import { peopleRouter } from './routes/people';
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.set('trust proxy', true);
app.use(helmet());
app.use(cors());
app.use(json());
app.use(
    morgan('common', {
        stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {
            flags: 'a',
        }),
    })
);

//routers
app.use(movieRouter);
app.use(peopleRouter);

//handle invalid routes
app.get('*', async () => {
    throw new NotFoundError();
});
//end routers

app.use(errorHandler);

export { app };
