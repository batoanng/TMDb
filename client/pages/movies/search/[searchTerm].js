import { MOVIE_API, SERVER_API } from '../../../apis/constants';
import { Button, Container } from 'react-bootstrap';
import MovieQueryTable from '../../../components/MovieQueryTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useRequest from '../../../hooks/use-request';
import MovieGrid from '../../../components/MovieGrid';
import ResultLabel from '../../../components/ResultLabel';

const SearchPage = ({ searchTerm }) => {
	const [movies, setMovies] = useState([]);
	const [hasError, setHasError] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [query, setQuery] = useState({
		page: 1,
		limit: 20,
	});
	const API = `${SERVER_API}${MOVIE_API}`;

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
			const { data } = await axios.get(`${API}`, {
				params: {
					search: searchTerm,
				},
			});
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
		<Container className="my-5">
			<div className="d-flex">
				<div>
					<ResultLabel />
				</div>
				<div className="flex-grow-1">
					{movies.length === 0 ? (
						<div className="ml-3">
							There are no movies that matched your query.
						</div>
					) : (
						<div>
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
					)}
				</div>
			</div>
		</Container>
	);
};

SearchPage.getInitialProps = async (context, client) => {
	const { searchTerm } = context.query;
	return { searchTerm };
};

export default SearchPage;
