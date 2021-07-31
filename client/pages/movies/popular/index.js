import { MOVIE_API } from '../../../apis/constants';

const Popular = ({ movies }) => {
	return <div>popular</div>;
};

Popular.getInitialProps = async (context, client) => {
	try {
		const { data } = await client.get(MOVIE_API);
		return { movies: data.docs };
	} catch (e) {
		return { movies: [] };
	}
};

export default Popular;
