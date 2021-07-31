import express, { Request, Response } from 'express';
import { Movie } from '../models/movie';
import { validateRequest } from '../middlewares/validate-request';
import { NotFoundError } from '../errors/not-found-error';

const router = express.Router();

router.get(
    '/api/v1/movies',
    [],
    validateRequest,
    async (req: Request, res: Response) => {
        const options = {
            page: 1,
            limit: 20,
        };
        try {
            // @ts-ignore
            const movies = await Movie.paginate({}, options);
            res.send(movies);
        } catch (e) {
            throw new NotFoundError();
        }
    }
);

export { router as movieIndexRouter };
