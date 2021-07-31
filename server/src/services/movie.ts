import { Movie } from '../models/movie';
import { NotFoundError } from '../errors/not-found-error';

const instance = {
    async getAllMovies(filter: object) {
        console.log(filter);
        const options = {
            page: 1,
            limit: 20,
        };
        try {
            // @ts-ignore
            const movies = await Movie.aggregatePaginate({}, options);
            return movies;
        } catch (e) {
            throw new NotFoundError();
        }
    },

    async getMovie(id: string) {
        try {
            const movie = await Movie.findOne({ id: Number.parseInt(id) });
            if (!movie) throw new Error();
            return movie;
        } catch (e) {
            throw new NotFoundError();
        }
    },
};

export { instance as movieService };
