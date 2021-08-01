import { NotFoundError } from '../errors/not-found-error';
import { getConnection } from 'typeorm';
import { Movie } from '../entity/Movie';

const instance = {
    async getAllMovies(params: object) {
        // @ts-ignore
        const { page, limit, sort_by, ...filter } = params;
        try {
            const pageChecked = page ? Number.parseInt(page) : 1;
            const limitChecked = limit ? Number.parseInt(limit) : 20;
            const skip = limitChecked * (pageChecked - 1);
            const connection = await getConnection();
            const movieRepository = connection.getRepository(Movie);
            const total: number = await movieRepository.count();
            const movies = await movieRepository
                .createQueryBuilder('movie')
                .leftJoinAndSelect('movie.belongs_to_collection', 'Collection')
                .leftJoinAndSelect('movie.genres', 'Genre')
                .leftJoinAndSelect('movie.production_companies', 'Company')
                .leftJoinAndSelect('movie.spoken_languages', 'Language');
            if (sort_by) {
                const [field, value] = sort_by.split('.');
                await movies.orderBy(
                    `movie.${field}`,
                    value === 'desc' ? 'DESC' : 'ASC'
                );
            }
            const result = await movies.skip(skip).take(limit).getMany();
            return {
                docs: result,
                total,
                page: pageChecked,
                limit: limitChecked,
                totalPages: Math.ceil(total / limitChecked),
            };
            // let aggregate = Movie.aggregate();
            // if (sort_by) {
            //     const [field, value] = sort_by.split('.');
            //     const sortArg = {};
            //     // @ts-ignore
            //     sortArg[field] = value === 'desc' ? -1 : 1;
            //     aggregate.sort(sortArg);
            // }
            // if (filter) {
            //     const filterArg = {};
            //     for (const [field, value] of Object.entries(filter)) {
            //         if (field.split('.').length !== 1) {
            //             console.log(value);
            //         } else {
            //             // @ts-ignore
            //             filterArg[field] = this.getFilterValueTypeBaseOnField(
            //                 field,
            //                 value
            //             );
            //         }
            //     }
            //     aggregate.match(filterArg);
            // }
            // aggregate.project({
            //     _id: 0,
            //     id: 1,
            //     adult: 1,
            //     backdrop_path: 1,
            //     genres: 1,
            //     original_language: 1,
            //     original_title: 1,
            //     overview: 1,
            //     popularity: 1,
            //     poster_path: 1,
            //     release_date: 1,
            //     title: 1,
            //     video: 1,
            //     vote_average: 1,
            //     vote_count: 1,
            // });
            // // @ts-ignore
            // const movies = await Movie.aggregatePaginate(aggregate, options);
            // return movies;
        } catch (e) {
            console.log(e);
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
            const connection = await getConnection();
            const movieRepository = connection.getRepository(Movie);
            const movie = await movieRepository
                .createQueryBuilder('movie')
                .leftJoinAndSelect('movie.belongs_to_collection', 'Collection')
                .leftJoinAndSelect('movie.genres', 'Genre')
                .leftJoinAndSelect('movie.production_companies', 'Company')
                .leftJoinAndSelect('movie.spoken_languages', 'Language')
                .where('movie.id = :id', { id: Number.parseInt(id) })
                .getOne();
            if (!movie) throw new Error();
            return movie;
        } catch (e) {
            throw new NotFoundError();
        }
    },
};

export { instance as movieService };
