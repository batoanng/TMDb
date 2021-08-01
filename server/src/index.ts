import 'reflect-metadata';
import { app } from './app';
import { initializationService } from './data/init-sample-data';
import fetchMoviesJob from './jobs/fetch-movies';
import { createConnection } from 'typeorm';

require('dotenv').config();

createConnection().then(() => {
    console.log('Connect to MySQL...');
    const start = async () => {
        await initializationService.initSampleData();
        await fetchMoviesJob.start();
    };

    start();

    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}!!!`);
    });
});
