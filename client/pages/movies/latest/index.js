import { MOVIE_API } from '../../../apis/constants';

const Latest = ({ movies }) => {
	return <div>latest</div>;
};

Latest.getInitialProps = async (context, client) => {
	try {
		const { data } = await client.get(MOVIE_API);
		return { movies: data.docs };
	} catch (e) {
		return { movies: [] };
	}
};

export default Latest;
