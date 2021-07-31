import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.set('trust proxy', true);
app.use(helmet());
app.use(cors());
app.use(json());

export { app };
