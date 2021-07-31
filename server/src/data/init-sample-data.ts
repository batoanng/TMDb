import sampleMovieData from './sample-movie';
import { Movie } from '../models/movie';

const instance = {
    async initSampleData() {
        await this.initSampleMovies();
    },

    initSampleMovies: async () => {
        for (let i = 0; i < sampleMovieData.length; i++) {
            const movie = new Movie(sampleMovieData[i]);
            try {
                await movie.save();
            } catch (e) {}
        }
    },
};

export { instance as initializationService };
