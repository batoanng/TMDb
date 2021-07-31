import { MOVIE_API, SERVER_API } from '../../../apis/constants';
import { Button, Container } from 'react-bootstrap';
import MovieQueryTable from '../../../components/MovieQueryTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useRequest from '../../../hooks/use-request';
import MovieGrid from '../../../components/MovieGrid';

const Latest = () => {
	const [movies, setMovies] = useState([]);
	const [hasError, setHasError] = useState(false);
	const [query, setQuery] = useState({
		page: 1,
		limit: 20,
	});
	const API = `${SERVER_API}${MOVIE_API}`;
	const { doRequest, error } = useRequest(API, 'get', {}, (data) => {
		console.log(data);
		setHasError(false);
	});

	useEffect(async () => {
		try {
			const { data } = await axios.get(API);
			setMovies(data.docs);
			setHasError(false);
		} catch (e) {
			setHasError(true);
		}
	}, []);

	return (
		<Container className="mb-5">
			<div className="title">Latest Movies</div>
			<div className="d-flex">
				<div>
					<MovieQueryTable
						query={query}
						setQuery={setQuery}
						search={doRequest}
					/>
				</div>
				<div className="flex-grow-1">
					<MovieGrid movies={movies} />
					<Button
						block
						onClick={() => doRequest(query)}
						className="main-btn mt-4"
					>
						Load More
					</Button>
				</div>
			</div>
		</Container>
	);
};
export default Latest;
