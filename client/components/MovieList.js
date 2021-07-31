import style from './scss/MovieList.module.scss';
import MovieCard from './MovieCard';

const MovieList = ({ movies, fetchError = false, highlight = false }) => {
	return (
		<div className={style.outer}>
			{fetchError === false ? (
				<div className={style.list}>
					{movies.map((movie, i) => (
						<MovieCard movie={movie} key={i} />
					))}
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};

export default MovieList;
