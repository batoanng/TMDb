import express, { Request, Response } from 'express';
import { validateRequest } from '../middlewares/validate-request';
import { peopleService } from '../services/people';

const router = express.Router();

router.get(
    '/api/v1/people',
    [],
    validateRequest,
    async (req: Request, res: Response) => {
        const people = await peopleService.getAllPeople();
        res.send(people);
    }
);

export { router as peopleRouter };
