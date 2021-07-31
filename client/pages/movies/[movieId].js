import Router from 'next/router';
import { useEffect } from 'react';
import { MOVIE_API } from '../../apis/constants';

const MovieDetail = ({ movie }) => {
	useEffect(() => {
		if (!movie) {
			Router.push('/');
		}
	}, []);

	return <div>movieId</div>;
};

MovieDetail.getInitialProps = async (context, client) => {
	const { movieId } = context.query;

	try {
		const { data } = await client.get(`${MOVIE_API}/${movieId}`);
		return { movie: data };
	} catch (e) {
		return { movie: null };
	}
};

export default MovieDetail;
