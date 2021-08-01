import MovieList from './MovieList';
import { useEffect, useState } from 'react';
import { MOVIE_API, SERVER_API } from '../apis/constants';
import axios from 'axios';
import style from './scss/LatestMovieList.module.scss';

const LatestMovieList = () => {
	const [movies, setMovies] = useState([]);
	const [hasError, setHasError] = useState(false);

	useEffect(async () => {
		try {
			const { data } = await axios.get(
				`${SERVER_API}${MOVIE_API}?sort_by=release_date.desc&limit=10`,
			);
			setMovies(data.docs);
		} catch (e) {
			setHasError(true);
		}
	}, []);

	return (
		<div className={style.latestMovie}>
			<div className="section-title">Latest</div>
			<MovieList movies={movies} fetchError={hasError} />
		</div>
	);
};

export default LatestMovieList;
