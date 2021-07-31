import { Container } from 'react-bootstrap';
import Banner from '../components/Banner';
import PopularMovieList from '../components/PopularMovieList';
import TopRatedMovieList from '../components/TopRatedMovieList';
import LatestMovieList from '../components/LatestMovieList';

const LandingPage = () => {
	return (
		<Container>
			<Banner />
			<PopularMovieList />
			<TopRatedMovieList />
			<LatestMovieList />
		</Container>
	);
};

export default LandingPage;
