import style from './scss/MovieGrid.module.scss';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, fetchError = false }) => {
	return (
		<div>
			{fetchError === false ? (
				<div className={style.grid}>
					{movies.map((movie, i) => (
						<div className={style.item} key={i}>
							<MovieCard movie={movie} size="lg" />
						</div>
					))}
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};

export default MovieGrid;
