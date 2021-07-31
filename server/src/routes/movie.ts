import express, { Request, Response } from 'express';
import { validateRequest } from '../middlewares/validate-request';
import { movieService } from '../services/movie';

const router = express.Router();

router.get(
    '/api/v1/movies',
    [],
    validateRequest,
    async (req: Request, res: Response) => {
        const movies = await movieService.getAllMovies(req.params);
        res.send(movies);
    }
);

router.get(
    '/api/v1/movies/:movieId',
    [],
    validateRequest,
    async (req: Request, res: Response) => {
        const movie = await movieService.getMovie(req.params.movieId);
        res.send(movie);
    }
);

export { router as movieRouter };
