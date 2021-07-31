import mongoose from 'mongoose';
import { app } from './app';
import { initializationService } from './data/init-sample-data';
import fetchMoviesJob from './jobs/fetch-movies';

require('dotenv').config();

const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('Mongo URI is required!');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Connected to mongodb...');
    } catch (error) {
        console.error(error);
    }

    await initializationService.initSampleData();
    await fetchMoviesJob.start();
};

start();

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!!!`);
});
