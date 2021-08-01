import sampleMovieData from './sample-movie';
import samplePeopleData from './sample-people';
import { persistMovie } from '../services/movie';
import { getConnection } from 'typeorm';
import { Movie } from '../entity/Movie';
import { Person } from '../entity/Person';

const instance = {
    async initSampleData() {
        await this.initSampleMovies();
        await this.initSamplePeople();
    },

    initSampleMovies: async () => {
        for (let i = 0; i < sampleMovieData.length; i++) {
            await persistMovie(sampleMovieData[i]);
        }
    },

    initSamplePeople: async () => {
        for (let i = 0; i < samplePeopleData.length; i++) {
            const connection = await getConnection();
            const personRepository = connection.getRepository(Person);
            const person = samplePeopleData[i];
            // @ts-ignore
            await personRepository.save(person);
        }
    },
};

export { instance as initializationService };
