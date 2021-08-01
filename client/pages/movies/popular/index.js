import { MOVIE_API, SERVER_API } from '../../../apis/constants';
import { Button, Container } from 'react-bootstrap';
import MovieQueryTable from '../../../components/MovieQueryTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useRequest from '../../../hooks/use-request';
import MovieGrid from '../../../components/MovieGrid';

const Popular = () => {
	const [movies, setMovies] = useState([]);
	const [hasError, setHasError] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [query, setQuery] = useState({
		page: 1,
		limit: 20,
	});
	const API = `${SERVER_API}${MOVIE_API}`;
	const { doRequest, error } = useRequest(API, 'get', {}, query, (data) => {
		setMovies(data.docs);
		setTotalPages(data.totalPages);
		setHasError(false);
	});

	const { doRequest: loadMore, err } = useRequest(
		API,
		'get',
		{},
		query,
		(data) => {
			setMovies([...movies, ...data.docs]);
			setTotalPages(data.totalPages);
			setHasError(false);
		},
	);

	useEffect(async () => {
		try {
			const { data } = await axios.get(`${API}?sort_by=popularity.desc`);
			setMovies(data.docs);
			setHasError(false);
			setTotalPages(data.totalPages);
		} catch (e) {
			setHasError(true);
		}
	}, []);

	const handleLoadmore = async () => {
		const newQuery = {
			...query,
			page: query.page + 1,
		};
		setQuery(newQuery);
		await loadMore(newQuery);
	};

	return (
		<Container className="mb-5">
			<div className="title">Popular Movies</div>
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
					{query.page < totalPages && movies.length !== 0 ? (
						<Button
							block
							onClick={handleLoadmore}
							className="main-btn mt-4"
						>
							Load More
						</Button>
					) : (
						''
					)}
				</div>
			</div>
		</Container>
	);
};
export default Popular;
