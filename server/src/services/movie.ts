import { Movie } from '../models/movie';
import { NotFoundError } from '../errors/not-found-error';

const instance = {
    async getAllMovies(params: object) {
        // @ts-ignore
        const { page, limit, sort_by, ...filter } = params;
        const options = {
            page: page ? page : 1,
            limit: limit ? limit : 20,
        };
        try {
            let aggregate = Movie.aggregate();
            if (sort_by) {
                const [field, value] = sort_by.split('.');
                const sortArg = {};
                // @ts-ignore
                sortArg[field] = value === 'desc' ? -1 : 1;
                aggregate.sort(sortArg);
            }
            if (filter) {
                const filterArg = {};
                for (const [field, value] of Object.entries(filter)) {
                    if (field.split('.').length !== 1) {
                        console.log(value);
                    } else {
                        // @ts-ignore
                        filterArg[field] = this.getFilterValueTypeBaseOnField(
                            field,
                            value
                        );
                    }
                }
                aggregate.match(filterArg);
            }
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

    getFilterValueTypeBaseOnField(field: string, value: string) {
        switch (field) {
            case 'vote_average':
                return Number.parseFloat(value);
            default:
                return value;
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
