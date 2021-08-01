import sampleMovieData from './sample-movie';
import { persistMovie } from '../services/movie';

const instance = {
    async initSampleData() {
        await this.initSampleMovies();
    },

    initSampleMovies: async () => {
        for (let i = 0; i < sampleMovieData.length; i++) {
            await persistMovie(sampleMovieData[i]);
        }
    },
};

export { instance as initializationService };
