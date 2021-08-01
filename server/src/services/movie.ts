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
            // @ts-ignore
            if (filter.title) {
                movies.andWhere('movie.title LIKE :title', {
                    // @ts-ignore
                    title: `%${filter.title || ''}%`,
                });
            }
            // @ts-ignore
            if (filter.search) {
                movies.orWhere('movie.title LIKE :search', {
                    // @ts-ignore
                    search: `%${filter.search || ''}%`,
                });
                movies.orWhere('movie.overview LIKE :search', {
                    // @ts-ignore
                    search: `%${filter.search || ''}%`,
                });
                movies.orWhere('movie.popularity LIKE :search', {
                    // @ts-ignore
                    search: `%${filter.search || ''}%`,
                });
                movies.orWhere('movie.vote_average LIKE :search', {
                    // @ts-ignore
                    search: `%${filter.search || ''}%`,
                });
                movies.orWhere('movie.release_date LIKE :search', {
                    // @ts-ignore
                    search: `%${filter.search || ''}%`,
                });
            }
            const total: number = await movies.getCount();
            const result = await movies.skip(skip).take(limitChecked).getMany();
            return {
                docs: result,
                total,
                page: pageChecked,
                limit: limitChecked,
                totalPages: Math.ceil(total / limitChecked),
            };
        } catch (e) {
            console.log(e);
            throw new NotFoundError();
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
