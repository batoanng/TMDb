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
            let aggregate = Movie.aggregate();
            aggregate.sort({ popularity: -1 });
            aggregate.project({
                _id: 0,
                id: 1,
                adult: 1,
                backdrop_path: 1,
                genres: 1,
                original_language: 1,
                original_title: 1,
                overview: 1,
                popularity: 1,
                poster_path: 1,
                release_date: 1,
                title: 1,
                video: 1,
                vote_average: 1,
                vote_count: 1,
            });

            // @ts-ignore
            const movies = await Movie.aggregatePaginate(aggregate, options);
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
