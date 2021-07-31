import style from './scss/RecommendationMovieList.module.scss';
import RecommendationMovieCard from './RecommendationMovieCard';

const RecommendationMovieList = ({ movies, fetchError = false }) => {
	return (
		<div className={style.outer}>
			<div className={style.title}>Recommendations</div>
			{fetchError === false ? (
				<div className={style.list}>
					{movies.map((movie, i) => (
						<RecommendationMovieCard movie={movie} key={i} />
					))}
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};

export default RecommendationMovieList;
