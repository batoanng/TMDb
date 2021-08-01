import { NotFoundError } from '../errors/not-found-error';
import { getConnection } from 'typeorm';
import { Movie } from '../entity/Movie';
import { Person } from '../entity/Person';

const instance = {
    async getAllPeople() {
        try {
            const connection = await getConnection();
            const peopleRepository = connection.getRepository(Person);
            const people = await peopleRepository
                .createQueryBuilder('movie')
                .getMany();
            return {
                docs: people,
            };
        } catch (e) {
            console.log(e);
            throw new NotFoundError();
        }
    },
};

export { instance as peopleService };
