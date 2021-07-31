import mongoose from 'mongoose';
import { app } from './app';

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

};

start();

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!!!`);
});
