import { useEffect } from 'react';
import { MOVIE_API } from '../apis/constants';
import { Container } from 'react-bootstrap';
import Banner from '../components/Banner';
import PopularMovieList from '../components/PopularMovieList';

const LandingPage = ({ movies }) => {
	useEffect(() => {
		console.log(movies);
	}, []);

	return (
		<Container>
			<Banner />
			<PopularMovieList />
		</Container>
	);
};

LandingPage.getInitialProps = async (context, client) => {
	try {
		const { data } = await client.get(MOVIE_API);
		return { movies: data.docs };
	} catch (e) {
		return { movies: [] };
	}
};

export default LandingPage;
