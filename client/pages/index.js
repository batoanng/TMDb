import { Container } from 'react-bootstrap';
import Banner from '../components/Banner';
import PopularMovieList from '../components/PopularMovieList';

const LandingPage = () => {
	return (
		<Container>
			<Banner />
			<PopularMovieList />
		</Container>
	);
};

export default LandingPage;
