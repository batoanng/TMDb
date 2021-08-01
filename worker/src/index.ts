import 'reflect-metadata';
import { initializationService } from './data/init-sample-data';
import { createConnection } from 'typeorm';
import express from 'express';
import movieQueue from './message/movie-queue';

const app = express();

require('dotenv').config();

createConnection().then(() => {
    console.log('Connect to MySQL...');
    const start = async () => {
        await initializationService.initSampleData();
        movieQueue.start();
    };

    start();

    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}!!!`);
    });
});
